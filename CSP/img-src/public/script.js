document.addEventListener('DOMContentLoaded', function() {
  // 检测图片加载状态的函数
  function checkImageLoading(imgElement, resultElement) {
    if (!imgElement || !resultElement) return;
    
    imgElement.addEventListener('load', function() {
      resultElement.textContent = '图片加载成功！';
      resultElement.classList.add('success');
      resultElement.classList.remove('failure');
    });
    
    imgElement.addEventListener('error', function() {
      resultElement.textContent = '图片加载失败（被CSP阻止）';
      resultElement.classList.add('failure');
      resultElement.classList.remove('success');
    });
  }
  
  // 本地图片测试
  const localImg = document.getElementById('local-img');
  const localImgResult = document.getElementById('local-img-result');
  checkImageLoading(localImg, localImgResult);
  
  // 允许的外部图片测试
  const allowedExternalImg = document.getElementById('allowed-external-img');
  const allowedExternalImgResult = document.getElementById('allowed-external-img-result');
  checkImageLoading(allowedExternalImg, allowedExternalImgResult);
  
  // 不允许的外部图片测试
  const blockedExternalImg = document.getElementById('blocked-external-img');
  const blockedExternalImgResult = document.getElementById('blocked-external-img-result');
  checkImageLoading(blockedExternalImg, blockedExternalImgResult);
  
  // 动态检查CSS背景图片是否加载（这比较复杂，因为没有直接的事件）
  function checkBackgroundImage(element, resultElement, expectedSuccess) {
    if (!element || !resultElement) return;
    
    // 我们尝试通过检查computed style来确定背景图片是否加载
    setTimeout(function() {
      const style = window.getComputedStyle(element);
      const bgImage = style.backgroundImage;
      
      if (bgImage && bgImage !== 'none' && !bgImage.includes('invalid')) {
        if (expectedSuccess) {
          resultElement.textContent = '背景图片加载成功！';
          resultElement.classList.add('success');
          resultElement.classList.remove('failure');
        } else {
          resultElement.textContent = '背景图片加载成功，但不符合预期（应被CSP阻止）';
          resultElement.classList.add('failure');
          resultElement.classList.remove('success');
        }
      } else {
        if (expectedSuccess) {
          resultElement.textContent = '背景图片加载失败，不符合预期';
          resultElement.classList.add('failure');
          resultElement.classList.remove('success');
        } else {
          resultElement.textContent = '背景图片被CSP阻止，符合预期';
          resultElement.classList.add('success');
          resultElement.classList.remove('failure');
        }
      }
    }, 500);
  }
  
  // 本地背景图片测试
  const localBgImg = document.getElementById('local-bg-img');
  const localBgImgResult = document.getElementById('local-bg-img-result');
  checkBackgroundImage(localBgImg, localBgImgResult, true);
  
  // 外部背景图片测试
  const externalBgImg = document.getElementById('external-bg-img');
  const externalBgImgResult = document.getElementById('external-bg-img-result');
  checkBackgroundImage(externalBgImg, externalBgImgResult, false);
  
  // 动态添加图片
  const addAllowedImgBtn = document.getElementById('add-allowed-img-btn');
  const addBlockedImgBtn = document.getElementById('add-blocked-img-btn');
  const dynamicImgContainer = document.getElementById('dynamic-img-container');
  const dynamicImgResult = document.getElementById('dynamic-img-result');
  
  if (addAllowedImgBtn && dynamicImgContainer && dynamicImgResult) {
    addAllowedImgBtn.addEventListener('click', function() {
      // 移除之前可能存在的动态图片
      const existingDynamicImgs = dynamicImgContainer.querySelectorAll('.dynamically-added-img');
      existingDynamicImgs.forEach(img => img.parentNode.removeChild(img));
      
      // 创建新图片
      const newImg = document.createElement('img');
      newImg.src = 'https://via.placeholder.com/300x150?text=动态添加的允许图片';
      newImg.className = 'dynamically-added-img';
      
      newImg.addEventListener('load', function() {
        dynamicImgResult.textContent = '允许的动态添加图片加载成功！';
        dynamicImgResult.classList.add('success');
        dynamicImgResult.classList.remove('failure');
      });
      
      newImg.addEventListener('error', function() {
        dynamicImgResult.textContent = '允许的动态添加图片加载失败，不符合预期';
        dynamicImgResult.classList.add('failure');
        dynamicImgResult.classList.remove('success');
      });
      
      dynamicImgContainer.appendChild(newImg);
    });
  }
  
  if (addBlockedImgBtn && dynamicImgContainer && dynamicImgResult) {
    addBlockedImgBtn.addEventListener('click', function() {
      // 移除之前可能存在的动态图片
      const existingDynamicImgs = dynamicImgContainer.querySelectorAll('.dynamically-added-img');
      existingDynamicImgs.forEach(img => img.parentNode.removeChild(img));
      
      // 创建新图片
      const newImg = document.createElement('img');
      newImg.src = 'https://picsum.photos/300/150';
      newImg.className = 'dynamically-added-img';
      
      newImg.addEventListener('load', function() {
        dynamicImgResult.textContent = '不允许的动态添加图片加载成功，不符合预期';
        dynamicImgResult.classList.add('failure');
        dynamicImgResult.classList.remove('success');
      });
      
      newImg.addEventListener('error', function() {
        dynamicImgResult.textContent = '不允许的动态添加图片被CSP阻止，符合预期';
        dynamicImgResult.classList.add('success');
        dynamicImgResult.classList.remove('failure');
      });
      
      dynamicImgContainer.appendChild(newImg);
    });
  }
  
  // 内联SVG测试
  const inlineSvg = document.getElementById('inline-svg');
  const svgResult = document.getElementById('svg-result');
  
  if (inlineSvg && svgResult) {
    setTimeout(function() {
      // 如果SVG可见，则说明内联SVG不受CSP影响
      const style = window.getComputedStyle(inlineSvg);
      const isVisible = style.display !== 'none' && style.visibility !== 'hidden';
      
      if (isVisible) {
        svgResult.textContent = '内联SVG正常显示，不受CSP img-src指令影响';
        svgResult.classList.add('success');
      } else {
        svgResult.textContent = 'SVG不可见，这不符合预期';
        svgResult.classList.add('failure');
      }
    }, 300);
  }
}); 