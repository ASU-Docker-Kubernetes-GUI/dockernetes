PROGRAM=serverx
BUILD_DIR=bin
MAIN=main.go

CYAN='\033[0;36m'
NC='\033[0m' # No Color

all: deps build run

build:
	go build -o $(BUILD_DIR)/$(PROGRAM) $(MAIN)

run: build
	echo -e "${CYAN} Starting ${PROGRAM} ...${NC}"
	$(BUILD_DIR)/$(PROGRAM)

clean:
	rm -rf $(BUILD_DIR)


deps:
	go mod download