<div align="center">

![IRIS Neural OS Documentation Banner](./assets/banner.jpeg)

## The Autonomous Neural OS Agent

<div style="display: flex; justify-center; gap: 10px; margin-bottom: 20px;">
  <a href="https://github.com/201Harsh/IRIS-AI/stargazers">
    <img src="https://img.shields.io/github/stars/201Harsh/IRIS-AI?style=for-the-badge&color=10b981&logo=github&logoColor=white" alt="GitHub stars">
  </a>
  <a href="https://github.com/201Harsh/IRIS-AI/network/members">
    <img src="https://img.shields.io/github/forks/201Harsh/IRIS-AI?style=for-the-badge&color=10b981&logo=git&logoColor=white" alt="GitHub forks">
  </a>
  <a href="https://github.com/201Harsh/IRIS-AI/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/201Harsh/IRIS-AI?style=for-the-badge&color=10b981&logo=users&logoColor=white" alt="Contributors">
  </a>
  <a href="https://github.com/201Harsh/IRIS-AI/releases">
    <img src="https://img.shields.io/github/downloads/201Harsh/IRIS-AI/total?style=for-the-badge&color=10b981&logo=download&logoColor=white" alt="Downloads">
  </a>
</div>

**A local-first neural execution system that turns intent into real OS actions.**

---

</div>

# ðŸ“‘ Table of Contents

