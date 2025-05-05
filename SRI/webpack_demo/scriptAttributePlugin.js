// 自定义插件，为包含SRI属性的脚本添加错误处理
class ScriptAttributesPlugin {
  constructor (options = {}) {
    this.options = options
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('ScriptAttributesPlugin', compilation => {
      // 首先添加错误处理脚本到HTML head中
      compilation.hooks.processAssets.tap(
        {
          name: 'ScriptAttributesPlugin',
          stage: compilation.constructor.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE
        },
        assets => {
          // 找到HTML文件
          const htmlAssets = Object.keys(assets).filter(key =>
            key.endsWith('.html')
          )

          htmlAssets.forEach(htmlFilename => {
            let content = assets[htmlFilename].source().toString()

            // 添加CSP友好的处理脚本
            const errorHandlingScript = `
                <script id="sri-fallback-handler">
                  // 注册一个全局的SRI错误处理函数
                  window.SRI_HANDLERS = {
                    handleError: function(errorEvent) {
                      var script = errorEvent.target || errorEvent.srcElement;
                      console.error('SRI验证失败:', script.src);
                      
                      // 创建一个没有integrity属性的新脚本
                      var newScript = document.createElement('script');
                      newScript.src = script.src;
                      newScript.crossOrigin = "anonymous";
                      
                      // 复制其他属性
                      for (var i = 0; i < script.attributes.length; i++) {
                        var attr = script.attributes[i];
                        if (attr.name !== 'integrity' && attr.name !== 'onerror') {
                          newScript.setAttribute(attr.name, attr.value);
                        }
                      }
                      
                      console.log('正在从源站加载:', newScript.src);
                      
                      // 替换当前脚本
                      if (script.parentNode) {
                        script.parentNode.replaceChild(newScript, script);
                      }
                      
                      return true; // 阻止默认错误处理
                    },
                    
                    handleSuccess: function(event) {
                      var script = event.target || event.srcElement;
                      console.log('SRI验证成功:', script.src);
                    }
                  };
                  
                  // 注册脚本加载事件监听器
                  document.addEventListener('error', function(event) {
                    if (event.target.tagName === 'SCRIPT' && event.target.hasAttribute('integrity')) {
                      window.SRI_HANDLERS.handleError(event);
                    }
                  }, true);
                  
                  document.addEventListener('load', function(event) {
                    if (event.target.tagName === 'SCRIPT' && event.target.hasAttribute('integrity')) {
                      window.SRI_HANDLERS.handleSuccess(event);
                    }
                  }, true);
                </script>
              `

            // 添加到头部
            content = content.replace(
              '</head>',
              errorHandlingScript + '</head>'
            )

            // 更新资源内容
            compilation.updateAsset(
              htmlFilename,
              new compilation.compiler.webpack.sources.RawSource(content)
            )
          })
        }
      )
    })
  }
}

module.exports = ScriptAttributesPlugin
