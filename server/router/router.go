package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ivanmartinezmorales/dockernetes/server/handlers"
)

// CreateDockerRoutes instantiates our Dockernetes Router
func CreateDockerRoutes(app fiber.Router) {
	router := app.Group("/api/v1/docker")

	router.Get("/status", handlers.HandleGetStatus)
	router.Get("/containers", handlers.HandleGetAllContainers)
	router.Get("/containers/:id", handlers.HandleGetAllContainersByID)
	router.Get("/containers/stop", handlers.HandleStopAllContainers)
	router.Get("/containers/stop/:id", handlers.HandleStopContainer)

	router.Put("/containers/restart/:id", handlers.HandleRestartContainer)
	router.Post("/containers/create", handlers.HandleCreateContainer)

	// router.Get("/containers/logs/:id", websocket.New(handlers.HandleGetContainerLogs))
}
