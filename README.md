# Wines

An api to manage wines in stock. Add, delete, view and change details of wines.

```
// output of fastify.printRoutes();
└── / (GET)
    ├── docs (GET)
    │   └── / (GET)
    │       ├── json (GET)
    │       ├── yaml (GET)
    │       ├── static/
    │       │   └── * (GET)
    │       └── * (GET)
    └── api/wine (GET|POST)
        └── / (GET|POST)
            └── :wineId (DELETE)
                :wineId (GET)
                :wineId (PATCH)
```



# Development

> docker-compose overwritings here in docker-compose.dev.yml (base: docker-compose.yml)

See available options by runnig `make` and receive help output
```
$ make
-------------------------
Wine-Api project commands

target                         help
------                         ----
help                           This help dialog.
build                          Builds a production image
start                          Run the application
stop                           Stop the application
test                           Run functional tests with db connections
tdd                            Development task to develop in test-drive-development manner
dev                            Development mode
logs                           Show development logs
lint                           Run linters
```

## Development server
Run `make dev`. Visit the api under [http://localhost:3000/](http://localhost:3000/).

## Testdriven development
Run `make tdd` and watch mocha doing the work.

## Running tests
Run `make test`.

## Watching the logs
Logs can be found by running `make logs`

> **Changes in package*.json** files are not recognized by nodemon/mocha. To make these changes active run `make dev` again.

## Docs

Documentation can be found under [http://localhost:8080/docs](http://localhost:8080/docs)



# Production

> settings can be found in docker-compose.yml

Build production image `make build`.
Run production image `make start`
Visit the api under [http://localhost:8080/](http://localhost:8080/).



# Implementation notes

## Tech-Stack

1. [**Fastify**](https://github.com/fastify/fastify): is known to be one of the fastests server-frameworks for node.js with very low overhead. Due to the simplicity (no authentication, only two endpoints etc.) of this api, fastify might be a good choice. According to [fastify-benchmarks](https://github.com/fastify/benchmarks) this framework allows dobble requests/second (58389.6) than for example express.js (27057.6) or hapi (22678.4). It also has a good community behind it and notable 15K Stars on Github. For me personally fastify was a new experience here. I enjoyed it much and found the concepts around it comprehensive. The swagger integration works well. There is also a helmet-module which one might know from express etc.

2. [**mongoose**](https://mongoosejs.com/docs/guide.html): is a very comfortable way to communicate with mongodb in node.js. It also comes with schema validation. Unfortunately it does still not support json-schema which leads to multiple definitions here -> [See Optimization potential](#optimization). Nevertheless mongoose provides a reliable way to get and store data in mongodb.

3. [**mocha/chai**](https://mochajs.org/): Almost 10 years mocha is a good choice when it comes to testing. For now there is now reason for me to choose another one. Mocha is well implemented and does what i want it to do. Chai is also very handy when it comes to assertions.

4. [**eslint-config-airbnb**](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb): Surely the choice of a linting config is a very individual matter. I like the airbnb-style and do have only little changes for this config stored in .eslintrc .

## challenging parts

### Secure production images by using makefiles

-> @todo
- makefile no rebuild necessary - commands in package.json trigger whole docker-build process because of layers.
- docker-compose build stages
- audit
- make dependencies

## <a name="optimization">Optimization potential</a>

### Schema definition

One has to define two separate schemes, due to the fact that mongoose has its own type of schema definition and doesn't allow to use json-schema definitions. The usage of json-schema definitions allthoug should be prefered because it provides much more possibilities in terms of validation. There are some [outdated plugins](https://www.npmjs.com/package/mongoose-ajv-plugin) out there that compile json-schemes into mongoose-schemes but they come with security vulnerabilities. So we use two separate schemes for now...
