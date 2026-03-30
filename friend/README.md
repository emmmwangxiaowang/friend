# Friend - SoulMate Dating App (Java Backend)

## 项目结构

```
friend/
├── pom.xml                          # 根模块
├── friend-common/                   # 公共模块
│   ├── pom.xml
│   └── src/main/java/com/soulmate/common/
│       ├── entity/BaseEntity.java   # 基础实体
│       ├── dto/ApiResponse.java     # 统一响应格式
│       ├── exception/               # 异常处理
│       └── config/                  # 公共配置
│
├── friend-modules/                  # 业务模块聚合
│   ├── pom.xml
│   ├── friend-auth/                 # 认证模块
│   │   ├── pom.xml
│   │   └── src/main/java/com/soulmate/
│   │       ├── auth/                # 认证功能
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   ├── security/
│   │       │   ├── entity/
│   │       │   ├── repository/
│   │       │   └── dto/
│   │       └── post/                # 帖子功能
│   │           ├── controller/
│   │           ├── service/
│   │           ├── entity/
│   │           └── repository/
│   │
│   └── friend-recommend/            # 推荐模块
│       ├── pom.xml
│       └── src/main/java/com/soulmate/recommend/
│           ├── controller/
│           ├── service/
│           ├── model/
│           └── config/
```

## 模块说明

| 模块 | 说明 | 端口 |
|------|------|------|
| friend-common | 公共工具类、基础实体、异常处理 | - |
| friend-auth | 用户认证、帖子系统 | 8081 |
| friend-recommend | 推荐算法 | 8082 |

## 构建与运行

### 构建整个项目
```bash
cd friend
mvn clean install
```

### 运行认证模块
```bash
cd friend/friend-modules/friend-auth
mvn spring-boot:run
```

### 运行推荐模块
```bash
cd friend/friend-modules/friend-recommend
mvn spring-boot:run
```

## API 端点

### 认证模块 (8081)
- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录
- POST /api/auth/refresh - 刷新Token
- GET /api/auth/me - 获取当前用户

### 帖子模块 (8081)
- GET /api/posts - 获取帖子列表
- POST /api/posts - 创建帖子
- GET /api/posts/:id - 获取帖子详情
- POST /api/posts/:id/like - 点赞
- POST /api/posts/:id/comments - 评论

### 推荐模块 (8082)
- GET /api/discover - 获取推荐列表
- POST /api/actions/like/:userId - 喜欢
- POST /api/actions/pass/:userId - 跳过
- POST /api/actions/greet/:userId - 打招呼

## 技术栈

- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Redis
- Maven
