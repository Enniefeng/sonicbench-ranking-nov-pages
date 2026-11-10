# SonicBench 三模型 MOS 页面

SonicBench 三模型 MOS 工具的 GitHub Pages 发布仓库。旧版四模型 Ranking 工单与本版不兼容。

- `admin.html`：管理员工单生成
- `annotate.html`：标注员评测，支持导入已有结果继续修改及显式恢复本机历史
- `review.html`：质检验收
- `index.html`：受访问码限制的总入口

页面只在浏览器本地处理导入数据，不会上传评测工单、Mapping 或结果 JSON。

标注入口提供三模型空白工单与已有结果两种测试 Case。手动粘贴未标注工单始终从空白开始；浏览器历史只会在用户点击“恢复记录”时载入。点击顶部入口返回时，未成功复制或下载结果会提示，但确认后仍可返回。

管理员输入使用显式“音频类型”列区分 Vocal / Non Vocal，不根据歌词是否为空推断。三个匿名候选逐首完成 MOS，不包含 Ranking 或 ELO。
