#!/bin/bash
# Script to build the Docker image

echo "Building InventSphere Docker image..."
docker build -t inventsphere:latest .

echo "Image built successfully. You can run it with:"
echo "docker run -p 3000:3000 inventsphere:latest"
