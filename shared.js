(function () {
  "use strict";

  const WORK_ORDER_SCHEMA = "sonicbench-work-order/ranking-4-model/2.0";
  const RESULT_SCHEMA = "sonicbench-annotation-result/ranking-4-model/2.0";
  const MAPPING_SCHEMA = "sonicbench-mapping/ranking-4-model/2.0";
  const MODEL_COUNT = 4;
  const CELL_WARNING = 30000;
  const CELL_HARD_LIMIT = 50000;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toast(message, tone) {
    const node = document.getElementById("toast");
    if (!node) return;
    node.textContent = message;
    node.className = `toast show${tone === "error" ? " error" : ""}`;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { node.className = "toast"; }, 2600);
  }

  function parseDelimited(text) {
    const source = String(text || "").replace(/^\uFEFF/, "");
    const firstLine = source.split(/\r?\n/, 1)[0] || "";
    const delimiter = (firstLine.match(/\t/g) || []).length > (firstLine.match(/,/g) || []).length ? "\t" : ",";
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;
    for (let index = 0; index < source.length; index += 1) {
      const character = source[index];
      if (quoted) {
        if (character === '"' && source[index + 1] === '"') { cell += '"'; index += 1; }
        else if (character === '"') quoted = false;
        else cell += character;
      } else if (character === '"') quoted = true;
      else if (character === delimiter) { row.push(cell); cell = ""; }
      else if (character === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
      else cell += character;
    }
    if (cell || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
    return rows.filter((values) => values.some((value) => String(value).trim()));
  }

  function csvCell(value) {
    const text = String(value == null ? "" : value);
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function toCsv(rows) {
    return "\uFEFF" + rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type: type || "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function randomBytes(length) {
    const bytes = new Uint8Array(length);
    if (crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
    else for (let index = 0; index < length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
    return bytes;
  }

  function randomToken(length) {
    const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    return Array.from(randomBytes(length), (value) => alphabet[value % alphabet.length]).join("");
  }

  function makeId(prefix) {
    return `${prefix}-${randomToken(4)}-${randomToken(4)}-${randomToken(4)}`;
  }

  function makeBatchId() {
    const date = new Date();
    const part = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("");
    return `BATCH-${part}-${randomToken(4)}`;
  }

  function shuffle(values) {
    const result = values.slice();
    const random = randomBytes(Math.max(1, result.length * 2));
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swap = random[index] % (index + 1);
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  }

  function stableStringify(value) {
    if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
    if (value && typeof value === "object") {
      return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
  }

  async function sha256(value) {
    if (crypto && crypto.subtle) {
      const data = new TextEncoder().encode(String(value));
      const digest = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    let hash = 2166136261;
    for (const character of String(value)) { hash ^= character.charCodeAt(0); hash = Math.imul(hash, 16777619); }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  async function fingerprint(workOrder) {
    const clone = JSON.parse(JSON.stringify(workOrder));
    delete clone.fingerprint;
    return `sha256:${await sha256(stableStringify(clone))}`;
  }

  function normalizeUrl(value) {
    const text = String(value || "").trim().replace(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/i, "$2");
    return text;
  }

  function isUrl(value) {
    try { const url = new URL(String(value || "")); return ["http:", "https:"].includes(url.protocol); } catch (error) { return false; }
  }

  function safeJson(text) {
    try { return { value: JSON.parse(String(text || "").trim()), error: null }; }
    catch (error) { return { value: null, error: error.message }; }
  }

  function compactObject(value) {
    if (Array.isArray(value)) return value.map(compactObject);
    if (!value || typeof value !== "object") return value;
    const result = {};
    Object.entries(value).forEach(([key, item]) => {
      const compacted = compactObject(item);
      if (compacted == null || compacted === "") return;
      if (Array.isArray(compacted) && !compacted.length) return;
      if (typeof compacted === "object" && !Array.isArray(compacted) && !Object.keys(compacted).length) return;
      result[key] = compacted;
    });
    return result;
  }

  function dateStamp() {
    const date = new Date();
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0"), String(date.getHours()).padStart(2, "0"), String(date.getMinutes()).padStart(2, "0"), String(date.getSeconds()).padStart(2, "0")].join("");
  }

  function dimensionMap() {
    return new Map((window.SB_NOV_RUBRIC.dimensions || []).map((dimension) => [dimension.key, dimension]));
  }

  function rankingConflicts(task, mos, rankings, rankingDimensions) {
    const output = [];
    (rankingDimensions || []).forEach((dimension) => {
      if (dimension.vocalOnly && task?.case_type === "non_vocal") return;
      const order = rankings?.[dimension.key] || [];
      for (let left = 0; left < order.length; left += 1) {
        for (let right = left + 1; right < order.length; right += 1) {
          const higherRankId = order[left];
          const lowerRankId = order[right];
          const higherScore = mos?.[higherRankId]?.scores?.[dimension.scoreKey];
          const lowerScore = mos?.[lowerRankId]?.scores?.[dimension.scoreKey];
          const higherNumeric = Number(higherScore);
          const lowerNumeric = Number(lowerScore);
          if (!Number.isInteger(higherNumeric) || higherNumeric < 1 || higherNumeric > 5 || !Number.isInteger(lowerNumeric) || lowerNumeric < 1 || lowerNumeric > 5) continue;
          if (higherNumeric < lowerNumeric) output.push({ dimension, higherRankId, lowerRankId, higherRank: left + 1, lowerRank: right + 1, higherScore: higherNumeric, lowerScore: lowerNumeric });
        }
      }
    });
    return output;
  }

  window.SB_NOV = {
    WORK_ORDER_SCHEMA,
    RESULT_SCHEMA,
    MAPPING_SCHEMA,
    MODEL_COUNT,
    CELL_WARNING,
    CELL_HARD_LIMIT,
    escapeHtml,
    toast,
    parseDelimited,
    toCsv,
    download,
    makeId,
    makeBatchId,
    randomToken,
    shuffle,
    stableStringify,
    fingerprint,
    normalizeUrl,
    isUrl,
    safeJson,
    compactObject,
    dateStamp,
    dimensionMap,
    rankingConflicts
  };
})();
