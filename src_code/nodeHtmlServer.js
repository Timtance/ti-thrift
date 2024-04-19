const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const thrift = require("thrift");
const Calculator = require("../gen-nodejs/Calculator.js");
const ttypes = require("../gen-nodejs/tutorial_types.js");
const SharedStruct = require("../gen-nodejs/shared_types.js").SharedStruct;

// 创建 Thrift 处理器对象
var calculatorHandler = {
  ping: function(result) {
    console.log("ping()", new Date().toString());
    result(null);
  },

  add: function(n1, n2, result) {
    console.log("add(", n1, ",", n2, ")");
    result(null, n1 + n2);
  },

  calculate: function(logid, work, result) {
    console.log("calculate(", logid, ",", work, ")");

    var val = 0;
    if (work.op == ttypes.Operation.ADD) {
      val = work.num1 + work.num2;
    } else if (work.op === ttypes.Operation.SUBTRACT) {
      val = work.num1 - work.num2;
    } else if (work.op === ttypes.Operation.MULTIPLY) {
      val = work.num1 * work.num2;
    } else if (work.op === ttypes.Operation.DIVIDE) {
      if (work.num2 === 0) {
        var x = new ttypes.InvalidOperation();
        x.whatOp = work.op;
        x.why = 'Cannot divide by 0';
        result(x);
        return;
      }
      val = work.num1 / work.num2;
    } else {
      var x = new ttypes.InvalidOperation();
      x.whatOp = work.op;
      x.why = 'Invalid operation';
      result(x);
      return;
    }

    var entry = new SharedStruct();
    entry.key = logid;
    entry.value = ""+val;
    data[logid] = entry;

    result(null, val);
  },

  getStruct: function(key, result) {
    console.log("getStruct(", key, ")");
    result(null, data[key]);
  },

  zip: function() {
    console.log("zip()");
  }

};

// 创建 Calculator 服务处理器
const calculatorProcessor = new Calculator.Processor(calculatorHandler);

const app = express();

// 使用 bodyParser 中间件解析请求体
app.use(bodyParser.raw({ type: 'application/vnd.apache.thrift.json; charset=utf-8' }));

// 自定义中间件来解析Thrift格式的JSON数据
function parseThriftJson(req, res, next) {
  if (req.is('application/vnd.apache.thrift.json')) {
      let body = '';
      req.on('data', (chunk) => {
          body += chunk.toString();
      });
      req.on('end', () => {
          try {
              req.body = body;
              next();
          } catch (error) {
              console.error('Error parsing Thrift JSON:', error);
              res.status(400).send('Bad Request');
          }
      });
  } else {
      next();
  }
}
app.use(express.json());
app.use(parseThriftJson);

// 使用 cors 中间件
app.use(cors());

// 处理 '/' 路径的请求
app.post('/', (req, res) => {
  try{
    const requestData = req.body;
    const requestDataBuffer = Buffer.from(requestData);
    const transport = new thrift.TFramedTransport(requestDataBuffer, (msg, seqid) => {
      try {
        res.setHeader('Content-Type', 'application/vnd.apache.thrift.json; charset=utf-8');
        res.send(protocol.wbuf);
      } catch (err) {
        res.end();
      }
    });
    const protocol = new thrift.TJSONProtocol(transport);
    calculatorProcessor.process(protocol, protocol);
    // res.end(transport.flush());
  }catch(e){
    console.error('Error:', e);
    res.status(500).send('Internal Server Error Tui');
  }
});
app.get('/', (req, res) => {
  console.log('get/');
});

// 监听端口
const port = 9090;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("服务端: connection localhost 9091" + new Date().toString());
});
