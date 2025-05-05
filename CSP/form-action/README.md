# CSP form-action 指令演示

这个演示展示了 `form-action` 内容安全策略指令的用法，它限制 `<form>` 标签提交的目标 URL。

## 说明

`form-action` 指令是 CSP 的一个重要安全特性，用于防止表单数据被发送到未授权的服务器，从而保护用户数据免受各种攻击，包括:

- 跨站请求伪造 (CSRF)
- XSS 攻击导致的表单重定向
- 数据泄露
- 钓鱼攻击

这个演示提供了三个不同配置的页面:

1. **受限版** (`form-action 'self' https://trusted-form-processor.example`):
   - 只允许表单提交到同源和一个特定的信任域名
   - 尝试提交到其他域名会被阻止

2. **无限制版** (没有 form-action 限制):
   - 没有对表单提交目标的限制
   - 表单可以提交到任何 URL
   - 展示了缺少此限制的安全风险

3. **完全禁止版** (`form-action 'none'`):
   - 禁止所有表单提交，无论目标是什么
   - 提供最高级别的安全保护
   - 适用于不需要表单功能的页面

## 运行方法

1. 确保安装了依赖:
```
npm install
```

2. 启动服务器:
```
node server.js
```

3. 打开浏览器访问:
   - 受限版: http://localhost:3007
   - 无限制版: http://localhost:3007/unrestricted
   - 完全禁止版: http://localhost:3007/blocked

## 测试点

每个页面都提供了多种测试情景:

1. **基础表单提交测试**:
   - 提交到同源表单 (`/form-handler`)
   - 提交到外部域名表单 (如 `https://untrusted-site.example`)

2. **动态表单测试**:
   - 使用 JavaScript 动态创建表单并尝试提交
   - 测试 CSP 对动态生成内容的保护能力

3. **JavaScript API 提交测试**:
   - 使用 JavaScript 创建表单并调用 form.submit()
   - 测试通过编程方式提交的表单同样受 CSP 保护

## form-action 的最佳实践

- **同源限制**: 设置 `form-action 'self'` 仅允许提交到同一域名
- **白名单域名**: 如需使用第三方处理表单，添加 `form-action 'self' https://trusted-domain.com`
- **完全禁止**: 对于不需要表单提交的页面，设置 `form-action 'none'`
- **不要省略**: 即使有 default-src，也应显式设置 form-action，因为默认不受 default-src 控制

## 安全提示

- `form-action` 指令不会受到 `default-src` 的影响，必须单独设置
- 即使使用 JavaScript 动态创建的表单也会受到 form-action 的限制
- 此指令可以有效防止 CSRF 攻击，是跨站点安全的重要组成部分 