const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3003;

// 创建报告目录
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

// 解析 CSP 报告 JSON
app.use(bodyParser.json({
  type: ['application/json', 'application/csp-report', 'application/reports+json']
}));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 设置 CSP 头部，包含 report-to 和 report-uri 指令
app.use((req, res, next) => {
  // 为每个请求生成唯一的 nonce
  const nonce = Buffer.from(Date.now().toString()).toString('base64');
  
  // 设置 Report-To 头
  res.setHeader('Report-To', JSON.stringify({
    'group': 'csp-endpoint',
    'max_age': 10886400,
    'endpoints': [
      { 'url': '/report' }
    ]
  }));
  
  // 设置 CSP 头部
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; 
     script-src 'self' 'nonce-${nonce}'; 
     style-src 'self' 'nonce-${nonce}'; 
     report-uri /report;
     report-to csp-endpoint`
  );
  
  // 将 nonce 值传递给模板
  req.nonce = nonce;
  next();
});

// 处理 CSP 报告的端点
app.post('/report', (req, res) => {
  console.log('收到 CSP 违规报告:');
  console.log(JSON.stringify(req.body, null, 2));
  
  // 保存报告到文件
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportFile = path.join(reportsDir, `report-${timestamp}.json`);
  
  fs.writeFile(reportFile, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error('保存报告失败:', err);
    } else {
      console.log(`报告已保存到 ${reportFile}`);
    }
  });
  
  res.status(204).end(); // 返回空响应
});

// 主页路由
app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('读取文件错误');
    }
    
    // 替换模板中的 nonce 值
    const content = data.replace(/\{\{nonce\}\}/g, req.nonce);
    res.send(content);
  });
});

// 查看报告列表的路由
app.get('/view-reports', (req, res) => {
  fs.readdir(reportsDir, (err, files) => {
    if (err) {
      return res.status(500).send('读取报告目录失败');
    }
    
    const reportsList = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(reportsDir, file);
        try {
          const data = fs.readFileSync(filePath, 'utf8');
          const report = JSON.parse(data);
          return {
            filename: file,
            timestamp: file.replace('report-', '').replace('.json', ''),
            report: report
          };
        } catch (e) {
          return {
            filename: file,
            error: '解析报告失败'
          };
        }
      });
    
    res.json(reportsList);
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`CSP 报告将被发送到 http://localhost:${PORT}/report`);
  console.log(`报告列表可在 http://localhost:${PORT}/view-reports 查看`);
}); 