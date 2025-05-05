document.addEventListener('DOMContentLoaded', function() {
  // jQuery测试
  const jqueryTestBtn = document.getElementById('jquery-test-btn');
  const jqueryResult = document.getElementById('jquery-result');
  
  if (jqueryTestBtn && jqueryResult) {
    jqueryTestBtn.addEventListener('click', function() {
      try {
        if (typeof $ === 'function') {
          // 使用jQuery动画确认它正常工作
          $(jqueryResult).fadeOut(300).fadeIn(300);
          jqueryResult.textContent = '成功！jQuery可以正常工作，因为它来自允许的来源 (code.jquery.com)';
          jqueryResult.style.borderColor = '#4CAF50';
        } else {
          throw new Error('jQuery未定义');
        }
      } catch (error) {
        jqueryResult.textContent = '失败：jQuery不可用，这不符合预期';
        jqueryResult.style.borderColor = 'red';
      }
    });
  }
  
  // 加载外部不允许的脚本
  const loadExternalScriptBtn = document.getElementById('load-external-script');
  const externalScriptResult = document.getElementById('external-script-result');
  
  if (loadExternalScriptBtn && externalScriptResult) {
    loadExternalScriptBtn.addEventListener('click', function() {
      try {
        // 尝试加载来自不允许的域的脚本
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
        script.onload = function() {
          externalScriptResult.textContent = '外部脚本加载成功！这不符合预期，因为该域不在允许列表中';
          externalScriptResult.style.borderColor = 'red';
        };
        script.onerror = function() {
          externalScriptResult.textContent = '符合预期：外部脚本被CSP阻止';
          externalScriptResult.style.borderColor = '#4CAF50';
        };
        document.head.appendChild(script);
        
        // 预期结果：脚本将被阻止加载，onerror将被触发
      } catch (error) {
        externalScriptResult.textContent = '发生错误：' + error.message;
        externalScriptResult.style.borderColor = 'orange';
      }
    });
  }
  
  // 动态创建脚本测试
  const createScriptBtn = document.getElementById('create-script-btn');
  const dynamicScriptResult = document.getElementById('dynamic-script-result');
  
  if (createScriptBtn && dynamicScriptResult) {
    createScriptBtn.addEventListener('click', function() {
      try {
        // 尝试动态插入内联脚本
        const script = document.createElement('script');
        script.textContent = 'document.getElementById("dynamic-script-result").textContent = "动态脚本执行成功！这不符合预期";';
        document.head.appendChild(script);
        
        // 由于CSP限制，动态创建的内联脚本不应该执行
        // 我们设置一个定时器来检查结果
        setTimeout(function() {
          if (dynamicScriptResult.textContent.includes('等待执行')) {
            dynamicScriptResult.textContent = '符合预期：动态创建的内联脚本被CSP阻止';
            dynamicScriptResult.style.borderColor = '#4CAF50';
          }
        }, 500);
      } catch (error) {
        dynamicScriptResult.textContent = '发生错误：' + error.message;
        dynamicScriptResult.style.borderColor = 'orange';
      }
    });
  }
}); 