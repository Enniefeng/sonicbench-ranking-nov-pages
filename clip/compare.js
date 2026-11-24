(function () {
  "use strict";
  const S = window.SB_NOV;
  const R = window.SB_NOV_RUBRIC;
  const root = document.getElementById("comparison-app");
  if (!S || !R || !root) return;

  const state = { referenceText: "", candidateText: "", reference: null, candidate: null, errors: [], warning: "", selected: 0, filter: "all", tolerance: 1 };
  const h = S.escapeHtml;

  function activeDimensions(task) {
    const excluded = task.case_type === "non_vocal" ? new Set(R.nonVocalExcludedDimensions) : new Set();
    return R.dimensions.filter((dimension) => !excluded.has(dimension.key));
  }

  function validateResult(result, label) {
    const errors = [];
    const task = result?.work_order;
    if (result?.schema_version !== S.RESULT_SCHEMA) errors.push(`${label}不是当前三模型 MOS 结果`);
    if (task?.schema_version !== S.WORK_ORDER_SCHEMA) errors.push(`${label}缺少当前版本工单`);
    if (!task?.case?.case_id) errors.push(`${label}缺少 Case ID`);
    if (!["vocal", "non_vocal"].includes(task?.case_type)) errors.push(`${label}音频类型无效`);
    if (!Array.isArray(task?.candidates) || task.candidates.length !== 3) errors.push(`${label}须包含 3 个匿名音频`);
    else {
      const ids = task.candidates.map((item) => item?.blind_id);
      if (ids.some((id) => !id) || new Set(ids).size !== 3) errors.push(`${label}匿名音频 ID 缺失或重复`);
      task.candidates.forEach((item, index) => { if (!S.isUrl(item?.url)) errors.push(`${label}候选 ${index + 1} 音频 URL 无效`); });
    }
    if (!Array.isArray(result?.mos)) errors.push(`${label}缺少 MOS 结果`);
    else if (task?.candidates?.length === 3) {
      const resultIds = result.mos.map((item) => item?.blind_id);
      if (resultIds.length !== 3 || new Set(resultIds).size !== 3 || task.candidates.some((item) => !resultIds.includes(item.blind_id))) errors.push(`${label}的 MOS 候选与工单不一致`);
    }
    return errors;
  }

  function validatePair(reference, candidate) {
    const errors = [...validateResult(reference, "参考答案"), ...validateResult(candidate, "标注员结果")];
    if (errors.length) return errors;
    const a = reference.work_order;
    const b = candidate.work_order;
    if (a.case.case_id !== b.case.case_id || a.batch_id !== b.batch_id) errors.push("两份结果的 Case ID 或批次不同");
    if (a.case_type !== b.case_type) errors.push("两份结果的 Vocal / Non Vocal 类型不同");
    if (a.candidates.some((item, index) => item.blind_id !== b.candidates[index].blind_id || S.normalizeUrl(item.url) !== S.normalizeUrl(b.candidates[index].url))) errors.push("两份结果的匿名音频 ID、顺序或 URL 不一致，不能对比");
    return errors;
  }

  function rowsFor(reference, candidate, candidateIndex, tolerance) {
    const blindId = reference.work_order.candidates[candidateIndex].blind_id;
    const ref = reference.mos.find((item) => item.blind_id === blindId) || {};
    const got = candidate.mos.find((item) => item.blind_id === blindId) || {};
    return activeDimensions(reference.work_order).map((dimension) => {
      const a = ref.scores?.[dimension.key];
      const b = got.scores?.[dimension.key];
      const numeric = Number.isInteger(Number(a)) && Number.isInteger(Number(b)) && Number(a) >= 1 && Number(a) <= 5 && Number(b) >= 1 && Number(b) <= 5;
      const delta = numeric ? Number(b) - Number(a) : null;
      const status = a == null || b == null ? "missing" : String(a) === String(b) ? "exact" : numeric && Math.abs(delta) <= tolerance ? "acceptable" : "outlier";
      return { dimension, referenceScore: a, candidateScore: b, delta, status,
        referenceIssues: Array.isArray(ref.issues?.[dimension.key]) ? ref.issues[dimension.key] : [], candidateIssues: Array.isArray(got.issues?.[dimension.key]) ? got.issues[dimension.key] : [],
        referenceNote: ref.notes?.[dimension.key] || "", candidateNote: got.notes?.[dimension.key] || "" };
    });
  }

  function metrics(reference, candidate, tolerance) {
    const rows = reference.work_order.candidates.flatMap((_, index) => rowsFor(reference, candidate, index, tolerance));
    return { total: rows.length, exact: rows.filter((row) => row.status === "exact").length,
      acceptable: rows.filter((row) => row.status === "acceptable").length,
      outlier: rows.filter((row) => row.status === "outlier").length,
      missing: rows.filter((row) => row.status === "missing").length };
  }

  function issueLabels(dimension, ids, caseType) {
    const options = dimension.optionsByCase?.[caseType] || dimension.options || [];
    const names = new Map(options.map((option) => [option.id, option.label]));
    return ids.map((id) => names.get(id) || id);
  }

  function renderImport() {
    root.innerHTML = `<header class="page-heading"><div><span class="eyebrow">QUALITY REVIEW</span><h1>参考答案对比</h1><p>粘贴同一 Case 的参考答案与标注员结果，逐候选检查 MOS 分数、问题选项和备注。</p></div><span class="badge">3 模型 · CLIP MOS</span></header>
      <section class="card"><div class="card-header"><div><h2>导入两份结果 JSON</h2><p class="field-help">两份结果须使用同一脱敏工单；本页面只在浏览器本地解析。</p></div><button class="button small" data-action="demo">加载对比演示</button></div><div class="card-body"><div class="compare-import-grid"><label class="compare-input-label"><strong>参考答案</strong><textarea class="code-input" data-input="reference" placeholder="粘贴参考答案 JSON">${h(state.referenceText)}</textarea></label><label class="compare-input-label"><strong>标注员结果</strong><textarea class="code-input" data-input="candidate" placeholder="粘贴标注员结果 JSON">${h(state.candidateText)}</textarea></label></div>${state.errors.length ? `<div class="alert error"><strong>暂时无法对比</strong><ul>${state.errors.map((error) => `<li>${h(error)}</li>`).join("")}</ul></div>` : ""}<div class="toolbar split"><label class="compare-tolerance">MOS 容差 <select data-tolerance><option value="1" ${state.tolerance === 1 ? "selected" : ""}>±1 分</option><option value="2" ${state.tolerance === 2 ? "selected" : ""}>±2 分</option></select></label><button class="button primary" data-action="compare">开始对比</button></div></div></section>`;
  }

  function renderEvidence(row, caseType) {
    const refIssues = issueLabels(row.dimension, row.referenceIssues, caseType);
    const gotIssues = issueLabels(row.dimension, row.candidateIssues, caseType);
    const block = (title, issues, note) => `<div class="compare-evidence-panel"><strong>${title}</strong><div><span>问题选项</span><p>${issues.length ? issues.map((item) => `<em>${h(item)}</em>`).join("") : "—"}</p></div><div><span>备注</span><p class="compare-note">${h(note || "—")}</p></div></div>`;
    return `<div class="compare-evidence">${block("参考答案", refIssues, row.referenceNote)}${block("标注员结果", gotIssues, row.candidateNote)}</div>`;
  }

  function renderRows() {
    const caseType = state.reference.work_order.case_type;
    const rows = rowsFor(state.reference, state.candidate, state.selected, state.tolerance).filter((row) => state.filter === "all" || (state.filter === "different" ? row.status !== "exact" : ["outlier", "missing"].includes(row.status)));
    if (!rows.length) return `<div class="compare-empty">此筛选下没有评分项。</div>`;
    const groups = new Map(R.groups.map((group) => [group.key, group.label.replace(/^\d+[.．、]\s*/, "").replace(/\s*[（(].*?[）)]\s*$/, "")]));
    return rows.map((row) => {
      const statusText = { exact: "一致", acceptable: "容差内", outlier: "需复核", missing: "缺失评分" }[row.status];
      const score = (value) => value == null || value === "" ? "—" : h(value);
      return `<details class="compare-row ${row.status}"><summary><span class="compare-dimension"><small>${h(groups.get(row.dimension.groupKey) || "总体")}</small><strong>${h(row.dimension.label.replace(/^\d+[.．、]\s*/, ""))}</strong></span><span class="compare-score">${score(row.referenceScore)}</span><span class="compare-score">${score(row.candidateScore)}</span><span class="compare-delta">${row.delta == null ? "—" : row.delta > 0 ? `+${row.delta}` : row.delta}</span><span class="compare-status">${statusText}</span><span class="compare-expand">查看依据</span></summary>${renderEvidence(row, caseType)}</details>`;
    }).join("");
  }

  function renderComparison() {
    const task = state.reference.work_order;
    const summary = metrics(state.reference, state.candidate, state.tolerance);
    const candidate = task.candidates[state.selected];
    root.innerHTML = `<header class="page-heading"><div><span class="eyebrow">${h(task.case.case_id)} · ${h(task.case_type === "vocal" ? "Vocal" : "Non Vocal")}</span><h1>验收对比</h1><p>参考答案固定，逐项查看标注结果。容差仅供辅助判断，问题选项和备注仍需人工复核。</p></div><button class="button" data-action="back">返回导入</button></header>
      ${state.warning ? `<div class="alert warning">${h(state.warning)}</div>` : ""}
      <section class="compare-summary"><div><span>评分项</span><strong>${summary.total}</strong></div><div><span>完全一致</span><strong>${summary.exact}</strong></div><div><span>容差内</span><strong>${summary.acceptable}</strong></div><div class="${summary.outlier || summary.missing ? "attention" : ""}"><span>需复核 / 缺失</span><strong>${summary.outlier + summary.missing}</strong></div></section>
      <div class="compare-layout"><aside class="card compare-sidebar"><div class="card-header"><h2>匿名候选</h2></div><div class="compare-candidates">${task.candidates.map((item, index) => `<button data-candidate="${index}" class="${index === state.selected ? "active" : ""}">候选 ${String(index + 1).padStart(2, "0")}<small>${h(item.blind_id)}</small></button>`).join("")}</div><div class="compare-sidebar-foot"><strong>Case 信息</strong><p>${h(task.case.info || "—")}</p>${task.case.lyrics ? `<strong>歌词</strong><p>${h(task.case.lyrics)}</p>` : ""}</div></aside>
      <div class="compare-main"><section class="card compare-player"><div class="card-body"><div><strong>候选 ${String(state.selected + 1).padStart(2, "0")} · 试听音频</strong><span>${h(candidate.blind_id)}</span></div><audio controls preload="metadata" src="${h(candidate.url)}"></audio></div></section>
      <section class="card compare-results"><div class="card-header"><div><h2>MOS 分层对比</h2><p class="field-help">点击维度行，可并排查看双方的问题选项和备注。</p></div><label class="compare-tolerance">MOS 容差 <select data-tolerance><option value="1" ${state.tolerance === 1 ? "selected" : ""}>±1 分</option><option value="2" ${state.tolerance === 2 ? "selected" : ""}>±2 分</option></select></label></div><div class="compare-filters"><button data-filter="all" class="${state.filter === "all" ? "active" : ""}">全部</button><button data-filter="different" class="${state.filter === "different" ? "active" : ""}">有差异</button><button data-filter="outlier" class="${state.filter === "outlier" ? "active" : ""}">仅需复核</button></div><div class="compare-table-head"><span>维度</span><span>参考分</span><span>标注分</span><span>差值</span><span>判断</span><span></span></div>${renderRows()}</section><div class="toolbar split"><p class="field-help">如需修改，可将标注员结果带入单份质检；参考答案不会写入待修改结果。</p><div class="toolbar"><button class="button" data-action="edit">转入单份质检修改</button><button class="button primary" data-action="next">继续对比下一份</button></div></div></div></div>`;
  }

  function render() { state.reference && state.candidate ? renderComparison() : renderImport(); }

  function parseInput(text, label) {
    const parsed = S.safeJson(text);
    return parsed.error ? { error: `${label} JSON 无法解析：${parsed.error}` } : { value: parsed.value };
  }

  function compare() {
    const ref = parseInput(state.referenceText, "参考答案");
    const got = parseInput(state.candidateText, "标注员结果");
    state.errors = [ref.error, got.error].filter(Boolean);
    if (!state.errors.length) state.errors = validatePair(ref.value, got.value);
    if (state.errors.length) { render(); S.toast("请检查两份结果是否对应", "error"); return; }
    state.reference = ref.value;
    state.candidate = got.value;
    state.selected = 0;
    state.filter = "all";
    state.warning = ref.value.work_order.fingerprint !== got.value.work_order.fingerprint ? "两份工单指纹不同，但 Case、音频 ID 与 URL 均一致。请核对是否为同一次工单。" : "";
    render();
  }

  root.addEventListener("input", (event) => {
    if (event.target.matches('[data-input="reference"]')) state.referenceText = event.target.value;
    if (event.target.matches('[data-input="candidate"]')) state.candidateText = event.target.value;
  });
  root.addEventListener("change", (event) => {
    if (event.target.matches("[data-tolerance]")) { state.tolerance = Number(event.target.value) || 1; render(); }
  });
  root.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-action], [data-candidate], [data-filter]");
    if (!target) return;
    if (target.dataset.action === "compare") compare();
    if (target.dataset.action === "back") { state.reference = null; state.candidate = null; render(); }
    if (target.dataset.action === "next") { state.reference = null; state.candidate = null; state.candidateText = ""; state.errors = []; render(); }
    if (target.dataset.action === "edit") {
      try { sessionStorage.setItem("sonicbench_clip_review_transfer_v1", JSON.stringify(state.candidate)); }
      catch (error) { S.toast("浏览器无法暂存结果，请手动复制到单份质检页", "error"); return; }
      window.location.href = "review.html";
    }
    if (target.dataset.action === "demo") {
      const ref = await window.SB_NOV_DEMO.completedResult();
      const got = JSON.parse(JSON.stringify(ref));
      got.mos[0].scores.melody = 2;
      got.mos[0].issues = got.mos[0].issues || {};
      got.mos[0].issues.melody = ["MELODY_01"];
      got.mos[0].notes.melody = "旋律辨识度偏低，建议复听。";
      state.referenceText = JSON.stringify(ref);
      state.candidateText = JSON.stringify(got);
      state.errors = [];
      render();
      S.toast("已载入三模型对比演示");
    }
    if (target.dataset.candidate != null) { state.selected = Number(target.dataset.candidate); render(); }
    if (target.dataset.filter) { state.filter = target.dataset.filter; render(); }
  });
  window.SB_NOV_COMPARE = { validateResult, validatePair, rowsFor, metrics };
  render();
})();
