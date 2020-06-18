# Wines

## Development

### DevServer

Run `npm run dc_dev`. Visit the api under [http://localhost:3000/](http://localhost:3000/).

### Testdriven development
Run `npm run dc_tdd`. Visit logs by running `npm run dc_logs`

### Logs

Logs can be found by running `npm run dc_logs`

### Changes in package*.json

File changes are recognized by nodemon/mocha. Filechanges in package*.json excluded. To make changes in package*.json file active run `npm run dc_dev` again.


### Docs

Documentation can be found under [http://localhost:8080/docs](http://localhost:8080/docs)



## Build for production

Build `npm run dc_build`.



## Running the production image

Run `docker run --name wines-service -d wines-service:production`.
Visit the api under [http://localhost:8080/](http://localhost:8080/).


## Problems

One has to define two separate schemes, due to the fact that mongoose has its own type of schema definition and doesn't allow to use json-schema definitions. The usage of json-schema definitions allthoug should be prefered because it provides much more possibilities in terms of validation. There are some [outdated plugins](https://www.npmjs.com/package/mongoose-ajv-plugin) out there that compile json-schemes into mongoose-schemes but they come with security vulnerabilities. So we use two separate schemes for now...
