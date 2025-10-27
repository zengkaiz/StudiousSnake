# 贪学蛇 - API 接口规范

## 📋 接口概览

**Base URL**: `https://api.studysnake.com/v1`  
**认证方式**: Bearer Token (JWT)  
**数据格式**: JSON  
**字符编码**: UTF-8

## 🔐 认证接口

### 用户注册

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "username": "username",
      "avatar": null,
      "createdAt": "2025-01-23T10:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### 用户登录

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "username": "username",
      "avatar": "https://example.com/avatar.jpg"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### 刷新 Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 用户登出

```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

## 👤 用户接口

### 获取用户信息

```http
GET /api/users/profile
Authorization: Bearer <access_token>
```

**响应**:

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "username": "username",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2025-01-23T10:00:00Z",
    "updatedAt": "2025-01-23T10:00:00Z"
  }
}
```

### 更新用户信息

```http
PUT /api/users/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "username": "new_username",
  "avatar": "https://example.com/new_avatar.jpg"
}
```

## 📚 项目管理接口

### 获取项目列表

```http
GET /api/projects
Authorization: Bearer <access_token>
```

**响应**:

```json
{
  "success": true,
  "data": [
    {
      "id": "project_123",
      "name": "英语学习",
      "description": "每日单词 · 短语积累",
      "icon": "📖",
      "color": "#00ce33",
      "createdAt": "2025-01-23T10:00:00Z",
      "updatedAt": "2025-01-23T10:00:00Z",
      "stats": {
        "totalRecords": 45,
        "thisMonthRecords": 12,
        "continuousDays": 12
      }
    }
  ]
}
```

### 创建项目

```http
POST /api/projects
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "英语学习",
  "description": "每日单词 · 短语积累",
  "icon": "📖",
  "color": "#00ce33"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "id": "project_123",
    "name": "英语学习",
    "description": "每日单词 · 短语积累",
    "icon": "📖",
    "color": "#00ce33",
    "createdAt": "2025-01-23T10:00:00Z",
    "updatedAt": "2025-01-23T10:00:00Z"
  }
}
```

### 获取项目详情

```http
GET /api/projects/{projectId}
Authorization: Bearer <access_token>
```

### 更新项目

```http
PUT /api/projects/{projectId}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "英语学习进阶",
  "description": "高级词汇 · 语法练习"
}
```

### 删除项目

```http
DELETE /api/projects/{projectId}
Authorization: Bearer <access_token>
```

## 📝 学习记录接口

### 获取项目学习记录

```http
GET /api/projects/{projectId}/records
Authorization: Bearer <access_token>
Query Parameters:
  - month: 2025-10 (可选，默认当前月)
  - page: 1 (可选，默认1)
  - limit: 20 (可选，默认20)
```

**响应**:

```json
{
  "success": true,
  "data": {
    "records": [
      {
        "id": "record_123",
        "date": "2025-10-23",
        "duration": 2,
        "content": "## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的",
        "tags": ["单词", "短语"],
        "createdAt": "2025-01-23T10:00:00Z",
        "updatedAt": "2025-01-23T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

### 创建学习记录

```http
POST /api/projects/{projectId}/records
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "date": "2025-10-23",
  "duration": 2,
  "content": "## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的",
  "tags": ["单词", "短语"]
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "id": "record_123",
    "projectId": "project_123",
    "date": "2025-10-23",
    "duration": 2,
    "content": "## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的",
    "tags": ["单词", "短语"],
    "createdAt": "2025-01-23T10:00:00Z",
    "updatedAt": "2025-01-23T10:00:00Z"
  }
}
```

### 获取学习记录详情

```http
GET /api/records/{recordId}
Authorization: Bearer <access_token>
```

### 更新学习记录

```http
PUT /api/records/{recordId}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "duration": 3,
  "content": "## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的\n\n## 💡 学习心得\n\n今天学习了...",
  "tags": ["单词", "短语", "心得"]
}
```

### 删除学习记录

```http
DELETE /api/records/{recordId}
Authorization: Bearer <access_token>
```

## 📅 日历接口

### 获取日历数据

```http
GET /api/projects/{projectId}/calendar
Authorization: Bearer <access_token>
Query Parameters:
  - year: 2025 (可选，默认当前年)
  - month: 10 (可选，默认当前月)
