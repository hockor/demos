# CSP font-src 指令演示

这个演示展示了 `font-src` 内容安全策略指令的用法，它控制网页可以从哪些源加载字体。

## 说明

- 服务器配置了 CSP 头: `font-src 'self' https://fonts.gstatic.com`
- 这意味着页面只能从两个地方加载字体:
  - 从自己的域名 (`'self'`)
  - 从 Google Fonts 的 CDN (https://fonts.gstatic.com)
- 该演示展示了允许的字体加载与被阻止的字体加载的对比

## 运行方法

1. 确保安装了依赖:
```
npm install
```

2. 启动服务器:
```
node server.js
```

3. 打开浏览器访问 http://localhost:3001

## 测试点

1. 页面已经加载了 Google Fonts 的 Roboto 字体，这是被允许的，因为我们的 CSP 策略允许 fonts.gstatic.com
2. 点击"加载允许的字体"按钮，会尝试加载 Google Fonts 的 Open Sans 字体，它也是被允许的
3. 点击"加载被阻止的字体"按钮，会尝试从 example.com 加载字体，这将被 CSP 策略阻止，你可以在浏览器控制台中看到 CSP 违规报告

## 实际应用

- 限制字体加载来源可以防止不受信任的站点注入恶意字体文件
- 对于企业应用，可以限制只使用公司批准的字体服务器，确保品牌一致性
- 可以通过 CSP 策略防止第三方脚本注入未经授权的字体 