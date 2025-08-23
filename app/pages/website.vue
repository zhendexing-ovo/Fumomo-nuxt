<script setup lang="ts">
import { getPageConfig } from '../config'

// 页面配置
const pageConfig = getPageConfig('website')

// 设置页面元数据
definePageMeta({
  title: pageConfig.title
})

// 网站数据
const websites = [
  {
    title: '个人主页',
    description: '这是我的个人主页，也就是本站',
    url: 'https://fumomo-nuxt.vercel.app/',
    linkText: '点击查看 →'
  },
  {
    title: '个人博客',
    description: '分享一些技术文章',
    url: 'https://blog.sakura.ink',
    linkText: '点击查看 →'
  },
  {
    title: '站点监控',
    description: '基于 UptimeRobot 接口',
    url: 'https://jk.skura.me',
    linkText: '查看站点状态 →'
  }
]
</script>

<template>
  <div>
    <main class="flex flex-col items-center min-h-screen website-page pt-24">
      <section class="bg-white rounded-3xl shadow-lg p-12 max-w-4xl w-full mb-12"
               style="box-shadow: 0 4px 24px rgba(139,90,140,0.08);">
        <h1 class="text-primary text-4xl mb-2 text-center font-fumofumo">{{ pageConfig.title }}</h1>
        <p v-if="'description' in pageConfig" class="text-muted text-xl text-center mb-8">{{ pageConfig.description }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            v-for="website in websites" 
            :key="website.title"
            :href="website.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-6 text-center border border-gray-200 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer no-underline text-inherit hover:shadow-lg"
          >
            <h3 class="text-primary text-xl mb-2 font-fumofumo">{{ website.title }}</h3>
            <p class="text-muted text-base leading-relaxed m-0">{{ website.description }}</p>
            <div class="mt-3 text-sm text-primary opacity-75">{{ website.linkText }}</div>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 网站页面特定样式 */
.website-page .hover\:shadow-lg:hover {
  box-shadow: 0 8px 20px rgba(139,90,140,0.15);
}
</style>
