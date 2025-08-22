<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { siteConfig } from '../config/index'

interface Props {
  currentPage?: string
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: ''
})

const isMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  // 监听点击事件来关闭移动端菜单
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('#nav-toggle') && !target.closest('#nav-menu')) {
      isMenuOpen.value = false
    }
  })
})
</script>

<template>
  <div>
    <!-- 导航栏 -->
    <nav id="navbar" class="fixed top-0 left-0 w-full backdrop-blur-md border-b z-50 py-2 transition-opacity duration-700 ease-in bg-white/90 border-primary/10">
      <div class="max-w-screen-xl mx-auto px-8 flex justify-between items-center">
        <NuxtLink to="/" class="text-3xl font-bold font-fumofumo transition-all duration-300 hover:text-pink-400 hover:scale-105 text-primary">
          {{ siteConfig.site.title }}
        </NuxtLink>

        <!-- 汉堡菜单按钮 (移动端) -->
        <button 
          class="md:hidden flex flex-col bg-transparent border-none cursor-pointer p-2 relative z-50" 
          id="nav-toggle"
          :class="{ 'nav-toggle-active': isMenuOpen }"
          @click="toggleMobileMenu"
        >
          <span class="w-6 h-0.5 my-1 rounded transition-all duration-300 bg-primary"></span>
          <span class="w-6 h-0.5 my-1 rounded transition-all duration-300 bg-primary"></span>
          <span class="w-6 h-0.5 my-1 rounded transition-all duration-300 bg-primary"></span>
        </button>

        <!-- 桌面端菜单 -->
        <ul class="hidden md:flex list-none m-0 p-0 gap-8">
          <li v-for="item in siteConfig.navigation.slice(1)" :key="item.key">
            <NuxtLink 
              :to="item.href" 
              class="no-underline font-medium transition-all duration-300 relative py-2 px-4 rounded-full nav-link hover:-translate-y-0.5"
              :class="currentPage === item.key ? 'bg-primary/10 text-primary' : 'text-muted hover:text-primary'"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div 
      id="nav-menu" 
      class="mobile-menu fixed top-16 left-0 w-full backdrop-filter backdrop-blur-md border-b transition-all duration-300 z-40 p-4 bg-white/95 border-primary/10"
      :class="{ 'mobile-menu-active': isMenuOpen }"
    >
      <ul class="list-none m-0 p-0 flex flex-col items-center gap-4">
        <li v-for="item in siteConfig.navigation.slice(1)" :key="item.key" class="w-full text-center">
          <NuxtLink 
            :to="item.href" 
            class="no-underline font-medium transition-all duration-300 relative py-2 px-4 rounded-full nav-link block"
            :class="currentPage === item.key ? 'bg-primary/10 text-primary' : 'text-muted hover:text-primary'"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* 汉堡菜单动画效果 */
.nav-toggle-active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle-active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle-active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* 移动端菜单动画 */
.mobile-menu {
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
}

.mobile-menu-active {
  transform: translateY(0) !important;
  opacity: 1 !important;
  visibility: visible !important;
}

/* 导航链接hover效果 */
.nav-link:hover {
  color: #8b5a8c !important;
  background-color: rgba(139, 90, 140, 0.1) !important;
}
</style>
