/**
 * PHILIP MAINA (@KIVICE) — BENTO STUDIO UI CONTROLLER
 * Features: Interactive Terminal, Theme Toggle, Clipboard Actions, Bento Glow
 */

document.addEventListener("DOMContentLoaded", () => {
  const icons = {
    sun: '<svg class="icon icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>',
    moon: '<svg class="icon icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',
    check: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>'
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // --- 1. THEME TOGGLE CONTROLLER ---
  const themeToggle = document.getElementById("template-theme-toggle");
  const storedTheme = localStorage.getItem("bento-portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeButton(storedTheme);

  function updateThemeButton(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === "dark" ? icons.sun : icons.moon;
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("bento-portfolio-theme", next);
      updateThemeButton(next);
    });
  }

  // --- 2. INTERACTIVE TERMINAL WIDGET ---
  const terminalBody = document.getElementById("term-output-area");
  const termButtons = document.querySelectorAll("[data-term-cmd]");

  const terminalResponses = {
    whoami: "Philip Maina (@Kivice) | BSc Mathematics & Computer Science at Kirinyaga University | Mobile, Web & Systems Builder in Kenya.",
    ubaridi: "Ubaridi (github.com/Kivice/ubaridi-app): Flutter Android beta v1.0.0 for KyU, Kutus, Kerugoya & Sagana — Impeller Vulkan (~20 MB), Firebase, and M-Pesa Daraja previews.",
    education: "Kirinyaga University — BSc Mathematics and Computer Science. Discrete Mathematics, Algorithms & Complexity, 3NF SQL Databases, and Numerical Methods.",
    skills: "Web & Mobile: TypeScript, Next.js 16, Flutter & Dart | Systems: Python 3.13, Windows CoreAudio, NTP Sockets, MySQL 3NF.",
    veronica: "Project Veronica Mark-V: Stark-inspired tactical Python desktop AI agent featuring Gemini 3 Flash, Edge neural TTS, CoreAudio telemetry, and IoT bridge.",
    contact: "Email: philipmaina637@gmail.com | GitHub: github.com/Kivice (12 public / 60 total repos) | Phone: +254 708 746 611.",
    clear: ""
  };

  if (terminalBody && termButtons.length > 0) {
    termButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cmd = btn.getAttribute("data-term-cmd") || "";
        if (cmd === "clear") {
          terminalBody.innerHTML = `
            <div><span class="term-prompt">kivice@dev:~$</span> <span class="term-cmd">clear</span></div>
          `;
          return;
        }

        const response = terminalResponses[cmd] || "Command not found.";
        const entry = document.createElement("div");
        entry.innerHTML = `
          <div><span class="term-prompt">kivice@dev:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span></div>
          <div class="term-output">${escapeHtml(response)}</div>
        `;
        terminalBody.appendChild(entry);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      });
    });
  }

  // --- 3. CLIPBOARD COPY WITH TOAST NOTIFICATION ---
  const copyBtn = document.getElementById("bento-copy-email");
  const emailVal = "philipmaina637@gmail.com";
  const toastEl = document.getElementById("toast");
  let toastTimer = null;

  function triggerToast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = `${icons.check}<span>${escapeHtml(msg)}</span>`;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3000);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailVal);
        triggerToast("Copied philipmaina637@gmail.com");
      } catch (e) {
        triggerToast("Email: philipmaina637@gmail.com");
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
