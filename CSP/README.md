# CSP 指令演示项目

这个项目包含了N个独立的演示，展示了不同 Content Security Policy (CSP) 指令的使用方法和效果。每个演示都有其独立的文件夹，包含前端和后端代码。

## 运行方法

每个演示都有自己的 README 文件，详细介绍了功能和运行方法。一般来说，运行步骤如下：

```bash
# 进入演示目录
cd [demo-directory]

# 安装依赖
npm install

# 启动服务器
npm start
```
## 技术栈

- 前端：HTML、JavaScript、jQuery
- 后端：Node.js、Express

## 注意事项

- `block-all-mixed-content` 演示需要 HTTPS，使用了自签名证书，浏览器可能会显示安全警告。
- `report-to` 指令的功能依赖于浏览器对 Reporting API 的支持，可能需要较新版本的浏览器。
- 请使用浏览器开发者工具的控制台和网络面板查看详细结果。 