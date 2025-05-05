# CSP worker-src 指令演示

这个演示展示了 `worker-src` 内容安全策略指令的用法，它控制 Worker、SharedWorker 或 ServiceWorker 脚本的来源。

## 说明

在本演示中，我们提供了三种不同的CSP配置页面:

1. **受限制版** (`worker-src 'self'`):
   - 只允许来自同源的Worker脚本
   - 外部域名的Worker将被阻止

2. **无worker-src限制版**:
   - 没有明确设置worker-src指令
   - 根据CSP规范，将回退到其他指令: child-src → script-src → default-src
   - 在本例中会回退到script-src ('self')，表现与明确设置worker-src 'self'类似

3. **完全禁止版** (`worker-src 'none'`):
   - 禁止所有Worker，无论来源如何
   - 这提供了最高级别的安全保护，但会禁用所有依赖Worker的功能

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
   - 受限版: http://localhost:3005
   - 无worker-src限制版: http://localhost:3005/no-worker-src
   - 完全禁止版: http://localhost:3005/blocked

## 测试点

每个页面都演示了三种类型的Worker:

1. **同源Worker**:
   - 来自当前域名的Worker (/worker.js)
   - 在受限版和无限制版上允许加载
   - 在完全禁止版上被阻止

2. **外部域名Worker**:
   - 来自外部域名的Worker (https://example.com/worker.js)
   - 在所有三个版本上都会被阻止

3. **Blob URL Worker**:
   - 动态创建的包含Worker代码的Blob URL
   - 在受限版和无限制版上允许加载(通常被视为同源)
   - 在完全禁止版上被阻止

## worker-src 与其他CSP指令的关系

- **回退机制**: 如果未设置worker-src，浏览器会按照以下顺序回退:
  1. child-src (控制iframe和worker)
  2. script-src (控制脚本来源)
  3. default-src (默认策略)

- **与child-src的关系**:
  - worker-src是child-src的更精确版本
  - 如果同时设置了两者，对于Workers，worker-src会覆盖child-src

## 安全最佳实践

- 如果不需要使用Worker，应设置 `worker-src 'none'`
- 如果只需要同源Worker，设置 `worker-src 'self'`
- 如果需要从特定外部源加载Worker，明确列出允许的域名
- 在现代Web应用中，推荐显式设置worker-src而不是依赖回退机制 