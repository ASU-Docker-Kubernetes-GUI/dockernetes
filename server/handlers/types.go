package handlers

type CreateContainerRequest struct {
	ImageName     string `json:"imageName" xml:"imageName" form:"imageName" query:"imageName"`
	containerName string `json:"containerName" xml:"containerName" form:"containerName" query:"containerName"`
}

