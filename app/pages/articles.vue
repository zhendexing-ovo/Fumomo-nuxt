<script setup lang="ts">
import { siteConfig, getPageConfig,  } from '../config'

// 页面配置
const pageConfig = getPageConfig('articles')

// 设置页面元数据
definePageMeta({
  title: pageConfig.title
})

// RSS数据接口
interface RSSItem {
  title: string
  link: string
  pubDate: string
  description: string
}

// 获取URL参数
const route = useRoute()
const currentPage = computed(() => parseInt(route.query.page as string || '1'))
const postsPerPage = siteConfig.articles.postsPerPage

// 响应式数据
const allItems = ref<RSSItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// 获取RSS数据
const fetchRSSData = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    // 调用服务器端 API 获取 RSS 数据
    const response = await $fetch<{items: RSSItem[], total: number, error?: string}>('/api/rss')
    
    if (response.error) {
      throw new Error(response.error)
    }
    
    allItems.value = response.items || []
    
  } catch (e) {
    console.error('RSS获取失败:', e)
    error.value = e instanceof Error ? e.message : '文章加载失败'
    allItems.value = []
  } finally {
    isLoading.value = false
  }
}

// 计算分页数据
const totalItems = computed(() => allItems.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / postsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * postsPerPage)
const endIndex = computed(() => startIndex.value + postsPerPage)
const items = computed(() => allItems.value.slice(startIndex.value, endIndex.value))

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString) return '未知日期'
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 页面加载时获取数据
onMounted(() => {
  fetchRSSData()
})

// 监听路由变化，切换页码时滚动到顶部
watch(() => route.query.page, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    // 平滑滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
})
</script>

<template>
  <div>
    <main class="flex flex-col items-center min-h-screen articles-page pt-24">
      <section class="bg-white rounded-3xl shadow-lg p-12 max-w-4xl w-full flex flex-col mb-12"
               style="box-shadow: 0 4px 24px rgba(139,90,140,0.08);">
        <h1 class="text-primary text-4xl mb-2 text-center font-fumofumo">{{ siteConfig.articles.pageTitle }}</h1>
        <p class="text-muted text-xl text-center mb-8">{{ siteConfig.articles.pageDescription }}</p>
        
        <!-- 文章来源说明与订阅地址 -->
        <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-8 border border-pink-100">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-center gap-2">
              <span class="text-2xl"></span>
              <span class="text-primary text-sm">{{ siteConfig.articles.sourceDescription }}</span>
            </div>
            <div class="flex items-center gap-4">
              <a 
                href="https://blog.sakura.ink" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-opacity-90 hover:scale-105 no-underline"
              >
                <i class="fas fa-external-link-alt"></i>
                <span>访问博客</span>
              </a>
              <a 

                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-600 hover:scale-105 no-underline"
              >
                <i class="fas fa-rss"></i>
                <span>RSS订阅</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="isLoading" class="text-center text-primary py-12 text-lg">
          <i class="fas fa-spinner fa-spin mr-2"></i>
          正在加载文章...
        </div>
        
        <!-- 错误状态 -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-500 text-lg mb-4">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            {{ error }}
          </div>
          <button 
            @click="fetchRSSData" 
            class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <i class="fas fa-redo mr-2"></i>
            重新加载
          </button>
        </div>
        
        <!-- 文章列表 -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <template v-if="items.length > 0">
            <article 
              v-for="item in items" 
              :key="item.link"
              class="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl border border-gray-200 transition-all duration-200 hover:-translate-y-1 overflow-hidden hover:shadow-lg"
            >
              <a 
                :href="item.link" 
                target="_blank" 
                rel="noopener" 
                class="block p-6 no-underline text-inherit h-full relative"
              >
                <h3 class="text-primary text-xl font-semibold mb-3 leading-snug font-fumofumo">{{ item.title }}</h3>
                <p class="text-muted text-sm leading-relaxed mb-10 line-clamp-3 overflow-hidden">
                  {{ item.description || '暂无简介' }}
                </p>
                <time class="absolute text-gray-400 text-xs font-normal bottom-4 right-6">
                  {{ formatDate(item.pubDate) }}
                </time>
              </a>
            </article>
          </template>
          <div v-else class="col-span-full text-center text-primary py-12 text-lg">
            暂无文章
          </div>
        </div>
      </section>
      
      <!-- 分页导航 -->
      <section 
        v-if="totalPages > 1" 
        class="bg-white rounded-2xl shadow-lg p-6 max-w-4xl w-full mb-12"
        style="box-shadow: 0 4px 24px rgba(139,90,140,0.08);"
      >
        <div class="flex justify-center items-center gap-2">
          <!-- 上一页按钮 -->
          <NuxtLink 
            v-if="currentPage > 1"
            :to="`/articles?page=${currentPage - 1}`"
            class="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200 hover:scale-105 no-underline"
          >
            <i class="fas fa-chevron-left"></i>
            <span>上一页</span>
          </NuxtLink>
          <span 
            v-else
            class="flex items-center gap-2 bg-gray-50 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            <i class="fas fa-chevron-left"></i>
            <span>上一页</span>
          </span>
          
          <!-- 页码显示 -->
          <div class="flex items-center gap-2 mx-4">
            <template v-for="pageNum in totalPages" :key="pageNum">
              <span 
                v-if="pageNum === currentPage"
                class="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium"
              >
                {{ pageNum }}
              </span>
              <NuxtLink 
                v-else
                :to="`/articles?page=${pageNum}`"
                class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200 hover:scale-105 no-underline"
              >
                {{ pageNum }}
              </NuxtLink>
            </template>
          </div>
          
          <!-- 下一页按钮 -->
          <NuxtLink 
            v-if="currentPage < totalPages"
            :to="`/articles?page=${currentPage + 1}`"
            class="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200 hover:scale-105 no-underline"
          >
            <span>下一页</span>
            <i class="fas fa-chevron-right"></i>
          </NuxtLink>
          <span 
            v-else
            class="flex items-center gap-2 bg-gray-50 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            <span>下一页</span>
            <i class="fas fa-chevron-right"></i>
          </span>
        </div>
        
        <!-- 分页信息 -->
        <div class="text-center mt-4 text-gray-500 text-sm">
          第 {{ currentPage }} 页，共 {{ totalPages }} 页 · 共 {{ totalItems }} 篇文章
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 文章页面特定样式 */
.articles-page .hover\:shadow-lg:hover {
  box-shadow: 0 8px 25px rgba(139,90,140,0.15);
}
</style>
