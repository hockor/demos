# CSP 报告收集演示

这个演示项目展示了如何使用内容安全策略(CSP)的报告机制来收集和查看安全违规报告。

## 功能特点

- 使用 `report-uri` 和 `report-to` 指令收集 CSP 违规报告
- 为每个请求生成唯一的 nonce 值，用于内联脚本和样式
- 将收集到的报告保存到文件系统
- 提供 API 端点查看所有收集到的报告
- 包含多种 CSP 违规示例：
  - 内联脚本执行
  - 内联样式应用
  - 加载未授权的外部资源

## 安装和运行

1. 安装依赖：

```bash
cd CSP/sample-report
npm install
```

2. 启动服务器：

```bash
npm start
```

或者使用开发模式（自动重启）：

```bash
npm run dev
```

3. 访问演示页面：

在浏览器中打开 [http://localhost:3003](http://localhost:3003)

## 如何使用

1. 打开演示页面后，你可以看到三个部分：
   - 安全内容（符合 CSP）
   - 不安全内容（违反 CSP）
   - 查看收集到的报告

2. 点击"不安全内容"部分的按钮来触发 CSP 违规，这些操作会被 CSP 策略阻止，并生成报告。

3. 点击"查看收集到的报告"部分的"加载报告列表"按钮，可以查看所有已收集的 CSP 违规报告。

4. 所有报告也会保存在项目的 `reports` 目录中，格式为 JSON 文件。

## CSP 策略说明

当前实现的 CSP 策略包括：

```
default-src 'self'; 
script-src 'self' 'nonce-{动态生成}'; 
style-src 'self' 'nonce-{动态生成}'; 
report-uri /report;
report-to csp-endpoint
```

这意味着：
- 默认只允许同源资源
- 脚本只允许同源或带有正确 nonce 值的内联脚本
- 样式只允许同源或带有正确 nonce 值的内联样式
- 所有违规将报告到 `/report` 端点

## 报告格式

CSP 违规报告通常包含以下信息：

- `document-uri`: 发生违规的页面 URL
- `referrer`: 引用页面
- `blocked-uri`: 被阻止的资源 URI
- `violated-directive`: 被违反的指令
- `original-policy`: 原始的 CSP 策略

## 注意事项

- 在真实环境中，应该将报告端点设置在单独的域上，以避免潜在的 DOS 攻击
- 报告数据应该被适当处理和存储，以便进行安全分析
- 定期审查报告可以帮助识别和修复潜在的安全问题 