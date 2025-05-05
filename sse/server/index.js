const express = require('express');
const app = express();

// 添加body-parser中间件，解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 添加 CORS 中间件
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名访问，或指定域名如 'http://example.com'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-custom-header');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// 设置 SSE 路由
app.post('/events', (req, res) => {
  // SSE 协议的核心头信息，指示服务器将发送 事件流 数据到客户端。
  // 这个值告诉客户端，服务器返回的内容是一个基于事件的流（Event Stream），而不是普通的 HTML 或 JSON 数据。
  res.setHeader('Content-Type', 'text/event-stream');
  // 防止客户端缓存 SSE 流的响应，确保数据实时更新
  res.setHeader('Cache-Control', 'no-cache');
  // 保持 HTTP 连接持续活跃，允许服务器和客户端进行长时间的通信
  res.setHeader('Connection', 'keep-alive');
  
  const { message } = req.body;
  // 模拟服务器推送数据
  let count = 0;
  
  const interval = setInterval(() => {
    console.log({count});
    
    if (count > 10) {
      // 发送结束事件
      res.write('event: end\ndata: 结束\n\n');
      clearInterval(interval);
      
    } else if (count === 0) {
      res.write(`event: newChat\ndata: message: ${message}\n\n`);
      count++;
    } else {  
      res.write(`data: 当前时间：${new Date().toISOString()} 计数：${count}\n\n`);
      count++;
    }
  }, Math.random() * 1000); // 每秒发送一次数据

  // 当客户端关闭连接时，清除定时器
  // req.on('close', () => {
  //   clearInterval(interval);
  // });
});

app.listen(4000, () => {
  console.log('服务器正在监听 4000 端口...');
});