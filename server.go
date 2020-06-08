package main

import (
	rice "github.com/GeertJohan/go.rice"
	"github.com/gomodule/redigo/redis"
	"html/template"
	"log"
	"net/http"
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

func homeHandler(w http.ResponseWriter, r *http.Request) {
	people, err := loadPeople()
	checkError(w, err)

	renderTemplate(w, people)

	awards = make([]string ,0)
}

func addHandler(w http.ResponseWriter, r *http.Request) {
	conn := pool.Get()

	r.ParseMultipartForm(64*30)

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

func addPeopleHandler(w http.ResponseWriter, r *http.Request){
	conn := pool.Get()

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

func deletePeopleHandler(w http.ResponseWriter, r *http.Request) {
	conn := pool.Get()

	err := r.ParseForm()
	checkError(w, err)

	for key, _ := range r.Form {
		_, err = conn.Do("DEL", key)
		checkError(w, err)
	}

	http.Redirect(w, r, "/", http.StatusFound)
}

func loadPeople() ([]Person, error) {
	conn := pool.Get()
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

var tmpl = template.Must(template.ParseFiles("frontend/dist/index.html"))
var pool *redis.Pool
var awards []string

func main() {
	box := rice.MustFindBox("frontend/dist/bundle/").HTTPBox()
	staticFileServer := http.StripPrefix("/bundle/", http.FileServer(box.HTTPBox()))
	http.Handle("/bundle/", staticFileServer)

	makePool()
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/add", addHandler)
	http.HandleFunc("/addpeople", addPeopleHandler)
	http.HandleFunc("/deletepeople", deletePeopleHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

