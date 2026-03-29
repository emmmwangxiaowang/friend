# Flutter + Java 跨端项目迁移计划

## 1. 项目概述

### 1.1 当前架构
| 层级 | 技术栈 | 说明 |
|------|--------|------|
| 前端 | Next.js 13 + TypeScript | Web端应用 |
| 后端 | Express + TypeScript | RESTful API |
| 数据库 | PostgreSQL + Prisma ORM | 关系型数据库 |
| 缓存 | Redis | 会话/推荐缓存 |
| 实时通信 | Socket.IO | WebSocket聊天 |

### 1.2 目标架构
| 层级 | 技术栈 | 说明 |
|------|--------|------|
| 前端 | Flutter 3.x | 跨平台(iOS/Android/Web) |
| 后端 | Spring Boot 3.x + Java 17 | 微服务架构 |
| 数据库 | PostgreSQL + JPA/Hibernate | 关系型数据库 |
| 缓存 | Redis + Spring Cache | 分布式缓存 |
| 实时通信 | Spring WebSocket | STOMP协议 |

---

## 2. 迁移阶段划分

### 阶段一：基础设施搭建 (Week 1-2)
**目标**: 搭建Flutter和Spring Boot项目骨架

#### 2.1 Flutter项目搭建
- [ ] 创建Flutter项目 (soulmate_flutter)
- [ ] 配置项目依赖 (pubspec.yaml)
  - http: ^1.1.0
  - provider: ^6.1.1
  - shared_preferences: ^2.2.2
  - flutter_secure_storage: ^9.0.0
  - web_socket_channel: ^2.4.0
  - cached_network_image: ^3.3.0
  - flutter_bloc: ^8.1.3
  - go_router: ^13.0.0
- [ ] 配置主题系统 (Material Design 3)
- [ ] 搭建基础目录结构

#### 2.2 Spring Boot项目搭建
- [ ] 创建Spring Boot项目 (soulmate-api)
- [ ] 配置pom.xml依赖
  - spring-boot-starter-web
  - spring-boot-starter-data-jpa
  - spring-boot-starter-security
  - spring-boot-starter-websocket
  - spring-boot-starter-data-redis
  - spring-boot-starter-validation
  - jjwt (JSON Web Token)
  - lombok
  - mapstruct
- [ ] 配置application.yml
- [ ] 搭建基础目录结构

---

### 阶段二：用户认证模块迁移 (Week 3-4)
**目标**: 实现完整的用户认证系统

#### 2.1 后端 - Spring Security + JWT
- [ ] 创建User实体 (JPA)
- [ ] 创建UserRole枚举
- [ ] 实现UserRepository
- [ ] 实现UserService
- [ ] 实现JWT工具类
- [ ] 实现JwtAuthenticationFilter
- [ ] 实现AuthController (登录/注册/刷新Token)
- [ ] 配置SecurityConfig
- [ ] 实现密码加密 (BCrypt)

#### 2.2 前端 - Flutter认证模块
- [ ] 创建AuthRepository
- [ ] 创建AuthBloc/Cubit
- [ ] 创建LoginScreen
- [ ] 创建RegisterScreen
- [ ] 创建Token存储服务
- [ ] 创建HTTP拦截器 (自动附加Token)
- [ ] 实现路由守卫

#### 2.3 API端点
```
POST /api/auth/register    - 用户注册
POST /api/auth/login       - 用户登录
POST /api/auth/refresh     - 刷新Token
GET  /api/auth/me          - 获取当前用户
```

---

### 阶段三：用户模块迁移 (Week 5-6)
**目标**: 迁移用户画像、权限系统

#### 3.1 后端
- [ ] 创建Profile实体
- [ ] 创建Interest实体
- [ ] 创建Trait实体
- [ ] 创建Location实体
- [ ] 实现ProfileService
- [ ] 实现ProfileController
- [ ] 实现权限中间件 (@PreAuthorize)
- [ ] 实现角色检查注解

#### 3.2 前端
- [ ] 创建ProfileScreen
- [ ] 创建ProfileEditScreen
- [ ] 创建InterestSelector组件
- [ ] 创建AvatarUpload组件
- [ ] 创建用户卡片组件

