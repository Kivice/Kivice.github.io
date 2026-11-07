/**
 * PHILIP MAINA (@KIVICE) — BENTO STUDIO UI CONTROLLER
 * Features: Interactive Terminal, Theme Toggle, Clipboard Actions, Dynamic Bento Glow
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME TOGGLE CONTROLLER ---
  const themeToggle = document.getElementById("template-theme-toggle");
  const storedTheme = localStorage.getItem("bento-portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("bento-portfolio-theme", next);
    });
  }

  // --- 2. INTERACTIVE TERMINAL WIDGET ---
  const terminalBody = document.getElementById("term-output-area");
  const termButtons = document.querySelectorAll("[data-term-cmd]");

  const terminalResponses = {
    "whoami": "Philip Maina (@Kivice) | Systems Builder & Full-Stack AI Engineer based in Kenya.",
    "skills": "AI: Gemini 3 Flash, Claude Code, Neural TTS | Languages: TypeScript, Python, Go, JS | Tools: Docker, Reverse Engineering, Linux.",
    "veronica": "Project Veronica Mark-V: Stark-inspired tactical desktop AI agent featuring low-latency voice, CoreAudio, and IoT security automation.",
    "contact": "Email: philipmaian637@gmail.com | GitHub: github.com/Kivice (53+ repos) | Status: Open for technical contracts & roles.",
    "clear": ""
  };

  if (terminalBody && termButtons.length > 0) {
    termButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cmd = btn.getAttribute("data-term-cmd");
        if (cmd === "clear") {
          terminalBody.innerHTML = `
            <div><span class="term-prompt">kivice@dev:~$</span> <span class="term-cmd">clear</span></div>
          `;
          return;
        }

        const response = terminalResponses[cmd] || "Command not found.";
        const entry = document.createElement("div");
        entry.innerHTML = `
          <div><span class="term-prompt">kivice@dev:~$</span> <span class="term-cmd">${cmd}</span></div>
          <div class="term-output">${response}</div>
        `;
        terminalBody.appendChild(entry);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      });
    });
  }

  // --- 3. CLIPBOARD COPY WITH TOAST NOTIFICATION ---
  const copyBtn = document.getElementById("bento-copy-email");
  const emailVal = "philipmaian637@gmail.com";
  const toastEl = document.getElementById("toast");

  function triggerToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 3000);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailVal);
        triggerToast("✓ Copied philipmaian637@gmail.com!");
      } catch (e) {
        triggerToast("✓ Email: philipmaian637@gmail.com");
      }
    });
  }

  // --- 4. BENTO MOUSE-TRACKING GLOW ---
  const bentoCards = document.querySelectorAll(".bento-card");
  bentoCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // --- 5. YEAR AUTO-UPDATE ---
  const yearSpan = document.getElementById("template-year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
});
