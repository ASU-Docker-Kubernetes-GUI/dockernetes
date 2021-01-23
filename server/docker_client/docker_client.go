package client

import (
	"context"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	docker "github.com/docker/docker/client"
	"io"
	"strings"
)

type dockerClient struct {
	ctx            *context.Context
	dockerClient   *docker.Client
	containerCache map[string]types.Container
	imageCache     map[string]bool
}

type DockerClient interface {
	GetAllContainers() (*[]types.Container, error)
	GetContainerById(ID string) (types.Container, error)
	CreateContainer(imageName, containerName string) (*types.Container, error)
	GetContainerLogs(containerName string) (*io.ReadCloser, error)
	StopAllContainers() error
	RestartContainer(containerID string) error
}

// NewDockerClient creates a new Docker Client with a provided context
func NewDockerClient(ctx *context.Context) *dockerClient {
	client, err := docker.NewClientWithOpts(docker.FromEnv, docker.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	c := make(map[string]types.Container)
	i := make(map[string]bool)

	return &dockerClient{ctx: ctx, dockerClient: client, containerCache: c, imageCache: i}
}

// GetAllContainers
func (d *dockerClient) GetAllContainers() (*[]types.Container, error) {
	response, err := d.dockerClient.ContainerList(*d.ctx, types.ContainerListOptions{All: true})
	if err != nil {
		return nil, err
	}

	// Store the containers in the cache. This way when we call `GetContainerById` we can immediately return the result
	for _, container := range response {
		if con, ok := d.containerCache[container.ID]; !ok {
			d.containerCache[container.ID] = container
		} else {
			d.containerCache[container.ID] = con
		}
	}

	return &response, nil
}

// GetContainerById
func (d dockerClient) GetContainerById(ID string) (*types.Container, error) {
	if container, ok := d.containerCache[ID]; ok {
		return &container, nil
	}

	response, err := d.dockerClient.ContainerList(*d.ctx, types.ContainerListOptions{})
	if err != nil {
		return nil, err
	}

	for _, container := range response {
		if c, ok := d.containerCache[container.ID]; !ok {
			d.containerCache[container.ID] = container
		} else {
			d.containerCache[c.ID] = c
		}
	}

	container := d.containerCache[ID]
	return &container, nil
}

// CreateContainer
func (d dockerClient) CreateContainer(imageName, containerName string) error {
	// Check if the image already exists
	if _, ok := d.imageCache[imageName]; !ok {
		img, err := d.dockerClient.ImagePull(*d.ctx, imageName, types.ImagePullOptions{})
		if err != nil {
			return err
		}

		buf := new(strings.Builder)
		_, err = io.Copy(buf, img)
		if err != nil {
			return err
		}

		d.imageCache[imageName] = true
	}

	cName := ""
	if containerName != "" {
		cName = containerName
	}

	resp, err := d.dockerClient.ContainerCreate(*d.ctx, &container.Config{
		Image: imageName,
	}, nil, nil, nil, cName)

	if err != nil {
		return err
	}

	// Start the container
	if err := d.dockerClient.ContainerStart(*d.ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		return err
	}

	// Now add the image to our image cache.
	return nil
}

// GetContainerLogs
func (d dockerClient) GetContainerLogs(containerName string) (*io.ReadCloser, error) {
	panic("implement me")
}

// StopAllContainers
func (d dockerClient) StopAllContainers() error {
	panic("implement me")
}

// RestartContainer
func (d dockerClient) RestartContainer(containerID string) error {
	panic("implement me")
}