#### 3.3 API端点
```
GET    /api/profile/:id       - 获取用户画像
PUT    /api/profile            - 更新画像
POST   /api/profile/avatar     - 上传头像
GET    /api/profile/interests  - 获取兴趣列表
POST   /api/profile/interests  - 添加兴趣
DELETE /api/profile/interests/:id - 删除兴趣
```

---

### 阶段四：推荐系统迁移 (Week 7-8)
**目标**: 迁移推荐算法和商业因子

#### 4.1 后端
- [ ] 创建RecommendationService
- [ ] 实现兴趣相似度算法 (Jaccard)
- [ ] 实现位置相似度算法 (Haversine)
- [ ] 实现灵魂测试匹配算法
- [ ] 实现商业因子权重
  - 用户活跃度 (0.1)
  - VIP权重 (0.15)
  - 互动频率 (0.1)
- [ ] 实现Redis缓存层
- [ ] 创建RecommendationController

#### 4.2 前端
- [ ] 创建DiscoverScreen (发现页)
- [ ] 创建UserCard组件 (可滑动)
- [ ] 创建LikeButton组件
- [ ] 创建PassButton组件
- [ ] 创建SuperLikeButton组件 (VIP)

#### 4.3 API端点
```
GET  /api/discover              - 获取推荐列表
POST /api/actions/like/:userId  - 喜欢
POST /api/actions/pass/:userId  - 跳过
POST /api/actions/greet/:userId - 打招呼
POST /api/recommendations/refresh - 刷新推荐
```

---

### 阶段五：内容系统迁移 (Week 9-10)
**目标**: 迁移帖子、评论、点赞功能

#### 5.1 后端
- [ ] 创建Post实体
- [ ] 创建Comment实体
- [ ] 创建PostLike实体
- [ ] 创建CommentLike实体
- [ ] 实现PostService
- [ ] 实现CommentService
- [ ] 实现PostController
- [ ] 实现分页查询

#### 5.2 前端
- [ ] 创建FeedScreen (动态流)
- [ ] 创建PostCard组件
- [ ] 创建PostDetailScreen
- [ ] 创建CreatePostScreen
- [ ] 创建CommentSection组件
- [ ] 创建LikeAnimation组件

#### 5.3 API端点
```
GET    /api/posts                    - 获取帖子列表
POST   /api/posts                    - 创建帖子
GET    /api/posts/:id                - 获取帖子详情
DELETE /api/posts/:id                - 删除帖子
POST   /api/posts/:id/like           - 点赞
DELETE /api/posts/:id/like           - 取消点赞
POST   /api/posts/:id/comments       - 评论
GET    /api/posts/:id/comments       - 获取评论
```

---

### 阶段六：实时聊天迁移 (Week 11-12)
**目标**: 迁移WebSocket实时聊天

#### 6.1 后端
- [ ] 配置WebSocket (STOMP协议)
- [ ] 创建Conversation实体
- [ ] 创建Message实体
- [ ] 实现ChatService
- [ ] 实现WebSocketHandler
- [ ] 实现消息持久化
- [ ] 实现离线消息推送

#### 6.2 前端
- [ ] 创建ChatListScreen
- [ ] 创建ChatScreen
- [ ] 创建MessageBubble组件
- [ ] 创建WebSocket服务
- [ ] 实现消息通知

#### 6.3 WebSocket端点
```
ws://host/ws/chat                    - WebSocket连接
/app/chat.send                       - 发送消息
/topic/chat.{conversationId}         - 订阅聊天室
/user/queue/messages                 - 个人消息队列
```

---

### 阶段七：社区功能迁移 (Week 13-14)
**目标**: 迁移社区、群组、灵魂测试

#### 7.1 后端
- [ ] 创建Group实体
- [ ] 创建SoulTest实体
- [ ] 创建SoulQuestion实体
- [ ] 实现GroupService
- [ ] 实现SoulTestService
- [ ] 实现数据种子

#### 7.2 前端
- [ ] 创建CommunityScreen
- [ ] 创建GroupScreen
- [ ] 创建SoulTestScreen
- [ ] 创建TestResultScreen

#### 7.3 API端点
```
GET    /api/groups              - 获取群组列表
POST   /api/groups              - 创建群组
POST   /api/groups/:id/join     - 加入群组
GET    /api/soul-tests          - 获取测试列表
POST   /api/soul-tests/:id/submit - 提交测试
GET    /api/soul-tests/:id/result - 获取结果
```

---

