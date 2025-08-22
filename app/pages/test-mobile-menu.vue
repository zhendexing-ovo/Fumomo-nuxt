<template>
  <div class="p-8 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">移动端菜单测试页面</h1>
    
    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="font-semibold text-blue-800 mb-2">测试步骤：</h2>
      <ol class="text-blue-700 list-decimal list-inside space-y-1">
        <li>按 F12 打开开发者工具</li>
        <li>点击设备切换按钮（或按 Ctrl+Shift+M）</li>
        <li>选择移动设备视图（如 iPhone 12 Pro）</li>
        <li>点击左上角的汉堡菜单按钮</li>
        <li>验证菜单是否正常展开</li>
      </ol>
    </div>

    <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="font-semibold text-green-800 mb-2">预期效果：</h2>
      <ul class="text-green-700 space-y-1">
        <li>✅ 汉堡图标变成叉叉</li>
        <li>✅ 出现半透明遮罩层</li>
        <li>✅ 菜单从上方滑出显示</li>
        <li>✅ 菜单项垂直排列</li>
        <li>✅ 可以点击菜单项跳转</li>
        <li>✅ 点击遮罩或菜单项关闭菜单</li>
      </ul>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">快速导航测试：</h2>
      <div class="grid grid-cols-2 gap-4">
        <NuxtLink to="/" class="bg-primary text-white p-4 rounded-lg text-center hover:bg-opacity-90 transition-colors">
          首页
        </NuxtLink>
        <NuxtLink to="/articles" class="bg-primary text-white p-4 rounded-lg text-center hover:bg-opacity-90 transition-colors">
          文章
        </NuxtLink>
        <NuxtLink to="/about" class="bg-primary text-white p-4 rounded-lg text-center hover:bg-opacity-90 transition-colors">
          关于
        </NuxtLink>
        <NuxtLink to="/projects" class="bg-primary text-white p-4 rounded-lg text-center hover:bg-opacity-90 transition-colors">
          项目
        </NuxtLink>
      </div>
    </div>

    <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="font-semibold text-yellow-800 mb-2">当前状态：</h2>
      <p class="text-yellow-700">
        菜单状态：{{ isMenuOpen ? '已打开' : '已关闭' }}
      </p>
    </div>
  </div>
</template>

<script setup>
// 通过全局状态或其他方式获取菜单状态（这里仅作演示）
const isMenuOpen = ref(false)

definePageMeta({
  title: '移动端菜单测试'
})
</script>
