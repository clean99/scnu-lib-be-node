# dockerfile

# 基于 node lts-alpine 版本镜像，并通过构建阶段命名，将有 node 环境的阶段命名为 build-stage
#（包含 alpine 的镜像版本相比于 latest 版本更加小巧，更适合作为 docker 镜像使用）
FROM node:latest

# 自定义镜像的默认工作目录
WORKDIR /nestwebstack

# 复制当前目录所有文件到 镜像中 workdir 中
COPY . .

# 国内服务器 设置淘宝源
RUN npm config set registry https://registry.npm.taobao.org

# 运行 npm install 安装依赖
RUN npm install

# 运行 nest build 编译 admin、server 服务
RUN npm run format
RUN npm run lint
RUN npm run test
RUN npm run prebuild
RUN npm run build

# 暴露的端口 3008：客户端 api； 3009：管理端 api
EXPOSE 3000

# 定参
ENTRYPOINT [ "npm" ,"run"]
# 变参 默认启动 客户端 api
# 如要运行管理端 api 在 docker run image 后加 start:prod_admin 参数，参考下面部署说明
CMD ["start:prod"]