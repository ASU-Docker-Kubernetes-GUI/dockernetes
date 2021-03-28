package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket"
	"github.com/ivanmartinezmorales/dockernetes/server/router"
	"time"
)

const (
	port = "8080"
)

func main() {
	app := fiber.New()

	router.CreateDockerRoutes(app)
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/", func(ctx *fiber.Ctx) error {
		ct := time.Now()
		return ctx.JSON(map[string]string{"message": "app is up...", "currentTime": ct.String()})
	})

	app.Listen(":8080")
}
