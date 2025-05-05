// 这是一个符合 CSP 策略的外部脚本文件
document.addEventListener('DOMContentLoaded', function() {
    // 为安全按钮添加事件监听器
    document.getElementById('loadSafeScript').addEventListener('click', function() {
        document.getElementById('safeResult').textContent = '这是从符合 CSP 的外部脚本加载的内容';
    });

    // 输出信息到控制台
    console.log('CSP Report-To 演示已加载');
    console.log('注意：内联脚本将被阻止，报告将发送到配置的报告组端点');
    
    // 检查浏览器是否支持 Reporting API
    if (typeof window.ReportingObserver === 'function') {
        console.log('此浏览器支持 Reporting API');
    } else {
        console.log('警告：此浏览器可能不支持 Reporting API，report-to 指令可能回退到 report-uri');
    }
}); 