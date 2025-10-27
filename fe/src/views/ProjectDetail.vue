<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8 fade-in">
      <button 
        @click="$router.back()" 
        class="text-gray-600 hover:text-primary transition mb-4 flex items-center gap-2"
      >
        <span>←</span> 返回项目列表
      </button>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ project.icon }} {{ project.name }}</h1>
          <p class="text-gray-600">{{ project.description }}</p>
        </div>
        <button 
          @click="goToCreateRecord"
          class="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <span class="text-lg mr-1">+</span> 今日打卡
        </button>
      </div>
    </div>

    <!-- 月份选择器 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6 fade-in">
      <div class="flex justify-between items-center">
        <button @click="changeMonth(-1)" class="p-2 hover:bg-gray-100 rounded-lg transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h2 class="text-xl font-bold text-gray-800">{{ currentMonthText }}</h2>
        <button @click="changeMonth(1)" class="p-2 hover:bg-gray-100 rounded-lg transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 月历 -->
    <div class="bg-white rounded-xl shadow-md p-6 slide-up">
      <!-- 星期标题 -->
      <div class="grid grid-cols-7 gap-2 mb-4">
        <div v-for="day in weekDays" :key="day" class="text-center font-semibold text-gray-600 text-sm">
          {{ day }}
        </div>
      </div>
      
      <!-- 日期格子 -->
      <div class="grid grid-cols-7 gap-2">
        <div 
          v-for="day in calendarDays" 
          :key="day.date"
          @click="goToRecord(day)"
          :class="[
            'calendar-day rounded-lg flex items-center justify-center cursor-pointer relative',
            day.hasRecord ? 'has-notes' : 'bg-gray-100 hover:bg-gray-200',
            day.isToday ? 'bg-primary/20 border-2 border-primary' : '',
            day.isOtherMonth ? 'text-gray-400' : 'text-gray-700'
          ]"
        >
          <span :class="day.isToday ? 'font-bold text-primary' : ''">{{ day.day }}</span>
          <span v-if="day.hasRecord" class="absolute top-1 right-1 text-xs">📝</span>
          <span v-if="day.isToday" class="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">今天</span>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="mt-6 pt-6 border-t border-gray-200 flex justify-around text-center">
        <div>
          <div class="text-2xl font-bold text-primary">{{ stats.thisMonthRecords }}</div>
          <div class="text-sm text-gray-600">本月打卡</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-primary">{{ stats.totalRecords }}</div>
          <div class="text-sm text-gray-600">总计笔记</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-primary">{{ stats.completionRate }}%</div>
          <div class="text-sm text-gray-600">完成率</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 响应式数据
const currentMonth = ref(new Date())
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 模拟项目数据
const project = ref({
  id: route.params.id,
  name: '英语学习',
  description: '每日单词 · 短语积累',
  icon: '📖'
})

// 模拟统计数据
const stats = ref({
  thisMonthRecords: 12,
  totalRecords: 45,
  completionRate: 85
})

// 计算属性
const currentMonthText = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth() + 1
  return `${year}年${month}月`
})

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const today = new Date()
  
  // 获取当月第一天和最后一天
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // 获取第一天是星期几
  const firstDayWeek = firstDay.getDay()
  
  const days = []
  
  // 添加上个月的空白日期
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      hasRecord: Math.random() > 0.7,
      isToday: false,
      isOtherMonth: true
    })
  }
  
  // 添加当月的日期
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    const isToday = date.toDateString() === today.toDateString()
    
    days.push({
      date: date.toISOString().split('T')[0],
      day,
      hasRecord: Math.random() > 0.6,
      isToday,
      isOtherMonth: false
    })
  }
  
  // 添加下个月的空白日期
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    days.push({
      date: date.toISOString().split('T')[0],
      day,
      hasRecord: false,
      isToday: false,
      isOtherMonth: true
    })
  }
  
  return days
})

// 方法
const changeMonth = (direction: number) => {
  currentMonth.value.setMonth(currentMonth.value.getMonth() + direction)
}

const goToRecord = (day: any) => {
  if (day.hasRecord) {
    router.push(`/record/${day.date}`)
  } else if (!day.isOtherMonth) {
    // 创建新记录
    router.push(`/create-record?date=${day.date}`)
  }
}

const goToCreateRecord = () => {
  router.push('/create-record')
}

onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
.calendar-day {
  aspect-ratio: 1;
  transition: all 0.2s;
}

.calendar-day:hover {
  transform: scale(1.05);
}

.has-notes {
  background: linear-gradient(135deg, #00ce33 0%, #33d85c 100%);
  color: white;
  font-weight: 600;
}
</style>
