## Description
This is scnu-lib-be node implement.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## CI/CD
### deploy on docker
```bash
$ docker build -t scnu-lib-be:1.0.1 .
$ docker run -d -p 3000:3000 -v scnu-lib-be:/ --name scnu-lib-be

service run on 3000
```