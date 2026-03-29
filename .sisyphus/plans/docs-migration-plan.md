# 文档迁移计划 - 模块文档落地

目标
- 将已生成的需求文档草案从 .sisyphus/drafts/ 转移至各自模块的 docs/ 子目录中，统一中文呈现，确保后续实现阶段可直接参考与填充。

范围
-  HotTopics
-  UserRecommendations
-  Discover/Greeting
-  Posts
-  Greeting
-  Users/Permissions
-  Recommendation Engine
-  Database Configuration

交付物
- 8 个模块的官方 docs/README.md（中文，包含模板字段初稿）
- 迁移日志，记录草案到正式文档的变更

模板结构（每个模块统一使用）
- 模块名
  - 1) Overview/Purpose
  - 2) Scope
     - In-scope
     - Out-of-scope
  - 3) API Surface
     - Endpoints (method, path)
     - Request/Response payload（示例）
     - 认证/授权要求
  - 4) Data Model Mapping
     - Prisma 模型对照
     - 关键字段及含义
  - 5) UI Flows
     - 主要界面/交互
  - 6) Acceptance Criteria
  - 7) Non-Functional Considerations
  - 8) Risks/Assumptions
  - 9) Open Questions
  - 10) References
  - 11) Change Log

迁移步骤（实施顺序）
1. 迁移准备
- 在 docs/ 子目录为每个模块创建 README.md 的骨架文件（8 个模块）
- 8 个目录及 README.md 文件路径预估如下：
  - docs/hot-topics/README.md
  - docs/user-recommendations/README.md
  - docs/discover-greeting/README.md
  - docs/posts/README.md
  - docs/greeting/README.md
  - docs/users-permissions/README.md
  - docs/recommendation-engine/README.md
  - docs/database-config/README.md

2. 草案落盘
- 逐个将 .sisyphus/drafts/docs-*.md 的内容映射到对应的 README.md 的模板字段中，填充初稿文本（中文）

3. 变更记录
- 在每个 README.md 中新增 Change Log，记录迁移时间、变更人等信息

4. 审阅与确认
- 由你进行最终审阅，确认无误后进入正式发布流程

里程碑
- M1: Skeleton README.md 已创建完成（0% -> 12.5%）
- M2: 草案内容填充完成（12.5% -> 75%）
- M3: 全部文档完成初稿（75% -> 100%）
- M4: 最终审阅与提交完成

风险与注意事项
- 需要确保草案模板字段与现有代码/数据库模型的一致性，避免口径差异导致实现偏离
- 中文模板需要精确翻译行业术语，避免歧义

变更日志
- 本文件用于跟踪文档迁移计划与执行状态
