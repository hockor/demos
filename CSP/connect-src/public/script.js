document.addEventListener('DOMContentLoaded', function() {
  // 同域Fetch请求测试
  const sameOriginFetchBtn = document.getElementById('same-origin-fetch-btn');
  const sameOriginFetchResult = document.getElementById('same-origin-fetch-result');
  
  if (sameOriginFetchBtn && sameOriginFetchResult) {
    sameOriginFetchBtn.addEventListener('click', function() {
      sameOriginFetchResult.textContent = '正在请求...';
      sameOriginFetchResult.className = 'result';
      
      fetch('/api/test')
        .then(response => response.json())
        .then(data => {
          sameOriginFetchResult.textContent = `成功！服务器响应：\n${JSON.stringify(data, null, 2)}`;
          sameOriginFetchResult.classList.add('success');
        })
        .catch(error => {
          sameOriginFetchResult.textContent = `错误：${error.message}`;
          sameOriginFetchResult.classList.add('failure');
        });
    });
  }
  
  // 允许的跨域Fetch请求测试
  const allowedFetchBtn = document.getElementById('allowed-fetch-btn');
  const allowedFetchResult = document.getElementById('allowed-fetch-result');
  
  if (allowedFetchBtn && allowedFetchResult) {
    allowedFetchBtn.addEventListener('click', function() {
      allowedFetchResult.textContent = '正在请求...';
      allowedFetchResult.className = 'result';
      
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
          allowedFetchResult.textContent = `成功！服务器响应：\n${JSON.stringify(data, null, 2)}`;
          allowedFetchResult.classList.add('success');
        })
        .catch(error => {
          allowedFetchResult.textContent = `错误：${error.message}`;
          allowedFetchResult.classList.add('failure');
        });
    });
  }
  
  // 不允许的跨域Fetch请求测试
  const blockedFetchBtn = document.getElementById('blocked-fetch-btn');
  const blockedFetchResult = document.getElementById('blocked-fetch-result');
  
  if (blockedFetchBtn && blockedFetchResult) {
    blockedFetchBtn.addEventListener('click', function() {
      blockedFetchResult.textContent = '正在请求...';
      blockedFetchResult.className = 'result';
      
      fetch('https://api.github.com/users/octocat')
        .then(response => response.json())
        .then(data => {
          blockedFetchResult.textContent = `请求成功，这不符合预期！\n${JSON.stringify(data, null, 2)}`;
          blockedFetchResult.classList.add('failure');
        })
        .catch(error => {
          blockedFetchResult.textContent = `符合预期：请求被CSP阻止\n错误：${error.message}`;
          blockedFetchResult.classList.add('success');
        });
    });
  }
  
  // XMLHttpRequest测试
  const xhrAllowedBtn = document.getElementById('xhr-allowed-btn');
  const xhrBlockedBtn = document.getElementById('xhr-blocked-btn');
  const xhrResult = document.getElementById('xhr-result');
  
  if (xhrAllowedBtn && xhrResult) {
    xhrAllowedBtn.addEventListener('click', function() {
      xhrResult.textContent = '正在请求...';
      xhrResult.className = 'result';
      
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          xhrResult.textContent = `XHR请求成功！\n${xhr.responseText}`;
          xhrResult.classList.add('success');
        } else {
          xhrResult.textContent = `XHR请求失败：${xhr.statusText}`;
          xhrResult.classList.add('failure');
        }
      };
      
      xhr.onerror = function() {
        xhrResult.textContent = `XHR请求错误！这可能是CSP阻止造成的`;
        xhrResult.classList.add('failure');
      };
      
      xhr.send();
    });
  }
  
  if (xhrBlockedBtn && xhrResult) {
    xhrBlockedBtn.addEventListener('click', function() {
      xhrResult.textContent = '正在请求...';
      xhrResult.className = 'result';
      
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=London', true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          xhrResult.textContent = `XHR请求成功，这不符合预期！\n${xhr.responseText}`;
          xhrResult.classList.add('failure');
        } else {
          xhrResult.textContent = `XHR请求失败：${xhr.statusText}`;
          xhrResult.classList.add('success');
        }
      };
      
      xhr.onerror = function() {
        xhrResult.textContent = `符合预期：XHR请求被CSP阻止`;
        xhrResult.classList.add('success');
      };
      
      try {
        xhr.send();
      } catch (error) {
        xhrResult.textContent = `符合预期：XHR请求出错 - ${error.message}`;
        xhrResult.classList.add('success');
      }
    });
  }
  
  // WebSocket测试
  const websocketBtn = document.getElementById('websocket-btn');
  const websocketResult = document.getElementById('websocket-result');
  
  if (websocketBtn && websocketResult) {
    websocketBtn.addEventListener('click', function() {
      websocketResult.textContent = '正在尝试WebSocket连接...';
      websocketResult.className = 'result';
      
      try {
        // 尝试连接到echo.websocket.org
        const socket = new WebSocket('wss://echo.websocket.org');
        
        socket.onopen = function() {
          websocketResult.textContent = 'WebSocket连接成功，这不符合预期！';
          websocketResult.classList.add('failure');
          
          // 关闭连接
          socket.close();
        };
        
        socket.onerror = function(error) {
          websocketResult.textContent = `符合预期：WebSocket连接被CSP阻止`;
          websocketResult.classList.add('success');
        };
      } catch (error) {
        websocketResult.textContent = `符合预期：WebSocket连接出错 - ${error.message}`;
        websocketResult.classList.add('success');
      }
    });
  }
  
  // Beacon API测试
  const beaconAllowedBtn = document.getElementById('beacon-allowed-btn');
  const beaconBlockedBtn = document.getElementById('beacon-blocked-btn');
  const beaconResult = document.getElementById('beacon-result');
  
  if (beaconAllowedBtn && beaconResult) {
    beaconAllowedBtn.addEventListener('click', function() {
      beaconResult.textContent = '正在发送Beacon请求...';
      beaconResult.className = 'result';
      
      const data = { type: 'beacon', message: 'This is a test beacon' };
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      
      const success = navigator.sendBeacon('https://jsonplaceholder.typicode.com/posts', blob);
      
      if (success) {
        beaconResult.textContent = '允许的Beacon请求已发送成功';
        beaconResult.classList.add('success');
      } else {
        beaconResult.textContent = '允许的Beacon请求发送失败，这不符合预期';
        beaconResult.classList.add('failure');
      }
    });
  }
  
  if (beaconBlockedBtn && beaconResult) {
    beaconBlockedBtn.addEventListener('click', function() {
      beaconResult.textContent = '正在发送Beacon请求...';
      beaconResult.className = 'result';
      
      const data = { type: 'beacon', message: 'This is a test beacon' };
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      
      const success = navigator.sendBeacon('https://api.example.com/analytics', blob);
      
      if (success) {
        beaconResult.textContent = '不允许的Beacon请求已发送成功，这不符合预期';
        beaconResult.classList.add('failure');
      } else {
        beaconResult.textContent = '符合预期：不允许的Beacon请求被CSP阻止';
        beaconResult.classList.add('success');
      }
    });
  }
});