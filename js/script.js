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

  // --- 5. ANIMATED AVATAR & CLIENT-SIDE PHOTO SWAP PREVIEWER ---
  const avatarFrame = document.getElementById("avatar-frame");
  const avatarFileInput = document.getElementById("avatar-file-input");
  const userAvatarImg = document.getElementById("user-avatar-img");
  const avatarSwapHint = document.getElementById("avatar-swap-hint");

  // Restore any saved previewed photo from localStorage
  const savedAvatar = localStorage.getItem("philip-custom-avatar");
  if (savedAvatar && userAvatarImg) {
    userAvatarImg.src = savedAvatar;
  }

  function triggerPhotoUpload() {
    if (avatarFileInput) avatarFileInput.click();
  }

  if (avatarFrame) avatarFrame.addEventListener("click", triggerPhotoUpload);
  if (avatarSwapHint) avatarSwapHint.addEventListener("click", triggerPhotoUpload);

  if (avatarFileInput && userAvatarImg) {
    avatarFileInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const result = loadEvt.target?.result;
        if (result) {
          userAvatarImg.src = result;
          try {
            localStorage.setItem("philip-custom-avatar", result);
          } catch (storageErr) {}

          // Trigger celebratory bounce animation!
          if (avatarFrame) {
            avatarFrame.classList.remove("avatar-pop-bounce");
            void avatarFrame.offsetWidth; // Force reflow
            avatarFrame.classList.add("avatar-pop-bounce");
          }

          showToast("✨ Photo preview updated! (Drop your permanent photo into assets/images/avatar.svg or avatar.jpg)");
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // --- 6. "MAKE PHILIP JUMP" HTML5 RUNNER MINI-GAME ---
  const gameLauncherBtn = document.getElementById("game-launcher-btn");
  const gameDock = document.getElementById("game-dock");
  const gameCloseBtn = document.getElementById("game-close-btn");
  const gameAudioToggle = document.getElementById("game-audio-toggle");
  const gameCanvasWrapper = document.getElementById("game-canvas-wrapper");
  const runnerCanvas = document.getElementById("runner-canvas");
  const gameScoreVal = document.getElementById("game-score-val");
  const gameHighVal = document.getElementById("game-high-val");
  const gameOverlay = document.getElementById("game-overlay");
  const gameOverlayTitle = document.getElementById("game-overlay-title");
  const gameOverlaySub = document.getElementById("game-overlay-sub");
  const gameRestartBtn = document.getElementById("game-restart-btn");

  if (runnerCanvas && gameDock) {
    const ctx = runnerCanvas.getContext("2d");
    let isGameRunning = false;
    let isGameOver = false;
    let soundEnabled = true;
    let score = 0;
    let highScore = parseInt(localStorage.getItem("philip-runner-high") || "0", 10);
    if (gameHighVal) gameHighVal.textContent = String(highScore);

    // Audio synthesizer via Web Audio API (Zero external MP3 files needed)
    let audioCtx = null;
    function playBeep(type) {
      if (!soundEnabled) return;
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === "suspended") audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;
        if (type === "jump") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(700, now + 0.14);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
          osc.start(now);
          osc.stop(now + 0.14);
        } else if (type === "collect") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(587, now);
          osc.frequency.setValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.22);
        } else if (type === "hit") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.26);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
          osc.start(now);
          osc.stop(now + 0.26);
        }
      } catch (e) {}
    }

    // Canvas sizing
    function resizeCanvas() {
      if (!runnerCanvas || !gameCanvasWrapper) return;
      runnerCanvas.width = gameCanvasWrapper.clientWidth;
      runnerCanvas.height = gameCanvasWrapper.clientHeight;
    }
    window.addEventListener("resize", resizeCanvas);

    // Player Object: ASCII Philip
    const player = {
      x: 64,
      y: 0,
      w: 32,
      h: 42,
      vy: 0,
      gravity: 0.62,
      jumpForce: -10.5,
      isGrounded: true,
      jumpsLeft: 2,
      runFrame: 0,
      reset(groundY) {
        this.y = groundY - this.h;
        this.vy = 0;
        this.isGrounded = true;
        this.jumpsLeft = 2;
        this.runFrame = 0;
      },
      jump() {
        if (this.jumpsLeft > 0) {
          this.vy = this.jumpForce;
          this.jumpsLeft--;
          this.isGrounded = false;
          playBeep("jump");
          return true;
        }
        return false;
      },
      update(groundY) {
        this.vy += this.gravity;
        this.y += this.vy;

        if (this.y >= groundY - this.h) {
          this.y = groundY - this.h;
          this.vy = 0;
          this.isGrounded = true;
          this.jumpsLeft = 2;
        }

        if (this.isGrounded) {
          this.runFrame += 0.24;
        }
      },
      draw(c, groundY) {
        c.save();
        c.fillStyle = "#38bdf8";
        c.font = "bold 13px JetBrains Mono, monospace";

        // Head with smiling ASCII expression
        c.fillText("[•̀ᴗ•́]", this.x - 4, this.y + 12);

        // Body and animated limbs
        c.strokeStyle = "#38bdf8";
        c.lineWidth = 2.4;
        c.lineCap = "round";

        const torsoY = this.y + 15;
        const hipY = this.y + 28;

        // Torso
        c.beginPath();
        c.moveTo(this.x + 14, torsoY);
        c.lineTo(this.x + 14, hipY);
        c.stroke();

        if (!this.isGrounded) {
          // Jumping pose (arms raised high!)
          c.beginPath();
          c.moveTo(this.x + 5, torsoY - 5);
          c.lineTo(this.x + 14, torsoY + 4);
          c.lineTo(this.x + 23, torsoY - 5);
          c.stroke();

          // Tucked legs
          c.beginPath();
          c.moveTo(this.x + 14, hipY);
          c.lineTo(this.x + 8, hipY + 12);
          c.moveTo(this.x + 14, hipY);
          c.lineTo(this.x + 20, hipY + 10);
          c.stroke();
        } else {
          // Running animated arms & legs
          const swing = Math.sin(this.runFrame) * 8;
          c.beginPath();
          c.moveTo(this.x + 14 - swing, torsoY + 6);
          c.lineTo(this.x + 14, torsoY + 2);
          c.lineTo(this.x + 14 + swing, torsoY + 6);
          c.stroke();

          // Running legs
          c.beginPath();
          c.moveTo(this.x + 14, hipY);
          c.lineTo(this.x + 14 + swing, hipY + 14);
          c.moveTo(this.x + 14, hipY);
          c.lineTo(this.x + 14 - swing, hipY + 14);
          c.stroke();
        }

        c.restore();
      }
    };

    // Obstacles & Collectibles
    let obstacles = [];
    let collectibles = [];
    let spawnTimer = 0;
    let collectibleTimer = 0;
    let gameSpeed = 5.2;
    let animationId = null;

    const obstacleTypes = [
      { text: "5MB BUNDLE", color: "#f87171", w: 90, h: 26 },
      { text: "LAG SPIKE", color: "#fbbf24", w: 82, h: 26 },
      { text: "SPAGHETTI", color: "#c084fc", w: 88, h: 26 },
      { text: "500 ERROR", color: "#ef4444", w: 80, h: 26 }
    ];

    const bonusTypes = [
      { text: "✳ MATH (+10)", pts: 10, color: "#34d399" },
      { text: "⚡ ZERO-LAG (+20)", pts: 20, color: "#38bdf8" },
      { text: "🎓 DEGREE (+30)", pts: 30, color: "#a78bfa" }
    ];

    function spawnObstacle(groundY) {
      const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      obstacles.push({
        x: runnerCanvas.width + 10,
        y: groundY - type.h,
        w: type.w,
        h: type.h,
        text: type.text,
        color: type.color
      });
    }

    function spawnCollectible(groundY) {
      const type = bonusTypes[Math.floor(Math.random() * bonusTypes.length)];
      collectibles.push({
        x: runnerCanvas.width + 20,
        y: groundY - 55 - Math.random() * 30,
        w: 95,
        h: 22,
        text: type.text,
        pts: type.pts,
        color: type.color
      });
    }

    function triggerGameOver(reason) {
      isGameOver = true;
      isGameRunning = false;
      playBeep("hit");

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("philip-runner-high", String(highScore));
        if (gameHighVal) gameHighVal.textContent = String(highScore);
      }

      if (gameOverlay) {
        if (gameOverlayTitle) gameOverlayTitle.textContent = "GAME OVER";
        if (gameOverlaySub) gameOverlaySub.textContent = `Hit by ${reason}! Final Score: ${score}`;
        gameOverlay.classList.add("show");
      }
    }

    function resetGame() {
      resizeCanvas();
      const groundY = runnerCanvas.height - 20;
      player.reset(groundY);
      obstacles = [];
      collectibles = [];
      score = 0;
      gameSpeed = 5.2;
      spawnTimer = 40;
      collectibleTimer = 90;
      isGameOver = false;
      isGameRunning = true;

      if (gameScoreVal) gameScoreVal.textContent = "0";
      if (gameOverlay) gameOverlay.classList.remove("show");
    }

    function gameLoop() {
      if (!isGameRunning) return;

      const w = runnerCanvas.width;
      const h = runnerCanvas.height;
      const groundY = h - 20;

      ctx.clearRect(0, 0, w, h);

      // Background matrix grid effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < 8; i++) {
        const sx = ((Date.now() * 0.05 + i * 140) % w);
        ctx.fillRect(w - sx, 15 + (i * 12) % 60, 2, 2);
      }

      // Ground Track
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.stroke();

      // Dashed moving ground lines
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      const offset = (Date.now() * 0.2 * (gameSpeed / 5)) % 40;
      for (let gx = -offset; gx < w; gx += 40) {
        ctx.fillRect(gx, groundY + 4, 18, 2);
      }

      // Update & Draw Player
      player.update(groundY);
      player.draw(ctx, groundY);

      // Update & Draw Obstacles
      spawnTimer++;
      if (spawnTimer > Math.max(70, 150 - Math.floor(score / 50) * 10)) {
        spawnObstacle(groundY);
        spawnTimer = 0;
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= gameSpeed;

        // Draw Obstacle Box
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        ctx.strokeStyle = obs.color;
        ctx.lineWidth = 1.5;
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        ctx.fillStyle = obs.color;
        ctx.font = "bold 10px JetBrains Mono, monospace";
        ctx.fillText(obs.text, obs.x + 8, obs.y + 16);

        // Collision Check (AABB with forgiving padding)
        const pad = 5;
        if (
          player.x + pad < obs.x + obs.w - pad &&
          player.x + player.w - pad > obs.x + pad &&
          player.y + pad < obs.y + obs.h - pad &&
          player.y + player.h - pad > obs.y + pad
        ) {
          triggerGameOver(obs.text);
          return;
        }

        // Remove off-screen obstacles
        if (obs.x + obs.w < -20) {
          obstacles.splice(i, 1);
        }
      }

      // Update & Draw Collectibles
      collectibleTimer++;
      if (collectibleTimer > 180) {
        spawnCollectible(groundY);
        collectibleTimer = 0;
      }

      for (let j = collectibles.length - 1; j >= 0; j--) {
        const col = collectibles[j];
        col.x -= gameSpeed * 0.95;

        // Draw Collectible
        ctx.fillStyle = col.color;
        ctx.font = "bold 10.5px JetBrains Mono, monospace";
        ctx.fillText(col.text, col.x, col.y);

        // Check collection
        if (
          player.x < col.x + col.w &&
          player.x + player.w > col.x &&
          player.y < col.y + col.h &&
          player.y + player.h > col.y - 12
        ) {
          score += col.pts;
          playBeep("collect");
          if (gameScoreVal) gameScoreVal.textContent = String(score);
          collectibles.splice(j, 1);
          continue;
        }

        if (col.x + col.w < -20) {
          collectibles.splice(j, 1);
        }
      }

      // Passive Score & Progression
      score += 1;
      if (score % 6 === 0 && gameScoreVal) {
        gameScoreVal.textContent = String(score);
      }
      if (score % 240 === 0 && gameSpeed < 9.5) {
        gameSpeed += 0.35;
      }

      animationId = requestAnimationFrame(gameLoop);
    }

    function toggleGame() {
      const isActive = gameDock.classList.contains("is-active");
      if (isActive) {
        gameDock.classList.remove("is-active");
        isGameRunning = false;
        if (animationId) cancelAnimationFrame(animationId);
      } else {
        gameDock.classList.add("is-active");
        resetGame();
        animationId = requestAnimationFrame(gameLoop);
      }
    }

    if (gameLauncherBtn) gameLauncherBtn.addEventListener("click", toggleGame);
    if (gameCloseBtn) gameCloseBtn.addEventListener("click", toggleGame);

    if (gameAudioToggle) {
      gameAudioToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        gameAudioToggle.textContent = soundEnabled ? "🔊" : "🔇";
      });
    }

    if (gameRestartBtn) {
      gameRestartBtn.addEventListener("click", () => {
        resetGame();
        animationId = requestAnimationFrame(gameLoop);
      });
    }

    // Interactive Jump Handling: Spacebar, ArrowUp, or Canvas Tap
    function handleJumpInput(e) {
      if (!gameDock.classList.contains("is-active")) return;

      if (e.type === "keydown") {
        if (e.code === "Space" || e.code === "ArrowUp") {
          e.preventDefault();
          if (isGameOver) {
            resetGame();
            animationId = requestAnimationFrame(gameLoop);
          } else {
            player.jump();
          }
        }
      } else {
        if (isGameOver) {
          resetGame();
          animationId = requestAnimationFrame(gameLoop);
        } else {
          player.jump();
        }
      }
    }

    document.addEventListener("keydown", (e) => {
      // Toggle game on key 'J' when not typing in an input
      if ((e.key === "j" || e.key === "J") && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        toggleGame();
        return;
      }
      handleJumpInput(e);
    });

    if (gameCanvasWrapper) {
      gameCanvasWrapper.addEventListener("mousedown", handleJumpInput);
      gameCanvasWrapper.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleJumpInput(e);
      }, { passive: false });
    }
  }
});
