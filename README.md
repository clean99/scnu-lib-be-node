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
配置了git actions，push到main分支会触发部署，上传到阿里云镜像。再在服务器端拉去镜像后运行即可。
### deploy on docker
```bash
development
$ docker-compose -f docker-compose.yml up -d
记得改密码和image版本号
mongodb需要设置access control，参见
https://www.mongodb.com/docs/manual/reference/connection-string/
https://stackoverflow.com/questions/34239251/mongodb-docker-container-with-client-access-control
service run on 3000
production
进入服务器，拉取docker镜像
$ docker pull registry.cn-hangzhou.aliyuncs.com/scnu-lib/scnu-lib-be:0.1.0
在scnu-lib-network下运行镜像，映射到公网3000端口，记得换mongodb url环境变量和jwt变量
docker run --name scnu-lib-be --net scnu-lib-network -d --env SECRET=jwtsecret MONGODB_URL=url -p 3000:3000 registry.cn-hangzhou.aliyuncs.com/scnu-lib/scnu-lib-be:0.1.0
```