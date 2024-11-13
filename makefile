test:
	docker compose -f docker-compose.test.yml up --build

clean:
	docker system prune -af

dev:
	docker compose -f docker-compose.dev.yml up --build -d