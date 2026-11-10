(function () {
  "use strict";

  const S = window.SB_NOV;
  const R = window.SB_NOV_RUBRIC;
  if (!S || !R) return;

  const candidates = [1, 2, 3].map((index) => ({
    blind_id: `DEMO-${String(index).padStart(2, "0")}-NOV-RANK`,
    url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${index}.mp3`
  }));

  async function workOrder() {
    const task = {
      schema_version: S.WORK_ORDER_SCHEMA,
      batch_id: "BATCH-DEMO-NOV",
      case_type: "vocal",
      case: {
        case_id: "DEMO-VOCAL-001",
        language: "Chinese",
        info: "测试 Case：流行抒情，温暖男声，中速，钢琴与弦乐编配。",
        lyrics: "[Verse]\n夜色落在安静的窗前\n我把未说完的话写成一段旋律"
      },
      candidates: JSON.parse(JSON.stringify(candidates))
    };
    task.fingerprint = await S.fingerprint(task);
    return task;
  }

  async function completedResult() {
    const task = await workOrder();
    const active = R.dimensions.filter((dimension) => !R.nonVocalExcludedDimensions.includes(dimension.key) || task.case_type === "vocal");
    const mos = task.candidates.map((candidate, candidateIndex) => {
      const scores = {};
      const notes = {};
      active.forEach((dimension) => {
        scores[dimension.key] = dimension.groupKey === "instruction" ? 5 : 4;
        if (dimension.noteRule === "always") notes[dimension.key] = `测试备注：候选 ${candidateIndex + 1} 整体表现稳定。`;
      });
      return { blind_id: candidate.blind_id, scores, notes };
    });
    const now = new Date().toISOString();
    return {
      schema_version: S.RESULT_SCHEMA,
      work_order: task,
      mos,
      status: "complete",
      started_at: now,
      completed_at: now,
      updated_at: now,
      revision: 1,
      audit: []
    };
  }

  window.SB_NOV_DEMO = { workOrder, completedResult };
})();
