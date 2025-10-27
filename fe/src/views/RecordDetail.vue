<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="mb-8 fade-in">
      <button
        @click="$router.back()"
        class="text-gray-600 hover:text-primary transition mb-4 flex items-center gap-2"
      >
        <span>←</span> 返回月历
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-lg p-8 slide-up">
      <!-- 笔记头部 -->
      <div class="border-b border-gray-200 pb-6 mb-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ record.title }}</h1>
            <div class="flex gap-4 text-sm text-gray-600">
              <span>📅 {{ record.date }}</span>
              <span>⏰ 学习时长: {{ record.duration }}小时</span>
            </div>
          </div>
          <button
            @click="editRecord"
            class="text-primary hover:text-primary-dark transition flex items-center gap-1"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            编辑
          </button>
        </div>
      </div>

      <!-- 笔记内容 -->
      <div class="markdown-content text-gray-700" v-html="renderedContent"></div>

      <!-- 底部操作 -->
      <div class="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <div class="flex gap-2">
          <span
            v-for="tag in record.tags"
            :key="tag"
            class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
        <button
          @click="deleteRecord"
          class="text-red-500 hover:text-red-700 transition flex items-center gap-1"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          删除
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()

// 响应式数据
const record = ref({
  id: route.params.id,
  title: '10月23日 学习笔记',
  date: '2025年10月23日',
  duration: 2,
  content: `## 📖 今日单词

**eloquent** /ˈeləkwənt/ adj. 雄辩的，有说服力的
- 例句: She gave an eloquent speech that moved everyone.

**resilient** /rɪˈzɪliənt/ adj. 有韧性的，能复原的
- 例句: Children are often more resilient than we think.

**meticulous** /məˈtɪkjələs/ adj. 一丝不苟的，细致的
- 例句: He is meticulous about his work.

## 💡 重点短语

**take into account** - 考虑，顾及
- We must take into account the feelings of others.

**come across** - 偶然遇见，给人印象
- I came across an old friend yesterday.

## ✍️ 学习心得

今天重点学习了几个高级词汇，这些词在雅思写作中经常用到。\`eloquent\` 这个词特别有用，可以用来描述演讲或文章的表达能力。

通过造句练习，我发现把这些词放在实际语境中使用，记忆效果会好很多。明天打算继续用这个方法学习新词汇。

## 🔗 相关链接

- [Vocabulary.com - eloquent](https://www.vocabulary.com/dictionary/eloquent)
- [YouGlish - resilient 发音示例](https://youglish.com/pronounce/resilient/english)`,
  tags: ['单词', '短语']
})

// 计算属性
const renderedContent = computed(() => {
  return marked(record.value.content)
})

// 方法
const editRecord = () => {
  router.push(`/create-record?id=${record.value.id}`)
}

const deleteRecord = () => {
  // TODO: 调用API删除记录
  console.log('删除记录:', record.value.id)
  router.back()
}

onMounted(() => {
  // 加载记录数据
})
</script>
