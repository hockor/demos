const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用 body-parser 中间件来解析请求体，用于处理 CSP 报告
// 针对 JSON 类型和 application/csp-report 类型的请求体进行解析
app.use(bodyParser.json({
    type: ['json', 'application/csp-report'] // 特别用于处理 CSP 的违规报告
}));


// 自定义中间件：设置 Content-Security-Policy（内容安全策略）响应头
app.use((req, res, next) => {
    // 定义你的 CSP 策略
    // 当前策略规定：
    // - 默认资源加载来源为 'self'（即同源）
    // - 脚本允许从 'self' 和 cdnjs.cloudflare.com 加载
    // - 样式表允许从 'self' 加载，并允许内联样式（'unsafe-inline'），仅用于演示，生产环境应避免使用
    // - 图片资源允许从 'self' 和 https://via.placeholder.com 加载
    // - 所有违反策略的行为将报告到 /report 接口
    const cspPolicy = `
        default-src 'self';
        script-src 'self' https://cdnjs.cloudflare.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' https://via.placeholder.com;
        report-uri /report;
    `.replace(/\s+/g, ' ').trim(); // 清理多余的空白字符

    // 使用 Content-Security-Policy 响应头来 **强制执行** 策略
    res.setHeader('Content-Security-Policy', cspPolicy);

    // 或者使用下面这一行来 **仅报告** 违规行为而不阻止资源加载
    // res.setHeader('Content-Security-Policy-Report-Only', cspPolicy);

    next();
});


// 从 'public' 目录提供静态文件（HTML、CSS、JS 等）
app.use(express.static(path.join(__dirname, 'public')));
// 接收 CSP 违规报告的接口
app.post('/report', (req, res) => {
    console.log('收到 CSP 违规报告:');
    console.log(JSON.stringify(req.body, null, 2)); // 将报告内容格式化后打印到控制台
    res.sendStatus(204); // 返回 204 No Content 表示成功接收但无内容返回
});

// 启动服务器
app.listen(port, () => {
    console.log(`CSP 示例应用正在运行在 http://localhost:${port}`);
    console.log('请在浏览器中打开 http://localhost:3000 并查看控制台输出。');
});