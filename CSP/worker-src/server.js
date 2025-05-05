const express = require('express');
const path = require('path');
const app = express();
const port = 3005;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 设置worker-src限制，仅允许同源worker
app.get('/', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "worker-src 'self'; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 无worker-src限制的页面
app.get('/no-worker-src', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'no-worker-src.html'));
});

// 完全禁止worker的页面
app.get('/blocked', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "worker-src 'none'; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'blocked.html'));
});

// 提供worker.js脚本
app.get('/worker.js', (req, res) => {
  res.type('application/javascript');
  res.send(`
    // 同源 Web Worker 代码
    self.onmessage = function(e) {
      self.postMessage('同源 Worker 收到消息: ' + e.data);
    };
  `);
});

app.listen(port, () => {
  console.log(`worker-src 示例运行在 http://localhost:${port}`);
}); 