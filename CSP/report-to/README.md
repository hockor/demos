# CSP report-to Demo

这个 demo 展示了 Content Security Policy (CSP) 中 `report-to` 指令的使用方法。`report-to` 是 `report-uri` 的替代品，支持报告分组和更详细的报告信息。

## 功能

- 设置一个带有 CSP 限制的网页
- 配置 Reporting API 用于报告分组
- 故意违反 CSP 策略
- 通过 `/report` 端点接收和查看分组的 CSP 违规报告

## 使用方法

1. 安装依赖：`npm install`
2. 启动服务器：`node server.js`
3. 访问 http://localhost:3001
4. 查看控制台，会发现 CSP 违规警告
5. 在服务器控制台中，可以看到接收到的分组 CSP 违规报告

## 文件结构

- `server.js`: Express 服务器，设置 CSP 头部、Reporting API 配置并处理报告
- `public/index.html`: 包含故意违反 CSP 的 HTML 页面
- `package.json`: 项目依赖

## 注意

报告组功能依赖于浏览器对 Reporting API 的支持，可能需要在较新版本的浏览器中测试。 