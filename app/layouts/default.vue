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
let scrollOffset = 0 // 滚轮偏移量
let isScrolling = false // 是否在滚动中

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
      
      // 添加滚轮偏移效果
      const scrollEffect = isScrolling ? scrollOffset : 0
      
      followerX += dx * 0.1
      followerY += (dy + scrollEffect) * 0.1
      
      if (customCursorFollower.value) {
        customCursorFollower.value.style.left = followerX + 'px'
        customCursorFollower.value.style.top = followerY + 'px'
      }
      
      // 逐渐减少滚轮偏移
      if (isScrolling) {
        scrollOffset *= 0.95
        if (Math.abs(scrollOffset) < 0.1) {
          scrollOffset = 0
          isScrolling = false
        }
      }
      
      requestAnimationFrame(animateFollower)
    }
    
    // 滚轮事件处理
    const handleWheel = (e: WheelEvent) => {
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      const scrollIntensity = Math.min(Math.abs(e.deltaY) * 0.3, 50) // 增加强度倍数和最大值
      
      // 反向设置滚轮偏移，向下滚动时跟随光标向上"逃跑"
      scrollOffset = -scrollDirection * scrollIntensity // 反向效果
      isScrolling = true
      
      // 添加更明显的弹性效果
      if (customCursorFollower.value) {
        customCursorFollower.value.style.transition = 'opacity 0.05s ease, transform 0.1s ease'
        customCursorFollower.value.style.opacity = '0.2'
        customCursorFollower.value.style.transform = `translate(-50%, -50%) scale(1.2)`
        
        setTimeout(() => {
          if (customCursorFollower.value) {
            customCursorFollower.value.style.opacity = '0.5'
            customCursorFollower.value.style.transform = `translate(-50%, -50%) scale(1)`
            customCursorFollower.value.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }
        }, 150)
      }
    }
    
    // 鼠标悬停在可点击元素上
    const handleMouseEnter = () => {
      if (customCursor.value) {
        customCursor.value.classList.add('hover')
      }
      if (customCursorFollower.value) {
        customCursorFollower.value.classList.add('hover')
      }
    }
    
    const handleMouseLeave = () => {
      if (customCursor.value) {
        customCursor.value.classList.remove('hover')
      }
      if (customCursorFollower.value) {
        customCursorFollower.value.classList.remove('hover')
      }
    }
    
    // 绑定事件
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('wheel', handleWheel)
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
      document.removeEventListener('wheel', handleWheel)
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
