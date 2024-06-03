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

# View logs
logs:
	$(DOCKER_COMPOSE) logs -f

# Remove dangling images
clean:
	docker image prune -f

# Stop all containers and remove them with their volumes
reset:
	$(DOCKER_COMPOSE) down -v

# Display help
help:
	@echo "Usage:"
	@echo "  make run        - Build and run containers"
	@echo "  make down      - Stop and remove containers"
	@echo "  make clean     - Remove dangling images"
	@echo "  make reset     - Stop all containers and remove them with their volumes"
	@echo "  make help      - Display this help message"
