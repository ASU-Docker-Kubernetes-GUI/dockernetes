package main

import (
	"context"
	"errors"
	"github.com/docker/docker/api/types"
	docker "github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
	"time"
)

type server struct {
	ctx *context.Context
	dockerClient *docker.Client
	app *fiber.App
}

func newServer(ctx *context.Context) *server {
	dockerClient, err := docker.NewClientWithOpts(docker.FromEnv, docker.WithAPIVersionNegotiation())

	if err != nil {
		panic(err)
	}

	app := fiber.New()

	return &server{ctx: ctx, dockerClient: dockerClient, app: app}
}

type StatusResponse struct {
	TimeStamp time.Time `json:timestamp`
	Message string `json:message`
}



func getContainers(ctx context.Context, dockerClient *docker.Client) (*GetAllContainersResponse, error)  {
	containers, err := dockerClient.ContainerList(ctx, types.ContainerListOptions{All: true})
	if err != nil {
		return nil, errors.New("Unable to fetch containres")
	}

	return &GetAllContainersResponse{
		TimeStamp:  time.Now(),
		Containers: containers,
	}, nil
}

func getContainer(ctx context.Context, dockerClient *docker.Client, containerID string) (*GetContainerResponse, error) {
	containers, err := dockerClient.ContainerList(ctx, types.ContainerListOptions{All: true})
	if err != nil {
		return nil, errors.New("Unable to fetch container")
	}

	for _, container := range containers {
		if container.ID == containerID {
			return &GetContainerResponse{
				TimeStamp:  time.Now(),
				Container: container,
			}, nil
		}
	}

	return nil, errors.New("Container could not be found")
}

func (s *server) createRoutes() fiber.Router {
	group := s.app.Group("api/v1")
	group.Get("/", handleGetStatus)

	group.Get("/containers", func(ctx *fiber.Ctx) error {
		response, err := getContainers(*s.ctx, s.dockerClient)

		if err != nil {
			return ctx.JSON(StatusResponse{
				TimeStamp: time.Now(),
				Message:   "Unable to get all containers",
			})
		}

		return ctx.JSON(response)
	})

	group.Get("/container/:id", func(ctx *fiber.Ctx) error {
		response, err := getContainer(*s.ctx, s.dockerClient, ctx.Params("id"))

		if err != nil {
			return ctx.JSON(StatusResponse{
				TimeStamp: time.Now(),
				Message:   "Unable to get all containers",
			})
		}

		return ctx.JSON(response)
	})

	return group
}

func handleGetContainer(ctx *fiber.Ctx) error {
	// Insert business logic for things here
	return ctx.SendString("Sending container through here")
}



func handleGetStatus(ctx *fiber.Ctx) error {
	return ctx.JSON(StatusResponse{
		TimeStamp: time.Now(),
		Message:   "The system is up 🥲",
	})
}


func main() {
	ctx := context.Background()
	defer ctx.Done()


	server := newServer(&ctx)
	server.createRoutes()
	server.app.Listen(":8080")
}
