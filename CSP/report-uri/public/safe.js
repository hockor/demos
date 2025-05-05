// 这是一个符合 CSP 策略的外部脚本文件
document.addEventListener('DOMContentLoaded', function() {
    // 为安全按钮添加事件监听器
    document.getElementById('loadSafeScript').addEventListener('click', function() {
        document.getElementById('safeResult').textContent = '这是从符合 CSP 的外部脚本加载的内容';
    });

    // 输出信息到控制台
    console.log('CSP 演示已加载 - 符合 CSP 的脚本已执行');
    console.log('注意：内联脚本将被阻止，但会发送违规报告到 /report 端点');
}); 