// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前 CSP 状态
    const urlParams = new URLSearchParams(window.location.search);
    const cspParam = urlParams.get('csp');
    const cspEnabled = cspParam !== 'off';
    
    // 更新 CSP 状态显示
    const cspStatus = document.getElementById('cspStatus');
    if (cspEnabled) {
        cspStatus.innerHTML = '<div class="status enabled">block-all-mixed-content 已启用</div>';
    } else {
        cspStatus.innerHTML = '<div class="status disabled">block-all-mixed-content 已禁用</div>';
    }
    
    // 检测图片加载情况
    const testImage = document.getElementById('testImage');
    const imageStatus = document.getElementById('imageStatus');
    const imageResultStatus = document.getElementById('imageResultStatus');
    const imageResultNote = document.getElementById('imageResultNote');
    
    testImage.onload = function() {
        // 图片加载成功
        imageStatus.className = 'resource-status loaded';
        imageStatus.textContent = '已加载';
        imageResultStatus.textContent = '已加载';
        imageResultNote.textContent = '浏览器允许了混合内容图片';
    };
    
    testImage.onerror = function() {
        // 图片加载失败
        imageStatus.className = 'resource-status blocked';
        imageStatus.textContent = '已阻止';
        imageResultStatus.textContent = '已阻止';
        imageResultNote.textContent = 'CSP 阻止了 HTTP 图片加载';
    };
    
    // 检测 CSS 加载情况
    setTimeout(function() {
        const cssTest = document.getElementById('cssTest');
        const cssStatus = document.getElementById('cssStatus');
        const cssResultStatus = document.getElementById('cssResultStatus');
        const cssResultNote = document.getElementById('cssResultNote');
        
        // 获取计算后的样式
        const computedStyle = window.getComputedStyle(cssTest.firstElementChild);
        const hasBorder = computedStyle.borderWidth !== '0px' && 
                          computedStyle.borderStyle !== 'none';
        
        if (hasBorder) {
            // CSS 已加载
            cssStatus.className = 'resource-status loaded';
            cssStatus.textContent = '已加载';
            cssResultStatus.textContent = '已加载';
            cssResultNote.textContent = '浏览器允许了混合内容 CSS';
        } else {
            // CSS 被阻止
            cssStatus.className = 'resource-status blocked';
            cssStatus.textContent = '已阻止';
            cssResultStatus.textContent = '已阻止';
            cssResultNote.textContent = 'CSP 阻止了 HTTP CSS 加载';
        }
    }, 1000);
    
    // 检测 JavaScript 加载情况
    const dialogButton = document.getElementById('dialogButton');
    const scriptStatus = document.getElementById('scriptStatus');
    const scriptResultStatus = document.getElementById('scriptResultStatus');
    const scriptResultNote = document.getElementById('scriptResultNote');
    const dialogResult = document.getElementById('dialogResult');
    
    dialogButton.addEventListener('click', function() {
        if (typeof $.ui !== 'undefined' && typeof $.ui.dialog === 'function') {
            // jQuery UI 已加载成功
            dialogResult.textContent = 'jQuery UI 对话框已加载';
            try {
                $('<div>这是 jQuery UI 对话框</div>').dialog({
                    title: '对话框测试',
                    modal: true
                });
                scriptStatus.className = 'resource-status loaded';
                scriptStatus.textContent = '已加载';
                scriptResultStatus.textContent = '已加载';
                scriptResultNote.textContent = '浏览器允许了混合内容 JavaScript';
            } catch (e) {
                dialogResult.textContent = '对话框加载失败: ' + e.message;
            }
        } else {
            // jQuery UI 未加载
            dialogResult.textContent = 'jQuery UI 未加载，HTTP 脚本被阻止';
            scriptStatus.className = 'resource-status blocked';
            scriptStatus.textContent = '已阻止';
            scriptResultStatus.textContent = '已阻止';
            scriptResultNote.textContent = 'CSP 阻止了 HTTP JavaScript 加载';
        }
    });
    
    // 初始化脚本检测
    setTimeout(function() {
        if (typeof $.ui === 'undefined') {
            scriptStatus.className = 'resource-status blocked';
            scriptStatus.textContent = '已阻止';
            scriptResultStatus.textContent = '已阻止';
            scriptResultNote.textContent = 'CSP 阻止了 HTTP JavaScript 加载';
            dialogResult.textContent = 'jQuery UI 未加载，HTTP 脚本被阻止';
        } else {
            scriptStatus.className = 'resource-status loaded';
            scriptStatus.textContent = '已加载';
            scriptResultStatus.textContent = '已加载';
            scriptResultNote.textContent = '浏览器允许了混合内容 JavaScript';
            dialogResult.textContent = 'jQuery UI 已加载，点击按钮测试对话框';
        }
    }, 1000);
    
    // HTTP 请求测试
    const makeRequestButton = document.getElementById('makeRequest');
    const xhrStatus = document.getElementById('xhrStatus');
    const xhrResultStatus = document.getElementById('xhrResultStatus');
    const xhrResultNote = document.getElementById('xhrResultNote');
    const requestResult = document.getElementById('requestResult');
    
    makeRequestButton.addEventListener('click', function() {
        const httpUrl = 'http://api.jquery.com/resources/events.json';
        
        xhrStatus.className = 'resource-status pending';
        xhrStatus.textContent = '请求中';
        xhrResultStatus.textContent = '请求中';
        xhrResultNote.textContent = '正在发送请求...';
        requestResult.textContent = '正在向 ' + httpUrl + ' 发送请求';
        
        fetch(httpUrl)
            .then(function(response) {
                xhrStatus.className = 'resource-status loaded';
                xhrStatus.textContent = '请求成功';
                xhrResultStatus.textContent = '已加载';
                xhrResultNote.textContent = '浏览器允许了混合内容 XHR/Fetch 请求';
                requestResult.textContent = '请求成功，服务器响应状态码: ' + response.status;
                return response.text();
            })
            .catch(function(error) {
                xhrStatus.className = 'resource-status blocked';
                xhrStatus.textContent = '请求失败';
                xhrResultStatus.textContent = '已阻止';
                xhrResultNote.textContent = 'CSP 阻止了 HTTP XHR/Fetch 请求';
                requestResult.textContent = '请求失败: ' + error.message;
            });
    });
    
    // 控制台日志
    console.log('CSP block-all-mixed-content ' + (cspEnabled ? '已启用' : '已禁用'));
    console.log('当前页面: ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
    console.log('切换 CSP: ' + window.location.protocol + '//' + window.location.host + window.location.pathname + (cspEnabled ? '?csp=off' : '?csp=on'));
}); 