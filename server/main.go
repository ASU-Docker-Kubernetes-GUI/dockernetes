package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ivanmartinezmorales/dockernetes/server/router"
	"time"
)

const (
	port = "8080"
)

func main() {
	app := fiber.New()

	router.CreateDockerRoutes(app)
	app.Get("/", func(ctx *fiber.Ctx) error {
		ct := time.Now()
		return ctx.JSON(map[string]string{"message": "app is up...", "currentTime": ct.String()})
	})

	app.Listen(":8080")
}
