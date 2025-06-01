# InventSphere - Inventory Management System

InventSphere is a comprehensive inventory management system designed for businesses of all sizes. Track products, manage sales, and gain valuable insights with our intelligent platform.

## Features

- Smart Inventory Tracking
- Real-time Analytics
- Multi-Location Support
- Sales Management
- Role-Based Access Control
- Supplier Management
- Smart Alerts

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful SVG icons
- [Docker](https://www.docker.com/) - Containerization platform

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Docker (for containerized deployment)

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Docker Deployment

### Quick Start

The project is fully dockerized and can be deployed easily using Docker or Docker Compose.

#### Using Helper Scripts

We provide several helper scripts in the `scripts` directory:

1. Build the Docker image:
   ```bash
   ./scripts/docker-build.sh
   ```

2. Run in development mode:
   ```bash
   ./scripts/docker-run-dev.sh
   ```

3. Run in production mode (with Nginx):
   ```bash
   ./scripts/docker-run-prod.sh
   ```

#### Manual Docker Commands

1. Build the Docker image:
   ```bash
   docker build -t inventsphere:latest .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 inventsphere:latest
   ```

#### Using Docker Compose

For development:
```bash
docker-compose up
```

For production with Nginx as reverse proxy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions and production considerations.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── page.tsx          # Home page
├── components/           # React components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── scripts/              # Helper scripts
├── .dockerignore         # Docker ignore file
├── .env.example          # Example environment variables
├── docker-compose.yml    # Docker Compose for development
├── docker-compose.prod.yml # Docker Compose for production
├── Dockerfile            # Docker configuration
└── next.config.js        # Next.js configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
