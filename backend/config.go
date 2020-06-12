package backend

import "os"

type Config struct {
	dbURL		string
	tmplPath	string
}

var devConfig = Config {
	os.Getenv("DEV_DBURL"),
	"frontend/dist/index.html",
}

var testConfig = Config {
	os.Getenv("TEST_DBURL"),
	"../frontend/dist/index.html",
}

var deployConfig = Config {
	os.Getenv("ECS_APP_DISCOVERY_ENDPOINT"),//"db.pb-html.local:6379",
	"frontend/dist/index.html",
}