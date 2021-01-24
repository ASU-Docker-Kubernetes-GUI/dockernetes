package router

import (
	"github.com/docker/docker/api/server/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/ivanmartinezmorales/dockernetes-server/server/handlers"
)

func CreateDockerRoutes(app fiber.Router) {
	router := app.Group("/api/v1/docker")
	router.Use(middleware.CORSMiddleware{})

	router.Get("/status", handlers.HandleGetStatus)
	router.Get("/containers", handlers.HandleGetAllContainers)
	router.Get("/containers/:id", handlers.HandleGetAllContainersByID)

	router.Put("/containers/restart/:id", handlers.HandleRestartContainer)
	router.Post("/containers/create", handlers.HandleCreateContainer)
	router.Delete("/containers/stop", handlers.HandleStopAllContainers)
	router.Delete("/containers/stop/:id", handlers.HandleStopContainer)

	router.Get("/containers/logs/:id", websocket.New(handlers.HandleGetContainerLogs))
}