- [âš¡ Overview](#-overview)
- [âœ¨ Core Features](#-core-features)
- [ðŸ—ï¸ Architecture](#ï¸-architecture)
- [ðŸ’» Tech Stack](#-tech-stack)
- [ðŸ” Security](#-security)
- [ðŸš€ Installation & Setup](#-installation--setup)
- [ðŸ“ Project Structure](#-project-structure)
- [ðŸ§  Development Philosophy](#-development-philosophy)
- [ðŸ¤ Contributing](#-contributing)
- [ðŸ§© Extending IRIS](#-extending-iris)
- [ðŸ§  Roadmap](#-roadmap)
- [âš ï¸ Disclaimer](#ï¸-disclaimer)
- [ðŸ‘¨â€ðŸ’» Architect](#-architect)
- [ðŸ“œ License](#-license)

---

# âš¡ Overview

IRIS is not a chatbot.

It is a **local-first AI Operating System layer** that executes real-world actions across your system, applications, and devices.

> Speak your command. IRIS executes it.

---

# âœ¨ Core Features & System Capabilities

### ðŸ“‚ System & File Management

- ðŸ–¥ï¸ **Open App:** Native application lifecycle control.
- ðŸ›‘ **Close App:** Instant process termination commands.
- ðŸ—‚ï¸ **Read Directory:** Local folder scanning & indexing.
- ðŸ“ **Create Folder:** Instant directory structure generation.
- ðŸ“„ **Read File:** Deep text & code extraction.
- ðŸ“ **Write File:** Autonomous disk write access.
- ðŸ”„ **Manage File:** Copy, move, and delete control.
- ðŸš€ **Open File:** Native OS application launcher.
- ðŸ—ƒï¸ **Smart Drop Zones:** Viral, autonomous folder sorting.

### ðŸ§  Vector Search & Local Knowledge

- ðŸ” **Index Folder:** Semantic LanceDB directory ingestion.
- ðŸ”Ž **Smart File Search:** Vector-based local file retrieval.
- ðŸ–¼ï¸ **Read Gallery:** Local image cache scanning.
- ðŸ‘ï¸ **Analyze Photo:** Direct multimodal vision processing.

### ðŸ’» Developer & Terminal Tools

- âŒ¨ï¸ **Run Terminal:** Native shell & CLI execution.
- ðŸ› ï¸ **Open Project:** Instant IDE workspace loading.
- âš™ï¸ **Activate Protocol:** Context-aware coding mode switch.
- ðŸ—ï¸ **Build File:** Writing code directly to disk.
- ðŸ¤– **Execute Sequence:** JSON-based macro automation runs.
- â–¶ï¸ **Execute Macro:** Named workflow sequence triggering.
- ðŸ•³ï¸ **Deploy Wormhole:** Expose localhost to public internet.
- ðŸ›‘ **Close Wormhole:** Terminate public localhost tunnels.

### ðŸŽ¯ Desktop UI, Vision & Automation

- ðŸªŸ **Teleport Windows:** Dynamic desktop window management.
- ðŸ§© **Create Widget:** Spawn live floating desktop components.
- âŒ **Close Widgets:** Clear active floating overlays.
- ðŸ–±ï¸ **Click on Screen:** AI-driven exact coordinate targeting.
- ðŸ“œ **Scroll Screen:** Autonomous up/down page navigation.
- âš¡ **Press Shortcut:** Global keyboard hotkey injection.
- ðŸ‘» **Phantom Typer:** Global inline clipboard injection.
- âœ‚ï¸ **Screen Peeler (OCR):** Instant UI-to-code visual extraction.
- âŒ¨ï¸ **Ghost Coder:** Inline IDE generation (`Ctrl+Alt+Space`).
- ðŸ”Š **Set Volume:** Master audio level control.
- ðŸ“¸ **Take Screenshot:** Instant visual context capture.

### ðŸ’¾ Memory & Information

- ðŸ§  **Save Core Memory:** Deep persistent identity tracking.
- ðŸ“¥ **Retrieve Memory:** Instant past context recall.
- ðŸ“ **Save Note:** Local markdown note generation.
- ðŸ“– **Read Notes:** Instant saved plan retrieval.
- ðŸ“§ **Read Emails:** Gmail inbox scraping & summarization.

### ðŸŒ Web, Media & Financials

- ðŸ” **Google Search:** Live internet data retrieval.
- ðŸŒ¤ï¸ **Get Weather:** Real-time atmospheric condition checks.
- ðŸ—ºï¸ **Open Map:** Interactive dark-mode map loading.
- ðŸš— **Get Navigation:** Real-time routing and directions.
- ðŸŽµ **Play Spotify:** Instant music & playlist execution.
- ðŸ“ˆ **Stock Price:** Real-time financial ticker tracking.
- ðŸ“Š **Compare Stocks:** Dual-ticker fundamental market analysis.
- ðŸ•·ï¸ **Hack Live Website:** Viral visual DOM manipulation.
- ðŸŽ¨ **Build Animated Web:** Agentic Tailwind & GSAP generation.
- ðŸ–¼ï¸ **Generate Image:** High-fidelity multimodal media generation.

### ðŸ’¬ Communications

- ðŸ“² **Send WhatsApp:** Instant automated message dispatch.
- ðŸ•’ **Schedule WhatsApp:** Cron-based delayed message automation.
- ðŸ“§ **Draft Email:** Autonomous message composition.
- ðŸš€ **Send Email:** Action-oriented direct dispatch.

### ðŸ“± Mobile Telekinesis (Deep Android Link)

- ðŸ”” **Mobile Notifications:** Read texts from connected phone.
- ðŸ”‹ **Mobile Info:** Battery & hardware telemetry tracking.
- ðŸ“¤ **Push File to Mobile:** Seamless PC-to-phone transfers.
- ðŸ“¥ **Pull File from Mobile:** Instant phone-to-PC fetching.
- ðŸ“± **Open Mobile App:** Remote Android application launching.
- ðŸ›‘ **Close Mobile App:** Remote Android process killing.
- ðŸ‘† **Tap Mobile Screen:** Remote coordinate touch execution.
- ðŸ“œ **Swipe Mobile Screen:** Remote directional scrolling control.
- âš™ï¸ **Toggle Hardware:** Remote Wi-Fi/Bluetooth/Flashlight switching.

### ðŸ•µï¸ Autonomous Research & Deep RAG

- ðŸ•¸ï¸ **Deep Research:** Autonomous Llama 3 web crawling.
- ðŸ““ **Read Notion Reports:** Deep sync with Notion databases.
- ðŸ“š **Ingest Codebase:** Deep local project Vector embedding.
- ðŸ”® **Consult Oracle:** Deep local codebase RAG queries.

### ðŸ” Security & OS Vault

- ðŸ”’ **Lock System Vault:** Standard PIN OS lockdown protocol.
- ðŸ›¡ï¸ **Biometric Encryption:** Multi-face recognition OS lockdown.

---

# ðŸ—ï¸ Architecture

### Frontend

- React + Tailwind + Framer Motion
- Handles UI, commands, voice

### Backend

- Electron (Node.js)
- Full system access (files, automation, sockets)

### IPC Bridge

```js
window.electron.ipcRenderer.invoke('tool-name', payload)
```

---

# ðŸ’» Tech Stack

IRIS is forged using a high-performance stack combining web technologies with deep native OS access and state-of-the-art AI models.

### ðŸ–¥ï¸ Core Desktop & UI Framework

- **Electron & Vite:** High-performance desktop compilation and split-process architecture.
- **React 19:** Component-based, responsive frontend.
- **Tailwind CSS v4:** Utility-first styling engine for the Neon Emerald aesthetic.
- **Framer Motion & GSAP:** Cinematic, hardware-accelerated UI animations.
- **Three.js & React Three Fiber:** 3D rendering for complex neural visualizations.
- **Zustand:** Fast, scalable global state management.

### ðŸ§  AI, RAG & Machine Learning

- **Google Gemini AI:** Core reasoning and generative engine (`@google/genai`).
- **Groq SDK:** Ultra-fast, low-latency inference routing.
- **Hugging Face & Xenova:** Local model inference and transformers (`@huggingface/inference`, `@xenova/transformers`).
- **LanceDB (VectorDB):** Embedded local vector database for deep codebase RAG and memory storage.
- **Face-api.js:** Local biometric facial recognition for the System Vault.

### âš™ï¸ OS Control & Automation Engine

- **Nut.js:** Deep native desktop automation (mouse, keyboard, exact coordinate targeting).
- **Puppeteer (with Stealth):** Headless browser automation, DOM hacking, and invisible web crawling.
- **Node Window Manager:** Native OS window lifecycle and spatial placement control.
- **Tesseract.js:** Optical Character Recognition (OCR) for the 'Screen Peeler' visual extraction.
- **Native Utilities:** `loudness` (master audio), `clipboardy` (phantom typing), `screenshot-desktop` (visual context).

### ðŸ”— Integrations & Parsing

- **Google APIs & Auth:** Secure local auth, Gmail scraping, and Google Cloud services.
- **Notion Client:** Direct read/write mapping to Notion databases.
- **Tavily Core:** Agentic, deep-web search routing.
- **Data Parsers:** `pdf-parse`, `mammoth` (docx), `cheerio` (HTML DOM).

---

# ðŸ” Security

- 100% BYOK (Bring Your Own Key)
- Local encryption (OS keychain)
- Zero-trust architecture
- No external key storage

---

# ðŸ’» System Requirements

- **OS:** Windows 10 / 11 (Native execution).
- **Memory:** Minimum 4GB RAM (8GB recommended for heavy RAG indexing).
- **Storage:** ~3.2 GB for the application, plus extra space for local LanceDB vector storage.

---

# ðŸš€ Installation & Setup

### 1. Clone Repo

```bash
git clone https://github.com/201Harsh/IRIS-AI.git
cd IRIS-AI
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Add your API keys.

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Run Dev Server

```bash
npm run dev
```

---

### 5. Initialize Vault

- Open app
- Go to Command Center (Settings)
- Add API keys securely

---

# ðŸ“ Project Structure

```text
iris/
â”œâ”€â”€ build/                   # OS-specific build artifacts
â”œâ”€â”€ out/                     # Compiled output ready for packaging
â”œâ”€â”€ resources/               # Static assets (icons, trained data, etc.)
â”œâ”€â”€ src/                     # Core application source code
â”‚   â”œâ”€â”€ main/                # Electron Main Process (Node.js backend & OS execution)
â”‚   â”œâ”€â”€ preload/             # Context Isolation Scripts (The IPC secure bridge)
â”‚   â””â”€â”€ renderer/            # React Frontend (UI, floating widgets, GSAP animations)
â”œâ”€â”€ .env.example             # Template for API keys and environment variables
â”œâ”€â”€ electron-builder.yml     # Configuration for packaging the .exe / .app / .AppImage
â”œâ”€â”€ electron.vite.config.ts  # Vite configuration for the split architecture
â”œâ”€â”€ eng.traineddata          # Tesseract OCR language data file
â””â”€â”€ package.json             # Project dependencies and scripts
```

---

# ðŸ§  Development Philosophy

- Execution > Conversation
- Local-first intelligence
- Modular system design
- Real-world usability

---

## ðŸ¤ Contributing

IRIS is built for the community. If you want to expand the neural forge, submit a PR.

### Quick Start

1. **Fork** the repository.
2. **Branch** off `main`.
3. **Match** existing patterns (Tailwind for UI, strict IPC typing for the backend).
4. **Test** thoroughly (ensure tools do not block the main Electron thread).
5. **Submit** a PR with a clear explanation and visual evidence if altering the UI.

ðŸš¨ **Read the full [Contribution Guide](CONTRIBUTING.md) before submitting.**

---

### Commit Rules

Keep your commit messages clean, descriptive, and easy to understand. Clearly state what the commit accomplishes and always include the relevant Issue ID so we can track the changes.

```bash
âœ… git commit -m "feat: integrated new desktop widget (#45)"
âœ… git commit -m "fix: resolved IPC memory leak in Oracle module (#12)"
```

---

# ðŸ§© Extending IRIS

You can:

- Add new IPC tools
- Integrate APIs
- Build automation modules
- Extend UI widgets

---

## ðŸ§  Roadmap

- [ ] Voice-first system
- [ ] Plugin marketplace
- [ ] Memory graph
- [ ] Multi-agent system
- [ ] Desktop + Cloud hybrid

---

# âš ï¸ Disclaimer

IRIS has deep system-level execution capabilities.  
Use responsibly. The maintainers are not liable for misuse.

---

# ðŸ‘¨â€ðŸ’» Architect

**infinity1306**  
AI Systems Engineer

Instagram: [@201Harshs](https://www.instagram.com/201harshs/)
GitHub: [@201Harsh](https://github.com/201Harsh)

---

# ðŸ“œ License

MIT License â€” see LICENSE file.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

# ðŸŸ¥ Final Note

**IRIS is not a chatbot.** It is a **neural extension of your operating system**.

> _System Online._

# Made with â¤ï¸ by [infinity1306](https://instagram.com/201Harshs)

