package main

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
	"net/http"
)

//var dbURL = fmt.Sprintf("%s:6379", os.Getenv("ECS_APP_DISCOVERY_ENDPOINT"))
var dbURL = fmt.Sprintf("db.pb-html.local:6379")

func renderTemplate(w http.ResponseWriter, people []Person) {
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

func makePool() {
	pool = &redis.Pool{
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", dbURL)
		},
	}
}