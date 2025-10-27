<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="mb-8 fade-in">
      <button
        @click="$router.back()"
        class="text-gray-600 hover:text-primary transition mb-4 flex items-center gap-2"
      >
        <span>←</span> 返回月历
      </button>
      <h1 class="text-3xl font-bold text-gray-800">✏️ 今日打卡</h1>
    </div>

    <div class="bg-white rounded-xl shadow-lg p-8 slide-up">
      <n-form :model="formData" label-placement="top" class="space-y-6">
        <!-- 日期选择 -->
        <n-form-item label="日期">
          <n-date-picker v-model:value="formData.date" type="date" class="w-full" />
        </n-form-item>

        <!-- 学习时长 -->
        <n-form-item label="学习时长（小时）">
          <n-input-number v-model:value="formData.duration" :min="0" :step="0.5" class="w-full" />
        </n-form-item>

        <!-- 学习内容 -->
        <n-form-item label="学习内容">
          <div class="w-full">
            <div class="flex gap-2 mb-2">
              <n-button
                v-for="button in markdownButtons"
                :key="button.label"
                size="small"
                @click="insertMarkdown(button.syntax)"
              >
                {{ button.label }}
              </n-button>
            </div>
            <n-input
              v-model:value="formData.content"
              type="textarea"
              :rows="12"
              placeholder="## 📖 今日单词

**eloquent** /ˈeləkwənt/ adj. 雄辩的
- 例句: She gave an eloquent speech.

## 💡 学习心得

今天学习了..."
              class="font-mono text-sm"
            />
          </div>
        </n-form-item>

        <!-- 预览区域 -->
        <n-form-item label="预览">
          <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[200px]">
            <div class="markdown-content" v-html="renderedContent" v-if="formData.content"></div>
            <p v-else class="text-gray-400">在上方输入内容后查看预览效果</p>
          </div>
        </n-form-item>

        <!-- 标签 -->
        <n-form-item label="标签">
          <div class="flex flex-wrap gap-2 mb-2">
            <n-tag
              v-for="tag in formData.tags"
              :key="tag"
              closable
              @close="removeTag(tag)"
              type="info"
            >
              {{ tag }}
            </n-tag>
          </div>
          <n-input
            v-model:value="newTag"
            placeholder="添加标签，按回车确认"
            @keyup.enter="addTag"
          />
        </n-form-item>

        <!-- 提交按钮 -->
        <div class="flex gap-4 pt-4">
          <n-button @click="$router.back()" class="flex-1" size="large"> 取消 </n-button>
          <n-button
            @click="saveRecord"
            type="primary"
            class="flex-1"
            size="large"
            :loading="saving"
          >
            保存打卡
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NButton, NDatePicker, NInputNumber, NTag } from 'naive-ui'
import { marked } from 'marked'
import { useRecordsStore } from '../stores/records'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()

// 响应式数据
const saving = ref(false)
const newTag = ref('')

const formData = reactive({
  date: dayjs().valueOf(),
  duration: 2,
  content: `## 📖 今日单词

**eloquent** /ˈeləkwənt/ adj. 雄辩的，有说服力的
- 例句: She gave an eloquent speech that moved everyone.

**resilient** /rɪˈzɪliənt/ adj. 有韧性的，能复原的
- 例句: Children are often more resilient than we think.

## 💡 重点短语

**take into account** - 考虑，顾及
- We must take into account the feelings of others.

## ✍️ 学习心得

今天重点学习了几个高级词汇，这些词在雅思写作中经常用到。通过造句练习，记忆效果很好。

## 🔗 相关链接

- [Vocabulary.com - eloquent](https://www.vocabulary.com/dictionary/eloquent)`,
  tags: ['单词', '短语']
})

const markdownButtons = [
  { label: '标题', syntax: '## ' },
  { label: '粗体', syntax: '**粗体**' },
  { label: '代码', syntax: '`代码`' },
  { label: '列表', syntax: '- ' },
  { label: '链接', syntax: '[链接](url)' }
]

// 计算属性
const renderedContent = computed(() => {
  if (!formData.content) return ''
  return marked(formData.content)
})

// 方法
const insertMarkdown = (syntax: string) => {
  // TODO: 实现Markdown插入功能
  console.log('插入Markdown:', syntax)
}

const addTag = () => {
  if (newTag.value.trim() && !formData.tags.includes(newTag.value.trim())) {
    formData.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (tag: string) => {
  const index = formData.tags.indexOf(tag)
  if (index > -1) {
    formData.tags.splice(index, 1)
  }
}

const saveRecord = async () => {
  saving.value = true
  try {
    const recordsStore = useRecordsStore()
    await recordsStore.createRecord(projectId.value, {
      date: new Date(formData.date),
      duration: formData.duration,
      content: formData.content,
      tags: formData.tags.join(',') // 转换为字符串存储
    })
    alert('笔记保存成功！')
    router.push(`/project/${projectId.value}`)
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  // 如果是编辑模式，加载现有数据
  if (route.query.id) {
    // TODO: 加载现有记录数据
  }
})
</script>
