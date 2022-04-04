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

$ docker-compose -f docker-compose.yml up -d
记得改密码和image版本号
service run on 3000
```