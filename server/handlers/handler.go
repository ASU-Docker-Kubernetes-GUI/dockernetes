package handlers

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	client "github.com/ivanmartinezmorales/dockernetes-server/server/docker_client"
	"strconv"
	"time"
)

var appContext = context.Background()

var dC = client.NewDockerClient(&appContext)

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

}

func HandleCreateContainer(ctx *fiber.Ctx) error {

}

func HandleGetContainerLogs(c *websocket.Conn) error {
	resp, err := dC.GetContainerLogs(ctx.Params("id"))

	var (
		mt  int
		msg []byte
		err error
	)

	for {

	}

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

}

func HandleRestartContainer(ctx *fiber.Ctx) error {

}
