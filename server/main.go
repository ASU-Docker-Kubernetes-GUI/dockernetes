package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ivanmartinezmorales/dockernetes/server/router"
	"log"
)

const (
	PORT = ":8080"
)

func main() {
	app := fiber.New()

	router.CreateDockerRoutes(app)

	app.Get(
		"/",
		func(ctx *fiber.Ctx) error {
			return ctx.Send([]byte("Dockernetes Service API"))
		},
	)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})

	err := app.Listen(PORT)

	if err != nil {
		log.Fatal(err.Error())
	}
}
