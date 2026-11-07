/**
 * PHILIP GACHIE / PHILIP MAINA (@KIVICE) — PORTFOLIO V1 (UPGRADED)
 * Ultra-Smooth Interactive Controller: Zero-Lag, Theme, Filter, Contact Dispatch, Copy Toast, Architecture Drawer
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME ENGINE (DARK / LIGHT DUAL MODE) ---
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("philip-portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
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

  // --- 2. MOBILE MENU CONTROLLER ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

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

  // --- 3. PROJECT FILTER TABS ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        if (filter === "all" || category.includes(filter)) {
          card.style.display = "flex";
          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 180);
        }
      });
    });
  });

  // --- 4. ARCHITECTURAL CASE STUDY DRAWER MODAL ---
  const projectSpecs = {
    "xpower": {
      badge: "Original Project · TypeScript & Docker",
      title: "X Power Program Kenya",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Kenyan Talent  │───► │ Matching Engine│ ───►│ Verified Corps │
│ Skill Profiles │     │ Talent Routing │     │ Vacancy Matrix │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "An enterprise-grade talent discovery and employment matching platform engineered to eliminate friction in the Kenyan job market.",
      features: "Automated candidate matching based on location and skill tier, containerized deployment with Docker and Docker-Compose, and responsive mobile-first UI architecture.",
      stack: ["TypeScript", "Docker", "Docker-Compose", "Full-Stack Web", "Talent Matching"],
      githubUrl: "https://github.com/Kivice/x-power-program"
    },
    "veronica": {
      badge: "Original Project · Python & Gemini 3 Flash",
      title: "Project Veronica (Mark-V)",
      diagram: `┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│ Audio Stream │───► │ Gemini 3 Flash │ ───►│ CoreAudio &  │
│ Whisper / In │     │ Cognitive Loop │     │ Neural TTS   │
└──────────────┘     └────────────────┘     └──────────────┘
                              │
                              ▼
                     ┌────────────────┐
                     │ Local IoT &    │
                     │ Security Relay │
                     └────────────────┘`,
      overview: "Stark-inspired tactical AI desktop assistant designed to combine fast multimodal reasoning with local hardware and IoT automation.",
      features: "Sub-second streaming audio using Neural TTS and CoreAudio integration, background IoT network probing, and a low-overhead holographic HUD status display.",
      stack: ["Python 3.10+", "Gemini 3 Flash", "Neural TTS", "CoreAudio", "IoT Security Bridge"],
      githubUrl: "https://github.com/Kivice/veronica"
    },
    "healthcare": {
      badge: "Original Project · Healthcare Full-Stack",
      title: "International Healthcare Booking System",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Patient Portal │───► │ City / Clinic  │ ───►│ Registered     │
│ Search Filter  │     │ Directory API  │     │ Practitioner   │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A specialized healthcare appointment booking web portal helping patients locate and book consultations with certified medical practitioners filtered by city location.",
      features: "Doctor consultation cards, emergency medical care directory, clinic schedule routing, and accessible UI layout.",
      stack: ["JavaScript", "Healthcare UI", "Web APIs", "Responsive Layout"],
      githubUrl: "https://github.com/Kivice/International-Healthcare-Booking-System"
    },
    "hyperos": {
      badge: "Original Project · Python & Systems Security",
      title: "Xiaomi HyperOS Unlock Utility",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Device ADB /   │───► │ Account Token  │ ───►│ Bootloader     │
│ Fastboot State │     │ Crypto Routine │     │ Unlock Request │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "Low-level Python utilities developed to analyze Xiaomi HyperOS device communication and automate bootloader unlock account binding handshakes.",
      features: "Custom encrypted challenge payload formatting, device state inspection, and protocol handshake automation.",
      stack: ["Python", "Reverse Engineering", "Device Firmware", "Android Systems"],
      githubUrl: "https://github.com/Kivice/Xiaomi-HyperOS-Unlock-Script"
    },
    "library": {
      badge: "Original Project · Relational SQL Schema",
      title: "Library Database Management System",
      diagram: `┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Members Entity │◄───►│ Lending Ledger │◄───►│ Books & Media  │
│ Foreign Keys   │     │ Transactions   │     │ Normalized DB  │
└────────────────┘     └────────────────┘     └────────────────┘`,
      overview: "A comprehensive relational database architecture featuring 3NF normalized tables, foreign key integrity constraints, and transactional lending ledgers.",
      features: "Optimized indexing, member borrowing quotas, fine calculations, and audit log tracking.",
      stack: ["SQL", "Relational Modeling", "Database Normalization", "Constraints"],
      githubUrl: "https://github.com/Kivice/Library_Database_mangement"
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
      
      <h4 class="modal-subhead">Technologies &amp; Protocols</h4>
      <div class="modal-tech-pills">
        ${spec.stack.map(s => `<span>${s}</span>`).join("")}
      </div>
      
      <div class="modal-footer-btns">
        <a class="btn-primary" href="${spec.githubUrl}" target="_blank" rel="noopener noreferrer">
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

  // --- 5. 1-CLICK CLIPBOARD EMAIL COPY ---
  const copyBtn = document.getElementById("copy-email-btn");
  const emailVal = "philipmaian637@gmail.com";
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
        showToast("✓ Copied philipmaian637@gmail.com to clipboard!");
      } catch (err) {
        showToast("✓ Email: philipmaian637@gmail.com");
      }
    });
  }

  // --- 6. INTERACTIVE CONTACT FORM DISPATCH ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const message = document.getElementById("form-message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all fields.");
        return;
      }

      const subject = encodeURIComponent(`Project Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Philip,\n\n${message}\n\nFrom: ${name} (${email})`);
      window.location.href = `mailto:philipmaian637@gmail.com?subject=${subject}&body=${body}`;

      showToast("✓ Opening email client to dispatch message...");
      contactForm.reset();
    });
  }

  // --- 7. COPYRIGHT YEAR AUTO-SYNC ---
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
