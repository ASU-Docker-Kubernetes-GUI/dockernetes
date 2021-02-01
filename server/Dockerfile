FROM golang:latest

ENV GO111MODULE=on

WORKDIR /app

COPY ./go.mod .

RUN go mod download

COPY . .

EXPOSE 8080

CMD ["go", "run", "main.go"]

