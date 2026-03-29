# Docs Migration Execution Plan (Chinese)

目标
- 将现有的需求文档草案从 .sisyphus/drafts/ 转移到各自模块的 docs/ 子目录中，统一中文呈现。

范围
- 模块清单：HotTopics、UserRecommendations、Discover/Greeting、Posts、Greeting、Users/Permissions、Recommendation Engine、Database Configuration

交付物
- 每个模块的 docs/README.md（中文初稿）
- Migration 日志，记录迁移时间、变更人、初始状态与完成状态

前置条件
- 已存在草案草案文件：.sisyphus/drafts/docs-*.md（8 个）

迁移步骤（逐步执行）
1) 创建 docs 子目录与 README.md 骨架
- docs/hot-topics/README.md
- docs/user-recommendations/README.md
- docs/discover-greeting/README.md
- docs/posts/README.md
- docs/greeting/README.md
- docs/users-permissions/README.md
- docs/recommendation-engine/README.md
- docs/database-config/README.md

2) 将 drafts 的内容填充到对应 README.md 的模板字段中，保持模板结构一致（Overview、Scope、API Surface、Data Model Mapping、UI Flows、Acceptance Criteria、Non-Functional、Risks/Assumptions、Open Questions、References、Change Log）

3) 验证与一致性检查
- 确认 README.md 包含所有模板字段
- 引用 Prisma 模型字段与端点，确保一致性
- 检查 UI 流程描述与前端实现的对齐

4) 变更日志
- 在每个 README.md 中添加 Change Log，记录迁移信息

5) 提交与发布
- 使用单次提交完成所有模块的文档迁移
- 推送到远端并保留变更日志

里程碑
- M1: README.md 骨架创建完成
- M2: 草案内容填充完成
- M3: 统一验收与审阅
- M4: 正式提交与发布

风险与缓解
- 风险：草案与实现之间存在不一致，需在后续阶段持续对齐。
- 缓解：在模板中尽量以引用现有模型和端点的方式描述。

变更日志
- 计划文档已创建，等待你确认后执行迁移。
