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

## Development server
Run `npm run dc_dev`. Visit the api under [http://localhost:3000/](http://localhost:3000/).

## Testdriven development
Run `npm run dc_tdd` and watch mocha doing the work.

## Running tests
Run `npm run dc_test`.

## Watching the logs
Logs can be found by running `npm run dc_logs`

> **Changes in package*.json** files are not recognized by nodemon/mocha. To make these changes active run `npm run dc_dev` again.

## Docs

Documentation can be found under [http://localhost:8080/docs](http://localhost:8080/docs)



# Production

> settings can be found in docker-compose.yml

Build production image `npm run dc_build`.
Run production image `npm run dc_run_prod`
Visit the api under [http://localhost:8080/](http://localhost:8080/).



# Implementation notes

## Tech-Stack

1. [**Fastify**](https://github.com/fastify/fastify): is known to be one of the fastests server-frameworks for node.js with very low overhead. Due to the simplicity (no authentication, only two endpoints etc.) of this api, fastify might be a good choice. According to [fastify-benchmarks](https://github.com/fastify/benchmarks) this framework allows dobble requests/second (58389.6) than for example express.js (27057.6) or hapi (22678.4). It also has a good community behind it and notable 15K Stars on Github. For me personally fastify was a new experience here. I enjoyed it much and found the concepts around it comprehensive. The swagger integration works well. There is also a helmet-module which one might know from express etc.
2. mongoose
3. mocha/chai
4. eslint-config-airbnb


## Optimization potential

## challenging parts



### Schema definition

One has to define two separate schemes, due to the fact that mongoose has its own type of schema definition and doesn't allow to use json-schema definitions. The usage of json-schema definitions allthoug should be prefered because it provides much more possibilities in terms of validation. There are some [outdated plugins](https://www.npmjs.com/package/mongoose-ajv-plugin) out there that compile json-schemes into mongoose-schemes but they come with security vulnerabilities. So we use two separate schemes for now...
