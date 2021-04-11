package client

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	docker "github.com/docker/docker/client"
	"io"
	"log"
	"sort"
	"strings"
)

// Typedef integer for the state of a Docker container
type State int

// The states that a container can have
const (
	Created State = iota
	Restarting
	Running
	Paused
	Exited
	Killed
	Dead
)

// Status is a struct for returning back the status our docker containers
type Status struct {
	ID                  string `json:"id"`
	EnvironmentName     string `json:"environmentName"`
	Containers          int    `json:"containers"`
	Volumes             int    `json:"volumes"`
	Images              int    `json:"images"`
	DockerRootDirectory string `json:"dockerRootDirectory"`
	CpuCount            int    `json:"cpuCount"`
	MemoryUsage         int64  `json:"memoryInUse"`
}

// Container is the container struct that holds all of the information that we actually care
// about from Docker.
type Container struct {
	ContainerID    string       `json:"id""`
	ContainerNames []string     `json:"containerName"`
	ImageName      string       `json:"imageName"`
	Ports          []types.Port `json:"ports"`
	Path           string       `json:"path"`
	Created        int64        `json:"created"`
	Finished       string       `json:"finished,omitempty"`
	Status         string       `json:"status"`
	State          State        `json:"state"`
}

// Image is the Image struct that holds all of the information that we actually care about from docker
type Image struct {
	ImageId      string   `json:"id"`
	RepoTags     []string `json:"tags"`
	Created      int64    `json:"created"`
	Size         int64    `json:"size"`
	Containers   int64    `json:"containers"`
	Author       string   `json:"author"`
	Architecture string   `json:"architecture"`
	OS           string   `json:"OS"`
}

// ImageSearch is the ImageSearch struct that holds all of the return values from the Image Search
// function that we actually care about
type ImageSearch struct {
	Name        string `json:"name"`
	IsOfficial  bool   `json:"isOfficial"`
	StarCount   int    `json:"starCount"`
	Description string `json:"description"`
}

type dockerClient struct {
	ctx            *context.Context
	dockerClient   *docker.Client
	containerCache map[string]Container // containerCache is a map of containerIDs to Containers
	imageCache     map[string]Image     // imageCache is a map of images to booleans. True if image is fresh
}

type DockerClient interface {
	GetDockerStatus() (*Status, error)
	GetAllContainers() (*[]Container, error)
	GetContainerById(ID string) (*Container, error)
	CreateContainer(imageName, containerName string) (*string, error)
	StopContainer(containerID string) error
	StopAllContainers() ([]string, error)
	RestartContainer(containerID string) error
	GetAllImages() (*[]Image, error)
	GetImageById(imageID string) (*Image, error)
	RemoveDockerImage(imageID string, force bool) (*string, error)
	SearchImage(name string) (*[]ImageSearch, error)
}

func (d *dockerClient) SearchImage(name string) (*[]ImageSearch, error) {
	resp, err := d.dockerClient.ImageSearch(*d.ctx, name, types.ImageSearchOptions{Limit: 10})

	if err != nil {
		return nil, err
	}

	foundImages := []ImageSearch{}
	for _, result := range resp {
		foundImages = append(foundImages, ImageSearch{
			Name:        result.Name,
			IsOfficial:  result.IsOfficial,
			StarCount:   result.StarCount,
			Description: result.Description,
		})
	}

	// Sort the images by most stars to least stars
	sort.Slice(foundImages[:], func(i, j int) bool {
		return foundImages[i].StarCount < foundImages[j].StarCount
	})

	return &foundImages, nil
}

func (d *dockerClient) RemoveDockerImage(imageID string, force bool) (*string, error) {
	resp, err := d.dockerClient.ImageRemove(*d.ctx, imageID, types.ImageRemoveOptions{
		Force: force,
	})

	if err != nil {
		return nil, err
	}

	deletedImageId := ""

	if len(resp) > 0 {
		deletedImageId = resp[0].Deleted
	}

	return &deletedImageId, nil
}

func (d *dockerClient) GetImageById(imageID string) (*Image, error) {
	resp, err := d.dockerClient.ImageList(*d.ctx, types.ImageListOptions{})

	if err != nil {
		return nil, err
	}

	var found Image
	for _, r := range resp {
		if r.ID == imageID {

			re, _, e := d.dockerClient.ImageInspectWithRaw(*d.ctx, imageID)
			var author string
			var architecture string
			var os string

			if e != nil {
				author = ""
				architecture = ""
				os = ""
			} else {
				author = re.Author
				architecture = re.Architecture
				os = re.Os
			}

			found = Image{
				ImageId:      r.ID,
				RepoTags:     r.RepoTags,
				Created:      r.Created,
				Size:         r.Size,
				Containers:   r.Containers,
				Author:       author,
				Architecture: architecture,
				OS:           os,
			}
		}
	}

	return &found, nil
}

func (d *dockerClient) GetAllImages() (*[]Image, error) {
	images := []Image{}

	resp, err := d.dockerClient.ImageList(*d.ctx, types.ImageListOptions{})

	if err != nil {
		return nil, err
	}

	for _, image := range resp {
		r, _, _ := d.dockerClient.ImageInspectWithRaw(*d.ctx, image.ID)
		images = append(images, Image{
			ImageId:      image.ID,
			RepoTags:     image.RepoTags,
			Created:      image.Created,
			Size:         image.Size,
			Containers:   image.Containers,
			Author:       r.Author,
			Architecture: r.Architecture,
			OS:           r.Os,
		})
	}

	return &images, nil
}

