(function () {
  "use strict";
  const S = window.SB_NOV;
  const root = document.getElementById("admin-app");
  if (!root || !S) return;

  const HEADERS = ["样本编号", "language", "音频类型", "info", "歌词", "模型1 URL", "模型2 URL", "模型3 URL", "模型4 URL"];
  const ALIASES = {
    case_id: ["样本编号", "序号", "case_id", "case id"],
    language: ["language", "语言", "语种"],
    case_type: ["音频类型", "歌曲类型", "vocal类型", "vocal type", "audio type", "case_type", "case type", "type"],
    info: ["info", "tag", "caption", "prompt", "描述"],
    lyrics: ["歌词", "lyrics", "lyric"],
    model_1_url: ["模型1url", "模型1 url", "model1url", "model_1_url", "模型1"],
    model_2_url: ["模型2url", "模型2 url", "model2url", "model_2_url", "模型2"],
    model_3_url: ["模型3url", "模型3 url", "model3url", "model_3_url", "模型3"],
    model_4_url: ["模型4url", "模型4 url", "model4url", "model_4_url", "模型4"]
  };
  const state = { tab: "paste", text: "", rows: [], records: [], errors: [], generated: null, fileName: "" };

  function normalizeHeader(value) { return String(value || "").trim().toLowerCase().replace(/[\s_\-（）()]/g, ""); }
  function normalizeCaseType(value) {
    const normalized = String(value || "").trim().toLowerCase().replace(/[\s_\-]/g, "");
    if (normalized === "vocal") return "vocal";
    if (normalized === "nonvocal") return "non_vocal";
    return "";
  }
  function findColumn(headers, key) {
    const normalized = headers.map(normalizeHeader);
    return normalized.findIndex((header) => ALIASES[key].some((alias) => header === normalizeHeader(alias)));
  }

  function seedUrlColumns(headers) {
    return headers.map((header, index) => ({ header: normalizeHeader(header), index }))
      .filter((item) => /^seed\d+$/.test(item.header))
      .map((item) => item.index);
  }

  function explicitUrlColumns(headers) {
    return [1, 2, 3, 4].map((slot) => findColumn(headers, `model_${slot}_url`)).filter((index) => index >= 0);
  }

  function inferredUrlColumns(headers, dataRows) {
    const excluded = new Set([findColumn(headers, "case_id"), findColumn(headers, "language"), findColumn(headers, "case_type"), findColumn(headers, "info"), findColumn(headers, "lyrics")]);
    return headers.map((_, index) => index).filter((index) => {
      if (excluded.has(index)) return false;
      const values = dataRows.slice(0, 20).map((row) => String(row[index] || "").trim()).filter(Boolean);
      return values.length > 0 && values.filter(S.isUrl).length / values.length >= 0.8;
    });
  }

  function urlColumns(headers, dataRows) {
    const explicit = explicitUrlColumns(headers);
    if (explicit.length === 4) return explicit;
    const seed = seedUrlColumns(headers);
    if (seed.length >= 4) return seed.slice(0, 4);
    return inferredUrlColumns(headers, dataRows).slice(0, 4);
  }

  function inspect(rows) {
    const errors = [];
    if (!rows.length) return { records: [], errors: ["没有读取到数据"] };
    const headerRowIndex = rows.slice(0, 20).findIndex((candidate, index) => findColumn(candidate, "case_id") >= 0 && urlColumns(candidate, rows.slice(index + 1)).length === 4);
    if (headerRowIndex < 0) return { records: [], errors: ["前 20 行中未找到完整表头；需要包含样本编号和模型1–4 URL"] };
    const headers = rows[headerRowIndex];
    const indexes = {};
    ["case_id", "language", "case_type", "info", "lyrics"].forEach((key) => { indexes[key] = findColumn(headers, key); });
    [["case_id", "样本编号/序号"], ["case_type", "音频类型（Vocal / Non Vocal）"], ["info", "info/prompt"], ["lyrics", "歌词/lyrics"]].forEach(([key, label]) => { if (indexes[key] < 0) errors.push(`缺少列：${label}`); });
    const modelUrlIndexes = urlColumns(headers, rows.slice(headerRowIndex + 1));
    if (modelUrlIndexes.length !== 4) errors.push("未找到 4 个模型 URL 列；支持模型1–4 URL、seed_* 或可识别的连续 URL 列");
    if (errors.length) return { records: [], errors };
    const seen = new Set();
    const records = rows.slice(headerRowIndex + 1).filter((row) => row.some((cell) => String(cell || "").trim())).map((row, offset) => {
      const line = offset + headerRowIndex + 2;
      const record = {
        caseId: String(row[indexes.case_id] || "").trim(),
        language: indexes.language >= 0 ? String(row[indexes.language] || "") : "",
        caseType: normalizeCaseType(row[indexes.case_type]),
        caseTypeSource: String(row[indexes.case_type] || ""),
        info: String(row[indexes.info] || ""),
        lyrics: String(row[indexes.lyrics] || ""),
        urls: modelUrlIndexes.map((index) => S.normalizeUrl(row[index])),
        line
      };
      if (!record.caseId) errors.push(`第 ${line} 行：样本编号为空`);
      else if (seen.has(record.caseId)) errors.push(`第 ${line} 行：样本编号重复（${record.caseId}）`);
      else seen.add(record.caseId);
      if (!record.info.trim()) errors.push(`第 ${line} 行：info 为空`);
      if (!record.caseType) errors.push(`第 ${line} 行：音频类型必须填写 Vocal 或 Non Vocal（当前为“${record.caseTypeSource || "空"}”）`);
      record.urls.forEach((url, index) => { if (!S.isUrl(url)) errors.push(`第 ${line} 行：模型 ${index + 1} URL 无效`); });
      if (new Set(record.urls).size !== 4) errors.push(`第 ${line} 行：四个模型 URL 必须互不相同`);
      return record;
    });
    if (!records.length) errors.push("表头之后没有样本数据");
    return { records, errors };
  }

  function importRows(rows, fileName) {
    const result = inspect(rows);
    state.rows = rows;
    state.records = result.records;
    state.errors = result.errors;
    state.generated = null;
    state.fileName = fileName || "";
    render();
  }

  async function readFile(file) {
    if (!file) return;
    const extension = file.name.split(".").pop().toLowerCase();
    try {
      if (["xlsx", "xls"].includes(extension)) {
        if (!window.XLSX) throw new Error("Excel 解析组件未加载，请检查网络后重试，或另存为 CSV");
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        importRows(XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" }), file.name);
      } else {
        importRows(S.parseDelimited(await file.text()), file.name);
      }
    } catch (error) {
      state.errors = [error.message];
      state.records = [];
      render();
    }
  }

  async function buildBatch(records, requestedBatchId) {
    const batchId = requestedBatchId || S.makeBatchId();
    const generatedAt = new Date().toISOString();
    const mappingCases = [];
    const workOrders = [];
    for (const record of records) {
      const taskId = S.makeId("TASK");
      const sourceCandidates = record.urls.map((url, index) => ({
        blind_id: S.makeId("B"),
        url,
        model_key: `model_${index + 1}`,
        source_slot: index + 1
      }));
      const shuffled = S.shuffle(sourceCandidates);
      const workOrder = {
        schema_version: S.WORK_ORDER_SCHEMA,
        batch_id: batchId,
        task_id: taskId,
        case: { case_id: record.caseId, language: record.language, info: record.info, lyrics: record.lyrics },
        candidates: shuffled.map(({ blind_id, url }) => ({ blind_id, url })),
        case_type: record.caseType,
        rubric_version: window.SB_NOV_RUBRIC.version
      };
      workOrder.fingerprint = await S.fingerprint(workOrder);
      workOrders.push({ caseId: record.caseId, workOrder, json: JSON.stringify(workOrder) });
      mappingCases.push({
        case_id: record.caseId,
        task_id: taskId,
        fingerprint: workOrder.fingerprint,
        candidate_mapping: sourceCandidates.map((candidate) => ({
          blind_id: candidate.blind_id,
          model_key: candidate.model_key,
          source_slot: candidate.source_slot,
          source_url: candidate.url
        }))
      });
    }
    return {
      batchId,
      rows: workOrders,
      mapping: {
        schema_version: S.MAPPING_SCHEMA,
        batch_id: batchId,
        generated_at: generatedAt,
        models: [1, 2, 3, 4].map((slot) => ({ model_key: `model_${slot}`, source_column: `模型${slot} URL` })),
        cases: mappingCases
      }
    };
  }

  async function generate() {
    if (state.errors.length || !state.records.length) return S.toast("请先导入并修正原始样本", "error");
    state.generated = await buildBatch(state.records);
    render();
    S.toast(`已生成 ${state.generated.rows.length} 条脱敏工单`);
  }

  function outputRows() {
    if (!state.generated) return [];
    return [["case_id", "work_order_json", "annotation_result_json"], ...state.generated.rows.map((row) => [row.caseId, row.json, ""])];
  }

  function downloadCsv() {
    S.download(`${state.generated.batchId}-work-order.csv`, S.toCsv(outputRows()), "text/csv;charset=utf-8");
  }

  function downloadXlsx() {
    if (!window.XLSX) return S.toast("Excel 导出组件未加载，请下载 CSV", "error");
    const sheet = XLSX.utils.aoa_to_sheet(outputRows());
    sheet["!cols"] = [{ wch: 18 }, { wch: 80 }, { wch: 80 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "评测工单");
    XLSX.writeFile(workbook, `${state.generated.batchId}-work-order.xlsx`);
  }

  function downloadMapping() {
    S.download(`${state.generated.batchId}-ADMIN-MAPPING.json`, JSON.stringify(state.generated.mapping, null, 2), "application/json");
  }

  function templateCsv() {
    const example = ["base_001", "Chinese", "Vocal", "温暖流行，女声，中速", "[Verse]\n示例歌词", "https://example.com/model1.wav", "https://example.com/model2.wav", "https://example.com/model3.wav", "https://example.com/model4.wav"];
    S.download("SonicBench-11月-管理员导入模板.csv", S.toCsv([HEADERS, example]), "text/csv;charset=utf-8");
  }

  function copy(value, message) {
    navigator.clipboard.writeText(value).then(() => S.toast(message || "已复制"), () => S.toast("复制失败，请手动选择", "error"));
  }

  function renderPreview() {
    if (state.errors.length) return `<div class="alert error"><strong>导入内容需要修正</strong><ul>${state.errors.slice(0, 12).map((error) => `<li>${S.escapeHtml(error)}</li>`).join("")}</ul>${state.errors.length > 12 ? `<p>另有 ${state.errors.length - 12} 项未展示</p>` : ""}</div>`;
    if (!state.records.length) return "";
    const vocalCount = state.records.filter((record) => record.caseType === "vocal").length;
    return `<div class="alert success"><strong>格式检查通过</strong>已识别 ${state.records.length} 条 Case，其中 Vocal ${vocalCount} 条、Non Vocal ${state.records.length - vocalCount} 条。</div>
      <div class="table-wrap"><table><thead><tr><th>Case ID</th><th>Language</th><th>类型</th><th>Info</th><th>模型 URL</th></tr></thead><tbody>${state.records.slice(0, 12).map((record) => `<tr><td>${S.escapeHtml(record.caseId)}</td><td>${S.escapeHtml(record.language || "—")}</td><td><span class="badge ${record.caseType === "vocal" ? "vocal" : "non-vocal"}">${record.caseType === "vocal" ? "Vocal" : "Non Vocal"}</span></td><td class="truncate">${S.escapeHtml(record.info)}</td><td>4 条</td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderGenerated() {
    if (!state.generated) return "";
    return `<section class="card">
      <div class="card-header"><div><h2>生成完成</h2><div class="field-help">批次 ${S.escapeHtml(state.generated.batchId)} · 每条 Case 对应一个可复制的工单单元格</div></div><span class="badge">Mapping 已冻结</span></div>
      <div class="card-body">
        <div class="stat-grid"><div class="stat"><b>${state.generated.rows.length}</b><span>Case</span></div><div class="stat"><b>4</b><span>固定模型数</span></div><div class="stat"><b>1</b><span>每条工单需复制的单元格</span></div><div class="stat"><b>${Math.max(...state.generated.rows.map((row) => row.json.length))}</b><span>最长工单字符数</span></div></div>
        <div class="toolbar"><button class="button primary" data-action="xlsx">下载工单 Excel</button><button class="button" data-action="csv">下载工单 CSV</button><button class="button danger" data-action="mapping">下载管理员 Mapping</button></div>
        <div class="alert warning"><strong>Mapping 请勿下发给标注员</strong>Blind ID 不包含模型序号；真实模型关系仅保存在 Mapping 中。若 URL 路径包含模型名，请交由工程侧代理或清洗。</div>
        <div class="table-wrap"><table><thead><tr><th>Case ID</th><th>类型</th><th>工单字符数</th><th>操作</th></tr></thead><tbody>${state.generated.rows.map((row) => `<tr><td>${S.escapeHtml(row.caseId)}</td><td>${row.workOrder.case_type === "vocal" ? "Vocal" : "Non Vocal"}</td><td>${row.json.length}</td><td><button class="button small soft" data-copy-case="${S.escapeHtml(row.caseId)}">复制工单单元格</button></td></tr>`).join("")}</tbody></table></div>
      </div>
    </section>`;
  }

  function render() {
    root.innerHTML = `<header class="page-heading"><div><span class="eyebrow">ADMIN WORK ORDER</span><h1>管理员工单生成</h1><p>导入原始样本，按 Case 独立随机脱敏，生成单单元格工单与管理员 Mapping。</p></div><button class="button" data-action="template">下载导入模板</button></header>
      <section class="card">
        <div class="card-header"><div><h2>01 导入原始样本</h2><div class="field-help">必需列：样本编号、音频类型、info、歌词、模型1–4 URL；language 可为空，允许存在额外业务列。</div></div><span class="badge">固定 4 模型</span></div>
        <div class="card-body">
          <div class="input-tabs"><button class="input-tab ${state.tab === "paste" ? "active" : ""}" data-tab="paste">粘贴表格</button><button class="input-tab ${state.tab === "file" ? "active" : ""}" data-tab="file">上传 Excel / CSV</button></div>
          <div style="margin-top:16px">${state.tab === "paste" ? `<label class="field-label" for="raw-input">从表格复制包含表头的数据区域</label><textarea id="raw-input" class="code-input" placeholder="样本编号&#9;language&#9;音频类型&#9;info&#9;歌词&#9;模型1 URL&#9;模型2 URL&#9;模型3 URL&#9;模型4 URL">${S.escapeHtml(state.text)}</textarea><div class="toolbar"><button class="button primary" data-action="inspect">解析并检查</button></div>` : `<div class="file-drop"><div><label class="field-label" for="file-input">选择 .xlsx、.xls 或 .csv 文件</label><input id="file-input" type="file" accept=".xlsx,.xls,.csv,text/csv"><p class="field-help">${S.escapeHtml(state.fileName || "读取第一个工作表；额外列不会进入脱敏工单。")}</p></div></div>`}</div>
          ${renderPreview()}
          ${state.records.length && !state.errors.length ? `<div class="toolbar split"><span class="field-help">Vocal / Non Vocal 只读取“音频类型”列；歌词内容不会参与类型判断。</span><button class="button primary" data-action="generate">生成脱敏工单</button></div>` : ""}
        </div>
      </section>${renderGenerated()}`;
  }

  window.SB_NOV_ADMIN_TEST = { inspect, buildBatch };

  root.addEventListener("input", (event) => { if (event.target.id === "raw-input") state.text = event.target.value; });
  root.addEventListener("change", (event) => { if (event.target.id === "file-input") readFile(event.target.files[0]); });
  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]");
    if (tab) { state.tab = tab.dataset.tab; render(); return; }
    const copyButton = event.target.closest("[data-copy-case]");
    if (copyButton && state.generated) {
      const row = state.generated.rows.find((item) => item.caseId === copyButton.dataset.copyCase);
      if (row) copy(row.json, `已复制 ${row.caseId} 的工单单元格`);
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "inspect") importRows(S.parseDelimited(state.text));
    if (action === "generate") generate();
    if (action === "template") templateCsv();
    if (action === "csv") downloadCsv();
    if (action === "xlsx") downloadXlsx();
    if (action === "mapping") downloadMapping();
  });

  render();
})();
