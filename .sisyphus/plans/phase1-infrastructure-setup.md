# Flutter + Java 迁移执行计划 - 阶段一

## 阶段一：基础设施搭建 (Week 1-2)

### 任务清单

#### 1. Flutter项目创建
- [ ] 创建Flutter项目目录结构
- [ ] 创建pubspec.yaml配置文件
- [ ] 创建main.dart入口文件
- [ ] 创建app.dart应用配置
- [ ] 创建主题配置(config/theme.dart)
- [ ] 创建路由配置(config/routes.dart)

#### 2. Spring Boot项目创建
- [ ] 创建Maven项目目录结构
- [ ] 创建pom.xml配置文件
- [ ] 创建application.yml配置
- [ ] 创建主应用类(SoulmateApplication.java)
- [ ] 创建包结构(controller/service/repository/entity/dto)

#### 3. 基础配置
- [ ] 配置数据库连接(PostgreSQL)
- [ ] 配置Redis连接
- [ ] 配置CORS跨域
- [ ] 配置JWT安全配置
- [ ] 配置日志系统

### 目录结构

#### Flutter结构
```
flutter_app/
├── pubspec.yaml
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── config/
│   │   ├── theme.dart
│   │   └── routes.dart
│   ├── models/
│   ├── services/
│   ├── repositories/
│   ├── blocs/
│   ├── screens/
│   └── widgets/
├── android/
├── ios/
└── web/
```

#### Spring Boot结构
```
spring_api/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/soulmate/
│   │   │   ├── SoulmateApplication.java
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── entity/
│   │   │   ├── dto/
│   │   │   ├── security/
│   │   │   └── websocket/
│   │   └── resources/
│   │       └── application.yml
│   └── test/
└── target/
```

### 文件内容规范

#### Flutter pubspec.yaml依赖
```yaml
dependencies:
  flutter_bloc: ^8.1.3      # 状态管理
  go_router: ^13.0.0        # 路由
  http: ^1.1.0              # HTTP请求
  dio: ^5.4.0               # HTTP客户端
  web_socket_channel: ^2.4.0 # WebSocket
  cached_network_image: ^3.3.0 # 图片缓存
  flutter_secure_storage: ^9.0.0 # 安全存储
  shared_preferences: ^2.2.2 # 本地存储
  image_picker: ^1.0.4      # 图片选择
  intl: ^0.19.0             # 国际化
```

#### Spring Boot pom.xml依赖
```xml
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
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>
  <dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
  </dependency>
</dependencies>
```

### 执行顺序
1. 创建目录结构
2. 创建配置文件
3. 创建入口文件
4. 创建基础类
5. 验证项目可运行

### 验收标准
- [ ] Flutter项目可成功编译
- [ ] Spring Boot项目可成功启动
- [ ] 数据库连接正常
- [ ] Redis连接正常
- [ ] API可正常访问

### 风险点
- Flutter SDK版本兼容性
- Java版本要求(需要17+)
- 依赖冲突
- 网络连接问题

### 变更日志
| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-30 | v1.0 | 创建阶段一执行计划 |
