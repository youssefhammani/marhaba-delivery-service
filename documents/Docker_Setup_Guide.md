# Docker Setup Guide

## Introduction

This guide provides comprehensive instructions on setting up and using Docker for running and managing the project within containers.

## Prerequisites

Ensure that Docker is installed on your system. If not, download and install it from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Docker Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/youssefhammani/marhaba-delivery-service.git
```

### 2. Create a Dockerfile

```bash
cd your-repo-name
```

### 3. Install the necessary dependencies by running

```bash
npm install
```

### 4. Create a Dockerfile

- In the root directory of your project, create a Dockerfile.

**Example Dockerfile content :**

```dockerfile
# Use an official Node.js runtime as the base image
FROM node:20.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the application development server
CMD ["npm", "start"] 
```

### 5. Build the Docker Image

```bash
docker build -t your-image-name .
```

### 6. Run the Docker Container

```bash
docker run -p 4000:80 -d your-image-name
```

## Docker Usage and Management

Learn to manage Docker and your project efficiently:

### Container Management :

- Use docker ps to view running containers and docker stop `<container-id>` to stop a container.

### Image Management :

- Explore images with docker images and remove unnecessary images with docker rmi `<image-id>`.

### Docker Compose (Optional) :

- For multiple containers, consider using docker-compose for orchestration.

### Customization :

- Modify the Dockerfile to match your project's requirements.

### Troubleshooting :

- Check logs using docker logs `<container-id>` for debugging and issue resolution.

## Docker Compose Configuration

### 1. Create a docker-compose.ymal file

* **Orchestrating Services :** Use a docker-compose.yml file to manage the interaction between frontend and backend services. Define service configurations for both components.

```Dockerfile
version: '3.7'  # Docker Compose version used

services:
  server:
    build:
      context: ./marhaba-delivery-service  # The context for building the server container
      dockerfile: Dockerfile  # The Dockerfile for the server container
    container_name: your-container-name  # Name for the server container
    command: npm start  # Command to start the server
    volumes:
      - ./your-folder-name/:/src/server  # Volume mapping for the server application
    ports:
      - "3000:3000"  # Port mapping for the server application
    env_file: ./your-folder-name/.env  # .env file for environment variables
    environment:
      - NODE_ENV=development  # Set the NODE_ENV environment variable
    healthcheck:
      test: [ "CMD", "curl", "-f", "http://localhost:3000" ]  # Health check command for the server
      interval: 1m30s  # Interval for health checks
      timeout: 10s  # Timeout for health checks
      retries: 3  # Number of retries for health checks
    networks:
      - app-network  # Connect the container to the app-network

  client:
    build:
      context: ./your-folder-name  # The context for building the client container
      dockerfile: Dockerfile  # The Dockerfile for the client container
    container_name: your-container-name  # Name for the client container
    command: npm run dev  # Command to start the client
    volumes:
      - ./your-folder-name/:/src/App  # Volume mapping for the client application
    depends_on:
      - server  # Ensure the server container is running before starting the client
    ports:
      - "4000:4000"  # Port mapping for the client application
    networks:
      - app-network  # Connect the container to the app-network

volumes:
  data-volume:  # Define a named volume for data storage (not currently used)

networks:
  app-network:  # Define a custom network for the containers to communicate
```

## Docker CLI Commands

### Build an image from a Dockerfile

- To build an image from a Dockerfile, use the following command:

```bash
docker build -t image-name path/to/Dockerfile
```

### Run a container from an image

- To run a container from an image, use the following command:

```bash
docker run -d image-name

# Or

docker run -p 4000:80 your-image-name
```

### List all running containers

- To list all running containers, use:

```bash
docker ps
```

### List all containers, including stopped ones

- To list all containers (including stopped ones), use:

```bash
docker ps -a
```

### Stop a running container

- To stop a running container, use:

```bash
docker stop container-id
```

### Remove a container

- To remove a container, use:

```bash
docker rm container-id
```

### List all Docker images

- To list all Docker images, use:

```bash
docker images
```

### Remove a Docker image

- To remove a Docker image, use:

```bash
docker rmi image-id
```

### Pull an image from a Docker registry

- To pull an image from a Docker registry, use:

```bash
docker pull image-name
```

### Push an image to a Docker registry

- To push an image to a Docker registry, use:

```bash
docker push image-name
```

## Docker Compose Commands

### Start services

- To start services defined in the docker-compose.yml file, use:

```bash
docker-compose up -d
```

### Stop services

- To stop services defined in the docker-compose.yml file, use:

```bash
docker-compose down
```

### Build services

- To build or rebuild services defined in the docker-compose.yml file, use:

```bash
docker-compose build
```

## Resources and Further Information

- Refer to Docker's official documentation for detailed information on Docker commands, Dockerfile configurations, and Docker-compose usage.

## Contact

* For queries or assistance, reach out to the project maintainers:

  - GitHub: [github.com/youssefhammani](https://github.com/youssefhammani)
  - Email: yhammani.student@gmail.com
