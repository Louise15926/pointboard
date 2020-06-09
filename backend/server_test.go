package backend

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
	"github.com/stretchr/testify/require"
	"log"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)


var people = []Person{
	{
	"horsey",
	42,
	},
	{
	"small bear",
	55,
	},
	{
		"doggo",
		12,
	},
}
const defaultOffset = 5.0

func setup() *App {
	app := &App{}
	app.init("TESTING")
	return app
}

func initDB(app *App, people []Person) error {
	conn := app.pool.Get()

	for _, person := range people {
		_, err := conn.Do("HSET", person.Name, "name", person.Name, "score", person.Score)
		if err != nil {
			cleanDB(app)
			return err
		}
	}
	return nil
}

func cleanDB(app *App) {
	conn := app.pool.Get()
	_, err := conn.Do("FLUSHDB")
	if err != nil {
		log.Println(err)
	}
}

func createRequestWithQuery(endpoint string, query map[string]string) (*http.Request, error) {
	req, err := http.NewRequest("GET", endpoint, nil)
	if err != nil {
		return &http.Request{}, err
	}

	q := req.URL.Query()
	for key, val := range query {
		q.Add(key, val)
	}
	req.URL.RawQuery = q.Encode()
	return req, nil
}

func TestAddPeopleSuccess(t *testing.T) {
	app := setup()
	defer cleanDB(app)

	testCasesSuccess := map[string]struct {
		name 	string
		score	string

		expectedCode	int
		expectedScore	float64
	}{
		"success below 100": {
			"horsey",
			"99",
			http.StatusFound,
			99,
		},
		"success below 199": {
			"small bear",
			"188",
			http.StatusFound,
			88,
		},
	}
	for name, tc := range testCasesSuccess {
		t.Run(name, func(t *testing.T) {
			req, err := createRequestWithQuery("/addpeople", map[string]string{"new-name": tc.name, "new-score": tc.score})
			if err != nil {
				log.Println(err)
			}

			recorder := httptest.NewRecorder()
			handler := http.HandlerFunc(app.addPeopleHandler)
			handler.ServeHTTP(recorder, req)

			require.Equal(t, tc.expectedCode, recorder.Code)

			conn := app.pool.Get()
			score, err := redis.Float64(conn.Do("HGET", tc.name, "score"))
			if err != nil {
				log.Println(err)
				return
			}
			require.Equal(t, tc.expectedScore, score)
		})
	}
}

func TestAddPeopleDuplicate(t *testing.T) {
	app := setup()
	defer cleanDB(app)

	handler := http.HandlerFunc(app.addPeopleHandler)
	name, score0, score1 := "doggo", "42", "43"
	recorder := httptest.NewRecorder()
	expectedScore, err := strconv.ParseFloat(score0, 64)
	if err != nil {
		log.Println(nil)
		return
	}

	t.Run("duplicate name", func(t *testing.T) {
		req0, err := createRequestWithQuery("/addpeople", map[string]string{"new-name": name, "new-score": score0})
		if err != nil {
			log.Println(nil)
			return
		}
		handler.ServeHTTP(recorder, req0)

		req1, err := createRequestWithQuery("/addpeople", map[string]string{"new-name": name, "new-score": score1})
		if err != nil {
			log.Println(nil)
			return
		}
		handler.ServeHTTP(recorder, req1)

		conn := app.pool.Get()
		score, err := redis.Float64(conn.Do("HGET", name, "score"))
		if err != nil {
			log.Println(err)
			return
		}
		require.Equal(t, expectedScore, score)
	})
}

func TestAddSuccessSingleUpdate(t *testing.T) {
	app := setup()
	defer cleanDB(app)

	testCases := map[string]struct {
		testPerson	Person
		offset  float64
		expectedScore	float64
	} {
		"single update below 100": {
			people[0],
			defaultOffset,
			people[0].Score + defaultOffset,
		},
		"single update over 100": {
			people[1],
			100 + 2 - people[1].Score,
			2,
		},
	}

	for name, tc := range testCases {
		t.Run(name, func(t *testing.T) {
			err := initDB(app, people)
			if err != nil {
				log.Println(err)
				return
			}
			handler := http.HandlerFunc(app.addHandler)
			recorder := httptest.NewRecorder()

			req, err := createRequestWithQuery("/add", map[string]string{
				"point-"+tc.testPerson.Name: fmt.Sprintf("%f", tc.offset),
			})
			if err != nil {
				log.Println(err)
				return
			}
			handler.ServeHTTP(recorder, req)

			// test if response status code is correct
			require.Equal(t, http.StatusFound, recorder.Code)

			// test if the data in database is correctly updated
			conn := app.pool.Get()
			score, err := redis.Float64(conn.Do("HGET", tc.testPerson.Name, "score"))
			if err != nil {
				log.Println(err)
				return
			}
			require.Equal(t, tc.expectedScore, score)
		})
	}
}

func TestAddSuccessMultipleUpdate(t *testing.T) {
	app := setup()
	defer cleanDB(app)

	err := initDB(app, people)
	if err != nil {
		log.Println(err)
		return
	}

	testPerson0 := people[0]
	testOffset0 := 5.0

	testPerson1 := people[1]
	testOffset1 := 6.0

	handler := http.HandlerFunc(app.addHandler)
	recorder := httptest.NewRecorder()

	req, err := createRequestWithQuery("/add", map[string]string{
		"point-"+testPerson0.Name:fmt.Sprintf("%f", testOffset0),
		"point-"+testPerson1.Name: fmt.Sprintf("%f", testOffset1),
	})
	if err != nil {
		log.Println(err)
		return
	}
	handler.ServeHTTP(recorder, req)

	// test if response status code is correct
	require.Equal(t, http.StatusFound, recorder.Code)

	// test if the data in database is correctly updated
	conn := app.pool.Get()
	score0, err := redis.Float64(conn.Do("HGET", testPerson0.Name, "score"))
	if err != nil {
		log.Println(err)
		return
	}
	require.Equal(t, testPerson0.Score+testOffset0, score0)

	score1, err := redis.Float64(conn.Do("HGET", testPerson1.Name, "score"))
	if err != nil {
		log.Println(err)
		return
	}
	require.Equal(t, testPerson1.Score+testOffset1, score1)
}

func TestDeleteSuccess(t *testing.T) {
	app := setup()
	defer cleanDB(app)

	err := initDB(app, people)
	if err != nil {
		log.Println(err)
	}

	testPerson := people[0]

	handler := http.HandlerFunc(app.deletePeopleHandler)
	recorder := httptest.NewRecorder()

	req, err := createRequestWithQuery("/deletepeople", map[string]string{
		testPerson.Name: "1",
	})
	if err != nil {
		log.Println(err)
		return
	}
	handler.ServeHTTP(recorder, req)

	// test if response status code is correct
	require.Equal(t, http.StatusFound, recorder.Code)

	// test if the data in database is correctly updated
	conn := app.pool.Get()
	exist, err := redis.Bool(conn.Do("EXISTS", testPerson.Name))

	require.Equal(t, false, exist)
}