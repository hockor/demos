const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3001;

// 解析 JSON 和 CSP 报告
app.use(bodyParser.json({
  type: ['application/json', 'application/reports+json', 'application/csp-report']
}));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 设置 Reporting-Endpoints 和 Report-To 头部，配置报告组
app.use((req, res, next) => {
  // 设置 Reporting-Endpoints 头部
  res.setHeader(
    'Reporting-Endpoints',
    'csp-endpoint="/report", main-endpoint="/report"'
  );
  
  // 设置 Report-To 头部
  res.setHeader(
    'Report-To',
    JSON.stringify({
      group: 'csp-endpoint',
      max_age: 10886400,
      endpoints: [
        { url: '/report' }
      ]
    })
  );
  
  // 设置 CSP 头部，包含 report-to 指令
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; report-to csp-endpoint"
  );
  
  next();
});

// 处理 CSP 报告的端点
app.post('/report', (req, res) => {
  console.log('收到 CSP 报告:');
  console.log(JSON.stringify(req.body, null, 2));
  res.status(204).end();
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`CSP 报告将被发送到分组 'csp-endpoint'`);
}); 