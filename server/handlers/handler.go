package handlers

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	client "github.com/ivanmartinezmorales/dockernetes/server/docker_client"
	"time"
)

var AppContext = context.Background()

var dC = client.NewDockerClient(&AppContext)

// HandleGetStatus returns the current status of the docker container
func HandleGetStatus(ctx *fiber.Ctx) error {
	resp, err := dC.GetDockerStatus()
	if err != nil {
		return ctx.JSON(err)
	}
	return ctx.JSON(resp)
}

func HandleGetAllContainers(ctx *fiber.Ctx) error {
	resp, err := dC.GetAllContainers()
	if err != nil {
		return ctx.JSON(err)
	}
	return ctx.JSON(resp)

}

func HandleGetAllContainersByID(ctx *fiber.Ctx) error {
	resp, err := dC.GetContainerById(ctx.Params("id"))
	if err != nil {
		ctx.JSON(err)
	}
	return ctx.JSON(resp)
}

func HandleCreateContainer(ctx *fiber.Ctx) error {
	// get the image name that we want to implement
	imageName := ctx.Params("imageName")
	if containerName := ctx.Params("containerName"); containerName != "" {
		err := dC.CreateContainer(imageName, containerName)

		if err != nil {
			return ctx.JSON(err)
		}

		return ctx.JSON("Created container successfully")
	}

	err := dC.CreateContainer(imageName, "")

	if err != nil {
		return ctx.JSON(err)
	}
	return ctx.JSON("created container successfully")
}

func HandleGetContainerLogs(c *websocket.Conn) error {
	return nil
}

func HandleStopContainer(ctx *fiber.Ctx) error {
	err := dC.StopContainer(ctx.Params("id"))
	t := time.Now()

	if err != nil {
		return ctx.JSON(err)
	}

	return ctx.JSON(map[string]string{"timestamp": t.String(), "message": "successfully removed container"})

}

func HandleStopAllContainers(ctx *fiber.Ctx) error {
	erroredContainers, err := dC.StopAllContainers()
	if err != nil {
		return ctx.JSON(err)
	}

	if len(erroredContainers) > 0 {
		return ctx.JSON(map[string]interface{}{
			"erroredContainers": erroredContainers,
			"timestamp": time.Now().String(),
		})
	}

	return ctx.JSON(map[string]interface{}{
		"timestamp": time.Now().String(),
		"message": "Stopped all containers successfully",
	})
}

func HandleRestartContainer(ctx *fiber.Ctx) error {
	return ctx.SendString("Not Implemented")
}
