/**
 * PHILIP MAINA (@KIVICE) — CREATIVE EDITORIAL PORTFOLIO CONTROLLER
 * High-Craft Editorial Typography, Mathematical Precision, Zero-Lag Execution
 * Applied Mathematics & Computer Science at Kirinyaga University, Kenya
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME ENGINE (LIGHT EDITORIAL PAPER / MIDNIGHT OBSIDIAN) ---
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("philip-portfolio-theme") || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const active = document.documentElement.getAttribute("data-theme");
      const next = active === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("philip-portfolio-theme", next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === "dark" ? "☀️" : "🌓";
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  // --- 2. LIVE NAIROBI CLOCK (EAT / UTC+3) ---
  const timeEl = document.getElementById("live-eat-time");
  function updateNairobiTime() {
    if (!timeEl) return;
    try {
      const now = new Date();
      const options = { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
      timeEl.textContent = `Nairobi ${new Intl.DateTimeFormat([], options).format(now)} EAT`;
    } catch (e) {
      timeEl.textContent = "Nairobi (UTC+3)";
    }
  }
  updateNairobiTime();
  setInterval(updateNairobiTime, 1000);

  // --- 3. MOBILE MENU CONTROLLER ---
  const menuToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      navLinks.classList.toggle("is-open", !isExpanded);
      document.body.classList.toggle("menu-open", !isExpanded);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // --- 4. THE ONE SIGNATURE CREATIVE ANIMATION: MATHEMATICAL HARMONIC OSCILLATOR ---
  const canvas = document.getElementById("harmonic-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let step = 0;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function drawHarmonicWave() {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (!width || !height) {
        requestAnimationFrame(drawHarmonicWave);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const strokeColor = isDark ? "#38bdf8" : "#1d4ed8";
      const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(20, 23, 33, 0.06)";

      // Horizontal coordinate axis
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Primary Standing Wave: y = A * sin(kx + wt) * cos(0.015 * step)
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";

      const baseAmp = height / 2.7;
      const breathing = Math.cos(step * 0.018);
      const amp = baseAmp * (0.6 + 0.4 * breathing);

      for (let x = 0; x <= width; x += 2) {
        const freq = 0.024;
        const y = height / 2 + Math.sin(x * freq + step * 0.04) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary Carrier Wave (Subtle harmonics overlay)
      ctx.beginPath();
      ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.25)" : "rgba(29, 78, 216, 0.2)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 4]);

      for (let x = 0; x <= width; x += 3) {
        const freq = 0.048;
        const y = height / 2 + Math.cos(x * freq - step * 0.025) * (amp * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      step += 1;
      requestAnimationFrame(drawHarmonicWave);
    }
    requestAnimationFrame(drawHarmonicWave);
  }

  // --- 5. ARCHITECTURAL CASE STUDY DRAWER (GROUNDED TECHNICAL SPECS) ---
  const projectSpecs = {
    xpower: {
      badge: "Full-Stack Web · Next.js 16 & TypeScript (Client Template)",
      title: "X Power Program Kenya",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Kenyan Talent  │───► │ Matching Engine│ ───►│ Verified Corps │
│ Skill Profiles │     │ Talent Routing │     │ Vacancy Matrix │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A full-stack employment discovery and candidate matching web platform engineered to connect job seekers across Kenyan counties with verified corporate opportunities. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and native relational SQLite/Postgres.",
      features: "Transparent 100-point skill compatibility scoring, verified employer onboarding, application lifecycle tracking, responsive mobile-first UI architecture, and turnkey client showcase demo controls.",
      stack: ["Next.js 16", "TypeScript", "PostgreSQL / SQLite", "Tailwind CSS", "Client Template ⚡"],
      liveUrl: "https://kivice.github.io/x-power-program/",
      githubUrl: "https://github.com/Kivice/x-power-program"
    },
    veronica: {
      badge: "Desktop Automation · Python & Audio APIs",
      title: "Project Veronica — Desktop Voice Assistant",
      diagram: `┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│ Voice Input  │───► │ Intent Handler │ ───►│ Windows APIs │
│ Microphone   │     │ Python Service │     │ CoreAudio    │
└──────────────┘     └────────────────┘     └──────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ System Vitals  │
                    │ CPU / RAM / IP │
                    └────────────────┘`,
      overview: "A lightweight Python desktop utility that enables hands-free computer control, system performance monitoring, and audio synthesis.",
      features: "Real-time Microsoft Edge neural voice streaming, Windows CoreAudio volume endpoint adjustments, hardware telemetry tracking (per-core CPU, RAM, network), and Home Assistant relay control.",
      stack: ["Python 3.13", "Edge Neural TTS", "Windows APIs", "WebSockets", "System Telemetry"],
      githubUrl: "https://github.com/Kivice/veronica"
    },
    healthcare: {
      badge: "Client Showcase Template · Clinical Architecture",
      title: "ApexCare: Clinical Portal & Scheduling Template",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Patient Portal │───► │ Interactive    │ ───►│ Digital Slip   │
│ Theme / Triage │     │ Slot Engine    │     │ QR Verification│
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A turnkey, client-ready healthcare appointment booking and clinical triage web portal template designed for hospital networks, private clinics, and telehealth practices to preview, customize, and license.",
      features: "Interactive multi-theme colorway switcher (Clinical Sky, Emerald, Indigo, Rose), 1-click demo patient auto-fill, dynamic doctor-to-department slot reservation, simulated verification vouchers, and white-label deployment specifications.",
      stack: ["Semantic HTML5", "Design Tokens CSS3", "Vanilla JS ES6+", "Theme Switcher", "White-Label Ready"],
      liveUrl: "https://kivice.github.io/International-Healthcare-Booking-System/",
      githubUrl: "https://github.com/Kivice/International-Healthcare-Booking-System"
    },
    hyperos: {
      badge: "System Utility · Python & NTP Protocol",
      title: "Xiaomi Bootloader Timing Utility",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ NTP Server     │───► │ Latency Offset │ ───►│ Fastboot API   │
│ Time Sync      │     │ Phase-Shift    │     │ Unlock Window  │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A specialized Python automation script designed to synchronize with remote server time and dispatch fastboot unlock requests within millisecond boundary reset windows.",
      features: "Multi-server NTP polling, latency jitter calculation, phase-shifting request scheduling, and automated request dispatching.",
      stack: ["Python", "NTP Protocol", "Network Sockets", "Fastboot Automation"],
      githubUrl: "https://github.com/Kivice/Xiaomi-HyperOS-Unlock-Script"
    }
  };

  const modalBackdrop = document.getElementById("tech-modal");
  const modalContainer = document.getElementById("tech-modal-content");
  const modalClose = document.getElementById("tech-modal-close");

  function openTechModal(projectId) {
    const spec = projectSpecs[projectId];
    if (!spec || !modalBackdrop || !modalContainer) return;

    modalContainer.innerHTML = `
      <span class="modal-badge-label">${spec.badge}</span>
      <h3 class="modal-headline">${spec.title}</h3>
      <div class="modal-diagram-block"><pre>${spec.diagram}</pre></div>
      <h4 class="modal-subhead">System Overview</h4>
      <p class="modal-text">${spec.overview}</p>
      <h4 class="modal-subhead">Key Architecture &amp; Engineering</h4>
      <p class="modal-text">${spec.features}</p>
      <h4 class="modal-subhead">Technologies &amp; Libraries</h4>
      <div class="modal-tech-pills">
        ${spec.stack.map(s => `<span>${s}</span>`).join("")}
      </div>
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border); display: flex; gap: 12px; flex-wrap: wrap;">
        ${spec.liveUrl ? `<a class="btn-primary" href="${spec.liveUrl}" target="_blank" rel="noopener noreferrer">Launch Live Web App ↗</a>` : ""}
        <a class="${spec.liveUrl ? "btn-secondary" : "btn-primary"}" href="${spec.githubUrl}" target="_blank" rel="noopener noreferrer">
          View Repository on GitHub ↗
        </a>
      </div>
    `;

    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeTechModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-spec-trigger]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const specId = btn.getAttribute("data-spec-trigger");
      openTechModal(specId);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeTechModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeTechModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) closeTechModal();
    });
  }

  // --- 6. 1-CLICK CLIPBOARD EMAIL COPY ---
  const copyBtn = document.getElementById("copy-email-btn");
  const emailVal = "philipmaina637@gmail.com";
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailVal);
        showToast("✓ Copied philipmaina637@gmail.com to clipboard!");
      } catch (err) {
        showToast("✓ Email: philipmaina637@gmail.com");
      }
    });
  }

  // --- 7. PORTFOLIO ASSISTANT CHAT BOT ---
  const chatLauncherBtn = document.getElementById("chat-launcher-btn");
  const chatWindow = document.getElementById("chat-window");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  function openChat() {
    if (!chatWindow) return;
    chatWindow.classList.add("is-open");
    chatWindow.setAttribute("aria-hidden", "false");
    if (chatInput) setTimeout(() => chatInput.focus(), 150);
  }

  function closeChat() {
    if (!chatWindow) return;
    chatWindow.classList.remove("is-open");
    chatWindow.setAttribute("aria-hidden", "true");
  }

  if (chatLauncherBtn) {
    chatLauncherBtn.addEventListener("click", () => {
      const isOpen = chatWindow && chatWindow.classList.contains("is-open");
      if (isOpen) closeChat();
      else openChat();
    });
  }

  if (chatCloseBtn) chatCloseBtn.addEventListener("click", closeChat);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWindow && chatWindow.classList.contains("is-open")) {
      closeChat();
      chatLauncherBtn?.focus();
    }
  });

  function getBotResponse(userText) {
    const q = userText.toLowerCase().trim();

    if (q.includes("education") || q.includes("university") || q.includes("kirinyaga") || q.includes("degree") || q.includes("school") || q.includes("bsc") || q.includes("math")) {
      return `Philip is an undergraduate student at <strong>Kirinyaga University, Kenya</strong> pursuing a <strong>BSc in Mathematics and Computer Science</strong>.<br><br>He focuses on discrete mathematics, linear algebra, algorithmic problem solving, and low-latency systems engineering.`;
    }

    if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("repo") || q.includes("github") || q.includes("xpower") || q.includes("veronica") || q.includes("xiaomi") || q.includes("healthcare")) {
      return `Philip maintains <strong>53+ repositories on GitHub</strong> (<a href="https://github.com/Kivice" target="_blank" style="color:var(--accent);text-decoration:underline;">@Kivice</a>). Key projects:<br><br>
        1. <strong>X Power Program Kenya</strong>: Turnkey employment matching template with 100-point skill diagnostics, 3-role sandbox &amp; multi-theme switcher (<a href="https://kivice.github.io/x-power-program/" target="_blank" style="color:var(--accent);font-weight:700;text-decoration:underline;">Explore Platform Demo ↗</a>).<br>
        2. <strong>Project Veronica</strong>: Python desktop assistant streaming Edge neural voices &amp; Windows system vitals.<br>
        3. <strong>ApexCare Clinical Portal Template</strong>: Turnkey healthcare booking &amp; emergency triage template with multi-theme switcher and demo auto-fill (<a href="https://kivice.github.io/International-Healthcare-Booking-System/" target="_blank" style="color:var(--accent);font-weight:700;text-decoration:underline;">Explore Template Demo ↗</a>).<br>
        4. <strong>Xiaomi Fastboot Utility</strong>: Millisecond NTP-synchronized bootloader unlock tool.<br><br>
        <em>Tip: Click any project card on this page to view full architectural schematics.</em>`;
    }

    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language") || q.includes("python") || q.includes("next") || q.includes("react")) {
      return `Philip's technical stack includes:<br><br>
        • <strong>Languages</strong>: TypeScript, JavaScript, Python, C++, HTML5/CSS3, SQL.<br>
        • <strong>Web &amp; Frameworks</strong>: Next.js, React, Node.js, Express, Tailwind CSS.<br>
        • <strong>Systems &amp; Data</strong>: PostgreSQL, MySQL, SQLite, Windows APIs, Linux shell, Git.<br>
        • <strong>Core Focus</strong>: Zero-bloat architectures, mathematical rigor, and dependable code.`;
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("whatsapp") || q.includes("email") || q.includes("call") || q.includes("reach") || q.includes("hire") || q.includes("message")) {
      return `You can reach Philip directly:<br><br>
        • <strong>Phone / WhatsApp</strong>: <a href="https://wa.me/254708746611" target="_blank" style="color:var(--accent);font-weight:700;text-decoration:underline;">+254 708 746 611</a><br>
        • <strong>Email</strong>: <a href="mailto:philipmaina637@gmail.com" style="color:var(--accent);font-weight:700;text-decoration:underline;">philipmaina637@gmail.com</a><br>
        • <strong>GitHub</strong>: <a href="https://github.com/Kivice" target="_blank" style="color:var(--accent);font-weight:700;text-decoration:underline;">github.com/Kivice</a>`;
    }

    if (q.includes("bloat") || q.includes("speed") || q.includes("philosophy") || q.includes("performance") || q.includes("fast") || q.includes("manifesto")) {
      return `Philip builds with a <strong>zero-bloat philosophy</strong>: avoiding multi-megabyte JavaScript runtimes when semantic HTML, modular CSS, and lightweight scripts can deliver &lt;35 KB payloads and ~28ms render latency. This ensures pages load instantly on any mobile device or metered connection.`;
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("pdf")) {
      return `You can view and print Philip's formal curriculum vitae on the <a href="resume.html" style="color:var(--accent);font-weight:700;text-decoration:underline;">Resume / CV Page ↗</a>.`;
    }

    if (q.includes("location") || q.includes("where") || q.includes("nairobi") || q.includes("kenya") || q.includes("based")) {
      return `Philip is based in <strong>Kenya</strong> (Kirinyaga University / Nairobi area), operating in East Africa Time (EAT, UTC+3).`;
    }

    return `I can help you explore Philip's background! You can ask about his <strong>education at Kirinyaga University</strong>, his <strong>projects</strong> (X Power, Veronica, Healthcare), his <strong>technical skills</strong>, his <strong>zero bloat philosophy</strong>, or get his <strong>direct phone &amp; email</strong> (+254 708 746 611 / philipmaina637@gmail.com).`;
  }

  function appendUserMessage(text) {
    if (!chatMessages) return;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble user";
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserQuery(userQueryText) {
    const text = userQueryText.trim();
    if (!text) return;

    appendUserMessage(text);
    if (chatInput) chatInput.value = "";

    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-typing";
    typingIndicator.id = "chat-typing-indicator";
    typingIndicator.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const botResponseHtml = getBotResponse(text);
      const botBubble = document.createElement("div");
      botBubble.className = "chat-bubble bot";
      botBubble.innerHTML = `
        ${botResponseHtml}
        <div class="chat-chips-row">
          <button class="chat-chip" data-query="education" type="button">🎓 Education</button>
          <button class="chat-chip" data-query="projects" type="button">💼 Projects</button>
          <button class="chat-chip" data-query="skills" type="button">🛠️ Skills</button>
          <button class="chat-chip" data-query="contact" type="button">📞 Contact</button>
        </div>
      `;
      chatMessages.appendChild(botBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 280);
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!chatInput) return;
      handleUserQuery(chatInput.value);
    });
  }

  if (chatMessages) {
    chatMessages.addEventListener("click", (e) => {
      const chip = e.target.closest(".chat-chip");
      if (!chip) return;
      const queryKey = chip.getAttribute("data-query");
      const queryLabels = {
        education: "Tell me about your education at Kirinyaga University",
        projects: "What software projects have you built?",
        skills: "What technologies and skills do you work with?",
        contact: "How can I contact Philip directly?",
        philosophy: "What is your zero-bloat philosophy?"
      };
      const prompt = queryLabels[queryKey] || chip.textContent.trim();
      handleUserQuery(prompt);
    });
  }
});
