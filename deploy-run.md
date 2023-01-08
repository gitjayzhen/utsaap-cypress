# 使用docker来执行cypress测试任务

>linux执行依赖工具  
1.docker环境  
2.docker-compose

## 一、docker方式

[内容](https://github.com/bahmutov/demo-docker-cypress-included)

```text
docker run -it -v $PWD:/e2e -w /e2e --entrypoint=cypress cypress/included:5.2.0
```

## 二、docker-compose方式

### 基础cypress-example-docker-compose-included 

[github](https://circleci.com/gh/cypress-io/cypress-example-docker-compose-included/tree/master)


> 显示`docker-compose`”`在容器内运行本地cypress测试的示例，使用 [cypress/included][included] 镜像

See [docker-compose.yml](docker-compose.yml) file

### 操作

1. 将工程代码拉取到服务器目录下，执行下面命令即可

```shell
# 使用内置Electron浏览器运行测试
docker-compose run e2e-electron

# 使用预装在cypress/included中的Chrome浏览器运行测试
docker-compose run e2e-chrome

# 使用Firefox浏览器运行测试(也是预装的)
docker-compose run e2e-firefox
```

这些测试不利于 [https://example.cypress.io/](https://example.cypress.io/) 使用来自的规格 [cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink)

[included]: https://github.com/cypress-io/cypress-docker-images/tree/master/included#cypressincluded

### 官网其他示例

Find more Docker + Cypress examples in [Cypress Docker docs](https://on.cypress.io/docker)
