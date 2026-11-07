# 🛡️ Project Veronica (Mark-V)

> **Stark-inspired tactical AI desktop agent powered by Gemini 3 Flash, neural TTS voice synthesis, CoreAudio integration, and local IoT security automation.**

[![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://python.org)
[![Gemini](https://img.shields.io/badge/AI-Gemini%203%20Flash-blueviolet?logo=google)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ⚡ Overview

**Veronica Mark-V** is an autonomous desktop intelligence system designed to act as an offline-first, tactical voice and automation assistant. Built with low-latency streaming architecture, Veronica combines conversational reasoning with local hardware and IoT control.

### Key Architecture & Capabilities
* **🧠 Cognitive Engine:** Powered by **Gemini 3 Flash** with structured function calling and multi-turn conversational context.
* **🎙️ Neural TTS & Audio:** Real-time voice cloning and neural speech synthesis with CoreAudio low-latency streaming.
* **🌐 IoT Security Bridge:** Local network scanner and IoT controller to automate connected devices, verify network integrity, and monitor desktop security.
* **🖥️ Tactical HUD:** Low-overhead visual telemetry HUD rendering system status, audio waveform feeds, and active agent threads.

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│                   VERONICA MARK-V                      │
├─────────────────┬───────────────────┬──────────────────┤
│   VOICE INPUT   │   GEMINI REASON   │   ACTION ROUTER  │
│  Whisper Audio  │   3 Flash Engine  │  Local / IoT API │
├─────────────────┴───────────────────┴──────────────────┤
│             COREAUDIO STREAM & NEURAL TTS              │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart

### Prerequisites
* Python 3.10 or higher
* Google Gemini API Key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kivice/veronica.git
cd veronica

# 2. Set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 5. Launch Veronica Mark-V
python main.py
```

---

## 🛠️ Tech Stack
* **Language:** Python 3.10+
* **LLM Engine:** Google Gemini 3 Flash / Google GenAI SDK
* **Speech Synthesis:** Neural TTS / Kokoro / Edge-TTS
* **Audio Layer:** CoreAudio / SoundDevice / PyAudio
* **Networking:** Asyncio / WebSockets / Requests

---

## 👤 Author
**Philip Maina (@Kivice)**  
* Nairobi, Kenya  
* GitHub: [@Kivice](https://github.com/Kivice)  
* Portfolio: [philip-portfoli.netlify.app](https://philip-portfoli.netlify.app/)