## 3. 数据库迁移策略

### 3.1 Prisma → JPA实体映射
| Prisma模型 | JPA实体 | 备注 |
|------------|---------|------|
| User | User.java | 添加role字段 |
| Profile | Profile.java | 一对一关系 |
| Post | Post.java | 一对多关系 |
| Comment | Comment.java | 自引用 |
| PostLike | PostLike.java | 联合唯一索引 |
| Message | Message.java | WebSocket消息 |
| Conversation | Conversation.java | 聊天会话 |
| Greeting | Greeting.java | 打招呼记录 |

### 3.2 数据迁移步骤
1. 导出现有PostgreSQL数据 (pg_dump)
2. 创建Spring Boot数据库配置
3. 运行JPA自动生成DDL
4. 导入历史数据
5. 验证数据完整性

---

## 4. API设计规范

### 4.1 RESTful规范
- GET: 查询资源
- POST: 创建资源
- PUT: 更新资源 (全量)
- PATCH: 更新资源 (部分)
- DELETE: 删除资源

### 4.2 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 4.3 错误处理
```json
{
  "code": 400,
  "message": "参数错误",
  "errors": []
}
```

### 4.4 分页格式
```json
{
  "content": [],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20
  },
  "totalElements": 100,
  "totalPages": 5
}
```

---

## 5. 前端架构设计

### 5.1 目录结构
```
lib/
├── main.dart
├── app.dart
├── config/
│   ├── routes.dart
│   └── theme.dart
├── models/
│   ├── user.dart
│   ├── post.dart
│   └── message.dart
├── services/
│   ├── api_service.dart
│   ├── auth_service.dart
│   └── websocket_service.dart
├── repositories/
│   ├── auth_repository.dart
│   ├── post_repository.dart
│   └── user_repository.dart
├── blocs/
│   ├── auth/
│   ├── post/
│   └── chat/
├── screens/
│   ├── auth/
│   ├── home/
│   ├── discover/
│   ├── community/
│   └── profile/
└── widgets/
    ├── user_card.dart
    ├── post_card.dart
    └── message_bubble.dart
```

### 5.2 状态管理
- 使用BLoC模式 (flutter_bloc)
- 全局状态: AuthBloc, ThemeBloc
- 页面状态: PostBloc, ChatBloc, UserBloc

---

## 6. 风险评估与缓解

### 6.1 技术风险
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| API兼容性问题 | 中 | 高 | 保持API版本控制，渐进式迁移 |
| 数据迁移失败 | 低 | 高 | 完整备份，分批迁移，回滚方案 |
| WebSocket稳定性 | 中 | 中 | 心跳机制，断线重连，消息确认 |
| 性能下降 | 低 | 中 | 性能测试，优化查询，缓存策略 |

### 6.2 项目风险
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 进度延迟 | 中 | 高 | 预留缓冲时间，关键路径监控 |
| 团队技能不足 | 低 | 中 | 培训计划，代码审查 |
| 需求变更 | 高 | 中 | 灵活架构，模块化设计 |

---

## 7. 交付物清单

### 7.1 后端交付物
- [ ] Spring Boot项目源码
- [ ] 数据库SQL脚本
- [ ] API文档 (Swagger)
- [ ] 部署文档
- [ ] 测试用例

### 7.2 前端交付物
- [ ] Flutter项目源码
- [ ] iOS/Android打包配置
- [ ] UI设计规范
- [ ] 用户手册
- [ ] 测试报告

---

## 8. 验收标准

### 8.1 功能验收
- [ ] 所有API端点正常响应
- [ ] 用户认证流程完整
- [ ] 推荐算法准确率 > 80%
- [ ] 实时聊天延迟 < 500ms
- [ ] 帖子点赞/评论功能正常

### 8.2 性能验收
- [ ] API响应时间 < 200ms (P95)
- [ ] 支持1000并发用户
- [ ] 数据库查询优化 (无慢查询)
- [ ] 缓存命中率 > 90%

### 8.3 安全验收
- [ ] JWT Token安全存储
- [ ] 密码加密存储
- [ ] SQL注入防护
- [ ] XSS防护
- [ ] CSRF防护

---

## 9. 变更日志

| 日期 | 版本 | 变更内容 | 作者 |
|------|------|----------|------|
| 2026-03-30 | v1.0 | 初始迁移计划 | Prometheus |
