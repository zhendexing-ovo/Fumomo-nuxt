<script setup lang="ts">
import { getPageConfig } from '../config'

// 页面配置
const pageConfig = getPageConfig('projects')

// 设置页面元数据
definePageMeta({
  title: pageConfig.title
})

// 项目数据
const projects = [
  {
    title: 'Fumomo-Nuxt',
    description: '从 Astro 迁移到 Nuxt 的个人主页，温暖而现代的设计风格',
    demoUrl: 'https://fumomo-nuxt.vercel.app',
    githubUrl: 'https://github.com/Hakutyan-bai/fumomo-nuxt',
    demoText: '预览项目'
  },
  {
    title: 'file-sharing-site',
    description: '一个外链文件分享站，支持文件变动通知',
    demoUrl: '#',
    githubUrl: 'https://github.com/Hakutyan-bai/file-sharing-site',
    demoText: '暂无预览'
  },
  {
    title: 'AutoFeedMod',
    description: '一个MC模组，实现了便携式的自动喂养功能',
    demoUrl: 'https://modrinth.com/mod/autofeedfabric/',
    githubUrl: 'https://github.com/Hakutyan-bai/AutoFeedMod',
    demoText: '下载地址'
  }
]
</script>

<template>
  <div>
    <main class="flex flex-col items-center min-h-screen projects-page pt-24">
      <section class="bg-white rounded-3xl shadow-lg p-12 max-w-4xl w-full mb-12"
               style="box-shadow: 0 4px 24px rgba(139,90,140,0.08);">
        <h1 class="text-primary text-4xl mb-2 text-center font-fumofumo">{{ pageConfig.title }}</h1>
        <p v-if="'description' in pageConfig" class="text-muted text-xl text-center mb-8">{{ pageConfig.description }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 项目卡片 -->
          <div 
            v-for="project in projects" 
            :key="project.title"
            class="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-6 border border-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div class="text-center mb-4">
              <h3 class="text-primary text-xl mb-2 font-fumofumo">{{ project.title }}</h3>
              <p class="text-muted text-base leading-relaxed">{{ project.description }}</p>
            </div>
            
            <div class="flex justify-center items-center gap-3 mt-4">
              <!-- 预览项目按钮 -->
              <a 
                :href="project.demoUrl" 
                target="_blank" 
                rel="noopener noreferrer" 
                class=" text-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-opacity-90 hover:scale-110 hover:-translate-y-1 hover:shadow-lg no-underline"
              >
                {{ project.demoText }}
              </a>
              
              <!-- GitHub图标按钮 -->
              <a 
                :href="project.githubUrl" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-primary p-2 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-translate-y-1 no-underline flex items-center justify-center"
                title="查看源代码"
              >
                <i class="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          
          <!-- 更多项目卡片 -->
          <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <div class="text-center mb-4">
              <h3 class="text-primary text-xl mb-2 font-fumofumo">💡 更多项目</h3>
              <p class="text-muted text-base leading-relaxed">敬请期待更多精彩的项目作品</p>
            </div>
            
            <div class="flex justify-center items-center gap-3 mt-4">
              <div class="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                🚧 开发中
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 项目页面特定样式 */
.projects-page .hover\:shadow-lg:hover {
  box-shadow: 0 8px 20px rgba(139,90,140,0.15);
}
</style>
