package backend

import (
	rice "github.com/GeertJohan/go.rice"
	"github.com/gomodule/redigo/redis"
	"html/template"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
)

type Data struct {
	People []Person
	Awards []string
}

type Person struct {
	Name string `redis:"name"`
	Score float64 `redis:"score"`
}

type App struct {
	pool *redis.Pool
	config Config
	tmpl 	template.Template
}

func renderTemplate(w http.ResponseWriter, people []Person, tmpl template.Template) {
	err := tmpl.ExecuteTemplate(w, "index.html", Data{
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

func (app *App) homeHandler(w http.ResponseWriter, r *http.Request) {
	people, err := app.loadPeople()
	checkError(w, err)

	renderTemplate(w, people, app.tmpl)

	awards = make([]string ,0)
}

func (app *App) addHandler(w http.ResponseWriter, r *http.Request) {
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

		// check awards
		currScore, err := redis.Float64(conn.Do("HGET", name, "score"))
		checkError(w, err)
		if currScore + byPoints >= 100 {
			awards = append(awards, name)
			byPoints -= 100
		}
		_, err = conn.Do("HINCRBYFLOAT", name, "score", byPoints)
		checkError(w, err)
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func (app *App) addPeopleHandler(w http.ResponseWriter, r *http.Request){
	conn := app.pool.Get()

	name, score, expression := r.FormValue("new-name"), r.FormValue("new-score"), r.FormValue("new-score-exp")

	existed, err := redis.Bool(conn.Do("EXISTS", name))
	checkError(w, err)

	if !existed {
		// check award
		scoreVal, err := strconv.ParseFloat(score, 64)
		if scoreVal >= 100 {
			awards = append(awards, name)
			scoreVal -= 100
		}
		_, err = conn.Do("HSET", name, "name", name, "score", scoreVal, "expression", expression)
		checkError(w, err)
	}

	http.Redirect(w, r, "/", http.StatusFound)
}

func (app *App) deletePeopleHandler(w http.ResponseWriter, r *http.Request) {
	conn := app.pool.Get()

	err := r.ParseForm()
	checkError(w, err)

	for key, _ := range r.Form {
		_, err := conn.Do("DEL", key)
		checkError(w, err)
	}

	http.Redirect(w, r, "/", http.StatusFound)
}

func (app *App) loadPeople() ([]Person, error) {
	conn := app.pool.Get()
	defer conn.Close()

	peopleKeys, err := redis.Strings(conn.Do("KEYS", "*"))
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	sort.Strings(peopleKeys)

	people := make([]Person, len(peopleKeys))
	for idx, personName := range peopleKeys {
		if personName == ""{
			conn.Do("DEL", personName)
		}
		raw, err := redis.Values(conn.Do("HGETALL", personName))
		person := Person{}
		err = redis.ScanStruct(raw, &person)
		if err != nil {
			continue
		}
		people[idx] = person
	}
	return people, nil
}

func (app* App) init(mode string) {
	switch  mode {
	case "DEVELOPMENT":
		app.config = devConfig
	case "TEST":
		app.config = testConfig
	case "DEPLOY":
		app.config = deployConfig
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

	app := &App{}
	app.init(os.Getenv("APP_MODE"))

	http.HandleFunc("/", app.homeHandler)
	http.HandleFunc("/add", app.addHandler)
	http.HandleFunc("/addpeople", app.addPeopleHandler)
	http.HandleFunc("/deletepeople", app.deletePeopleHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}