# Thrift
RPC架构， 通过协议文件编译出指定的端处理文件

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
- thrift -r --gen js:node tutorial.thrift
## JS端 编译命令
- thrift -r --gen js:jquery tutorial.thrift

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