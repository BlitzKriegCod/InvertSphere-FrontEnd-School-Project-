#!/bin/bash
# Script to run the Docker container in production mode with Nginx

echo "Starting InventSphere in production mode with Nginx..."
docker-compose -f docker-compose.prod.yml up -d

echo "Containers started in detached mode."
echo "Your application should be available at http://localhost"
echo "To check container status, run: docker-compose -f docker-compose.prod.yml ps"
echo "To view logs, run: docker-compose -f docker-compose.prod.yml logs -f"
echo "To stop the containers, run: docker-compose -f docker-compose.prod.yml down"
