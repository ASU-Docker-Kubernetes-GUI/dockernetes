package client

import (
	"context"
	"errors"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	docker "github.com/docker/docker/client"
	"io"
	"strings"
)

type dockerClient struct {
	ctx          *context.Context
	dockerClient *docker.Client
	// containerCache is a map of containerIDs to Containers
	containerCache map[string]types.Container
	// imageCache is a map of images to booleans. True if image is fresh
	imageCache map[string]bool
}

type DockerClient interface {
	GetDockerStatus() (*types.Info, error)
	GetAllContainers() (*[]types.Container, error)
	GetContainerById(ID string) (*types.Container, error)
	CreateContainer(imageName, containerName string) error
	GetContainerLogs(containerID string) (*io.ReadCloser, error)
	StopContainer(containerID string) error
	StopAllContainers() ([]string, error)
	RestartContainer(containerID string) error
}

// GetDockerStatus returns the current Docker server environment
func (d *dockerClient) GetDockerStatus() (*types.Info, error) {
	resp, err := d.dockerClient.Info(*d.ctx)
	if err != nil {
		return nil, err
	}

	return &resp, nil
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

	// Store the containers in the cache. This way when we call `GetContainerById` we can
	// immediately return the result
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
func (d *dockerClient) GetContainerById(ID string) (*types.Container, error) {
	// Immediately check if the container exists in the cache, if so then add it in
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
func (d *dockerClient) CreateContainer(imageName, containerName string) error {
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

		// Add the image to our image cache so we don't have to build it again
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

	if err := d.dockerClient.ContainerStart(*d.ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		return err
	}

	// Store the ID in the containerCache
	if _, ok := d.containerCache[resp.ID]; !ok {
		d.containerCache[resp.ID] = types.Container{ID: resp.ID}
	}

	return nil
}

// GetContainerLogs
func (d *dockerClient) GetContainerLogs(containerID string) (*io.ReadCloser, error) {
	if container, ok := d.containerCache[containerID]; !ok {
		return nil, errors.New("container does not exist in containerCache")
	} else {
		logs, err := d.dockerClient.ContainerLogs(*d.ctx, container.ID, types.ContainerLogsOptions{ShowStdout: true})

		if err != nil {
			return nil, err
		}

		// TODO: Fix this with: https://stackoverflow.com/a/48305795
		// NOTE: Demultiplex this in order to stream it
		return &logs, nil
	}
}

// StopAllContainers stops all containers that are currently running
func (d *dockerClient) StopAllContainers() ([]string, error) {
	// Use the list of running containers from the cache
	var erroredContainerIDs []string
	_, err := d.GetAllContainers()
	if err != nil {
		return nil, err
	}

	for _, container := range d.containerCache {
		// Stop the container
		if err := d.dockerClient.ContainerStop(*d.ctx, container.ID, nil); err != nil {
			erroredContainerIDs = append(erroredContainerIDs, container.ID)
		}

		// Remove these fields from the container cache
		if _, ok := d.containerCache[container.ID]; ok {
			delete(d.containerCache, container.ID)
		}
	}

	return erroredContainerIDs, nil
}

// RestartContainer restarts a container that was previously stopped
func (d *dockerClient) RestartContainer(containerID string) error {
	err := d.dockerClient.ContainerRestart(*d.ctx, containerID, nil)
	if err != nil {
		return err
	}
	return nil
}

func (d *dockerClient) StopContainer(containerID string) error {
	if err := d.dockerClient.ContainerStop(*d.ctx, containerID, nil); err != nil {
		return err
	}

	// Remove this item from the container cache
	if _, ok := d.containerCache[containerID]; ok {
		delete(d.containerCache, containerID)
	}

	return nil
}
