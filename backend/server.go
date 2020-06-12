package backend

import (
	rice "github.com/GeertJohan/go.rice"
	"github.com/gomodule/redigo/redis"
	"html/template"
	"log"
	"math"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
)

type data struct {
	People []person
	Awards []string
}

type person struct {
	Name  string  `redis:"name"`
	Score float64 `redis:"score"`
}

type app struct {
	pool *redis.Pool
	config Config
	tmpl 	template.Template
}

func (app *app) homeHandler(w http.ResponseWriter, r *http.Request) {
	people, err := app.loadPeople()
	checkError(w, err)

	renderTemplate(w, people, app.tmpl)

	awards = make([]string, 0)
}

// Add/deduct points to participants; if the score after adding exceeds 100, add participant(s) to award list and reset their score to 0
func (app *app) addHandler(w http.ResponseWriter, r *http.Request) {
	conn := app.pool.Get()

	err := r.ParseForm()
	checkError(w, err)

	for key, values := range r.Form {
		name := strings.SplitN(key, "-", 2)[1]
		value := values[0]

		if value == "" {
			continue
		}

		byPoints, err := strconv.ParseFloat(value, 64)
		checkError(w, err)

		// check Awards
		currScore, err := redis.Float64(conn.Do("HGET", name, "score"))
		checkError(w, err)
		if currScore + byPoints >= 100 {
			awards = append(awards, name)
			_, err = conn.Do("HSET", name, "score", 0)
		} else {
			if currScore + byPoints <= -math.MaxFloat64 {
				http.Error(w, "the resulting number of points is too small", http.StatusUnprocessableEntity)
				return
			}
			_, err = conn.Do("HINCRBYFLOAT", name, "score", byPoints)
		}
		checkError(w, err)
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

// Add a new participant with initial score; if the initial score is >= 100, add participant to award list and set their score to 0
func (app *app) addPeopleHandler(w http.ResponseWriter, r *http.Request){
	conn := app.pool.Get()

	name, score, expression := r.FormValue("new-name"), r.FormValue("new-score"), r.FormValue("new-score-exp")

	name = normalizeString(name)

	existed, err := redis.Bool(conn.Do("EXISTS", name))
	checkError(w, err)

	if !existed {
		// check award
		scoreVal, err := strconv.ParseFloat(score, 64)
		checkError(w, err)

		if scoreVal >= 100 {
			awards = append(awards, name)
			scoreVal = 0
		}
		_, err = conn.Do("HSET", name, "name", name, "score", scoreVal, "expression", expression)
		checkError(w, err)
	}

	http.Redirect(w, r, "/", http.StatusFound)
}

// Delete participant(s) that are specified in the request using their name(s)
func (app *app) deletePeopleHandler(w http.ResponseWriter, r *http.Request) {
	conn := app.pool.Get()

	err := r.ParseForm()
	checkError(w, err)

	for key, _ := range r.Form {
		_, err := conn.Do("DEL", key)
		checkError(w, err)
	}

	http.Redirect(w, r, "/", http.StatusFound)
}

func (app *app) loadPeople() ([]person, error) {
	conn := app.pool.Get()
	defer conn.Close()

	peopleKeys, err := redis.Strings(conn.Do("KEYS", "*"))
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	sort.Strings(peopleKeys)

	people := make([]person, len(peopleKeys))
	for idx, personName := range peopleKeys {
		if personName == ""{
			conn.Do("DEL", personName)
		}
		raw, err := redis.Values(conn.Do("HGETALL", personName))
		if err != nil {
			log.Println(err)
			continue
		}
		person := person{}
		err = redis.ScanStruct(raw, &person)
		if err != nil {
			log.Println(err)
			continue
		}
		people[idx] = person
	}
	return people, nil
}

// normalizeString returns a string after it removes all redundant whitespace, leading/training whitespace, and lowercases it
func normalizeString(s string) string {
	return strings.ToLower(strings.Join(strings.Fields(s), " "))
}

func renderTemplate(w http.ResponseWriter, people []person, tmpl template.Template) {
	err := tmpl.ExecuteTemplate(w, "index.html", data{
		People: people,
		Awards: awards,
	})
	checkError(w, err)
}

func checkError(w http.ResponseWriter, err error) {
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func (app*app) init(mode string) {
	switch  mode {
	case "TESTING":
		app.config = testConfig
	case "DEPLOYMENT":
		app.config = deployConfig
	case "DEVELOPMENT":
	default:
		app.config = devConfig
	}

	app.pool = &redis.Pool{
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", app.config.dbURL)
		},
	}

	app.tmpl = *template.Must(template.ParseFiles(app.config.tmplPath))
}

var awards []string

func Start() {
	box := rice.MustFindBox("../frontend/dist/bundle/").HTTPBox()
	staticFileServer := http.StripPrefix("/bundle/", http.FileServer(box.HTTPBox()))
	http.Handle("/bundle/", staticFileServer)

	app := &app{}
	app.init(os.Getenv("APP_MODE"))

	http.HandleFunc("/", app.homeHandler)
	http.HandleFunc("/add", app.addHandler)
	http.HandleFunc("/addpeople", app.addPeopleHandler)
	http.HandleFunc("/deletepeople", app.deletePeopleHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}