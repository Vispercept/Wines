.DEFAULT_GOAL := help

.PHONY: help build test tdd logs dev lint start stop

help: ## This help dialog.
	@echo "Wine-Api project commands\n"
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	printf "%-30s %s\n" "target" "help" ; \
	printf "%-30s %s\n" "------" "----" ; \
	for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-30s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
	done

.PHONY: help build start stop test tdd dev logs lint

build: stop lint test ## Builds a production image
	docker-compose build wines-service

start: ## Run the application
	docker-compose up -d wines-service

stop: ## Stop the application
	docker-compose down

test: ## Run functional tests with db connections
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run wines-service npm run test

tdd: ## Development task to develop in test-drive-development manner
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run wines-service npm run tdd

dev: ## Development mode
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

logs: ## Show development logs
	docker logs wines-service-dev -f",

lint: ## Run linters
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run wines-service npm run lint

