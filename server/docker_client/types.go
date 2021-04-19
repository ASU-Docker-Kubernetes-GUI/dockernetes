package client

import "github.com/docker/docker/api/types"

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
	ContainersRunning   int    `json:"containersRunning"`
	ContainersStopped   int    `json:"containersStopped"`
	ContainersPaused    int    `json:"containersPaused"`
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
	RestartCount   int          `json:"restartCount,omitempty"'`
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
