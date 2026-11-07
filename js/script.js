/**
 * PHILIP MAINA (@KIVICE) — PORTFOLIO CONTROLLER
 * Ultra-Smooth Interactive Controller: Zero-Lag, Theme, Menu, Contact Copy, Architecture Drawer
 * Built for performance, accessibility, and zero bloat.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME ENGINE (DUAL MODE: LIGHT EDITORIAL / DARK MIDNIGHT) ---
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("philip-portfolio-theme");
  const initialTheme = storedTheme || "light"; // Default to CarlTech-style light paper
  
  document.documentElement.setAttribute("data-theme", initialTheme);
  updateThemeIcon(initialTheme);

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
    themeToggle.innerHTML = theme === "dark" ? "☀️" : "🌙";
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
  const menuToggle = document.getElementById("mobile-toggle") || document.getElementById("menu-toggle");
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

  // --- 3. ARCHITECTURAL CASE STUDY DRAWER (GROUNDED TECHNICAL SPECS) ---
  const projectSpecs = {
    "xpower": {
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
    "veronica": {
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
    "healthcare": {
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
    "hyperos": {
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
      
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--line);">
        <a class="button button-primary" href="${spec.githubUrl}" target="_blank" rel="noopener noreferrer">
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

  if (modalClose) {
    modalClose.addEventListener("click", closeTechModal);
  }

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

  // --- 4. 1-CLICK CLIPBOARD EMAIL COPY ---
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
});
