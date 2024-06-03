# Define variables
DOCKER_COMPOSE = docker-compose
FRONTEND_SERVICE = frontend
BACKEND_SERVICE = backend

# Build and run containers
run:
	$(DOCKER_COMPOSE) up --build

# Stop and remove containers
down:
	$(DOCKER_COMPOSE) down

# Rebuild containers
rebuild:
	$(DOCKER_COMPOSE) up --build --force-recreate

# View logs
logs:
	$(DOCKER_COMPOSE) logs -f

# Run frontend container
frontend:
	$(DOCKER_COMPOSE) up --build $(FRONTEND_SERVICE)

# Run backend container
backend:
	$(DOCKER_COMPOSE) up --build $(BACKEND_SERVICE)

# Remove dangling images
clean:
	docker image prune -f

# Stop all containers and remove them with their volumes
reset:
	$(DOCKER_COMPOSE) down -v

# Display help
help:
	@echo "Usage:"
	@echo "  make up        - Build and run containers"
	@echo "  make down      - Stop and remove containers"
	@echo "  make rebuild   - Rebuild containers"
	@echo "  make logs      - View logs"
	@echo "  make frontend  - Run frontend container"
	@echo "  make backend   - Run backend container"
	@echo "  make clean     - Remove dangling images"
	@echo "  make reset     - Stop all containers and remove them with their volumes"
	@echo "  make help      - Display this help message"
