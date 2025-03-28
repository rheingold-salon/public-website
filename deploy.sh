#!/bin/bash
set -e # Exit on any error

echo "Pulling latest changes..."
git pull

# Check if containers are already running
if sudo docker-compose ps | grep "Up"; then
    echo "Existing containers are running. Shutting down old container..."

    # Pull new images without affecting the running containers
    sudo docker-compose down
fi

echo "Starting new container"
sudo docker-compose up -d --build

# Verify deployment
if ! sudo docker-compose ps | grep "Up"; then
    echo "Docker containers failed to start. Check logs with 'docker-compose logs'."
    exit 1
fi

# Clean up any unused images and volumes to save space
echo "Cleaning up unused Docker resources..."
sudo docker system prune -f

echo "Deployment complete. Your Next.js app is now running. Next.js is available at https://www.rheingold-salon.de."
