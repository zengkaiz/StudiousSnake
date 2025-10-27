<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-12 fade-in">
      <h1 class="text-4xl font-bold text-gray-800 mb-3">贪学蛇</h1>
      <p class="text-gray-600">记录每一天的成长轨迹，每天学习一点点，积累成大成就</p>
    </div>

    <!-- 创建项目按钮 -->
    <div class="mb-8 text-center">
      <button
        @click="showCreateProject = true"
        class="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        <span class="text-xl mr-2">+</span> 创建新项目
      </button>
    </div>

    <!-- 项目列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        @click="goToProject(project.id)"
        class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 slide-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div
          class="h-48 bg-cover bg-center"
          :style="{ backgroundImage: `url(${project.coverImage})` }"
        >
          <div class="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div class="p-6 text-white w-full">
              <h3 class="text-2xl font-bold mb-2">{{ project.icon }} {{ project.name }}</h3>
              <p class="text-sm opacity-90">{{ project.description }}</p>
            </div>
          </div>
        </div>
        <div class="p-4 bg-gray-50">
          <div class="flex justify-between text-sm text-gray-600">
            <span
              >🔥 连续打卡 <b class="text-primary">{{ project.continuousDays }}</b> 天</span
            >
            <span
              >📝 <b>{{ project.totalRecords }}</b> 条笔记</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 创建项目弹窗 -->
    <n-modal v-model:show="showCreateProject">
      <n-card
        style="width: 500px"
        title="创建新项目"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form :model="newProject" label-placement="left" label-width="auto">
          <n-form-item label="项目名称">
            <n-input v-model:value="newProject.name" placeholder="例如：英语学习" />
          </n-form-item>
          <n-form-item label="项目图标">
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="icon in icons"
                :key="icon"
                @click="newProject.icon = icon"
                :class="[
                  'text-3xl p-3 hover:bg-gray-100 rounded-lg transition',
                  newProject.icon === icon ? 'bg-primary/20' : ''
                ]"
              >
                {{ icon }}
              </button>
            </div>
          </n-form-item>
          <n-form-item label="简介">
            <n-input
              v-model:value="newProject.description"
              type="textarea"
              placeholder="简单描述一下学习目标..."
              :rows="3"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="flex gap-3">
            <n-button @click="showCreateProject = false" class="flex-1">取消</n-button>
            <n-button type="primary" @click="createProject" class="flex-1">创建</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NModal, NCard, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useProjectsStore } from '../stores/projects'

const router = useRouter()

// 响应式数据
const showCreateProject = ref(false)
const newProject = reactive({
  name: '',
  icon: '📖',
  description: ''
})

const icons = ['📖', '⛓️', '⚛️', '💻', '🎨', '🎯', '📚', '🔬', '🎵', '🏃', '🍳', '🎮']

const projectsStore = useProjectsStore()
const projects = computed(() => projectsStore.projects)

// 方法
const goToProject = (projectId: string) => {
  router.push(`/project/${projectId}`)
}

const createProject = async () => {
  try {
    const projectsStore = useProjectsStore()
    await projectsStore.createProject({
      name: newProject.name,
      icon: newProject.icon,
      description: newProject.description
    })
    showCreateProject.value = false
    // 重置表单
    newProject.name = ''
    newProject.icon = '📖'
    newProject.description = ''
    // 刷新项目列表
    await projectsStore.fetchProjects()
  } catch (error) {
    console.error('创建项目失败:', error)
    alert('创建项目失败，请重试')
  }
}

onMounted(async () => {
  try {
    await projectsStore.fetchProjects()
  } catch (error) {
    console.error('加载项目失败:', error)
  }
})
</script>