// GetDockerStatus returns the current Docker server environment
func (d *dockerClient) GetDockerStatus() (*Status, error) {
	resp, err := d.dockerClient.Info(*d.ctx)

	if err != nil {
		return nil, err
	}

	volumeCount := len(resp.Plugins.Volume)

	return &Status{
		ID:                  resp.ID,
		EnvironmentName:     resp.Name,
		Containers:          resp.Containers,
		Volumes:             volumeCount,
		Images:              resp.Images,
		DockerRootDirectory: resp.DockerRootDir,
		CpuCount:            resp.NCPU,
		MemoryUsage:         resp.MemTotal,
	}, nil
}

// NewDockerClient creates a new Docker Client with a provided context
func NewDockerClient(ctx *context.Context) *dockerClient {
	client, err := docker.NewClientWithOpts(docker.FromEnv, docker.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	c := make(map[string]Container)
	i := make(map[string]Image)

	return &dockerClient{ctx: ctx, dockerClient: client, containerCache: c, imageCache: i}
}

// GetAllContainers
func (d *dockerClient) GetAllContainers() (*[]Container, error) {
	response, err := d.dockerClient.ContainerList(*d.ctx, types.ContainerListOptions{All: true})

	if err != nil {
		return nil, err
	}

	containerList := d.extractContainerData(response)

	// Update all containers
	for _, container := range containerList {
		if _, exists := d.containerCache[container.ContainerID]; !exists {
			d.containerCache[container.ContainerID] = container
		} else {
			d.containerCache[container.ContainerID] = container
		}
	}
	return &containerList, nil
}

// GetContainerById
func (d *dockerClient) GetContainerById(ID string) (*Container, error) {
	// Immediately check if the parsedContainer exists in the cache, if so then add it in
	if container, ok := d.containerCache[ID]; ok {
		return &container, nil
	}

	// Get all containers
	containers, err := d.dockerClient.ContainerList(*d.ctx, types.ContainerListOptions{})

	if err != nil {
		return nil, err
	}

	parsedContainers := d.extractContainerData(containers)

	for _, parsedContainer := range parsedContainers {
		if _, exists := d.containerCache[parsedContainer.ContainerID]; !exists {
			d.containerCache[parsedContainer.ContainerID] = parsedContainer
		} else {
			d.containerCache[parsedContainer.ContainerID] = parsedContainer
		}
	}

	foundContainer, ok := d.containerCache[ID]

	if !ok {
		return nil, fmt.Errorf("the parsedContainer does not exist")
	}

	return &foundContainer, nil
}

// CreateContainer creates the container but does not start it
func (d *dockerClient) CreateContainer(imageName, containerName string) (*string, error) {
	img, err := d.dockerClient.ImagePull(*d.ctx, imageName, types.ImagePullOptions{})

	if err != nil {
		return nil, err
	}

	buf := new(strings.Builder)
	_, err = io.Copy(buf, img)

	if err != nil {
		return nil, err
	}

	cName := ""

	if containerName != "" {
		cName = containerName
	}

	resp, err := d.dockerClient.ContainerCreate(*d.ctx, &container.Config{
		Image: imageName,
	}, nil, nil, nil, cName)

	if err != nil {
		return nil, err
	}

	return &resp.ID, nil
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
		// skip non-running containers to avoid problems
		if container.Status != "running" {
			continue
		}

		// Stop the container
		if err := d.dockerClient.ContainerStop(*d.ctx, container.ContainerID, nil); err != nil {
			erroredContainerIDs = append(erroredContainerIDs, container.ContainerID)
		}

		// Remove these fields from the container cache
		if _, ok := d.containerCache[container.ContainerID]; ok {
			delete(d.containerCache, container.ContainerID)
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

// StopContainer stops the container
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

// GetDiskUsage Gets the disk usage for the Docker environment
func (d *dockerClient) GetDiskUsage() (*types.DiskUsage, error) {
	resp, err := d.dockerClient.DiskUsage(*d.ctx)
	if err != nil {
		return nil, err
	}
	return &resp, nil
}

// extractContainerData
func (d *dockerClient) extractContainerData(response []types.Container) []Container {
	containerList := []Container{}

	for _, k := range response {
		// Call Inspect Container for detailed stats
		resp, err := d.dockerClient.ContainerInspect(*d.ctx, k.ID)
		if err != nil {
			log.Print("Unable to inspect this container")
		}

		containerList = append(containerList, Container{
			ContainerID:    k.ID,
			ContainerNames: k.Names,
			ImageName:      k.Image,
			Ports:          k.Ports,
			Created:        k.Created,
			Status:         k.Status,
			State:          convertStateToEnum(resp.State),
			Finished:       resp.State.FinishedAt,
		})
	}

	return containerList
}

// convertStateToEnum
func convertStateToEnum(a *types.ContainerState) State {
	if a.Dead {
		return Dead
	}
	if a.Running {
		return Running
	}

	if a.Paused {
		return Paused
	}

	if a.OOMKilled {
		return Killed
	}

	if a.Restarting {
		return Restarting
	}

	if a.ExitCode > 0 {
		return Exited
	}

	return Created
}
