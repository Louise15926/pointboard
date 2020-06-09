FROM golang:alpine

# get redigo
RUN apk add --no-cache git mercurial \
    && go get github.com/gomodule/redigo/redis \
    && go get github.com/GeertJohan/go.rice \
    && go get github.com/GeertJohan/go.rice/rice \
    && apk del git mercurial

RUN mkdir /app

COPY . /app/

WORKDIR /app

ENV APP_MODE="DEPLOYMENT"

CMD ["go", "run", "main.go"]