# CSP frame-src 指令演示

这个演示展示了 `frame-src` 内容安全策略指令的用法，它控制网页中 `<frame>`, `<iframe>`, `<frameset>` 等标签加载内容的来源。

## 说明

该演示提供了三个不同配置的页面:

1. **受限版页面**: 
   - 应用了 `frame-src 'self' https://www.youtube.com https://youtube.com` 规则
   - 只允许来自同源和YouTube的iframe内容

2. **无限制版页面**: 
   - 没有明确指定frame-src策略
   - 根据CSP的规则，将回退到default-src策略('self')，只允许同源iframe

3. **完全禁止版页面**:
   - 应用了 `frame-src 'none'` 规则
   - 阻止所有iframe内容，无论来源如何

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
   - 受限版: http://localhost:3003
   - 无限制版: http://localhost:3003/unrestricted
   - 完全禁止版: http://localhost:3003/blocked

## 测试点

1. 在受限版页面:
   - YouTube iframe应该能正常加载
   - 来自其他域名(如example.com)的iframe将被阻止
   - 动态添加的iframe同样遵循这些规则

2. 在无限制版页面:
   - 由于没有明确的frame-src指令，大多数浏览器将回退到default-src值('self')
   - 这意味着只有同源的iframe才能加载，外部iframe会被阻止

3. 在完全禁止版页面:
   - 所有iframe都将被阻止，包括来自同源和YouTube的
   - 浏览器控制台会显示CSP违规警告

## 安全意义

- `frame-src` 指令可以防止网站在iframe中加载不受信任的内容
- 这对防范点击劫持(clickjacking)和UI重叠攻击特别重要
- 在需要嵌入第三方内容的网站上，可以精确控制允许的内容来源
- 如果不需要任何iframe，设置为'none'可以提供最高级别的保护 