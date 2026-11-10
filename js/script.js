/**
 * PHILIP MAINA (@KIVICE) — ELEVATED PORTFOLIO CONTROLLER
 * Ultra-Smooth Interactions, Scroll Arc Fanning, Theme Engine, Architectural Drawer & Chatbot
 * Applied Mathematics & Systems Engineering at Kirinyaga University, Kenya
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. PRELOADER DISMISS ---
  const preloader = document.getElementById("preloader");
  const dismissPreloader = () => {
    if (!preloader) return;
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 450);
  };
  window.addEventListener("load", dismissPreloader);
  setTimeout(dismissPreloader, 1200); // Fail-safe fallback

  // --- 2. DUAL THEME ENGINE (LIGHT EDITORIAL / MIDNIGHT DARK) ---
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("philip-portfolio-theme") || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeButton(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("philip-portfolio-theme", next);
      updateThemeButton(next);
    });
  }

  function updateThemeButton(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  // --- 3. LIVE NAIROBI CLOCK (EAT / UTC+3) ---
  const clockEl = document.getElementById("live-eat-time");
  function updateNairobiClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const options = { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
      clockEl.textContent = `Nairobi ${new Intl.DateTimeFormat([], options).format(now)} EAT`;
    } catch (e) {
      clockEl.textContent = "Nairobi (UTC+3)";
    }
  }
  updateNairobiClock();
  setInterval(updateNairobiClock, 1000);

  // --- 4. MOBILE NAVIGATION CONTROLLER ---
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("navbar-nav");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      mobileToggle.innerHTML = isOpen ? "✕" : "☰";
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        mobileToggle.innerHTML = "☰";
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- 5. SCROLLSPY (ACTIVE NAV HIGHLIGHT) ---
  const spySections = ["work", "about", "services", "manifesto", "contacts"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll(".nav-link");

  function updateScrollSpy() {
    let currentId = "work";
    const line = window.innerHeight * 0.35;
    spySections.forEach(section => {
      if (section.getBoundingClientRect().top <= line) {
        currentId = section.getAttribute("id");
      }
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
      currentId = "contacts";
    }
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  }

  // --- 6. UI/UX SCROLL-LINKED ARC FANNING (COLLINS INSPIRATION) ---
  const uiuxContainer = document.querySelector(".uiux-scroll-container");
  const uiuxSticky = document.querySelector(".uiux-sticky-content");
  const arcItems = document.querySelectorAll(".arc-item");

  const arcTargets = [
    { x: -34, y: 4,   rot: -32, scale: 0.85 },
    { x: -17, y: -6,  rot: -16, scale: 0.95 },
    { x: 0,   y: -10, rot: 0,   scale: 1.1  },
    { x: 17,  y: -6,  rot: 16,  scale: 0.95 },
    { x: 34,  y: 4,   rot: 32,  scale: 0.85 }
  ];

  let arcCurrent = 0;
  let arcTarget = 0;
  let arcRaf = 0;
  let arcLast = 0;
  let arcInView = false;

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  function measureArcProgress() {
    if (!uiuxContainer || !uiuxSticky) return;
    const distance = uiuxContainer.offsetHeight - uiuxSticky.offsetHeight;
    arcTarget = distance > 0 ? clamp(-uiuxContainer.getBoundingClientRect().top / distance, 0, 1) : 0;
  }

  function paintArc(progress) {
    const isMobile = window.innerWidth < 768;
    const spread = isMobile ? 0.6 : 1;

    arcItems.forEach((item, i) => {
      const t = arcTargets[i];
      if (!t) return;
      const stagger = i * 0.1;
      const p = clamp((progress - stagger) / (1 - stagger), 0, 1);
      const e = 1 - Math.pow(1 - p, 3); // Smooth cubic ease-out

      const x = t.x * spread * e;
      const y = t.y * e + (1 - e) * 50;
      const r = t.rot * e;
      const s = 0.3 + ((t.scale * (isMobile ? 0.8 : 1)) - 0.3) * e;

      item.style.transform = `translate(-50%, -50%) translate3d(${x}vw, ${y}vh, 0) rotate(${r}deg) scale(${s})`;
      item.style.opacity = Math.min(1, p * 2.5).toFixed(3);
    });
  }

  function arcTick(now) {
    const dt = Math.min((now - arcLast) / 1000, 0.05);
    arcLast = now;
    arcCurrent += (arcTarget - arcCurrent) * (1 - Math.exp(-dt * 9));
    if (Math.abs(arcTarget - arcCurrent) < 0.0004) arcCurrent = arcTarget;
    paintArc(arcCurrent);
    arcRaf = arcCurrent === arcTarget ? 0 : requestAnimationFrame(arcTick);
  }

  function requestArc() {
    measureArcProgress();
    if (!arcRaf) {
      arcLast = performance.now();
      arcRaf = requestAnimationFrame(arcTick);
    }
  }

  if (uiuxContainer) {
    const observer = new IntersectionObserver((entries) => {
      arcInView = entries[0].isIntersecting;
      if (arcInView) requestArc();
      else {
        measureArcProgress();
        arcCurrent = arcTarget;
        paintArc(arcCurrent);
      }
    }, { rootMargin: "200px 0px" });
    observer.observe(uiuxContainer);
    measureArcProgress();
    arcCurrent = arcTarget;
    paintArc(arcCurrent);
  }

  // Unified rAF-batched scroll listener
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (isScrolling) return;
    isScrolling = true;
    requestAnimationFrame(() => {
      isScrolling = false;
      updateScrollSpy();
      if (arcInView) requestArc();
    });
  }, { passive: true });

  window.addEventListener("resize", () => {
    updateScrollSpy();
    measureArcProgress();
    if (!arcRaf) { arcCurrent = arcTarget; paintArc(arcCurrent); }
  }, { passive: true });

  // --- 7. ARCHITECTURAL CASE STUDY DRAWER (GROUNDED TECHNICAL SPECS) ---
  const projectSpecs = {
    xpower: {
      badge: "Full-Stack Web · TypeScript & Next.js",
      title: "X Power Program Kenya",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Kenyan Talent  │───► │ Matching Engine│ ───►│ Verified Corps │
│ Skill Profiles │     │ Talent Routing │     │ Vacancy Matrix │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "An employment discovery and candidate matching web platform engineered to connect job seekers across Kenyan counties with verified corporate opportunities.",
      features: "Transparent 100-point skill compatibility scoring, verified employer onboarding, application lifecycle tracking, and responsive mobile-first UI architecture.",
      stack: ["Next.js 16", "TypeScript", "PostgreSQL / SQLite", "Tailwind CSS", "JWT Auth"],
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
      badge: "Healthcare Web · HTML5 & CSS3",
      title: "International Healthcare Booking System",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Patient Portal │───► │ City / Clinic  │ ───►│ Registered     │
│ Search Filter  │     │ Directory API  │     │ Doctor Schedule│
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A multi-page healthcare appointment booking web portal that helps patients locate registered medical practitioners and schedule clinical visits by city.",
      features: "Department directories for emergency care, diagnostic labs, and dental surgery; practitioner credentials display; and responsive layout.",
      stack: ["HTML5", "CSS3 Grid & Flexbox", "JavaScript", "Responsive Design"],
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
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-color);">
        <a class="btn-custom btn-dark" href="${spec.githubUrl}" target="_blank" rel="noopener noreferrer">
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

  document.querySelectorAll("[data-spec-trigger]").forEach(btn => {
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

  // --- 8. 1-CLICK CLIPBOARD EMAIL COPY ---
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

  // --- 9. CLIENT-SIDE PORTFOLIO ASSISTANT CHAT BOT ---
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
      return `Philip maintains <strong>53+ repositories on GitHub</strong> (<a href="https://github.com/Kivice" target="_blank" style="color:var(--theme-orange);text-decoration:underline;">@Kivice</a>). Key projects:<br><br>
        1. <strong>X Power Program Kenya</strong>: Next.js &amp; TypeScript employment platform with candidate compatibility scoring.<br>
        2. <strong>Project Veronica</strong>: Python desktop assistant streaming Edge neural voices &amp; Windows system vitals.<br>
        3. <strong>Healthcare Booking System</strong>: Multi-city clinic and appointment portal.<br>
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
        • <strong>Phone / WhatsApp</strong>: <a href="https://wa.me/254708746611" target="_blank" style="color:var(--theme-orange);font-weight:700;text-decoration:underline;">+254 708 746 611</a><br>
        • <strong>Email</strong>: <a href="mailto:philipmaina637@gmail.com" style="color:var(--theme-orange);font-weight:700;text-decoration:underline;">philipmaina637@gmail.com</a><br>
        • <strong>GitHub</strong>: <a href="https://github.com/Kivice" target="_blank" style="color:var(--theme-orange);font-weight:700;text-decoration:underline;">github.com/Kivice</a>`;
    }

    if (q.includes("bloat") || q.includes("speed") || q.includes("philosophy") || q.includes("performance") || q.includes("fast") || q.includes("manifesto")) {
      return `Philip builds with a <strong>zero-bloat philosophy</strong>: avoiding multi-megabyte JavaScript runtimes when semantic HTML, modular CSS, and lightweight scripts can deliver &lt;35 KB payloads and ~28ms render latency. This ensures pages load instantly on any mobile device or metered connection.`;
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("pdf")) {
      return `You can view and print Philip's formal curriculum vitae on the <a href="resume.html" style="color:var(--theme-orange);font-weight:700;text-decoration:underline;">Resume / CV Page ↗</a>.`;
    }

    if (q.includes("location") || q.includes("where") || q.includes("nairobi") || q.includes("kenya") || q.includes("based")) {
      return `Philip is based in <strong>Kenya</strong> (Kirinyaga University / Nairobi area), operating in East Africa Time (EAT, UTC+3).`;
    }

    if (q.includes("who") || q.includes("about") || q.includes("philip") || q.includes("kivice")) {
      return `Philip Maina (@Kivice) is a software engineer and applied mathematician at Kirinyaga University, Kenya. He builds fast, grounded web platforms and automation software.`;
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
