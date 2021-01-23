package client

import (
	"context"
	"github.com/docker/docker/api/types"
	docker "github.com/docker/docker/client"
	"io"
)

type dockerClient struct {
	ctx *context.Context
	dockerClient *docker.Client
}


type DockerClient interface {
	GetAllContainers() (*[]types.Container, error)
	GetContainerById(ID string) (*types.Container, error)
	RunContainer(image string) (*types.Container, error)
	GetContainerLogs(containerName string) (*io.ReadCloser, error)
	StopAllContainers() error
	RestartContainer(containerID string) error
}

//NewDockerClient creates a new Docker Client with a provided context
func NewDockerClient(ctx *context.Context) *dockerClient {
	client, err := docker.NewClientWithOpts(docker.FromEnv, docker.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	return &dockerClient{ctx: ctx, dockerClient: client}
}

//GetAllContainers
func (d *dockerClient) GetAllContainers() (*[]types.Container, error) {
	// We can add additional logic later on
	response, err := d.dockerClient.ContainerList(*d.ctx, types.ContainerListOptions{All: true})
	if err != nil {
		return nil, err
	}
	return &response, nil
}

//GetContainerById
func (d dockerClient) GetContainerById(ID string) (*types.Container, error) {
	panic("implement me")
}

//RunContainer
func (d dockerClient) RunContainer(image string) (*types.Container, error) {
	panic("implement me")
}

//GetContainerLogs
func (d dockerClient) GetContainerLogs(containerName string) (*io.ReadCloser, error) {
	panic("implement me")
}

//StopAllContainers
func (d dockerClient) StopAllContainers() error {
	panic("implement me")
}

//RestartContainer
func (d dockerClient) RestartContainer(containerID string) error {
	panic("implement me")
}


