# CSP child-src 指令演示

这个演示展示了 `child-src` 内容安全策略指令的用法，它控制 Web Workers 和其他嵌套浏览上下文（如 frames 和 iframes）的来源。

## 说明

`child-src` 指令是一个较新的指令，它同时兼顾了两个功能：
1. 控制 iframe 和 frame 标签加载内容的来源（与 frame-src 功能重叠）
2. 控制 Web Worker, Shared Worker 或 Service Worker 的来源

在本演示中，我们应用了以下CSP策略：
```
child-src 'self' https://www.youtube.com https://youtube.com
```

这意味着：
- 页面只允许加载来自同源和YouTube的iframe
- 页面只允许加载来自同源的Web Workers（因为YouTube不提供Worker）

## 运行方法

1. 确保安装了依赖:
```
npm install
```

2. 启动服务器:
```
node server.js
```

3. 打开浏览器访问: http://localhost:3004

## 测试点

1. **iframe 功能测试**:
   - YouTube iframe 能正常加载，因为它在允许列表中
   - 来自 example.com 的 iframe 会被阻止，因为它不在允许列表中

2. **Web Worker 功能测试**:
   - 同源 Worker（/worker.js）能正常加载和运行
   - 外部域名的 Worker（https://example.com/worker.js）会被阻止

## 与其他CSP指令的关系

1. **child-src vs frame-src**
   - 如果同时设置了这两个指令，对于 frames 和 iframes，`frame-src` 会覆盖 `child-src`
   - 如果只设置了 `child-src`，它会控制 frames、iframes 和 workers

2. **child-src vs worker-src**
   - 在较新的CSP规范中，对于Web Workers的控制推荐使用 `worker-src` 指令
   - 如果同时设置了这两个指令，对于Workers，`worker-src` 会覆盖 `child-src`
   - 如果没有设置 `worker-src`，浏览器会回退到 `child-src`

## 注意事项

- `child-src` 在某些环境下已经被 `frame-src` 和 `worker-src` 这两个更具体的指令所取代
- 但为了向后兼容，`child-src` 仍然被广泛支持
- 在现代Web应用中，推荐同时使用 `frame-src` 和 `worker-src` 来代替 `child-src`，以获得更精确的控制 