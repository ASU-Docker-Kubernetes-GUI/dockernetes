package handlers

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	client "github.com/ivanmartinezmorales/dockernetes/server/docker_client"
	"strings"
	"time"
)

// I don't like this, but I had to do em like that.
var AppContext = context.Background()

// I don't like this, but I had to do em like that.
var dockerClient = client.NewDockerClient(&AppContext)

// HandlePing returns a ping back to the person that requested it.
func HandlePing(ctx *fiber.Ctx) error {
	return ctx.SendString("ok")
}

// HandleGetStatus returns the current status of the docker container
func HandleGetStatus(ctx *fiber.Ctx) error {
	resp, err := dockerClient.GetDockerStatus()

	if err != nil {
		return ctx.JSON(" ")
	}

	return ctx.JSON(resp)
}

// HandleGetAllContainers return the list of all containers from the docker client.
func HandleGetAllContainers(ctx *fiber.Ctx) error {
	resp, err := dockerClient.GetAllContainers()

	if err != nil {
		return ctx.Status(500).SendString("Unable to get all containers from Docker client")
	}

	return ctx.JSON(resp)
}

func HandleGetAllContainersByID(ctx *fiber.Ctx) error {
	requestedContainerID := ctx.Params("id", "")

	if requestedContainerID == "" {
		ctx.Status(400).SendString("Requested Container ID cannot be blank")
	}

	resp, err := dockerClient.GetContainerByID(requestedContainerID)

	if err != nil {
		ctx.Status(500).SendString(fmt.Sprintf("Unable to get %s from Docker client", requestedContainerID))
	}

	return ctx.JSON(resp)
}

func HandleCreateContainer(ctx *fiber.Ctx) error {
	request := new(CreateContainerRequest)
	if err := ctx.BodyParser(request); err != nil {
		ctx.Status(400).SendString("An error occurred")
	}

	imageName := request.ImageName
	newContainerName := request.containerName

	if imageName == "" {
		return ctx.Status(400).SendString("Image name cannot be blank!")
	}

	resp, err := dockerClient.CreateContainer(imageName, newContainerName)

	if err != nil {
		return ctx.Status(500).SendString("Unable to create the container at this time.")
	}

	return ctx.SendString(*resp)
}

func HandleStopContainer(ctx *fiber.Ctx) error {
	err := dockerClient.StopContainer(ctx.Params("id"))
	t := time.Now()

	if err != nil {
		return ctx.JSON(err)
	}

	return ctx.JSON(map[string]string{"timestamp": t.String(), "message": "successfully removed container"})

}

func HandleStopAllContainers(ctx *fiber.Ctx) error {
	erroredContainers, err := dockerClient.StopAllContainers()
	if err != nil {
		return ctx.JSON(err)
	}

	if len(erroredContainers) > 0 {
		return ctx.JSON(map[string]interface{}{
			"erroredContainers": erroredContainers,
			"timestamp":         time.Now().String(),
		})
	}

	return ctx.JSON(map[string]interface{}{
		"timestamp": time.Now().String(),
		"message":   "Stopped all containers successfully",
	})
}

func HandleRestartContainer(ctx *fiber.Ctx) error {
	containerID := ctx.Params("id")
	if containerID == "" {
		return ctx.SendStatus(400)
	}

	err := dockerClient.RestartContainer(containerID)

	if err != nil {
		return ctx.SendString(fmt.Sprintf("Failed to restart container with id: %s", containerID))

	}

	return ctx.SendString(fmt.Sprintf("Successfully restarted container with ID: %s", containerID))
}

func HandleGetDiskUsage(ctx *fiber.Ctx) error {
	resp, err := dockerClient.GetDiskUsage()
	if err != nil {
		return ctx.SendString(fmt.Sprintf("Failed to get disk usage for environment"))
	}

	return ctx.JSON(resp)
}

func HandleGetAllHostImages(ctx *fiber.Ctx) error {
	resp, err := dockerClient.GetAllImages()

	if err != nil {
		return ctx.Status(500).SendString("Unable to retrieve all images")
	}

	return ctx.JSON(resp)
}

func HandleRemoveImage(ctx *fiber.Ctx) error {
	imageRemoveID := ctx.Params("id", "")

	if imageRemoveID == "" {
		return ctx.Status(404).SendString("Image to remove not found")
	}

	var forced bool

	isForced := ctx.Query("force", "false")

	if strings.ToLower(isForced) == "true" {
		forced = true
	} else {
		forced = false
	}

	resp, err := dockerClient.RemoveDockerImage(ctx.Params("id"), forced)

	if err != nil {
		return ctx.Status(500).SendString("There was an issue removing the Docker image")
	}

	return ctx.JSON(resp)
}

func HandleSearchImageByName(ctx *fiber.Ctx) error {
	imageName := ctx.Query("searchTerm", "")

	if imageName == "" {
		return ctx.Status(400).SendString("No image found")
	}

	resp, err := dockerClient.SearchImage(imageName)

	if err != nil {
		return ctx.Status(500).SendString("Unable to retrieve images")
	}

	return ctx.JSON(resp)
}

// TODO
func HandleGetEvents(ctx *fiber.Ctx) error {
	return ctx.SendString("Not implemented")
}

// TODO
func HandleCreateNetwork(ctx *fiber.Ctx) error {
	return ctx.SendString("Not implemented")
}

// TODO
func HandleConnectNetwork(ctx *fiber.Ctx) error {
	return ctx.SendString("Not implemented")
}

// TODO
func HandleRemoveNetwork(ctx *fiber.Ctx) error {
	return ctx.SendString("Not implemented")
}

// TODO
func HandleGetAllNetworks(ctx *fiber.Ctx) error {
	return ctx.SendString("Not implemented")
}

func HandleStartContainer(ctx *fiber.Ctx) error {

	containerID := ctx.Params("id", "")

	if containerID == "" {
		ctx.Status(400).SendString("id must not be blank!")
	}

	resp, err := dockerClient.StartContainer(containerID)

	if err != nil {
		return ctx.Status(500).SendString("Unable to start container")
	}

	return ctx.SendString(*resp)
}
