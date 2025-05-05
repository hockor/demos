// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前 CSP 状态
    const urlParams = new URLSearchParams(window.location.search);
    const cspParam = urlParams.get('csp');
    const cspEnabled = cspParam !== 'off';
    
    // 更新 CSP 状态显示
    const cspStatus = document.getElementById('cspStatus');
    if (cspEnabled) {
        cspStatus.innerHTML = '<div class="status enabled">upgrade-insecure-requests 已启用</div>';
    } else {
        cspStatus.innerHTML = '<div class="status disabled">upgrade-insecure-requests 已禁用</div>';
    }
    
    // 检测图片加载的实际 URL
    const testImage = document.getElementById('testImage');
    testImage.onload = function() {
        // 使用 naturalWidth 检查图片是否正常加载
        if (this.naturalWidth > 0) {
            document.getElementById('imageLoadStatus').textContent = '加载成功';
            
            // 尝试获取实际加载的 URL
            try {
                // 注意：由于浏览器安全限制，无法直接获取升级后的图片 URL
                const protocol = cspEnabled ? 'https:' : 'http:';
                document.getElementById('actualImageUrl').textContent = 
                    protocol + '//placehold.co/400x200?text=测试图片 (推测值)';
            } catch (e) {
                document.getElementById('actualImageUrl').textContent = '无法确定 (受到跨域限制)';
            }
        } else {
            document.getElementById('imageLoadStatus').textContent = '加载失败';
        }
    };
    
    testImage.onerror = function() {
        document.getElementById('imageLoadStatus').textContent = '加载失败';
    };
    
    // 检测脚本加载状态
    try {
        setTimeout(function() {
            if (window.jQuery && window.jQuery().jquery === '1.12.4') {
                document.getElementById('scriptLoadStatus').textContent = '加载成功';
                const protocol = cspEnabled ? 'https:' : 'http:';
                document.getElementById('actualScriptUrl').textContent = 
                    protocol + '//code.jquery.com/jquery-1.12.4.min.js (推测值)';
            } else {
                document.getElementById('scriptLoadStatus').textContent = '加载失败或被阻止';
                document.getElementById('actualScriptUrl').textContent = '未知';
            }
        }, 1000);
    } catch (e) {
        document.getElementById('scriptLoadStatus').textContent = '脚本出错: ' + e.message;
    }
    
    // 添加 HTTP 请求示例
    document.getElementById('makeRequest').addEventListener('click', function() {
        const httpUrl = 'http://api.jqueryui.com/resources/demos.css';
        
        document.getElementById('requestStatus').textContent = '请求中...';
        document.getElementById('actualRequestUrl').textContent = '请求中...';
        document.getElementById('requestResult').innerHTML = '发起请求到: ' + httpUrl;
        
        // 使用 fetch 发起请求
        fetch(httpUrl)
            .then(response => {
                document.getElementById('requestStatus').textContent = '成功 (' + response.status + ')';
                document.getElementById('actualRequestUrl').textContent = 
                    response.url || (cspEnabled ? 'https' + httpUrl.substring(4) : httpUrl);
                document.getElementById('requestResult').innerHTML += '<br>请求成功! URL: ' + response.url;
                return response.text();
            })
            .catch(error => {
                document.getElementById('requestStatus').textContent = '失败';
                document.getElementById('actualRequestUrl').textContent = '未知';
                document.getElementById('requestResult').innerHTML += '<br>请求失败: ' + error.message;
            });
    });
    
    // 输出 CSP 状态到控制台
    console.log('CSP upgrade-insecure-requests ' + (cspEnabled ? '已启用' : '已禁用'));
    console.log('访问 ' + window.location.origin + (cspEnabled ? '?csp=off' : '?csp=on') + 
        ' 来 ' + (cspEnabled ? '禁用' : '启用') + ' upgrade-insecure-requests');
}); 