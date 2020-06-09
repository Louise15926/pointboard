package backend

type Config struct {
	dbURL		string
	tmplPath	string
}

var devConfig = Config {
	":6379",
	"frontend/dist/index.html",
}

var testConfig = Config {
	":6378",
	"../frontend/dist/index.html",
}

var deployConfig = Config {
	"db.pb-html.local:6379",
	"frontend/dist/index.html",
}