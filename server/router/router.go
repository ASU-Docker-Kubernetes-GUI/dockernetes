package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ivanmartinezmorales/dockernetes/server/handlers"
)

// CreateDockerRoutes instantiates our Dockernetes Router
func CreateDockerRoutes(app fiber.Router) {
	router := app.Group("/api/v1/docker")

	// Back office Routes
	router.Get("/ping", handlers.HandlePing)
	router.Get("/status", handlers.HandleGetStatus)
	router.Get("/disk-usage", handlers.HandleGetDiskUsage)
	router.Get("/events", handlers.HandleGetEvents)

	// Containers Routes
	router.Get("/containers", handlers.HandleGetAllContainers)
	router.Get("/containers/:id", handlers.HandleGetAllContainersByID)
	router.Get("/containers/stop", handlers.HandleStopAllContainers)
	router.Get("/containers/stop/:id", handlers.HandleStopContainer)
	router.Put("/containers/restart/:id", handlers.HandleRestartContainer)
	router.Post("/containers/create", handlers.HandleCreateContainer)

	// Images Routes
	router.Get("/images", handlers.HandleGetAllHostImages)
	router.Get("/images/:searchTerm", handlers.HandleSearchImageByName)
	router.Delete("/images/:id", handlers.HandleRemoveImage)

	// Networks Routes
	router.Get("/networks", handlers.HandleGetAllNetworks)
	router.Post("/networks", handlers.HandleCreateNetwork)
	router.Get("/networks/connect/:id", handlers.HandleConnectNetwork)
	router.Delete("/networks/:id", handlers.HandleRemoveNetwork)

}
