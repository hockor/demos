const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// 解析 CSP 报告 JSON
app.use(bodyParser.json({
  type: ['application/json', 'application/csp-report']
}));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 设置 CSP 头部，包含 report-uri 指令
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; report-uri /report"
  );
  next();
});

// 处理 CSP 报告的端点
app.post('/report', (req, res) => {
  console.log('CSP 违规报告:');
  console.log(JSON.stringify(req.body, null, 2));
  res.status(204).end(); // 返回空响应
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`CSP 报告将被发送到 http://localhost:${PORT}/report`);
}); 