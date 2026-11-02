# SonicBench November Pages

SonicBench 11 月四模型 MOS + Ranking 工具的 GitHub Pages 发布仓库。

- `admin.html`：管理员工单生成
- `annotate.html`：标注员评测，支持导入已有结果继续修改及显式恢复本机历史
- `review.html`：质检验收
- `index.html`：受访问码限制的总入口

页面只在浏览器本地处理导入数据，不会上传评测工单、Mapping 或结果 JSON。

标注入口提供空白工单与已有结果两种测试 Case。手动粘贴未标注工单始终从空白开始；浏览器历史只会在用户点击“恢复记录”时载入。

管理员输入使用显式“音频类型”列区分 Vocal / Non Vocal，不再根据歌词是否为空推断。Ranking 首次排序隐藏 MOS，提交后才显示整体 MOS 并执行一致性检查；同分不同排名时需填写统一理由。
