<br />
<p align="center">
  <h3 align="center">Lib Quality API</h3>

  <p align="center">
    LibQuality is a project to collect metrics from GitHub repositories and make them available in a consolidated dashboard.
  </p>
</p>

## Table of Contents

* [Architecture](#architecture)
  * [Node.js](#nodejs)
  * [PostgreSQL](#postgresql)
  * [Docker](#docker)
  * [Github API](#github-api)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)

## Architecture

![Architecture](/images/archicture.png)

### Node.js

Structure:
* Routes: Express routes that define API structure
* Controllers: Express controllers for routes, respond to client requests, call services
* Services: Encapsulates all business logic, queries and requests to APIs
* Models: Database models
* Tests: Code tests

Libraries:
* axios: Promise based HTTP client for the browser and node.js
* bunyan: Bunyan is a simple and fast JSON logging library for node.js services
* dotenv: Loads environment variables from .env file
* express: Fast, unopinionated, minimalist web framework
* lodash: Lodash modular utilities
* mathjs: Math.js is an extensive math library for JavaScript and Node.js
* node-cron: A simple cron-like task scheduler for Node.js
* pg: PostgreSQL client - pure javascript & libpq with the same API
* sequelize: Multi dialect ORM for Node.JS
* sequelize-cli: The Sequelize Command Line Interface (CLI)
* chai: BDD/TDD assertion library for node.js and the browser.
* eslint: An AST-based pattern checker for JavaScript.
* mocha: Simple, flexible, fun test framework
* moxios: Mock axios requests for testing
* sinon: JavaScript test spies, stubs and mocks.

### PostgreSQL

This project uses sequelize for data manipulation. Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It features reliable transaction support, relations, eager and lazy loading, read replication and abstracts away the nuanced differences between various SQL implementations.

The database chosen was postgreSQL. Overall, PostgreSQL is widely used in large systems where to read and write speeds are crucial.

![MER](/images/mer.png)

### Docker

Docker is used to deploy PostgreSQL DB and Node.js application. The advantages of using docker are high availability and load balancing being possible to scale easily

### Github API

This project use an external api to collect github data. For more details, please access [Documentation](https://docs.github.com/pt/free-pro-team@latest/rest)

## Getting Started

### Prerequisites

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running is necessary to have the following items:

* Node.js
* Docker
* .env file. Example:

![Env file](/images/env_file.png)

### Installation

1. Build image
```sh
docker build -t lib-quality .
```
2. Deploy
```sh
docker-compose up -d
```
3. Migrate - (Optional) The application was developed to create tables after deploy. In case of failure, please run the next line
```sh
npx sequelize-cli db:migrate --env localhost
```
4. Seed - (Optional) Only if want a initial data in database
```sh
npx sequelize-cli db:seed:all
```

## Usage

Get open issues, average and standard deviation
```
[GET] http://localhost/api/{owner}/{repository}/issues?user=hyagohirai
```
Get statistics
```
[GET] http://localhost/api/{owner}/{repository}/statistics?user=hyagohirai
```
Save repository chosen by user
```
[POST] http://localhost/api/{owner}/{repository}/user
```
Delete repository chosen by user
```
[DELETE] http://localhost/api/{owner}/{repository}/user?user=hyagohirai
```

For more examples, please access swagger page http://localhost/api-docs/ or [Postman Collection](LibQualiy API.postman_collection.json)

## Test

1. Migrate test tables
```sh
npx sequelize-cli db:migrate --env test
```
2. Run
```sh
npm test
```

<!-- CONTACT -->
## Contact

Hyago Hirai - hyahirai@gmail.com
