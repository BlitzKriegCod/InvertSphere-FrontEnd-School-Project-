# InventSphere Deployment Guide

This document outlines the steps to deploy the InventSphere application using Docker or Vercel.

## Prerequisites

- Docker installed on your deployment server
- Docker Compose installed (optional, but recommended)
- Basic knowledge of Docker and containerization

## Deployment Options

### Option 1: Using Docker Compose (Recommended)

1. Navigate to the project root directory:
   ```bash
   cd /path/to/project
   ```

2. Build and start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

   This will build the Docker image and start the container in detached mode.

3. The application will be available at `http://localhost:3000`

4. To stop the application:
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker Directly

1. Navigate to the project root directory:
   ```bash
   cd /path/to/project
   ```

2. Build the Docker image:
   ```bash
   docker build -t inventsphere-app .
   ```

3. Run the container:
   ```bash
   docker run -d -p 3000:3000 --name inventsphere inventsphere-app
   ```

4. The application will be available at `http://localhost:3000`

5. To stop the container:
   ```bash
   docker stop inventsphere
   docker rm inventsphere
   ```

## Environment Variables

You can customize the application behavior using environment variables. Add them to the docker-compose.yml file or pass them using the `-e` flag with `docker run`.

Example environment variables:
- `NODE_ENV`: Set to `production` for production deployment
- `NEXT_PUBLIC_API_URL`: Backend API URL (if applicable)

## Production Deployment Considerations

### 1. SSL/TLS Configuration

For production, you should set up SSL/TLS using a reverse proxy like Nginx or Traefik.

Example Nginx configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. Container Orchestration

For more complex deployments, consider using:
- Kubernetes
- Docker Swarm
- AWS ECS/EKS

### 3. CI/CD Integration

Set up a CI/CD pipeline using:
- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI

Example GitHub Actions workflow:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and push Docker image
        uses: docker/build-push-action@v2
        with:
          push: true
          tags: your-registry/inventsphere:latest
      - name: Deploy to server
        # Add deployment steps here
```

## Vercel Deployment

Vercel is optimized for Next.js applications and provides an easy way to deploy your application without Docker.

## Prerequisites for Vercel Deployment

- A [Vercel account](https://vercel.com/signup)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps for Vercel

### Option 1: Using the Vercel Dashboard (Recommended)

1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)

2. Click on the "Import Project" button

3. Choose "Import Git Repository" and select your repository

4. Configure your project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: If your Next.js project is not in the root, specify the directory
   - **Build Command**: `npm run build` (this should be detected automatically)
   - **Output Directory**: `.next` (this should be detected automatically)

5. Configure environment variables if needed

6. Click "Deploy"

7. Once deployment is complete, Vercel will provide you with a URL to access your application

### Option 2: Using Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to your project directory:
   ```bash
   cd /path/to/project
   ```

3. Log in to Vercel:
   ```bash
   vercel login
   ```

4. Deploy your project:
   ```bash
   vercel
   ```

5. Follow the interactive prompts to configure your deployment

## Environment Variables in Vercel

You can set up environment variables in Vercel through:

1. The Vercel dashboard under your project settings
2. Using the `.env.production` file (not recommended for secrets)
3. Using the Vercel CLI:
   ```bash
   vercel env add MY_ENV_VARIABLE
   ```

## Custom Domains

To use a custom domain with your Vercel deployment:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Domains"
3. Add your domain and follow the verification steps

## Continuous Deployment

Vercel automatically sets up continuous deployment from your Git repository:

1. Every push to your main branch triggers a production deployment
2. Every pull request creates a preview deployment

## Vercel vs. Docker Deployment

| Feature | Vercel | Docker |
|---------|--------|--------|
| Ease of setup | Very simple | More complex |
| Configuration | Minimal | Highly customizable |
| Scaling | Automatic | Manual or via orchestration |
| Cost | Free tier available | Depends on hosting provider |
| Custom server config | Limited | Full control |
| Built-in CDN | Yes | No (requires separate setup) |
| Analytics | Built-in | Requires additional tools |

# Troubleshooting

### Common Issues

1. **Container exits immediately**:
   - Check the container logs: `docker logs inventsphere`
   - Ensure the Next.js build completed successfully

2. **Application is not accessible**:
   - Verify the container is running: `docker ps`
   - Check if the port mapping is correct: `docker port inventsphere`
   - Make sure no firewall is blocking the port

3. **Build fails**:
   - Ensure all dependencies are properly listed in package.json
   - Check for syntax errors in the code
   - Verify that Node.js version in Dockerfile matches your development environment

### Vercel-specific Issues

1. **Build fails on Vercel**:
   - Check the build logs in the Vercel dashboard
   - Ensure your Next.js version is compatible with Vercel
   - Verify that all dependencies are correctly listed in package.json

2. **Environment variables not working**:
   - Check that you've configured them correctly in the Vercel dashboard
   - Make sure you're using the correct prefix (`NEXT_PUBLIC_` for client-side variables)

## Monitoring and Logging

For production deployments, consider setting up:
- Prometheus for metrics
- Grafana for visualization
- ELK stack for logging
- Sentry for error tracking

## Backup Strategy

Implement a backup strategy for any persistent data:
- Database backups
- Volume backups
- Configuration backups

## Security Considerations

1. Never store sensitive information in the Docker image or Git repository
2. Use environment variables for configuration
3. Regularly update dependencies for security patches
4. Scan your code and dependencies for vulnerabilities
5. Implement proper access controls for your repositories and deployments
