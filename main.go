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
	dockerClient *docker.Client
	app *fiber.App
}

type StatusResponse struct {
	TimeStamp time.Time `json:timestamp`
	Message string `json:message`
}

type GetAllContainersResponse struct {
	TimeStamp time.Time `json:timestamp`
	Containers []types.Container `json:containers`
}

type GetContainerResponse struct {
	TimeStamp time.Time `json:timestamp`
	Container types.Container `json:container`
}

func startDocker() *docker.Client {
	dockerClient, err := docker.NewClientWithOpts(docker.FromEnv, docker.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	return dockerClient
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

func getContainer(ctx context.Context, dockerClient docker.Client, containerID string) (*GetContainerResponse, error) {
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

func createRoutes(app *fiber.App, ctx *context.Context) fiber.Router {
	group := app.Group("api/v1")
	group.Get("/", handleGetStatus)
	return group
}

func(s *server) handleGetAllContainers() {
	getContainers()
}

func handleGetStatus(ctx *fiber.Ctx) error {
	response := new(StatusResponse)
	response.TimeStamp = time.Now()
	response.Message = "The system is up"
	return ctx.JSON(response)
}

func startServer(ctx *context.Context) *fiber.App {
	app := fiber.New()
	createRoutes(app, ctx)
	return app
}

func main() {
	ctx := context.Background()
	defer ctx.Done()

	server := startServer(&ctx)
	server.Listen(":8080")
}
