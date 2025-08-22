<script setup lang="ts">
import { siteConfig } from './config'

// 获取当前路由来确定导航栏的当前页面
const route = useRoute()
const currentPage = computed(() => {
  const path = route.path
  const navItem = siteConfig.navigation.find(item => item.href === path)
  return navItem?.key || ''
})
</script>

<template>
  <NuxtLayout>
    <!-- 导航栏 -->
    <Navbar :current-page="currentPage" />
    
    <!-- 页面内容 -->
    <NuxtPage />
    <!-- 页脚 -->
    <Footer />
  </NuxtLayout>
</template>
