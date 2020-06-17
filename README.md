# Wines

## Development

Run `docker-compose up --build -d` respectively `docker-compose down`.
Visit the api under [http://localhost:3000/](http://localhost:3000/).

File changes are recognized by nodemon. Filechanges in package*.json excluded. To make changes in package*.json file active run `docker-compose down && docker-compose up --build -d`



## Build for production

Build `docker build -t wines-service:production .`.



## Running the production image

Run `docker run --name wines-service -d wines-service:production`.
Visit the api under [http://localhost:8080/](http://localhost:8080/).
