(function () {
  "use strict";

  const EXPECTED_HASH = "018d3e615d00ea2e2dd039a4a46f074f4cd8895e546b37da647a3e0c2cd5605d";
  const SESSION_KEY = "sonicbench_nov_portal_access_v1";
  const gate = document.getElementById("portal-gate");
  const form = document.getElementById("portal-gate-form");
  const input = document.getElementById("portal-access-code");
  const error = document.getElementById("portal-gate-error");
  const content = document.getElementById("portal-content");

  function unlock() {
    gate.hidden = true;
    content.hidden = false;
    document.body.classList.remove("portal-locked");
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  if (sessionStorage.getItem(SESSION_KEY) === EXPECTED_HASH) {
    unlock();
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submittedHash = await sha256(input.value.trim());
    if (submittedHash !== EXPECTED_HASH) {
      error.textContent = "访问码不正确，请重新输入。";
      input.select();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, submittedHash);
    error.textContent = "";
    unlock();
  });
})();
