<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">移动端菜单测试</h1>
    <p class="mb-4">
      请使用浏览器开发者工具切换到移动设备视图来测试汉堡菜单功能：
    </p>
    <ol class="list-decimal list-inside space-y-2 mb-6">
      <li>按 F12 打开开发者工具</li>
      <li>点击设备切换按钮（或按 Ctrl+Shift+M）</li>
      <li>选择一个移动设备尺寸</li>
      <li>测试汉堡菜单的开关功能</li>
    </ol>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 class="font-semibold text-blue-800 mb-2">预期行为：</h3>
      <ul class="text-blue-700 space-y-1">
        <li>✅ 点击汉堡菜单图标时，菜单应该展开</li>
        <li>✅ 汉堡图标应该变成叉叉</li>
        <li>✅ 菜单项应该垂直排列显示</li>
        <li>✅ 点击菜单项时应该跳转并关闭菜单</li>
        <li>✅ 点击菜单外部应该关闭菜单</li>
        <li>✅ 按 ESC 键应该关闭菜单</li>
      </ul>
    </div>

    <div class="mt-8">
      <h3 class="font-semibold mb-4">导航链接测试：</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink to="/" class="bg-primary text-white p-3 rounded text-center hover:bg-opacity-90">
          首页
        </NuxtLink>
        <NuxtLink to="/articles" class="bg-primary text-white p-3 rounded text-center hover:bg-opacity-90">
          文章
        </NuxtLink>
        <NuxtLink to="/about" class="bg-primary text-white p-3 rounded text-center hover:bg-opacity-90">
          关于
        </NuxtLink>
        <NuxtLink to="/projects" class="bg-primary text-white p-3 rounded text-center hover:bg-opacity-90">
          项目
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: '移动端菜单测试'
})
</script>
