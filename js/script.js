/**
 * PHILIP MAINA (@KIVICE) — CREATIVE EDITORIAL PORTFOLIO CONTROLLER
 * High-Craft Editorial Typography, Mathematical Precision, Zero-Lag Execution
 * Applied Mathematics & Computer Science at Kirinyaga University, Kenya
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

  // --- 1. THEME ENGINE (EDITORIAL PAPER / MIDNIGHT OBSIDIAN) ---
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("philip-portfolio-theme") || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeIcon(storedTheme);

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === "dark" ? icons.sun : icons.moon;
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const active = document.documentElement.getAttribute("data-theme");
      const next = active === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("philip-portfolio-theme", next);
      updateThemeIcon(next);
    });
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

  // --- 3. MOBILE MENU CONTROLLER & SECTION SCROLL-SPY ---
  const menuToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      navLinks.classList.toggle("is-open", !isExpanded);
      document.body.classList.toggle("menu-open", !isExpanded);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("is-open") && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // Active nav highlight as user scrolls across sections
  const navItems = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
  if ("IntersectionObserver" in window && navItems.length > 0) {
    const sectionMap = navItems
      .map((link) => ({
        link,
        el: document.querySelector(link.getAttribute("href"))
      }))
      .filter((item) => item.el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navItems.forEach((l) => l.classList.remove("is-active"));
            const activeItem = sectionMap.find((s) => s.el === entry.target);
            if (activeItem) activeItem.link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );

    sectionMap.forEach((s) => observer.observe(s.el));
  }

  // --- 4. MATHEMATICAL HARMONIC OSCILLATOR (SINGLE SIGNATURE CANVAS) ---
  const canvas = document.getElementById("harmonic-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let step = 0;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", () => {
      resizeCanvas();
      if (reducedMotion) renderFrame();
    });

    function renderFrame() {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const strokeColor = isDark ? "#38bdf8" : "#1d4ed8";
      const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(20, 23, 33, 0.06)";

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";

      const baseAmp = height / 2.7;
      const breathing = reducedMotion ? 1 : Math.cos(step * 0.018);
      const amp = baseAmp * (0.6 + 0.4 * breathing);

      for (let x = 0; x <= width; x += 2) {
        const freq = 0.024;
        const y = height / 2 + Math.sin(x * freq + step * 0.04) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

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
    }

    function drawHarmonicWave() {
      renderFrame();
      if (!reducedMotion) {
        step += 1;
        requestAnimationFrame(drawHarmonicWave);
      }
    }

    drawHarmonicWave();
  }

  // --- 5. PROJECT VAULT CATEGORY FILTER ---
  const filterTabs = document.querySelectorAll(".vault-filter-tab");
  const vaultCards = document.querySelectorAll(".vault-card");

  if (filterTabs.length && vaultCards.length) {
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-vault-filter");
        filterTabs.forEach((t) => {
          const isCurrent = t === tab;
          t.classList.toggle("active", isCurrent);
          t.setAttribute("aria-pressed", String(isCurrent));
        });

        vaultCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          const shouldShow = filter === "all" || category === filter;
          card.classList.toggle("is-hidden", !shouldShow);
        });
      });
    });
  }

  // --- 6. ARCHITECTURAL CASE STUDY DRAWER ---
  const projectSpecs = {
    ubaridi: {
      badge: "Mobile Platform · Flutter, Dart & Firebase (Android Beta v1.0.0)",
      title: "Ubaridi — Kirinyaga Ride, Parcel & Local Order App",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Flutter Client │───► │ GPS Stage &    │ ───►│ Firebase Sync  │
│ Impeller UI    │     │ Daraja STK API │     │ Trip PIN / SOS │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A lightweight native Android transport and delivery app built specifically for Kirinyaga University (KyU), Kutus, Kerugoya, Kagio, and Sagana. Supports boda-boda rides (KES 50 base), tracked parcel drops (KES 70 base), and campus/town errands (KES 100 base).",
      features: "Compiled with Flutter Impeller Vulkan pipeline and compressed map caches so mid-range phones stay responsive (~18–20.4 MB APKs for armeabi-v7a and arm64-v8a). Includes Street & Satellite map modes, landmark stage pins, 4-digit Trip PIN verification, emergency SOS alert, and M-Pesa STK checkout preview.",
      stack: ["Flutter", "Dart", "Firebase", "M-Pesa Daraja", "Impeller Vulkan", "Android APK"],
      liveLabel: "Download Beta APK",
      liveUrl: "https://github.com/Kivice/ubaridi-app/releases/tag/v1.0.0-beta.1",
      githubUrl: "https://github.com/Kivice/ubaridi-app"
    },
    xpower: {
      badge: "Full-Stack Web · Next.js 16 & TypeScript",
      title: "X Power Program Kenya",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Kenyan Talent  │───► │ Matching Engine│ ───►│ Verified Corps │
│ Skill Profiles │     │ Talent Routing │     │ Vacancy Matrix │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A full-stack employment discovery and candidate matching web platform engineered to connect job seekers across Kenyan counties with verified corporate opportunities. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and relational SQL storage.",
      features: "Transparent 100-point skill compatibility scoring, verified employer onboarding, application lifecycle tracking, responsive mobile-first UI architecture, and interactive client showcase controls.",
      stack: ["Next.js 16", "TypeScript", "PostgreSQL / SQLite", "Tailwind CSS", "Client Template"],
      liveLabel: "Launch Platform Demo",
      liveUrl: "https://kivice.github.io/x-power-program/",
      githubUrl: "https://github.com/Kivice/x-power-program"
    },
    veronica: {
      badge: "Desktop Agent · Python 3.13 & CoreAudio",
      title: "Project Veronica Mark-V — Desktop Voice Assistant",
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
      overview: "A Stark-inspired tactical AI desktop assistant enabling hands-free Windows control, hardware performance monitoring, local IoT bridge commands, and neural audio synthesis.",
      features: "Gemini 3 Flash reasoning integration, low-latency Microsoft Edge neural voice streaming, Windows CoreAudio endpoint volume controls, live per-core CPU/RAM telemetry, and WebSocket event relays.",
      stack: ["Python 3.13", "Gemini 3 Flash", "Edge Neural TTS", "Windows CoreAudio", "WebSockets"],
      githubUrl: "https://github.com/Kivice/veronica"
    },
    healthcare: {
      badge: "Client Showcase Template · Clinical Portal Architecture",
      title: "ApexCare — Clinical Portal & Patient Scheduling Template",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Patient Portal │───► │ Interactive    │ ───►│ Digital Slip   │
│ Theme / Triage │     │ Slot Engine    │     │ Print Voucher  │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A turnkey, white-label clinical booking and emergency triage web portal template built for hospitals, outpatient clinics, and telehealth practices with zero framework overhead.",
      features: "Unified multi-theme CSS token presets (Clinical Sky, Emerald, Indigo, Rose), one-click sample patient auto-fill, dynamic specialist routing, printable confirmation slip modal, XSS-safe patient feedback rendering, and direct WhatsApp triage links.",
      stack: ["Semantic HTML5", "CSS3 Design Tokens", "Vanilla JS ES6+", "Print Slip Media", "White-Label Ready"],
      liveLabel: "Explore Live Portal",
      liveUrl: "https://kivice.github.io/International-Healthcare-Booking-System/",
      githubUrl: "https://github.com/Kivice/International-Healthcare-Booking-System"
    },
    hyperos: {
      badge: "System Utility · Python & NTP Protocol",
      title: "Xiaomi HyperOS Bootloader Timing Utility",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ NTP Server     │───► │ Latency Offset │ ───►│ Fastboot API   │
│ Time Sync      │     │ Phase-Shift    │     │ Unlock Window  │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A specialized Python automation script designed to synchronize system timing against NTP servers and dispatch fastboot unlock requests within millisecond boundary reset windows.",
      features: "Multi-server NTP clock polling, round-trip latency jitter estimation, phase-shifted dispatch scheduling, and automated USB/API submission handling.",
      stack: ["Python", "NTP Protocol", "Network Sockets", "Fastboot Automation"],
      githubUrl: "https://github.com/Kivice/Xiaomi-HyperOS-Unlock-Script"
    },
    library: {
      badge: "Database Engineering · MySQL & 3NF Relational Schema",
      title: "Library Relational Database Architecture",
      diagram: `┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Books   │────►│ Loans (M:N)  │◄────│   Members    │
└──────────┘     └──────┬───────┘     └──────────────┘
                        ▼
                 ┌──────────────┐     ┌──────────────┐
                 │ Transactions │◄────│  Librarians  │
                 └──────────────┘     └──────────────┘`,
      overview: "A strictly normalized MySQL relational database schema modeling book inventory, registered patrons, librarian oversight, and immutable circulation transactions.",
      features: "Five interrelated tables (Books, Members, Loans, Librarians, Transactions) enforcing 3NF separation, unique ISBN/email constraints, ENUM loan status tracking, and cascading foreign keys.",
      stack: ["MySQL", "3NF Schema Design", "Foreign Key Integrity", "Transactional SQL"],
      githubUrl: "https://github.com/Kivice/Library_Database_mangement"
    }
  };

  const modalBackdrop = document.getElementById("tech-modal");
  const modalContainer = document.getElementById("tech-modal-content");
  const modalClose = document.getElementById("tech-modal-close");
  let lastModalTrigger = null;

  function openTechModal(projectId, triggerEl) {
    const spec = projectSpecs[projectId];
    if (!spec || !modalBackdrop || !modalContainer) return;
    lastModalTrigger = triggerEl || document.activeElement;

    modalContainer.innerHTML = `
      <span class="modal-badge-label">${escapeHtml(spec.badge)}</span>
      <h3 class="modal-headline">${escapeHtml(spec.title)}</h3>
      <div class="modal-diagram-block"><pre>${escapeHtml(spec.diagram)}</pre></div>
      <h4 class="modal-subhead">System Overview</h4>
      <p class="modal-text">${escapeHtml(spec.overview)}</p>
      <h4 class="modal-subhead">Key Architecture &amp; Engineering</h4>
      <p class="modal-text">${escapeHtml(spec.features)}</p>
      <h4 class="modal-subhead">Technologies &amp; Libraries</h4>
      <div class="modal-tech-pills">
        ${spec.stack.map((s) => `<span>${escapeHtml(s)}</span>`).join("")}
      </div>
      <div class="modal-actions-footer">
        ${spec.liveUrl ? `<a class="btn-primary" href="${escapeHtml(spec.liveUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(spec.liveLabel || "Launch Live Web App")} ↗</a>` : ""}
        <a class="${spec.liveUrl ? "btn-secondary" : "btn-primary"}" href="${escapeHtml(spec.githubUrl)}" target="_blank" rel="noopener noreferrer">
          View Repository on GitHub ↗
        </a>
      </div>
    `;

    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalClose) modalClose.focus();
  }

  function closeTechModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastModalTrigger && typeof lastModalTrigger.focus === "function") {
      lastModalTrigger.focus();
    }
    lastModalTrigger = null;
  }

  document.querySelectorAll("[data-spec-trigger]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const specId = btn.getAttribute("data-spec-trigger");
      openTechModal(specId, btn);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeTechModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeTechModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
        closeTechModal();
      }
    });
  }

  // --- 7. 1-CLICK CLIPBOARD EMAIL COPY ---
  const copyBtn = document.getElementById("copy-email-btn");
  const emailVal = "philipmaina637@gmail.com";
  const toast = document.getElementById("toast");
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `${icons.check}<span>${escapeHtml(message)}</span>`;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailVal);
        showToast("Copied philipmaina637@gmail.com to clipboard");
      } catch (err) {
        showToast("Email: philipmaina637@gmail.com");
      }
    });
  }

  // --- 8. PORTFOLIO ASSISTANT CHATBOT ---
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
    if (chatLauncherBtn) chatLauncherBtn.setAttribute("aria-expanded", "true");
    if (chatInput) setTimeout(() => chatInput.focus(), 150);
  }

  function closeChat() {
    if (!chatWindow) return;
    chatWindow.classList.remove("is-open");
    chatWindow.setAttribute("aria-hidden", "true");
    if (chatLauncherBtn) chatLauncherBtn.setAttribute("aria-expanded", "false");
  }

  if (chatLauncherBtn) {
    chatLauncherBtn.addEventListener("click", () => {
      const isOpen = chatWindow && chatWindow.classList.contains("is-open");
      if (isOpen) closeChat();
      else openChat();
    });
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener("click", () => {
      closeChat();
      chatLauncherBtn?.focus();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWindow && chatWindow.classList.contains("is-open")) {
      closeChat();
      chatLauncherBtn?.focus();
    }
  });

  function getBotResponse(userText) {
    const q = userText.toLowerCase().trim();

    if (q.includes("ubaridi") || q.includes("flutter") || q.includes("android") || q.includes("apk") || q.includes("boda")) {
      return `<strong>Ubaridi</strong> is Philip's latest public Android beta built with Flutter, Dart, Firebase, and M-Pesa Daraja previews for Kirinyaga University, Kutus, Kerugoya, and Sagana.<br><br>Includes boda rides, parcel delivery, town errands, Street/Satellite maps, and 4-digit Trip PIN verification (<a class="chat-inline-link" href="https://github.com/Kivice/ubaridi-app/releases/tag/v1.0.0-beta.1" target="_blank" rel="noopener noreferrer">Download Beta APK ↗</a>).`;
    }

    if (q.includes("education") || q.includes("university") || q.includes("kirinyaga") || q.includes("degree") || q.includes("school") || q.includes("bsc") || q.includes("math")) {
      return `Philip is an undergraduate student at <strong>Kirinyaga University, Kenya</strong> pursuing a <strong>BSc in Mathematics and Computer Science</strong>.<br><br>His coursework focuses on discrete mathematics, linear algebra, algorithmic problem solving, numerical analysis, and relational SQL systems.`;
    }

    if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("repo") || q.includes("github") || q.includes("xpower") || q.includes("veronica") || q.includes("xiaomi") || q.includes("healthcare") || q.includes("library")) {
      return `Philip maintains <strong>12 curated public repositories</strong> (60 total repos including private systems) on GitHub (<a class="chat-inline-link" href="https://github.com/Kivice" target="_blank" rel="noopener noreferrer">@Kivice</a>). Flagship builds:<br><br>
        1. <strong>Ubaridi (Android Beta)</strong>: Flutter transport &amp; parcel delivery app for Kirinyaga (<a class="chat-inline-link" href="https://github.com/Kivice/ubaridi-app" target="_blank" rel="noopener noreferrer">Repo ↗</a>).<br>
        2. <strong>X Power Program</strong>: Next.js 16 &amp; TypeScript job matching platform (<a class="chat-inline-link" href="https://kivice.github.io/x-power-program/" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>).<br>
        3. <strong>Project Veronica Mark-V</strong>: Python 3.13 + Gemini 3 desktop voice agent.<br>
        4. <strong>ApexCare Clinical Portal</strong>: Multi-theme white-label healthcare scheduler (<a class="chat-inline-link" href="https://kivice.github.io/International-Healthcare-Booking-System/" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>).<br>
        5. <strong>Xiaomi Fastboot &amp; 3NF SQL Library DB</strong>: Systems automation &amp; MySQL schema.`;
    }

    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language") || q.includes("python") || q.includes("next") || q.includes("react") || q.includes("dart")) {
      return `Philip's core stack spans web, mobile, and systems:<br><br>
        • <strong>Languages</strong>: TypeScript, JavaScript, Python, Dart, SQL.<br>
        • <strong>Web &amp; Mobile</strong>: Next.js 16, React, Flutter, Firebase, Tailwind CSS.<br>
        • <strong>Systems &amp; Data</strong>: MySQL, PostgreSQL, Windows CoreAudio APIs, NTP Sockets, Git.<br>
        • <strong>Focus</strong>: Zero-bloat performance, mathematical rigor, and dependable UX.`;
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("whatsapp") || q.includes("email") || q.includes("call") || q.includes("reach") || q.includes("hire") || q.includes("message")) {
      return `Reach Philip directly:<br><br>
        • <strong>Phone / WhatsApp</strong>: <a class="chat-inline-link" href="https://wa.me/254708746611" target="_blank" rel="noopener noreferrer">+254 708 746 611</a><br>
        • <strong>Email</strong>: <a class="chat-inline-link" href="mailto:philipmaina637@gmail.com">philipmaina637@gmail.com</a><br>
        • <strong>GitHub</strong>: <a class="chat-inline-link" href="https://github.com/Kivice" target="_blank" rel="noopener noreferrer">github.com/Kivice</a>`;
    }

    if (q.includes("bloat") || q.includes("speed") || q.includes("philosophy") || q.includes("performance") || q.includes("fast") || q.includes("manifesto")) {
      return `Philip engineers with a <strong>zero-bloat philosophy</strong>: choosing semantic HTML, modular CSS tokens, and lean vanilla scripts over multi-megabyte runtimes so pages and mid-range Android apps respond quickly on real mobile networks.`;
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("pdf")) {
      return `View or print Philip's curriculum vitae on the <a class="chat-inline-link" href="resume.html">Resume / CV Page ↗</a>.`;
    }

    if (q.includes("location") || q.includes("where") || q.includes("nairobi") || q.includes("kenya") || q.includes("based")) {
      return `Philip is based in <strong>Kirinyaga &amp; Nairobi, Kenya</strong> (East Africa Time, EAT / UTC+3).`;
    }

    return `I can help you explore Philip's work. Ask about <strong>Ubaridi</strong>, his <strong>education at Kirinyaga University</strong>, <strong>selected projects</strong>, <strong>technical stack</strong>, or direct <strong>contact channels</strong> (+254 708 746 611).`;
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
          <button class="chat-chip" data-query="ubaridi" type="button">Ubaridi App</button>
          <button class="chat-chip" data-query="projects" type="button">Projects</button>
          <button class="chat-chip" data-query="skills" type="button">Skills</button>
          <button class="chat-chip" data-query="contact" type="button">Contact</button>
        </div>
      `;
      chatMessages.appendChild(botBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 260);
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
        ubaridi: "Tell me about the Ubaridi Android app",
        education: "Tell me about Philip's education at Kirinyaga University",
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
