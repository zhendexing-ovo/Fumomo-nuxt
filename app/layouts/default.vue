<script setup lang="ts">
import { siteConfig } from '../config'

interface Props {
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: siteConfig.site.title,
  description: siteConfig.site.description
})

// 构建完整的页面标题
const fullTitle = computed(() => 
  props.title === siteConfig.site.title 
    ? props.title 
    : `${siteConfig.site.title}-${props.title}`
)

// 设置页面元数据
useHead({
  title: fullTitle,
  meta: [
    { name: 'description', content: props.description },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteConfig.site.url },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: props.description },
    // Twitter
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: siteConfig.site.url },
    { property: 'twitter:title', content: fullTitle },
    { property: 'twitter:description', content: props.description }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' }
  ],
  script: [
    {
      defer: true,
      src: 'https://cloud.umami.is/script.js',
      'data-website-id': 'ac5e0626-4863-41ec-8a66-98ba076846a0'
    }
  ]
})

// 自定义光标逻辑
const customCursor = ref<HTMLElement>()
const customCursorFollower = ref<HTMLElement>()
let mouseX = 0
let mouseY = 0
let followerX = 0
let followerY = 0

onMounted(() => {
  // 检测是否是桌面端（支持悬停的设备）
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  
  if (isDesktop) {
    // 添加自定义光标控制类到body
    document.body.classList.add('custom-cursor-active')
    
    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      if (customCursor.value) {
        customCursor.value.style.left = mouseX + 'px'
        customCursor.value.style.top = mouseY + 'px'
      }
    }
    
    // 跟随光标动画
    const animateFollower = () => {
      const dx = mouseX - followerX
      const dy = mouseY - followerY
      
      followerX += dx * 0.1
      followerY += dy * 0.1
      
      if (customCursorFollower.value) {
        customCursorFollower.value.style.left = followerX + 'px'
        customCursorFollower.value.style.top = followerY + 'px'
      }
      
      requestAnimationFrame(animateFollower)
    }
    
    // 鼠标悬停在可点击元素上
    const handleMouseEnter = () => {
      if (customCursor.value) {
        customCursor.value.classList.add('hover')
      }
    }
    
    const handleMouseLeave = () => {
      if (customCursor.value) {
        customCursor.value.classList.remove('hover')
      }
    }
    
    // 绑定事件
    document.addEventListener('mousemove', handleMouseMove)
    animateFollower()
    
    // 为所有可点击元素添加悬停效果
    const clickableElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])')
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })
    
    // 清理函数
    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.body.classList.remove('custom-cursor-active')
      clickableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    })
  }
})
</script>

<template>
  <div>
    <!-- 自定义光标 -->
    <ClientOnly>
      <div 
        ref="customCursor" 
        class="custom-cursor"
      ></div>
      <div 
        ref="customCursorFollower" 
        class="custom-cursor-follower"
      ></div>
    </ClientOnly>
    
    <!-- 页面内容 -->
    <div class="min-h-screen bg-gray-50 font-fumofumo overflow-x-hidden">
      <slot />
    </div>
  </div>
</template>

<style>
/* 自定义光标样式已在global.css中定义 */
</style>
