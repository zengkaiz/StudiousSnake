# 贪学蛇 - 技术方案文档

## 📋 项目概述

**项目名称**: 贪学蛇 (Study Snake)  
**项目定位**: 个人学习记录与知识管理平台  
**核心理念**: 每天学习一点点，积累成大成就

## 🎯 核心功能

### 1. 学习项目管理

- 创建/编辑/删除学习项目
- 项目分类与标签管理
- 项目进度统计

### 2. 学习记录打卡

- 日历视图展示学习轨迹
- 每日学习笔记记录
- 学习时长统计

### 3. 知识内容管理

- Markdown 富文本编辑
- 多媒体内容支持
- 标签分类系统

### 4. 数据可视化

- 学习进度图表
- 打卡连续天数统计
- 学习效率分析

## 🏗️ 技术架构

### 前端技术栈

```
Vue 3 + TypeScript + Vite
├── UI框架: Naive UI
├── 状态管理: Pinia
├── 路由: Vue Router 4
├── 样式: Tailwind CSS
├── 图表: ECharts
└── 构建工具: Vite
```

### 后端技术栈

```
Node.js + TypeScript
├── 框架: NestJS
├── 数据库: PostgreSQL
├── ORM: Prisma
├── 认证: JWT
├── 文件存储: AWS S3 / 阿里云OSS
└── 部署: Railway / Vercel
```

### 数据库设计

```sql
-- 用户表
users (id, email, username, avatar, created_at, updated_at)

-- 学习项目表
projects (id, user_id, name, description, icon, color, created_at, updated_at)

-- 学习记录表
study_records (id, project_id, date, duration, content, tags, created_at, updated_at)

-- 标签表
tags (id, name, color, user_id, created_at)

-- 项目标签关联表
project_tags (project_id, tag_id)
```

## 🔧 核心模块设计

### 1. 用户认证模块

```typescript
interface AuthService {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<AuthToken>;
  refreshToken(token: string): Promise<AuthToken>;
  logout(token: string): Promise<void>;
}
```

### 2. 项目管理模块

```typescript
interface ProjectService {
  createProject(userId: string, data: CreateProjectDto): Promise<Project>;
  updateProject(id: string, data: UpdateProjectDto): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  getUserProjects(userId: string): Promise<Project[]>;
}
```

### 3. 学习记录模块

```typescript
interface StudyRecordService {
  createRecord(projectId: string, data: CreateRecordDto): Promise<StudyRecord>;
  updateRecord(id: string, data: UpdateRecordDto): Promise<StudyRecord>;
  deleteRecord(id: string): Promise<void>;
  getProjectRecords(projectId: string, month: string): Promise<StudyRecord[]>;
  getCalendarData(
    projectId: string,
    year: number,
    month: number
  ): Promise<CalendarData>;
}
```

### 4. 文件管理模块

```typescript
interface FileService {
  uploadFile(file: File, userId: string): Promise<FileInfo>;
  deleteFile(fileId: string): Promise<void>;
  getFileUrl(fileId: string): Promise<string>;
}
```

## 📱 API 接口设计

### 认证相关

```
POST /api/auth/register     - 用户注册
POST /api/auth/login        - 用户登录
POST /api/auth/refresh      - 刷新Token
POST /api/auth/logout       - 用户登出
```

### 项目管理

```
GET    /api/projects        - 获取用户项目列表
POST   /api/projects        - 创建新项目
GET    /api/projects/:id    - 获取项目详情
PUT    /api/projects/:id    - 更新项目
DELETE /api/projects/:id    - 删除项目
```

### 学习记录

```
GET    /api/projects/:id/records     - 获取项目学习记录
POST   /api/projects/:id/records     - 创建学习记录
GET    /api/records/:id              - 获取记录详情
PUT    /api/records/:id              - 更新学习记录
DELETE /api/records/:id              - 删除学习记录
GET    /api/projects/:id/calendar    - 获取日历数据
```

### 文件管理

```
POST   /api/files/upload    - 上传文件
GET    /api/files/:id       - 获取文件信息
DELETE /api/files/:id       - 删除文件
```

## 🎨 前端组件架构

### 页面组件

```
src/views/
├── Home.vue              - 首页（项目列表）
├── ProjectDetail.vue      - 项目详情（月历）
├── RecordDetail.vue       - 记录详情
├── CreateRecord.vue       - 创建/编辑记录
└── Settings.vue           - 设置页面
```

### 通用组件

```
src/components/
├── ProjectCard.vue        - 项目卡片
├── Calendar.vue          - 日历组件
├── MarkdownEditor.vue    - Markdown编辑器
├── FileUpload.vue        - 文件上传
├── Statistics.vue        - 统计图表
└── TagSelector.vue       - 标签选择器
```

## 🔒 安全方案

### 1. 认证安全

- JWT Token 认证
- Refresh Token 机制
- 密码加密存储 (bcrypt)
- 登录失败次数限制

### 2. 数据安全

- 输入数据验证
- SQL 注入防护
- XSS 攻击防护
- CSRF 防护

### 3. 文件安全

- 文件类型限制
- 文件大小限制
- 病毒扫描
- 访问权限控制

## 📊 性能优化

### 前端优化

- 代码分割 (Code Splitting)
- 懒加载 (Lazy Loading)
- 图片压缩与懒加载
- 缓存策略

### 后端优化

- 数据库索引优化
- 查询性能优化
- Redis 缓存
- CDN 加速

## 🚀 部署方案

### 开发环境

```bash
# 前端开发
npm run dev

# 后端开发
npm run start:dev

# 数据库
docker-compose up -d postgres
```

### 生产环境

```
前端: Vercel
├── 自动部署
├── CDN 加速
└── HTTPS 证书

后端: Railway
├── 自动部署
├── 数据库托管
└── 监控告警

数据库: PostgreSQL
├── 主从复制
├── 定期备份
└── 性能监控
```

## 📈 监控与运维

### 应用监控

- 错误日志收集
- 性能指标监控
- 用户行为分析
- 系统健康检查

### 数据备份

- 数据库每日备份
- 文件存储备份
- 灾难恢复方案

## 🔄 版本规划

### MVP 版本 (v1.0)

- [x] 基础项目管理
- [x] 学习记录打卡
- [x] Markdown 编辑器
- [x] 日历视图

### 增强版本 (v1.1)

- [ ] 数据统计图表
- [ ] 学习目标设定
- [ ] 提醒功能
- [ ] 数据导出

### 高级版本 (v2.0)

- [ ] 团队协作
- [ ] 知识图谱
- [ ] AI 学习建议
- [ ] 移动端 App

## 🛠️ 开发工具

### 代码质量

- ESLint + Prettier
- Husky + lint-staged
- TypeScript 严格模式
- 单元测试 (Vitest)

### 项目管理

- Git Flow 工作流
- 代码审查
- 自动化测试
- 持续集成/部署

---

_本文档将随着项目发展持续更新_
