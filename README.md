# Ti-Thrift
- 基于thrift实现前端htmlJs与后端nodeJs之间的兼容本地域解决方案
- Example of a compatible local domain solution between frontend htmlJs and backend nodeJs based on Thrift

# Thrift
你可以使用thrift库来实现在前端使用Thrift协议与后端的Node.js进行通信的解决方案。

Thrift是一种跨语言的服务定义和通信协议，它允许你定义数据类型和服务接口，并生成相应语言的代码。在你的情况下，你可以使用Thrift来定义前后端之间的数据类型和接口，并生成对应的JavaScript代码。

在前端，你可以使用ti-thrift库来处理Thrift协议的通信。它提供了一些工具和函数，可以帮助你在前端使用Thrift协议与后端进行通信。

在后端，你可以使用Node.js的thrift库来处理Thrift协议的通信。它提供了一些函数和类，可以帮助你在Node.js中实现Thrift服务端。

通过使用ti-thrift和Node.js的thrift库，你可以实现前后端之间基于Thrift协议的通信，并在本地域中进行数据交互。

# 环境
- install node 16.0.0
- npm install thrift

# 协议文件编译
## 执行包
- download thrift http://www.apache.org/dyn/closer.cgi?path=/thrift/0.20.0/thrift-0.20.0.exe
- thrift-0.20.0.exe -> thrift.exe
## 协议文件
- https://github.com/apache/thrift/blob/master/tutorial/tutorial.thrift
- https://github.com/apache/thrift/blob/master/tutorial/shared.thrift
## Node端 编译命令
- npm run nodeClientThrift
## JS端 编译命令
- nodeHtmlThrift

# NODE-NODE
## 启动 后端服务
- node nodeClientServer.js
## 启动 前端服务
- node nodeClient.js

# HTML-NODE
## 启动 后端服务
- node nodeHtmlServer.js
## 启动 前端服务
- node nodeHtml.js
## 涉及的文件
- json_protocol.js
- framed_transport.js
- thrift.js

# Thrift JS
## Version: '0.21.0'
https://github.com/apache/thrift/blob/master/lib/js/src/thrift.js

# 指令
- thrift -r --gen js:node -protocol json -transport xhr tutorial.thrift
## 这些参数的含义如下：
- -r: 表示递归处理，可以生成依赖的所有文件。
- --gen js:node: 指定生成的语言为 JavaScript，使用 Node.js 环境。
- -protocol json: 指定使用 JSON 协议进行数据传输。
- -transport xhr: 指定使用 XMLHttpRequest (XHR) 进行数据传输，适用于浏览器环境。
- 因此，运行此命令将根据提供的 tutorial.thrift 文件生成适用于 Node.js 环境的 JavaScript 文件，其中包含使用 JSON 协议和 XMLHttpRequest 进行数据传输的客户端和服务器端代码。
## 注意
-protocol json -transport xhr 不能作为参数， 但可以在thrift主文件 文件头加上
```
/*
* protocol: json
* transport: xhr
*/
```