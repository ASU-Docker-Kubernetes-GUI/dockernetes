package server

import (
	"context"
	docker "github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
)

type server struct {
	ctx *context.Context
	dockerClient *docker.Client
	app *fiber.App
}

func NewServer() *server {
	return &server{ctx: ctx, dockerClient: dockerClient, app: app}
}