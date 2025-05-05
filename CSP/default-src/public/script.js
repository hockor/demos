document.addEventListener('DOMContentLoaded', function() {
  // 内部JS测试
  const internalJsBtn = document.getElementById('internal-js-btn');
  const internalJsResult = document.getElementById('internal-js-result');
  
  if (internalJsBtn) {
    internalJsBtn.addEventListener('click', function() {
      internalJsResult.textContent = '成功执行! 内部JS可以正常运行，因为符合default-src \'self\'策略';
      internalJsResult.style.borderColor = '#4CAF50';
    });
  }
  
  // jQuery测试
  const jqueryTestBtn = document.getElementById('jquery-test-btn');
  const jqueryResult = document.getElementById('jquery-result');
  
  if (jqueryTestBtn) {
    jqueryTestBtn.addEventListener('click', function() {
      try {
        if (typeof $ === 'function') {
          jqueryResult.textContent = 'jQuery可用！这不符合预期，因为外部脚本应该被CSP阻止';
          jqueryResult.style.borderColor = 'red';
        } else {
          throw new Error('jQuery未定义');
        }
      } catch (error) {
        jqueryResult.textContent = '符合预期：jQuery被CSP阻止加载';
        jqueryResult.style.borderColor = '#4CAF50';
      }
    });
  }
  
  // 检查外部图片加载状态
  const externalImg = document.getElementById('external-img');
  if (externalImg) {
    externalImg.addEventListener('error', function() {
      const imgParent = externalImg.parentElement;
      const resultDiv = imgParent.querySelector('.result');
      if (resultDiv) {
        resultDiv.textContent = '符合预期：外部图片被CSP阻止加载';
        resultDiv.style.borderColor = '#4CAF50';
      }
    });
    
    externalImg.addEventListener('load', function() {
      const imgParent = externalImg.parentElement;
      const resultDiv = imgParent.querySelector('.result');
      if (resultDiv) {
        resultDiv.textContent = '图片加载成功！这不符合预期，因为外部图片应该被CSP阻止';
        resultDiv.style.borderColor = 'red';
      }
    });
  }
}); 