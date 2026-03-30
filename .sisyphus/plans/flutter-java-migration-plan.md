# Flutter + Java 跨端项目迁移计划

## 项目概述

**当前架构**: Next.js + Express + Prisma + PostgreSQL + Redis + Socket.IO
**目标架构**: Flutter + Spring Boot + Java 17 + JPA + PostgreSQL + Redis + WebSocket

## 技术栈映射

| 模块 | 当前技术 | 目标技术 | 备注 |
|------|----------|----------|------|
| 前端框架 | Next.js 13 | Flutter 3.x | 跨平台(iOS/Android/Web) |
| 后端框架 | Express | Spring Boot 3.x | Java 17 |
| ORM | Prisma | JPA/Hibernate | 数据库操作 |
| 认证 | JWT (自定义) | Spring Security + JWT | 企业级安全 |
| 实时通信 | Socket.IO | WebSocket (STOMP) | 标准协议 |
| 缓存 | Redis | Redis (Spring Cache) | 保持不变 |
| 数据库 | PostgreSQL | PostgreSQL | 保持不变 |

## 迁移阶段 (14周)

### 阶段一: 基础设施搭建 (Week 1-2)

#### Flutter项目搭建
```bash
# 创建Flutter项目
flutter create soulmate_flutter

# 配置依赖 (pubspec.yaml)
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  provider: ^6.1.1
  shared_preferences: ^2.2.2
  flutter_secure_storage: ^9.0.0
  web_socket_channel: ^2.4.0
  cached_network_image: ^3.3.0
  flutter_bloc: ^8.1.3
  go_router: ^13.0.0
```

#### Spring Boot项目搭建
```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-websocket</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>
</dependencies>
```

#### 目录结构

**Flutter:**
```
lib/
├── main.dart
├── app.dart
├── config/
├── models/
├── services/
├── repositories/
├── blocs/
├── screens/
└── widgets/
```

**Spring Boot:**
```
src/main/java/com/soulmate/
├── SoulmateApplication.java
├── config/
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── security/
└── websocket/
```

### 阶段二: 用户认证模块 (Week 3-4)

#### API端点
```
POST /api/auth/register    - 用户注册
POST /api/auth/login       - 用户登录
POST /api/auth/refresh     - 刷新Token
GET  /api/auth/me          - 获取当前用户
```

#### 数据库实体
- User (id, email, passwordHash, role, createdAt)
- UserRole (USER, VIP, MODERATOR, ADMIN)

### 阶段三: 用户模块 (Week 5-6)

#### API端点
```
GET    /api/profile/:id       - 获取用户画像
PUT    /api/profile            - 更新画像
POST   /api/profile/avatar     - 上传头像
GET    /api/profile/interests  - 获取兴趣列表
```

### 阶段四: 推荐系统 (Week 7-8)

#### 算法组件
- 兴趣相似度: Jaccard系数 (权重: 0.4)
- 位置相似度: Haversine公式 (权重: 0.2)
- 灵魂测试: 余弦相似度 (权重: 0.2)
- 商业因子: 活跃度+VIP (权重: 0.2)

#### API端点
```
GET  /api/discover              - 获取推荐列表
POST /api/actions/like/:userId  - 喜欢
POST /api/actions/pass/:userId  - 跳过
POST /api/actions/greet/:userId - 打招呼
```

### 阶段五: 内容系统 (Week 9-10)

#### API端点
```
GET    /api/posts                    - 获取帖子列表
POST   /api/posts                    - 创建帖子
POST   /api/posts/:id/like           - 点赞
POST   /api/posts/:id/comments       - 评论
```

### 阶段六: 实时聊天 (Week 11-12)

#### WebSocket端点
```
ws://host/ws/chat                    - WebSocket连接
/app/chat.send                       - 发送消息
/topic/chat.{conversationId}         - 订阅聊天室
```

### 阶段七: 社区功能 (Week 13-14)

#### API端点
```
GET    /api/groups              - 获取群组列表
POST   /api/groups/:id/join     - 加入群组
GET    /api/soul-tests          - 获取测试列表
POST   /api/soul-tests/:id/submit - 提交测试
```

## API设计规范

### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 分页格式
```json
{
  "content": [],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20
  },
  "totalElements": 100
}
```

## 数据库迁移策略

1. 保持PostgreSQL数据库不变
2. 从Prisma schema导出DDL
3. 转换为JPA实体注解
4. 创建Repository接口
5. 数据迁移验证

## 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| API兼容性问题 | 中 | 高 | 版本控制，渐进迁移 |
| 数据迁移失败 | 低 | 高 | 完整备份，分批迁移 |
| WebSocket稳定性 | 中 | 中 | 心跳机制，断线重连 |
| 性能下降 | 低 | 中 | 性能测试，缓存优化 |

## 验收标准

### 功能验收
- [ ] 所有API端点正常响应
- [ ] 用户认证流程完整
- [ ] 推荐算法准确率 > 80%
- [ ] 实时聊天延迟 < 500ms

### 性能验收
- [ ] API响应时间 < 200ms (P95)
- [ ] 支持1000并发用户
- [ ] 缓存命中率 > 90%

### 安全验收
- [ ] JWT Token安全存储
- [ ] 密码加密存储
- [ ] SQL注入防护
- [ ] XSS/CSRF防护

## 变更日志

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-30 | v1.0 | 初始迁移计划 |
