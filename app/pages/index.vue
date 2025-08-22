<script setup lang="ts">
import { siteConfig, getPageConfig } from '../config'

// 页面配置
const pageConfig = getPageConfig('home')

// 设置页面元数据
definePageMeta({
  title: pageConfig.title
})

// 动画状态
const logoRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

onMounted(() => {
  // 触发动画序列
  setTimeout(() => {
    if (logoRef.value) logoRef.value.classList.add('bounce-in')
  }, 200)
  
  setTimeout(() => {
    if (subtitleRef.value) subtitleRef.value.classList.add('fade-in')
  }, 500)
  
  setTimeout(() => {
    if (contentRef.value) contentRef.value.classList.add('fade-in-delayed')
  }, 800)
})
</script>

<template>
  <div>
    <!-- 加载动画组件 -->
    <!-- TODO: 需要创建Loading组件 -->
    
    <!-- 主要内容 -->
    <main class="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-8" id="main-content">
      <div class="max-w-screen-xl mx-auto text-center pt-36">
        <h1 
          ref="logoRef"
          class="text-6xl font-bold text-primary mb-4 font-fumofumo opacity-0 logo"
          style="transform: scale(0.5) translateY(-3rem); text-shadow: 2px 2px 10px rgba(139, 90, 140, 0.3);"
        >
          Hi, I'm {{ siteConfig.personal.name }}
        </h1>
        
        <p 
          ref="subtitleRef"
          class="text-2xl text-muted mb-12 opacity-0 subtitle"
          style="transform: translateY(2rem);"
        >
          {{ siteConfig.site.subtitle }}
        </p>
        
        <div 
          ref="contentRef"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 opacity-0 content"
          style="transform: translateY(3rem);"
        >
          <div 
            v-for="feature in siteConfig.home.features" 
            :key="feature.title"
            class="backdrop-blur-sm bg-white/70 rounded-3xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            style="box-shadow: 0 8px 25px rgba(139, 90, 140, 0.15);"
          >
            <h2 class="text-2xl text-primary mb-4">{{ feature.title }}</h2>
            <p class="text-muted leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 动画类在 global.css 中定义 */
</style>
