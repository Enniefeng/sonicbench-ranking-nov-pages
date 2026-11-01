(function () {
  "use strict";
  const S = window.SB_NOV;
  const R = window.SB_NOV_RUBRIC;
  const root = document.getElementById("evaluation-app");
  const mode = document.body.dataset.mode === "review" ? "review" : "annotate";
  if (!S || !R || !root) return;

  const dimensionByKey = new Map(R.dimensions.map((dimension) => [dimension.key, dimension]));
  let draggingRankId = "";
  let rankInsertion = null;
  let rankDropCommitted = false;
  const state = {
    screen: "import",
    paste: "",
    task: null,
    mos: {},
    rankings: {},
    rankingInitial: {},
    rankingNote: "",
    currentCandidate: 0,
    currentGroup: 0,
    currentRanking: 0,
    rankingSubmitted: false,
    conflicts: [],
    startedAt: null,
    baseline: null,
    sourceResult: null,
    result: null,
    validation: []
  };

  function candidateLabel(index) { return `候选 ${String(index + 1).padStart(2, "0")}`; }
  function isOverallDimension(dimension) { return dimension?.key === "overall" || dimension?.key?.endsWith("_overall"); }
  function displayDimensionLabel(dimension) {
    const label = dimension?.labelByCase?.[state.task?.case_type] || dimension?.label || "";
    return isOverallDimension(dimension) ? label.replace(/^\d+\s*[.．、]\s*/, "") : label;
  }
  function displayGroupLabel(group) {
    const label = group?.labelByCase?.[state.task?.case_type] || group?.label || "";
    return label.replace(/^\d+\s*[.．、]\s*/, "").replace(/\s*[（(].*?[）)]\s*$/, "").trim();
  }
  function displayDimensionOptions(dimension) { return dimension?.optionsByCase?.[state.task?.case_type] || dimension?.options || []; }
  function activeDimensions() {
    const excluded = state.task?.case_type === "non_vocal" ? new Set(R.nonVocalExcludedDimensions) : new Set();
    return R.dimensions.filter((dimension) => !excluded.has(dimension.key));
  }
  function activeGroups() {
    const keys = new Set(activeDimensions().map((dimension) => dimension.key));
    return R.groups.map((group) => ({ ...group, dimensions: group.dimensions.filter((key) => keys.has(key)) })).filter((group) => group.dimensions.length);
  }
  function activeRankingDimensions() { return R.rankingDimensions.filter((dimension) => !(dimension.vocalOnly && state.task?.case_type === "non_vocal")); }
  function blankAnswer() { return { scores: {}, issues: {}, notes: {} }; }

  function initializeTask(task) {
    state.task = task;
    state.mos = Object.fromEntries(task.candidates.map((candidate) => [candidate.blind_id, blankAnswer()]));
    state.rankings = {};
    state.rankingInitial = {};
    activeRankingDimensions().forEach((dimension) => { state.rankings[dimension.key] = task.candidates.map((candidate) => candidate.blind_id); });
    state.rankingNote = "";
    state.currentCandidate = 0;
    state.currentGroup = 0;
    state.currentRanking = 0;
    state.rankingSubmitted = false;
    state.conflicts = [];
    state.startedAt = new Date().toISOString();
    state.result = null;
    state.validation = [];
  }

  function validateTask(task) {
    const errors = [];
    if (!task || task.schema_version !== S.WORK_ORDER_SCHEMA) errors.push("工单 Schema 不匹配，请使用 11 月独立版管理员工具生成的工单");
    if (!task?.case?.case_id) errors.push("缺少 case.case_id");
    if (!task?.case?.info) errors.push("缺少 case.info");
    if (!Array.isArray(task?.candidates) || task.candidates.length !== 4) errors.push("必须包含 4 个匿名候选");
    else task.candidates.forEach((candidate, index) => {
      if (!candidate.blind_id) errors.push(`候选 ${index + 1} 缺少 blind_id`);
      if (!S.isUrl(candidate.url)) errors.push(`候选 ${index + 1} 的音频 URL 无效`);
    });
    if (!["vocal", "non_vocal"].includes(task?.case_type)) errors.push("case_type 必须为 vocal 或 non_vocal");
    if (!task?.fingerprint) errors.push("缺少工单 fingerprint");
    return errors;
  }

  function importValue() {
    const parsed = S.safeJson(state.paste);
    if (parsed.error) return showImportErrors([`JSON 无法解析：${parsed.error}`]);
    if (mode === "annotate") {
      const errors = validateTask(parsed.value);
      if (errors.length) return showImportErrors(errors);
      initializeTask(parsed.value);
      state.baseline = null;
      state.sourceResult = null;
      state.screen = "mos";
    } else {
      const result = parsed.value;
      if (!result || result.schema_version !== S.RESULT_SCHEMA || !result.work_order) return showImportErrors(["结果 Schema 不匹配，或缺少 work_order"]);
      const errors = validateTask(result.work_order);
      if (errors.length) return showImportErrors(errors);
      initializeTask(result.work_order);
      loadResult(result);
      state.baseline = snapshotAnswers();
      state.sourceResult = JSON.parse(JSON.stringify(result));
      state.screen = "mos";
    }
    render();
  }

  function showImportErrors(errors) { state.validation = errors; render(); S.toast("无法载入，请查看提示", "error"); }

  function loadResult(result) {
    (result.mos || []).forEach((entry) => {
      if (!state.mos[entry.blind_id]) return;
      state.mos[entry.blind_id] = {
        scores: { ...(entry.scores || {}) },
        issues: JSON.parse(JSON.stringify(entry.issues || {})),
        notes: { ...(entry.notes || {}) }
      };
    });
    activeRankingDimensions().forEach((dimension) => {
      const entry = result.rankings?.[dimension.key];
      const order = Array.isArray(entry) ? entry : entry?.final || entry?.order;
      if (Array.isArray(order) && order.length === 4) state.rankings[dimension.key] = order.slice();
    });
    state.rankingNote = result.ranking_note || "";
    state.rankingSubmitted = true;
    state.startedAt = result.started_at || new Date().toISOString();
    state.conflicts = computeConflicts();
  }

  function answerFor(candidateIndex) { return state.mos[state.task.candidates[candidateIndex].blind_id]; }
  function scoreValue(answer, key) { return answer?.scores?.[key]; }
  function isNumericScore(value) { return Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 5; }

  function dimensionErrors(answer, dimension) {
    const errors = [];
    const score = scoreValue(answer, dimension.key);
    const allowedIssueIds = new Set(displayDimensionOptions(dimension).map((option) => option.id));
    const issues = (answer.issues?.[dimension.key] || []).filter((id) => allowedIssueIds.has(id));
    const note = String(answer.notes?.[dimension.key] || "").trim();
    if (score == null || score === "") return ["未评分"];
    if (score === "NA") {
      if (!dimension.allowNA) errors.push("该维度不能选择 N/A");
      if (!note) errors.push(`${dimension.noteLabel}：选择 N/A 后必填`);
      return errors;
    }
    const numeric = Number(score);
    if (!isNumericScore(score)) errors.push("分数无效");
    if (dimension.issueRule === "low3" && numeric <= 3 && !issues.length) errors.push(`${dimension.issueLabel}：至少选择一项`);
    if (dimension.issueRule === "below5" && numeric < 5 && !issues.length) errors.push(`${dimension.issueLabel}：至少选择一项`);
    if (dimension.noteRule === "always" && !note) errors.push(`${dimension.noteLabel}：必填`);
    if (dimension.noteRule === "low3" && numeric <= 3 && !note) errors.push(`${dimension.noteLabel}：必填`);
    if (dimension.noteRule === "below5" && numeric < 5 && !note) errors.push(`${dimension.noteLabel}：必填`);
    return errors;
  }

  function validateCandidate(index) {
    const answer = answerFor(index);
    return activeDimensions().flatMap((dimension) => dimensionErrors(answer, dimension).map((message) => ({ candidateIndex: index, dimensionKey: dimension.key, message })));
  }
  function validateGroup(candidateIndex, groupIndex) {
    const answer = answerFor(candidateIndex);
    const group = activeGroups()[groupIndex];
    if (!group) return [];
    return group.dimensions.flatMap((key) => {
      const dimension = dimensionByKey.get(key);
      return dimensionErrors(answer, dimension).map((message) => ({ candidateIndex, dimensionKey: key, message }));
    });
  }
  function groupComplete(candidateIndex, groupIndex) { return validateGroup(candidateIndex, groupIndex).length === 0; }
  function validateAllMos() { return state.task.candidates.flatMap((_, index) => validateCandidate(index)); }
  function candidateComplete(index) { return validateCandidate(index).length === 0; }

  function computeConflicts() {
    return S.rankingConflicts(state.task, state.mos, state.rankings, activeRankingDimensions());
  }

  function submitRanking() {
    const mosErrors = validateAllMos();
    if (mosErrors.length) { state.screen = "mos"; state.currentCandidate = mosErrors[0].candidateIndex; state.currentGroup = activeGroups().findIndex((item) => item.dimensions.includes(mosErrors[0].dimensionKey)); state.validation = mosErrors; render(); jumpToError(mosErrors[0]); return; }
    state.rankingSubmitted = true;
    state.conflicts = computeConflicts();
    render();
    if (state.conflicts.length) S.toast(`发现 ${state.conflicts.length} 处 MOS 与 Ranking 冲突`, "error");
    else S.toast("一致性检查通过，可以导出结果");
  }

  function snapshotAnswers() {
    return { mos: JSON.parse(JSON.stringify(state.mos)), rankings: JSON.parse(JSON.stringify(state.rankings)), ranking_note: state.rankingNote };
  }

  function collectChanges(before, after, path, output) {
    if (JSON.stringify(before) === JSON.stringify(after)) return;
    const beforeObject = before && typeof before === "object";
    const afterObject = after && typeof after === "object";
    if (beforeObject && afterObject && !Array.isArray(before) && !Array.isArray(after)) {
      new Set([...Object.keys(before), ...Object.keys(after)]).forEach((key) => collectChanges(before[key], after[key], path ? `${path}.${key}` : key, output));
    } else output.push({ path, before: before == null ? null : before, after: after == null ? null : after });
  }

  function buildResult() {
    const now = new Date().toISOString();
    const mos = state.task.candidates.map((candidate) => {
      const answer = state.mos[candidate.blind_id];
      return S.compactObject({ blind_id: candidate.blind_id, scores: answer.scores, issues: answer.issues, notes: answer.notes });
    });
    const rankings = {};
    activeRankingDimensions().forEach((dimension) => { rankings[dimension.key] = { final: state.rankings[dimension.key] }; });
    let revision = Number(state.sourceResult?.revision || 0) || 0;
    const audit = Array.isArray(state.sourceResult?.audit) ? JSON.parse(JSON.stringify(state.sourceResult.audit)) : [];
    if (mode === "review") {
      const changes = [];
      collectChanges(state.baseline, snapshotAnswers(), "", changes);
      if (changes.length) { revision += 1; audit.push({ revision, actor_role: "quality_reviewer", at: now, changes }); }
      if (!revision) revision = 1;
    } else revision = 1;
    const compacted = S.compactObject({
      schema_version: S.RESULT_SCHEMA,
      mos,
      rankings,
      ranking_note: state.rankingNote,
      consistency_review: { checked: true, conflict_count: 0 },
      status: "complete",
      started_at: state.startedAt,
      completed_at: state.sourceResult?.completed_at || now,
      updated_at: now,
      revision,
      audit
    });
    const { schema_version, ...rest } = compacted;
    return { schema_version, work_order: JSON.parse(JSON.stringify(state.task)), ...rest };
  }

  function goExport() {
    submitRanking();
    if (state.conflicts.length) return;
    state.result = buildResult();
    state.screen = "export";
    render();
  }

  function renderImport() {
    const isReview = mode === "review";
    root.innerHTML = `<header class="page-heading"><div><span class="eyebrow">${isReview ? "QUALITY REVIEW" : "ANNOTATION"}</span><h1>${isReview ? "质检验收" : "单 Case 评测"}</h1><p>${isReview ? "粘贴一格结果 JSON，恢复完整 Case 并进行复核。" : "从工单中复制 work_order_json 单元格，粘贴后开始评测。"}</p></div><span class="badge">4 模型 · MOS + Ranking</span></header>
      <section class="card"><div class="card-header"><div><h2>01 ${isReview ? "粘贴结果 JSON" : "粘贴工单单元格"}</h2><div class="field-help">不需要复制整行，也不会读取右侧业务列。</div></div></div><div class="card-body">
        <textarea id="import-input" class="code-input" placeholder="在此粘贴一整个 JSON 单元格">${S.escapeHtml(state.paste)}</textarea>
        ${state.validation.length ? `<div class="alert error"><strong>无法载入</strong><ul>${state.validation.map((error) => `<li>${S.escapeHtml(error)}</li>`).join("")}</ul></div>` : ""}
        <div class="toolbar split"><span class="field-help">所有数据只在当前浏览器中处理。</span><button class="button primary" data-action="import">解析并进入${isReview ? "质检" : "评测"}</button></div>
      </div></section>`;
  }

  function progress() {
    const mosDone = state.task.candidates.filter((_, index) => candidateComplete(index)).length;
    const rankingDone = state.rankingSubmitted && !state.conflicts.length ? activeRankingDimensions().length : 0;
    const total = state.task.candidates.length + activeRankingDimensions().length;
    return { done: mosDone + rankingDone, total, percent: Math.round((mosDone + rankingDone) / total * 100) };
  }

  function renderProgress() {
    const value = progress();
    return `<div class="progress-shell"><div class="progress-card"><div class="progress-copy"><strong>${state.task.case.case_id}</strong><span>${state.task.case_type === "vocal" ? "Vocal" : "Non Vocal"} · ${value.done}/${value.total} 已完成</span></div><div class="progress-track"><i style="width:${value.percent}%"></i></div><span class="badge">${value.percent}%</span></div></div>`;
  }

  function renderRail() {
    const groups = activeGroups();
    return `<aside class="card task-rail"><div class="rail-heading"><span class="rail-step-number">1</span><div><strong>MOS 分层评分</strong><small>4 个匿名候选</small></div></div><div class="rail-tree">${state.task.candidates.map((candidate, index) => `<div class="rail-node"><button class="rail-item rail-candidate ${state.screen === "mos" && state.currentCandidate === index ? "active" : ""} ${candidateComplete(index) ? "done" : ""}" data-candidate="${index}"><span class="rail-dot">${String(index + 1).padStart(2, "0")}</span><span>${candidateLabel(index)}</span></button>${state.screen === "mos" && state.currentCandidate === index ? `<div class="rail-subtree">${groups.map((group, groupIndex) => `<button class="rail-subitem ${state.currentGroup === groupIndex ? "active" : ""} ${groupComplete(index, groupIndex) ? "done" : ""}" data-group="${groupIndex}">${S.escapeHtml(displayGroupLabel(group))}</button>`).join("")}</div>` : ""}</div>`).join("")}</div><div class="rail-divider"></div><div class="rail-heading"><span class="rail-step-number">2</span><div><strong>Ranking</strong><small>强制排序，不允许并列</small></div></div><div class="rail-tree">${activeRankingDimensions().map((dimension, index) => `<button class="rail-item rail-ranking ${state.screen === "ranking" && state.currentRanking === index ? "active" : ""} ${state.rankingSubmitted && !state.conflicts.some((conflict) => conflict.dimension.key === dimension.key) ? "done" : ""}" data-ranking="${index}"><span class="rail-dot">${index + 1}</span><span>${S.escapeHtml(dimension.label)}</span></button>`).join("")}</div></aside>`;
  }

  function renderContext(candidate, groups) {
    return `<div class="sticky-context"><div class="audio-row"><div><div class="candidate-label">${candidateLabel(state.currentCandidate)}</div><span class="field-help">匿名音频</span></div><audio controls preload="metadata" src="${S.escapeHtml(candidate.url)}"></audio></div><div class="context-grid"><div class="context-box"><strong>info · ${S.escapeHtml(state.task.case.language || "未填写 language")}</strong>${S.escapeHtml(state.task.case.info)}</div><div class="context-box"><strong>歌词</strong>${S.escapeHtml(state.task.case.lyrics || "该 Case 无歌词，已按 Non Vocal 处理")}</div></div><nav class="group-tabs" aria-label="评分模块">${groups.map((group, index) => `<button class="group-tab ${index === state.currentGroup ? "active" : ""} ${groupComplete(state.currentCandidate, index) ? "done" : ""}" data-group="${index}"><span>${S.escapeHtml(displayGroupLabel(group))}</span></button>`).join("")}</nav></div>`;
  }

  function renderDimension(dimension, answer) {
    const score = scoreValue(answer, dimension.key);
    const issues = answer.issues[dimension.key] || [];
    const note = answer.notes[dimension.key] || "";
    const errors = dimensionErrors(answer, dimension);
    const dimensionOptions = displayDimensionOptions(dimension);
    const showIssues = score === "NA" || (isNumericScore(score) && ((dimension.issueRule === "low3" && Number(score) <= 3) || (dimension.issueRule === "below5" && Number(score) < 5)));
    const showNote = score != null && (score === "NA" || dimension.noteRule === "always" || dimension.noteRule === "optional" || (dimension.noteRule === "low3" && Number(score) <= 3) || (dimension.noteRule === "below5" && Number(score) < 5));
    const values = [1, 2, 3, 4, 5].concat(dimension.allowNA ? ["NA"] : []);
    return `<div class="dimension-row ${isOverallDimension(dimension) ? "overall-dimension" : ""} ${errors.length && state.validation.some((error) => error.candidateIndex === state.currentCandidate && error.dimensionKey === dimension.key) ? "field-error" : ""}" data-dimension-row="${dimension.key}"><div class="dimension-top"><div><div class="dimension-name">${S.escapeHtml(displayDimensionLabel(dimension))}</div>${errors.length && state.validation.some((error) => error.dimensionKey === dimension.key) ? `<div class="field-help required">${S.escapeHtml(errors.join("；"))}</div>` : ""}</div><div><div class="source-field-label">${S.escapeHtml(dimension.scoreLabel)}</div><div class="score-buttons ${dimension.allowNA ? "" : "no-na"}">${values.map((value) => `<button class="score-button ${value === "NA" ? "na" : ""} ${String(score) === String(value) ? "selected" : ""}" data-score="${dimension.key}" data-value="${value}">${value}</button>`).join("")}</div></div></div>${showIssues && dimensionOptions.length ? `<div class="dimension-detail"><div class="detail-title"><span>${S.escapeHtml(dimension.issueLabel)}</span></div><div class="option-list">${dimensionOptions.map((option) => `<label class="option-pill ${issues.includes(option.id) ? "selected" : ""}"><input type="checkbox" data-issue="${dimension.key}" value="${option.id}" ${issues.includes(option.id) ? "checked" : ""}><span>${S.escapeHtml(option.label)}</span></label>`).join("")}</div></div>` : ""}${showNote ? `<div class="note-field"><label>${S.escapeHtml(dimension.noteLabel)}</label><textarea rows="1" class="note-input" data-note="${dimension.key}" placeholder="${score === "NA" ? "请填写 N/A 原因" : "填写内容"}">${S.escapeHtml(note)}</textarea></div>` : ""}</div>`;
  }

  function renderMos() {
    const candidate = state.task.candidates[state.currentCandidate];
    const answer = answerFor(state.currentCandidate);
    const groups = activeGroups();
    const activeGroup = groups[state.currentGroup] || groups[0];
    return `<div>${renderContext(candidate, groups)}<section class="card score-group"><div class="group-head"><div><h3>${S.escapeHtml(displayGroupLabel(activeGroup))}</h3><span class="field-help">完成当前模块后进入下一项</span></div><span class="badge">${activeGroup.dimensions.length} 个维度</span></div>${activeGroup.dimensions.map((key) => renderDimension(dimensionByKey.get(key), answer)).join("")}</section><div class="footer-actions"><button class="button" data-action="previous-group" ${state.currentGroup === 0 ? "disabled" : ""}>← 上一模块</button><span class="status">候选 ${String(state.currentCandidate + 1).padStart(2, "0")} · ${state.currentGroup + 1}/${groups.length} 模块</span><button class="button primary" data-action="next-group">${state.currentGroup < groups.length - 1 ? "保存并进入下一模块 →" : state.currentCandidate === 3 ? "完成 MOS，进入 Ranking →" : "保存并评下一首 →"}</button></div></div>`;
  }

  function renderRanking() {
    const dimensions = activeRankingDimensions();
    const dimension = dimensions[state.currentRanking];
    const aliases = Object.fromEntries(state.task.candidates.map((candidate, index) => [candidate.blind_id, String(index + 1).padStart(2, "0")]));
    const order = state.rankings[dimension.key];
    const candidateById = new Map(state.task.candidates.map((candidate) => [candidate.blind_id, candidate]));
    const conflicts = state.conflicts.filter((conflict) => conflict.dimension.key === dimension.key);
    return `<div class="ranking-revealed"><div class="card"><div class="card-header"><div><h2>${S.escapeHtml(dimension.label)} Ranking</h2><div class="field-help">参考该维度整体 MOS 分，拖动候选形成从优到弱的唯一顺序。</div></div><span class="badge">${state.currentRanking + 1}/${dimensions.length}</span></div><div class="card-body">
      <div data-ranking-summary class="alert ${conflicts.length ? "error" : "success"}"><strong>${conflicts.length ? `本维度发现 ${conflicts.length} 处冲突` : "当前排序无冲突"}</strong>${conflicts.length ? "必须调整分数或排名后才能导出。" : "同分候选仍可保留先后顺序。"}</div>
      <div class="ranking-card" style="margin-top:14px"><div class="ranking-head"><h3>试听音频</h3><span class="field-help">沿用 MOS 的候选编号</span></div>${Object.entries(aliases).sort((a,b) => a[1].localeCompare(b[1])).map(([id, alias]) => `<div class="audio-row" style="margin-top:8px"><div class="candidate-label">候选 ${alias}</div><audio controls preload="metadata" src="${S.escapeHtml(candidateById.get(id).url)}"></audio></div>`).join("")}</div>
      <div class="ranking-card"><div class="ranking-head"><h3>排名结果</h3><span class="field-help">从左到右：更优 → 相对较弱；拖动卡片调整顺序</span></div><div class="rank-direction"><span>更优</span><i></i><span>相对较弱</span></div><div class="rank-list" data-rank-list>${order.map((id) => `<div class="rank-row" draggable="true" data-rank-id="${id}"><div class="drag-handle" aria-label="拖拽排序" title="拖拽排序"><i></i><i></i><i></i></div><div class="rank-label">候选 ${aliases[id]}<span class="score-peek">MOS ${state.mos[id]?.scores?.[dimension.scoreKey] ?? "—"}</span></div></div>`).join("")}</div></div>
      <div data-conflict-region>${conflictMarkup(conflicts, aliases)}</div>
      <label class="field-label" style="margin-top:16px" for="ranking-note">Ranking 统一备注（选填）</label><textarea id="ranking-note" class="ranking-note" placeholder="如需解释整体排序判断，可统一写在这里。">${S.escapeHtml(state.rankingNote)}</textarea>
      </div></div><div class="footer-actions"><button class="button" data-action="previous-ranking" ${state.currentRanking === 0 ? "disabled" : ""}>← 上一维度</button><span class="status">显示对应整体 MOS 分并实时校验</span>${state.currentRanking < dimensions.length - 1 ? `<button class="button primary" data-action="next-ranking">下一维度 →</button>` : state.rankingSubmitted && !state.conflicts.length ? `<button class="button primary" data-ranking-final-action data-action="export">生成结果 →</button>` : `<button class="button primary" data-ranking-final-action data-action="submit-ranking">检查并完成 Ranking</button>`}</div></div>`;
  }

  function currentRankingAliases() {
    return Object.fromEntries(state.task.candidates.map((candidate, index) => [candidate.blind_id, String(index + 1).padStart(2, "0")]));
  }

  function conflictMarkup(conflicts, aliases) {
    if (!conflicts.length) return "";
    return `<div class="conflict-card"><h4>冲突位置</h4><ul>${conflicts.map((conflict) => `<li>候选 ${aliases[conflict.higherRankId]} 为 ${conflict.higherScore} 分，却排在 ${conflict.lowerScore} 分的候选 ${aliases[conflict.lowerRankId]} 之前。</li>`).join("")}</ul></div>`;
  }

  function refreshRankingUi() {
    if (state.screen !== "ranking") return;
    const dimension = activeRankingDimensions()[state.currentRanking];
    const order = state.rankings[dimension.key];
    const list = root.querySelector("[data-rank-list]");
    if (list) {
      const rows = new Map(Array.from(list.querySelectorAll("[data-rank-id]")).map((row) => [row.dataset.rankId, row]));
      order.forEach((id) => { const row = rows.get(id); if (row) list.appendChild(row); });
    }
    state.conflicts = computeConflicts();
    const conflicts = state.conflicts.filter((conflict) => conflict.dimension.key === dimension.key);
    const summary = root.querySelector("[data-ranking-summary]");
    if (summary) {
      summary.className = `alert ${conflicts.length ? "error" : "success"}`;
      summary.innerHTML = `<strong>${conflicts.length ? `本维度发现 ${conflicts.length} 处冲突` : "当前排序无冲突"}</strong>${conflicts.length ? "必须调整分数或排名后才能导出。" : "同分候选仍可保留先后顺序。"}`;
    }
    const region = root.querySelector("[data-conflict-region]");
    if (region) region.innerHTML = conflictMarkup(conflicts, currentRankingAliases());
    const finalAction = root.querySelector("[data-ranking-final-action]");
    if (finalAction) {
      const canExport = state.rankingSubmitted && state.conflicts.length === 0;
      finalAction.dataset.action = canExport ? "export" : "submit-ranking";
      finalAction.textContent = canExport ? "生成结果 →" : "检查并完成 Ranking";
    }
  }

  function commitRankOrderFromDom() {
    const list = root.querySelector("[data-rank-list]");
    if (!list || state.screen !== "ranking") return;
    const dimension = activeRankingDimensions()[state.currentRanking];
    state.rankings[dimension.key] = Array.from(list.querySelectorAll("[data-rank-id]")).map((row) => row.dataset.rankId);
    refreshRankingUi();
  }

  function clearRankInsertion() {
    root.querySelector("[data-rank-list]")?.classList.remove("is-dragging");
    root.querySelectorAll(".rank-row.insert-before, .rank-row.insert-after").forEach((row) => row.classList.remove("insert-before", "insert-after"));
    rankInsertion = null;
  }

  function renderExport() {
    const json = JSON.stringify(state.result);
    const tone = json.length > S.CELL_HARD_LIMIT ? "danger" : json.length > S.CELL_WARNING ? "warning" : "";
    return `<header class="page-heading"><div><span class="eyebrow">COMPLETE</span><h1>结果已生成</h1><p>复制这一格回填到 annotation_result_json 列，或下载完整 JSON 留档。</p></div><span class="badge">Revision ${state.result.revision}</span></header><section class="card"><div class="card-header"><h2>${S.escapeHtml(state.task.case.case_id)} · 结果 JSON</h2><button class="button" data-action="new-case">导入新 Case</button></div><div class="card-body"><textarea id="result-output" class="code-input result-output" readonly>${S.escapeHtml(json)}</textarea><div class="char-meter ${tone}"><span>${json.length.toLocaleString()} 字符</span><span>${json.length > S.CELL_HARD_LIMIT ? "超过 50,000，不能稳定回填在线表格，请下载 JSON 留档" : json.length > S.CELL_WARNING ? "已超过 30,000，建议确认目标表格限制" : "可回填单元格"}</span></div><div class="toolbar"><button class="button primary" data-action="copy-result" ${json.length > S.CELL_HARD_LIMIT ? "disabled" : ""}>复制结果单元格</button><button class="button" data-action="download-result">下载 JSON</button><button class="button soft" data-action="back-ranking">返回检查</button></div></div></section>`;
  }

  function renderTask() {
    root.innerHTML = `${renderProgress()}<div class="task-layout">${renderRail()}<main>${state.screen === "mos" ? renderMos() : renderRanking()}</main></div>`;
  }
  function render() {
    if (state.screen === "import") renderImport();
    else if (state.screen === "export") renderExport();
    else renderTask();
  }

  function updateDimensionRow(key) {
    const node = root.querySelector(`[data-dimension-row="${CSS.escape(key)}"]`);
    if (node) node.outerHTML = renderDimension(dimensionByKey.get(key), answerFor(state.currentCandidate));
  }
  function jumpToError(error) { setTimeout(() => root.querySelector(`[data-dimension-row="${CSS.escape(error.dimensionKey)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50); }

  root.addEventListener("input", (event) => {
    if (event.target.id === "import-input") state.paste = event.target.value;
    if (event.target.matches("[data-note]")) { const answer = answerFor(state.currentCandidate); const value = event.target.value; if (value) answer.notes[event.target.dataset.note] = value; else delete answer.notes[event.target.dataset.note]; event.target.style.height = "auto"; event.target.style.height = `${Math.min(120, Math.max(38, event.target.scrollHeight))}px`; }
    if (event.target.id === "ranking-note") state.rankingNote = event.target.value;
  });
  root.addEventListener("change", (event) => {
    if (event.target.matches("[data-issue]")) {
      const answer = answerFor(state.currentCandidate); const key = event.target.dataset.issue;
      const selected = new Set(answer.issues[key] || []); event.target.checked ? selected.add(event.target.value) : selected.delete(event.target.value);
      if (selected.size) answer.issues[key] = Array.from(selected); else delete answer.issues[key];
      event.target.closest(".option-pill")?.classList.toggle("selected", event.target.checked);
    }
  });
  root.addEventListener("play", (event) => {
    if (!(event.target instanceof HTMLMediaElement)) return;
    root.querySelectorAll("audio").forEach((audio) => { if (audio !== event.target && !audio.paused) audio.pause(); });
  }, true);
  root.addEventListener("dragstart", (event) => {
    const row = event.target.closest("[data-rank-id]");
    if (!row) return;
    draggingRankId = row.dataset.rankId;
    rankDropCommitted = false;
    rankInsertion = null;
    row.classList.add("dragging");
    row.closest("[data-rank-list]")?.classList.add("is-dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggingRankId);
    }
  });
  root.addEventListener("dragover", (event) => {
    const list = event.target.closest("[data-rank-list]");
    if (!list || !draggingRankId) return;
    event.preventDefault();
    const dragging = list.querySelector(`[data-rank-id="${CSS.escape(draggingRankId)}"]`);
    if (!dragging) return;
    const candidates = Array.from(list.querySelectorAll("[data-rank-id]")).filter((row) => row !== dragging);
    if (!candidates.length) return;
    const target = candidates.reduce((nearest, row) => {
      const rect = row.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      return !nearest || distance < nearest.distance ? { row, rect, distance } : nearest;
    }, null);
    const after = event.clientX > target.rect.left + target.rect.width / 2;
    list.querySelectorAll(".insert-before, .insert-after").forEach((row) => row.classList.remove("insert-before", "insert-after"));
    target.row.classList.add(after ? "insert-after" : "insert-before");
    rankInsertion = { targetId: target.row.dataset.rankId, after };
  });
  root.addEventListener("drop", (event) => {
    const list = event.target.closest("[data-rank-list]");
    if (!list || !draggingRankId) return;
    event.preventDefault();
    const dragging = list.querySelector(`[data-rank-id="${CSS.escape(draggingRankId)}"]`);
    const target = rankInsertion ? list.querySelector(`[data-rank-id="${CSS.escape(rankInsertion.targetId)}"]`) : null;
    if (dragging && target) list.insertBefore(dragging, rankInsertion.after ? target.nextSibling : target);
    rankDropCommitted = true;
    clearRankInsertion();
    commitRankOrderFromDom();
  });
  root.addEventListener("dragend", (event) => {
    event.target.closest("[data-rank-id]")?.classList.remove("dragging");
    if (!rankDropCommitted) clearRankInsertion();
    draggingRankId = "";
    rankDropCommitted = false;
  });
  root.addEventListener("click", (event) => {
    const scoreButton = event.target.closest("[data-score]");
    if (scoreButton) {
      const answer = answerFor(state.currentCandidate); const key = scoreButton.dataset.score; const value = scoreButton.dataset.value;
      answer.scores[key] = value === "NA" ? "NA" : Number(value);
      if (value === "NA") delete answer.issues[key];
      state.validation = state.validation.filter((error) => !(error.candidateIndex === state.currentCandidate && error.dimensionKey === key));
      updateDimensionRow(key); return;
    }
    const candidate = event.target.closest("[data-candidate]");
    if (candidate) { state.screen = "mos"; state.currentCandidate = Number(candidate.dataset.candidate); state.currentGroup = 0; state.validation = []; render(); return; }
    const group = event.target.closest("[data-group]");
    if (group) { state.currentGroup = Number(group.dataset.group); state.validation = []; render(); return; }
    const ranking = event.target.closest("[data-ranking]");
    if (ranking) { state.screen = "ranking"; state.currentRanking = Number(ranking.dataset.ranking); state.conflicts = computeConflicts(); render(); return; }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "import") importValue();
    if (action === "previous-group" && state.currentGroup > 0) { state.currentGroup -= 1; state.validation = []; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    if (action === "next-group") {
      const errors = validateGroup(state.currentCandidate, state.currentGroup); state.validation = errors;
      if (errors.length) { render(); jumpToError(errors[0]); S.toast(`当前模块还有 ${errors.length} 项必填内容未完成`, "error"); }
      else if (state.currentGroup < activeGroups().length - 1) { state.currentGroup += 1; state.validation = []; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
      else if (state.currentCandidate < 3) { state.currentCandidate += 1; state.currentGroup = 0; state.validation = []; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
      else { const all = validateAllMos(); if (all.length) { state.currentCandidate = all[0].candidateIndex; state.currentGroup = activeGroups().findIndex((item) => item.dimensions.includes(all[0].dimensionKey)); state.validation = all; render(); jumpToError(all[0]); } else { state.screen = "ranking"; state.validation = []; state.conflicts = computeConflicts(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); } }
    }
    if (action === "previous-ranking" && state.currentRanking > 0) { state.currentRanking -= 1; render(); }
    if (action === "next-ranking" && state.currentRanking < activeRankingDimensions().length - 1) { state.currentRanking += 1; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    if (action === "submit-ranking") submitRanking();
    if (action === "export") goExport();
    if (action === "copy-result") navigator.clipboard.writeText(JSON.stringify(state.result)).then(() => S.toast("已复制结果 JSON"), () => S.toast("复制失败，请手动选择", "error"));
    if (action === "download-result") S.download(`${state.task.case.case_id}-${S.dateStamp()}.json`, JSON.stringify(state.result, null, 2), "application/json");
    if (action === "back-ranking") { state.screen = "ranking"; render(); }
    if (action === "new-case") { Object.assign(state, { screen: "import", paste: "", task: null, mos: {}, rankings: {}, rankingInitial: {}, rankingNote: "", currentGroup: 0, baseline: null, sourceResult: null, result: null, validation: [] }); render(); }
  });

  render();
})();