```

**响应**:

```json
{
  "success": true,
  "data": {
    "year": 2025,
    "month": 10,
    "calendar": [
      {
        "date": "2025-10-01",
        "hasRecord": false,
        "recordId": null
      },
      {
        "date": "2025-10-02",
        "hasRecord": false,
        "recordId": null
      },
      {
        "date": "2025-10-03",
        "hasRecord": true,
        "recordId": "record_123"
      }
    ],
    "stats": {
      "totalDays": 31,
      "recordDays": 12,
      "completionRate": 38.7,
      "continuousDays": 5
    }
  }
}
```

## 📊 统计接口

### 获取项目统计

```http
GET /api/projects/{projectId}/stats
Authorization: Bearer <access_token>
Query Parameters:
  - period: month|year|all (可选，默认month)
  - startDate: 2025-10-01 (可选)
  - endDate: 2025-10-31 (可选)
```

**响应**:

```json
{
  "success": true,
  "data": {
    "totalRecords": 45,
    "totalDuration": 120,
    "averageDuration": 2.67,
    "continuousDays": 12,
    "completionRate": 85.2,
    "trends": {
      "daily": [
        { "date": "2025-10-01", "duration": 2, "records": 1 },
        { "date": "2025-10-02", "duration": 0, "records": 0 }
      ],
      "weekly": [{ "week": "2025-W40", "duration": 14, "records": 7 }]
    }
  }
}
```

### 获取用户总统计

```http
GET /api/users/stats
Authorization: Bearer <access_token>
```

**响应**:

```json
{
  "success": true,
  "data": {
    "totalProjects": 3,
    "totalRecords": 128,
    "totalDuration": 256,
    "totalDays": 45,
    "averageDailyDuration": 5.69,
    "projects": [
      {
        "id": "project_123",
        "name": "英语学习",
        "records": 45,
        "duration": 120,
        "completionRate": 85.2
      }
    ]
  }
}
```

## 🏷️ 标签接口

### 获取用户标签

```http
GET /api/tags
Authorization: Bearer <access_token>
```

**响应**:

```json
{
  "success": true,
  "data": [
    {
      "id": "tag_123",
      "name": "单词",
      "color": "#00ce33",
      "count": 25,
      "createdAt": "2025-01-23T10:00:00Z"
    }
  ]
}
```

### 创建标签

```http
POST /api/tags
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "语法",
  "color": "#3b82f6"
}
```

### 更新标签

```http
PUT /api/tags/{tagId}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "语法练习",
  "color": "#8b5cf6"
}
```

### 删除标签

```http
DELETE /api/tags/{tagId}
Authorization: Bearer <access_token>
```

## 📁 文件接口

### 上传文件

```http
POST /api/files/upload
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Form Data:
  - file: <file>
  - type: image|document (可选，默认image)
```

**响应**:

```json
{
  "success": true,
  "data": {
    "id": "file_123",
    "filename": "image.jpg",
    "originalName": "avatar.jpg",
    "size": 1024000,
    "mimeType": "image/jpeg",
    "url": "https://cdn.studysnake.com/files/file_123.jpg",
    "createdAt": "2025-01-23T10:00:00Z"
  }
}
```

### 获取文件信息

```http
GET /api/files/{fileId}
Authorization: Bearer <access_token>
```

### 删除文件

```http
DELETE /api/files/{fileId}
Authorization: Bearer <access_token>
```

## 🔍 搜索接口

### 全局搜索

```http
GET /api/search
Authorization: Bearer <access_token>
Query Parameters:
  - q: 搜索关键词
  - type: project|record|all (可选，默认all)
  - page: 1 (可选，默认1)
  - limit: 20 (可选，默认20)
```

**响应**:

```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "project_123",
        "name": "英语学习",
        "description": "每日单词 · 短语积累",
        "matchType": "name",
        "matchText": "英语学习"
      }
    ],
    "records": [
      {
        "id": "record_123",
        "projectId": "project_123",
        "projectName": "英语学习",
        "date": "2025-10-23",
        "content": "## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的",
        "matchType": "content",
        "matchText": "eloquent"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
```

## ❌ 错误响应

### 标准错误格式

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "输入数据验证失败",
    "details": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      }
    ]
  }
}
```

### 常见错误码

- `400` - 请求参数错误
- `401` - 未授权访问
- `403` - 权限不足
- `404` - 资源不存在
- `409` - 资源冲突
- `422` - 数据验证失败
- `429` - 请求频率限制
- `500` - 服务器内部错误

## 📝 请求示例

### 使用 curl

```bash
# 用户登录
curl -X POST https://api.studysnake.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# 获取项目列表
curl -X GET https://api.studysnake.com/v1/projects \
  -H "Authorization: Bearer <access_token>"

# 创建学习记录
curl -X POST https://api.studysnake.com/v1/projects/project_123/records \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-10-23","duration":2,"content":"## 今日学习","tags":["单词"]}'
```

### 使用 JavaScript

```javascript
// 用户登录
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});

// 获取项目列表
const projectsResponse = await fetch('/api/projects', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

---

_本文档将随着 API 演进持续更新_
