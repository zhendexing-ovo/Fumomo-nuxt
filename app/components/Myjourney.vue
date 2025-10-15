<script setup lang="ts">
// 我的历程组件
interface TimelineItem {
  date: string
  title: string
  description: string
}

const timelineItems: TimelineItem[] = [
  {
    date: '2025.10.15',
    title: '上线第一个网站',
    description: '个人主页（也就是本站）'
  }
]
</script>

<template>
  <aside class="w-full md:w-1/2 bg-white rounded-3xl shadow-lg p-8 mb-12 timeline-section flex flex-col min-w-[280px]"
         style="box-shadow: 0 4px 24px rgba(139,90,140,0.08);">
    <h2 class="text-2xl font-bold text-primary mb-6">我的历程</h2>
    <ul class="timeline list-none p-0 m-0 space-y-6 max-h-96 overflow-y-auto pr-2"
        style="scrollbar-width: thin;">
      <li v-for="(item, index) in timelineItems" :key="index">
        <div class="flex items-start gap-4">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-primary mb-1"></div>
            <div v-if="index < timelineItems.length - 1" class="h-full w-0.5 bg-gray-200 flex-1"></div>
          </div>
          <div>
            <div class="text-sm text-gray-400">{{ item.date }}</div>
            <div class="font-semibold text-lg">{{ item.title }}</div>
            <div class="text-gray-600 text-base">{{ item.description }}</div>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
/* 自定义滚动条样式 */
.timeline::-webkit-scrollbar {
  width: 4px;
}

.timeline::-webkit-scrollbar-track {
  background: rgba(139, 90, 140, 0.05);
  border-radius: 2px;
}

.timeline::-webkit-scrollbar-thumb {
  background: rgba(139, 90, 140, 0.3);
  border-radius: 2px;
}

.timeline::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 90, 140, 0.5);
}
</style>
