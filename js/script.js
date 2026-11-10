/**
 * PHILIP MAINA (@KIVICE) — SYSTEMS ENGINEERING PORTFOLIO CONTROLLER
 * Applied Mathematics & Low-Latency Systems Software at Kirinyaga University, Kenya
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. PRELOADER DISMISS ---
  const preloader = document.getElementById("preloader");
  const dismissPreloader = () => {
    if (!preloader) return;
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 400);
  };
  window.addEventListener("load", dismissPreloader);
  setTimeout(dismissPreloader, 1000);

  // --- 2. DUAL THEME ENGINE (LIGHT PLATINUM / CARBON OBSIDIAN) ---
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

  // --- 4. MOBILE NAVIGATION ---
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

  // --- 5. SCROLLSPY ---
  const spySections = ["vault", "lab", "workbench", "academic", "manifesto", "dispatch"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll(".nav-link");

  function updateScrollSpy() {
    let currentId = "vault";
    const line = window.innerHeight * 0.35;
    spySections.forEach(section => {
      if (section.getBoundingClientRect().top <= line) {
        currentId = section.getAttribute("id");
      }
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
      currentId = "dispatch";
    }
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  }

  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (isScrolling) return;
    isScrolling = true;
    requestAnimationFrame(() => {
      isScrolling = false;
      updateScrollSpy();
    });
  }, { passive: true });

  // --- 6. COMPUTATIONAL MATRIX (INTERACTIVE DISCIPLINE LAB) ---
  const labData = {
    discrete: {
      file: "math/graphs/dijkstra_optimized.py",
      runtime: "Python 3.13 / Heapq",
      code: `import heapq

def dijkstra_shortest_path(graph: dict, start: str, target: str) -> tuple[float, list]:
    """
    Computes optimal low-latency route across weighted graph topology.
    Time Complexity: O((V + E) log V) using min-priority heap.
    """
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0.0
    pq = [(0.0, start, [start])]

    while pq:
        curr_dist, curr_u, path = heapq.heappop(pq)
        if curr_u == target:
            return curr_dist, path
        if curr_dist > distances[curr_u]:
            continue

        for neighbor, weight in graph[curr_u].items():
            cost = curr_dist + weight
            if cost < distances[neighbor]:
                distances[neighbor] = cost
                heapq.heappush(pq, (cost, neighbor, path + [neighbor]))

    return float('infinity'), []`
    },
    audio: {
      file: "systems/audio/coreaudio_stream.py",
      runtime: "Windows CoreAudio / Edge Neural",
      code: `import asyncio
import edge_tts
from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

async def stream_neural_synthesize(text: str, voice: str = "en-US-AriaNeural"):
    """
    Real-time neural audio streaming over local memory pipe
    with endpoint hardware volume adjustments (<18ms latency).
    """
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume_endpoint = cast(interface, POINTER(IAudioEndpointVolume))
    
    # Verify master volume level
    current_vol = volume_endpoint.GetMasterVolumeLevelScalar()
    
    communicate = edge_tts.Communicate(text, voice)
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            yield chunk["data"]`
    },
    database: {
      file: "database/schema/talent_matching_3nf.sql",
      runtime: "PostgreSQL 16 / Relational 3NF",
      code: `-- 3NF Talent & Enterprise Relational Schema
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(120) NOT NULL,
    county_code VARCHAR(10) NOT NULL,
    normalized_score NUMERIC(5,2) CHECK (normalized_score BETWEEN 0.0 AND 100.0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE skill_vectors (
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    skill_key VARCHAR(50) NOT NULL,
    proficiency_weight NUMERIC(3,2) NOT NULL,
    PRIMARY KEY (candidate_id, skill_key)
);

CREATE INDEX idx_county_score ON candidates(county_code, normalized_score DESC);`
    },
    ntp: {
      file: "network/timing/ntp_drift_compensator.py",
      runtime: "NTP Sockets / Fastboot API",
      code: `import socket
import struct
import time

def calculate_ntp_phase_offset(ntp_host: str = "pool.ntp.org") -> float:
    """
    Polls atomic NTP server to calculate local hardware clock drift
    and phase-shift request dispatch within millisecond boundary.
    """
    NTP_PACKET_FORMAT = "!12I"
    NTP_DELTA = 2208988800  # 1970-01-01 00:00:00 UTC
    client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    client.settimeout(1.0)
    
    msg = b'\\x1b' + 47 * b'\\0'
    t1 = time.time()
    client.sendto(msg, (ntp_host, 123))
    data, address = client.recvfrom(1024)
    t4 = time.time()
    
    unpacked = struct.unpack(NTP_PACKET_FORMAT, data[0:struct.calcsize(NTP_PACKET_FORMAT)])
    t3 = unpacked[10] + float(unpacked[11]) / 2**32 - NTP_DELTA
    
    round_trip_delay = (t4 - t1)
    clock_offset = ((t3 - t1) + (t3 - t4)) / 2.0
    return clock_offset`
    }
  };

  const compTabs = document.querySelectorAll(".comp-tab-btn");
  const compViewerFile = document.getElementById("comp-viewer-file");
  const compViewerRuntime = document.getElementById("comp-viewer-runtime");
  const compViewerCode = document.getElementById("comp-viewer-code");

  compTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      compTabs.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const key = btn.getAttribute("data-lab-key");
      const data = labData[key];
      if (data && compViewerCode) {
        if (compViewerFile) compViewerFile.textContent = data.file;
        if (compViewerRuntime) compViewerRuntime.textContent = data.runtime;
        compViewerCode.textContent = data.code;
      }
    });
  });

  // --- 7. DATAFLOW WORKBENCH (INTERACTIVE PIPELINE) ---
  const workbenchData = {
    xpower: {
      steps: [
        { num: "01. TALENT INGESTION", title: "Candidate Vector Extraction", desc: "User credentials, county data, and verified tech skills parsed into normalized records." },
        { num: "02. SCORING MATRIX", title: "100-Point Match Algorithm", desc: "Weighted dot-product comparison against active corporate vacancy requirements." },
        { num: "03. ROUTING & DISPATCH", title: "Instant Notification Pipe", desc: "Compatible candidates routed directly to verified corporate interview boards." }
      ],
      telemetry: { latency: "< 32 ms", footprint: "16 MB", protocol: "Next.js / PostgreSQL", status: "Active in Production" }
    },
    veronica: {
      steps: [
        { num: "01. VOICE RECOGNITION", title: "Microphone Audio Stream", desc: "Local audio buffer captures command with ambient noise suppression." },
        { num: "02. INTENT RESOLUTION", title: "Python Intent Dispatcher", desc: "Matches query to volume adjustment, system stats, or neural TTS response." },
        { num: "03. SYNTHESIS EMISSION", title: "Windows CoreAudio Output", desc: "Neural audio stream routed directly to default speaker endpoint with 0 lag." }
      ],
      telemetry: { latency: "~ 18 ms", footprint: "24 MB", protocol: "WebSockets / Python 3.13", status: "Local Desktop Daemon" }
    },
    healthcare: {
      steps: [
        { num: "01. CLINICAL SEARCH", title: "Specialist Directory Filter", desc: "Multi-city practitioner query across cardiology, emergency, and surgical departments." },
        { num: "02. SCHEDULE VALIDATION", title: "Time Slot Lock Engine", desc: "Prevents double-booking conflicts across real-time medical appointment slots." },
        { num: "03. APPOINTMENT CONFIRM", title: "Direct Dispatch & SMS", desc: "Generates digital clinical reservation receipt with practitioner coordinates." }
      ],
      telemetry: { latency: "< 24 ms", footprint: "12 MB", protocol: "Semantic HTML5 / Vanilla JS", status: "Multi-City Portal" }
    },
    hyperos: {
      steps: [
        { num: "01. ATOMIC CLOCK SYNC", title: "Multi-Server NTP Query", desc: "Calculates millisecond network jitter variance against pool.ntp.org and Google time." },
        { num: "02. PHASE-SHIFT SCHEDULING", title: "Window Offset Calculation", desc: "Computes exact -18.42ms dispatch delay to hit 00:00:00.000 boundary." },
        { num: "03. USB TOKEN DISPATCH", title: "Fastboot Handshake", desc: "Fires unlock payload at exact millisecond boundary with USB ACK verification." }
      ],
      telemetry: { latency: "< 2 ms drift", footprint: "8 MB", protocol: "POSIX Sockets / NTP", status: "Autonomous Utility" }
    }
  };

  const workbenchTabs = document.querySelectorAll(".workbench-tab-btn");
  const pipelineContainer = document.getElementById("workbench-pipeline-steps");
  const telemetryLatency = document.getElementById("telemetry-latency");
  const telemetryFootprint = document.getElementById("telemetry-footprint");
  const telemetryProtocol = document.getElementById("telemetry-protocol");
  const telemetryStatus = document.getElementById("telemetry-status");

  workbenchTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      workbenchTabs.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const key = btn.getAttribute("data-wb-key");
      const data = workbenchData[key];
      if (data && pipelineContainer) {
        pipelineContainer.innerHTML = data.steps.map(s => `
          <div class="pipeline-step">
            <span class="pipeline-step-num">${s.num}</span>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        `).join("");

        if (telemetryLatency) telemetryLatency.textContent = data.telemetry.latency;
        if (telemetryFootprint) telemetryFootprint.textContent = data.telemetry.footprint;
        if (telemetryProtocol) telemetryProtocol.textContent = data.telemetry.protocol;
        if (telemetryStatus) telemetryStatus.textContent = data.telemetry.status;
      }
    });
  });

  // --- 8. ARCHITECTURAL SPEC MODAL ---
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
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border);">
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

  // --- 9. 1-CLICK CLIPBOARD EMAIL COPY ---
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

  // --- 10. PORTFOLIO ASSISTANT CHAT BOT ---
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
      return `Philip is an applied mathematician and systems engineer at <strong>Kirinyaga University, Kenya</strong> pursuing a <strong>BSc in Mathematics and Computer Science</strong>.<br><br>His research and practical focus centers on discrete mathematics, graph optimization, and low-latency systems.`;
    }

    if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("repo") || q.includes("github") || q.includes("xpower") || q.includes("veronica") || q.includes("xiaomi") || q.includes("healthcare")) {
      return `Philip maintains <strong>53+ repositories on GitHub</strong> (<a href="https://github.com/Kivice" target="_blank" style="color:var(--accent);text-decoration:underline;">@Kivice</a>). Core projects:<br><br>
        1. <strong>X Power Program Kenya</strong>: Full-stack talent matching engine with 100-pt compatibility diagnostics.<br>
        2. <strong>Project Veronica</strong>: Python desktop assistant with real-time Edge neural voice streaming.<br>
        3. <strong>Healthcare Booking Portal</strong>: Multi-city clinic and specialist scheduling portal.<br>
        4. <strong>Xiaomi Fastboot Utility</strong>: Millisecond-precision NTP timing automation tool.`;
    }

    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language") || q.includes("python") || q.includes("next") || q.includes("react")) {
      return `Philip's technical disciplines include:<br><br>
        • <strong>Languages</strong>: TypeScript, JavaScript, Python 3.13, C++, HTML5/CSS3, SQL.<br>
        • <strong>Web &amp; Frameworks</strong>: Next.js 16, React, Node.js, Express, Tailwind CSS.<br>
        • <strong>Systems &amp; Data</strong>: PostgreSQL, MySQL, SQLite, Windows CoreAudio APIs, Linux POSIX sockets, Git.<br>
        • <strong>Core Focus</strong>: Zero-bloat architectures, mathematical rigor, and dependable code.`;
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("whatsapp") || q.includes("email") || q.includes("call") || q.includes("reach") || q.includes("hire") || q.includes("message")) {
      return `You can reach Philip directly:<br><br>
        • <strong>Phone / WhatsApp</strong>: <a href="https://wa.me/254708746611" target="_blank" style="color:var(--accent);font-weight:700;text-decoration:underline;">+254 708 746 611</a><br>
        • <strong>Email</strong>: <a href="mailto:philipmaina637@gmail.com" style="color:var(--accent);font-weight:700;text-decoration:underline;">philipmaina637@gmail.com</a><br>
        • <strong>GitHub</strong>: <a href="https://github.com/Kivice" target="_blank" style="color:var(--accent);font-weight:700;text-decoration:underline;">github.com/Kivice</a>`;
    }

    if (q.includes("bloat") || q.includes("speed") || q.includes("philosophy") || q.includes("performance") || q.includes("fast") || q.includes("manifesto")) {
      return `Philip advocates for a <strong>zero-bloat philosophy</strong>: avoiding multi-megabyte JavaScript runtime bloat when semantic HTML, modular CSS, and lightweight scripts can deliver &lt;35 KB payloads and ~28ms render latency. This ensures pages load instantly on any mobile device or metered connection.`;
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
