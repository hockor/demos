const express = require('express');
const path = require('path');
const app = express();
const port = 3004;

// 设置CSP头，connect-src演示
app.use((req, res, next) => {
  // 允许连接到当前域和jsonplaceholder.typicode.com
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' https://jsonplaceholder.typicode.com; script-src 'self' 'unsafe-inline'"
  );
  next();
});

// 服务静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 添加API端点用于测试同域请求
app.get('/api/test', (req, res) => {
  res.json({ message: '这是来自同域服务器的响应', success: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 