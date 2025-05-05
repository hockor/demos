document.addEventListener('DOMContentLoaded', function() {
  // 测试允许的CDN样式动画
  const testAnimationBtn = document.getElementById('test-animation');
  const allowedCdnElement = document.getElementById('allowed-cdn');
  
  if (testAnimationBtn && allowedCdnElement) {
    testAnimationBtn.addEventListener('click', function() {
      // 移除旧的类
      allowedCdnElement.classList.remove('animate__fadeIn');
      // 强制重绘
      void allowedCdnElement.offsetWidth;
      // 添加动画类
      allowedCdnElement.classList.add('animate__fadeIn');
      
      // 检查是否有动画效果
      setTimeout(function() {
        const computedStyle = window.getComputedStyle(allowedCdnElement);
        const opacity = computedStyle.getPropertyValue('opacity');
        
        // 添加结果
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        
        if (opacity !== '1' || computedStyle.getPropertyValue('animation-name') !== 'none') {
          resultDiv.textContent = '成功！动画效果可见，CDN样式已正确加载';
          resultDiv.style.borderLeftColor = '#4CAF50';
        } else {
          resultDiv.textContent = '失败：动画效果不可见，CDN样式可能未加载';
          resultDiv.style.borderLeftColor = 'red';
        }
        
        // 检查是否已存在结果
        const existingResult = allowedCdnElement.parentNode.querySelector('.result');
        if (existingResult) {
          existingResult.parentNode.removeChild(existingResult);
        }
        
        allowedCdnElement.parentNode.appendChild(resultDiv);
      }, 100);
    });
  }
  
  // 检查Bootstrap样式是否被阻止
  const blockedCdnElement = document.getElementById('blocked-cdn');
  if (blockedCdnElement) {
    setTimeout(function() {
      const computedStyle = window.getComputedStyle(blockedCdnElement);
      const backgroundColor = computedStyle.getPropertyValue('background-color');
      
      // 添加结果
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result';
      
      // 如果背景颜色不是Bootstrap的蓝色，那么样式被成功阻止
      if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        resultDiv.textContent = '符合预期：Bootstrap样式被CSP阻止';
        resultDiv.style.borderLeftColor = '#4CAF50';
      } else {
        resultDiv.textContent = '不符合预期：Bootstrap样式加载成功，CSP未阻止';
        resultDiv.style.borderLeftColor = 'red';
      }
      
      blockedCdnElement.parentNode.appendChild(resultDiv);
    }, 100);
  }
  
  // 检查内联样式是否被阻止
  const inlineStyleElement = document.getElementById('inline-style');
  if (inlineStyleElement) {
    setTimeout(function() {
      const computedStyle = window.getComputedStyle(inlineStyleElement);
      const backgroundColor = computedStyle.getPropertyValue('background-color');
      
      // 添加结果
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result';
      
      // 如果背景颜色不是紫色，那么内联样式被成功阻止
      if (backgroundColor !== 'rgb(128, 0, 128)' && backgroundColor !== 'purple') {
        resultDiv.textContent = '符合预期：内联<style>标签被CSP阻止';
        resultDiv.style.borderLeftColor = '#4CAF50';
      } else {
        resultDiv.textContent = '不符合预期：内联<style>标签样式加载成功，CSP未阻止';
        resultDiv.style.borderLeftColor = 'red';
      }
      
      inlineStyleElement.parentNode.appendChild(resultDiv);
    }, 100);
  }
  
  // 检查行内style属性是否被阻止
  const inlineAttrElement = document.getElementById('inline-attr');
  if (inlineAttrElement) {
    setTimeout(function() {
      const computedStyle = window.getComputedStyle(inlineAttrElement);
      const backgroundColor = computedStyle.getPropertyValue('background-color');
      
      // 添加结果
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result';
      
      // 如果背景颜色不是橙色，那么行内style属性被成功阻止
      if (backgroundColor !== 'rgb(255, 165, 0)' && backgroundColor !== 'orange') {
        resultDiv.textContent = '符合预期：行内style属性被CSP阻止';
        resultDiv.style.borderLeftColor = '#4CAF50';
      } else {
        resultDiv.textContent = '不符合预期：行内style属性样式加载成功，CSP未阻止';
        resultDiv.style.borderLeftColor = 'red';
      }
      
      inlineAttrElement.parentNode.appendChild(resultDiv);
    }, 100);
  }
  
  // 测试通过JavaScript添加的样式
  const addStyleBtn = document.getElementById('add-style-btn');
  const jsStyleElement = document.getElementById('js-style');
  
  if (addStyleBtn && jsStyleElement) {
    addStyleBtn.addEventListener('click', function() {
      // 通过JS添加样式
      jsStyleElement.style.backgroundColor = '#2196F3';
      jsStyleElement.style.color = 'white';
      
      setTimeout(function() {
        const computedStyle = window.getComputedStyle(jsStyleElement);
        const backgroundColor = computedStyle.getPropertyValue('background-color');
        
        // 添加结果
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        
        if (backgroundColor === 'rgb(33, 150, 243)' || backgroundColor === '#2196F3') {
          resultDiv.textContent = '成功！通过JavaScript添加的样式可见，这不被style-src阻止';
          resultDiv.style.borderLeftColor = '#4CAF50';
        } else {
          resultDiv.textContent = '失败：通过JavaScript添加的样式不可见';
          resultDiv.style.borderLeftColor = 'red';
        }
        
        // 检查是否已存在结果
        const existingResult = jsStyleElement.parentNode.querySelector('.result');
        if (existingResult) {
          existingResult.parentNode.removeChild(existingResult);
        }
        
        jsStyleElement.parentNode.appendChild(resultDiv);
      }, 100);
    });
  }
}); 