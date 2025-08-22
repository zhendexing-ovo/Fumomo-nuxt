<script setup lang="ts">
import { siteConfig, getPageConfig } from '../config'

// 页面配置
const pageConfig = getPageConfig('about')

// 设置页面元数据
definePageMeta({
  title: pageConfig.title
})
</script>

<template>
  <div>
    <main class="flex flex-col items-center min-h-screen about-page pt-24">
      <div class="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch">
        <!-- 左侧：个人信息 -->
        <section class="bg-white rounded-3xl shadow-lg p-10 px-8 w-full md:w-1/2 flex flex-col items-center mb-12"
                 style="box-shadow: 0 4px 24px rgba(139,90,140,0.08);">
          <div class="w-24 h-24 rounded-full bg-gray-300 text-primary text-5xl flex items-center justify-center mb-6 font-bold select-none">
            <img 
              :src="siteConfig.personal.avatar" 
              :alt="siteConfig.personal.name" 
              class="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div class="text-center flex-1 flex flex-col justify-center">
            <h1 class="m-0 mb-2 text-3xl text-primary font-fumofumo">{{ siteConfig.personal.name }}</h1>
            <p class="text-muted text-lg mb-5 text-center">{{ siteConfig.personal.bio }}</p>
            <ul class="list-none p-0 m-0 text-base text-gray-700 space-y-3">
              <li>
                <strong>社交连接：</strong>
                <a 
                  :href="siteConfig.personal.social.github" 
                  target="_blank" 
                  rel="noopener" 
                  class="text-primary no-underline transition-colors duration-200 hover:underline hover:text-purple-600"
                >GitHub</a>
                <span class="mx-2 text-gray-400">|</span>
                <a 
                  :href="`mailto:${siteConfig.personal.social.email}`" 
                  class="text-primary no-underline transition-colors duration-200 hover:underline hover:text-purple-600"
                >邮箱</a>
              </li>
              <li><strong>地理位置：</strong>{{ siteConfig.personal.location }}</li>
              <li><strong>兴趣爱好：</strong>{{ siteConfig.personal.hobby }}</li>
              <li><strong>学习中：</strong>{{ siteConfig.personal.learning }}</li>
              <li class="flex justify-center">
                <!-- TODO: 需要创建Umami组件 -->
                <!-- <Umami /> -->
              </li>
            </ul>
          </div>
        </section>

        <!-- 右侧：我的历程 -->
        <Myjourney />
      </div>
      
      <!-- 个人履历区域 - 占据全宽 -->
      <div class="w-full max-w-5xl mt-8 flex justify-center">
        <Qualification />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 页面特定样式 */
</style>
