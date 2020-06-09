# Point Board
- [Development](#Development)
- [Testing backend](#Testing-backend)
- [Deployment](#Deployment)

# Development

## Install dependencies
### Backend dependencies
Run `go install` from `backend/`
### Frontend dependencies
From the project root directory:
```
cd frontend
npm install
```

## Generate html template
Within the `frontend/` folder, run
```shell script
npm run build
```
This will create or update `index.html` and `bundle/bundle.js` inside `dist` (The `dist` folder will be created if it doesn't exist). For more information on `npm run build`, take a look at `package.json` and [webpack](https://webpack.js.org/).

The backend will use `frontend/dist/index.html` as a html template, which it populates using data from the database and serves to the browser.

## Develop frontend
Within the `frontend/` folder, run
```shell script
npm start
```
This will starts the frontend in development mode and begin listening on port (`8080` by default). Visit `localhost:8080` if it is not opened in browser yet. 

Note that this is limited in the sense that the frontend doesn't pull data from the database. Only the backend is able to pull data, populate the template, and serves to the browser. Therefore, the page you will see on `localhost:8080` isn't populated with data. However, this is a convenient way to see the effect of  stylesheets, and some frontend scripts.

## Start the database
To run a local database, make sure you have `redis` installed. Start the server by running ```redis-server```. This will start the database on port `6379` by default.

### Development database vs. testing database 
You need to run two different database for development and testing. Specify the database url for each database in  `backend/config.go`.

## Develop Backend
From the `backend/` folder, run
```shell script
go run server.go
```
to start the server. Make sure that the database config is correct in the `config.go` file.

# Testing backend
From the `backend/` folder, run `go test` to start the tests.

# Deployment
1. Make sure you have run `npm run build` to reflect your latest edit on frontend
2. Use [Copilot](https://github.com/aws/amazon-ecs-cli-v2) to deploy!
## Deploy Database
Under project root directory, run:
```shell script
touch db.Dockerfile
echo "FROM redis\nEXPOSE 6379" >> db.Dockerfile
```
This will expose the port `6379` for incoming traffic. You can use a different port but make sure to change the deployment configuration in  `backend/config.go` accordingly. 

While using [Copilot](https://github.com/aws/amazon-ecs-cli-v2):
1. Use `db.Dockerfile` to deploy the database
2. Be sure to select "Backend App" for app type. For more information, [visit here](https://github.com/aws/amazon-ecs-cli-v2/wiki/App-Types). You can use environment variables to set up the `dbURL` in `backend/config.go`, as described [here](https://github.com/aws/amazon-ecs-cli-v2/wiki/Developing-With-Service-Discovery).
## Deploy Backend
Similarly, deploy the backend using [Copilot](https://github.com/aws/amazon-ecs-cli-v2), and select "Load Balanced Web App" for app type. For more information, [visit here](https://github.com/aws/amazon-ecs-cli-v2/wiki/App-Types).
