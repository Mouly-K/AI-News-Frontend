# 📰 Smart News Digest (MVP / POC)

> **AI-powered news summarization & analysis for busy professionals**

A lightweight, high-performance AI news assistant that aggregates articles from user-selected RSS feeds, provides intelligent summaries, supports **RAG-based querying**, and enables **deep per-article analysis** — all while prioritizing **speed, reliability, and usability**.

---

## ✨ Key Highlights

* 🚀 Blazingly fast, offline-tolerant frontend
* 🧠 RAG-based AI querying with hallucination safeguards
* ⌨️ Power-user friendly (extensive keyboard shortcuts)
* 🌙 Dark mode & clean, modern UI
* 📡 Real-time AI streaming via Server-Sent Events (SSE)
* 🧩 Scalable architecture, MVP-first design

## 📹 Preview / Video Demo

[`Full quality Google Drive Link`](https://drive.google.com/file/d/1QjobvwF2uPu272tIWasJx3fA6kZsZqdZ/view)

---

## 📸 Screenshots & UI Walkthrough

> *A quick visual walkthrough of the app, from discovery → reading → AI analysis → management → mobile experience.*

---

### 1️⃣ Landing Experience

**Landing Page — Masonry Feed (Desktop)**

<a href="assets/Landing With Articles in Masonry Layout.png" target="_blank" rel="noopener noreferrer">
  <img
    src="assets/Landing With Articles in Masonry Layout.png"
    alt="Landing page with articles displayed in a masonry layout"
    width="100%"
  />
</a>

---

### 2️⃣ Reading Experience

**Article View — Clean & Distraction-Free (Desktop)**

<!-- Preview image (always visible) -->

<a href="assets/Article UI.png" target="_blank" rel="noopener noreferrer">
  <img
    src="assets/Article UI.png"
    alt="Clean article reading interface"
    width="100%"
  />
</a>

<details>
  <summary><strong>View more reading screenshots</strong></summary>

  <a href="assets/Article UI 2.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/Article UI 2.png"
      alt="Article view showing continued content"
      width="100%"
    />
  </a>

</details>

---

### 3️⃣ AI Chat — General Intelligence

**General AI Chat (Desktop)**

<!-- Preview -->

<a href="assets/Chat UI but asking more general humane questions.png" target="_blank" rel="noopener noreferrer">
  <img
    src="assets/Chat UI but asking more general humane questions.png"
    alt="AI chat responding to natural language questions"
    width="100%"
  />
</a>

<details>
  <summary><strong>View more AI chat examples</strong></summary>

  <a href="assets/General Chat 1.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/General Chat 1.png"
      alt="General AI chat interface for news queries"
      width="100%"
    />
  </a>

  <a href="assets/General Chat with Context Picker Open.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/General Chat with Context Picker Open.png"
      alt="Context picker for selecting sources, categories, and articles"
      width="100%"
    />
  </a>

  <a href="assets/General Chat with Source and Category Context Filter.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/General Chat with Source and Category Context Filter.png"
      alt="AI chat with source and category filters applied"
      width="100%"
    />
  </a>

</details>

---

### 4️⃣ AI Chat — Deep Article Analysis

**Article Chat Mode — Deep Analysis**

<!-- Preview -->

<a href="assets/Article Chat with deeper analysis.png" target="_blank" rel="noopener noreferrer">
  <img
    src="assets/Article Chat with deeper analysis.png"
    alt="Article-specific AI chat providing deep analysis"
    width="100%"
  />
</a>

<details>
  <summary><strong>View more deep-analysis screenshots</strong></summary>

  <a href="assets/Article Chat with deeper analysis 2.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/Article Chat with deeper analysis 2.png"
      alt="Continued deep article analysis in AI chat"
      width="100%"
    />
  </a>

</details>

---

### 5️⃣ Power-User Controls & Management

**Feed Management**

<!-- Preview -->

<a href="assets/Feed Management UI 1.png" target="_blank" rel="noopener noreferrer">
  <img
    src="assets/Feed Management UI 1.png"
    alt="RSS feed management interface"
    width="100%"
  />
</a>

<details>
  <summary><strong>View more management controls</strong></summary>

  <a href="assets/Feed Management UI 2.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/Feed Management UI 2.png"
      alt="Additional feed management options"
      width="100%"
    />
  </a>

  <a href="assets/Categories Maagement UI.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/Categories Maagement UI.png"
      alt="Category management user interface"
      width="100%"
    />
  </a>

  <a href="assets/Source & Categories Filter.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/Source & Categories Filter.png"
      alt="Source and category filtering panel"
      width="100%"
    />
  </a>

</details>

---

### 6️⃣ Responsive Design (Mobile — iPhone 14 Pro Max)

> **Not collapsible (as requested)**

|                                                                                                                      |                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| <a href="assets/Fully responsive.png" target="_blank"><img src="assets/Fully responsive.png" width="100%" /></a>     | <a href="assets/Fully responsive 2.png" target="_blank"><img src="assets/Fully responsive 2.png" width="100%" /></a> |
| <a href="assets/Fully responsive 3.png" target="_blank"><img src="assets/Fully responsive 3.png" width="100%" /></a> | <a href="assets/Fully responsive 4.png" target="_blank"><img src="assets/Fully responsive 4.png" width="100%" /></a> |
| <a href="assets/Fully responsive 5.png" target="_blank"><img src="assets/Fully responsive 5.png" width="100%" /></a> | <a href="assets/Fully responsive 6.png" target="_blank"><img src="assets/Fully responsive 6.png" width="100%" /></a> |

---

### 7️⃣ Theme Support

**Light Theme**

<!-- Preview -->

<a href="assets/Light Theme 1.png" target="_blank" rel="noopener noreferrer">
  <img
    src="assets/Light Theme 1.png"
    alt="Light theme version of the application"
    width="100%"
  />
</a>

<details>
  <summary><strong>View more light theme screenshots</strong></summary>

  <a href="assets/Light Theme 2.png" target="_blank" rel="noopener noreferrer">
    <img
      src="assets/Light Theme 2.png"
      alt="Light theme with different UI state"
      width="100%"
    />
  </a>

</details>

---

## 🧩 Features

### 🖥 Frontend (React + shadcn/ui)

* Article listing with:

  * Title
  * Description
  * Source
  * Category
  * Estimated read time
* Clean, distraction-free article view (no ads, no tracking)
* **General AI Query Interface**, e.g.:

  * *“Summarize today’s tech news”*
  * *“What happened in sports this week?”*
* **Deep per-article AI analysis**
* RSS feed & category subscription management
* Fully responsive UI with filtering support
* Keyboard shortcuts for all common actions

---

## ⌨️ Keyboard Shortcuts

| Shortcut       | Action                                              |
| -------------- | --------------------------------------------------- |
| `Ctrl + K`     | Global search (articles / feeds / categories)       |
| `Ctrl + B`     | Toggle sidebar                                      |
| `Ctrl + ;`     | Toggle chat                                         |
| `Ctrl + J`     | Add context to chat (sources, categories, articles) |
| `Ctrl + Enter` | Send chat message                                   |

---

## 🛠 Tech Stack

### Frontend

* **React 19** (React Compiler enabled)
* **shadcn/ui** + Tailwind CSS
* **@tanstack/react-query** — client-side caching with stale & GC mechanics
* **markdown-to-jsx** — Performamt markdown rendering for chat & articles
* **react-masonry-css** — performant Masonry layouts

### Backend

> See [`backend/README.md`](https://github.com/Mouly-K/AI-News-Backend) for architecture, RAG pipeline, embeddings, and AI integration details.

---

## ⚙️ Installation

> Make sure you have Node.js 25 or above installed. Needs backend to be fully online to work, please setup backend first. Instructions are provided in the backend repository (Refer to above section)

```bash
# Clone the repository
git clone https://github.com/Mouly-K/AI-News-Frontend.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🧠 Design Philosophy

This project was built with a simple guiding question:

> *“Would I actually use this every day?”*

That translates to:

* Zero UX compromises
* Minimal latency
* Graceful handling of flaky networks
* Keyboard-first navigation
* Clean, opinionated UI
* Strong safeguards against AI hallucinations

---

## ⚡ Performance & Reliability

### Client-Side Caching

* Powered by **@tanstack/react-query**
* Automatic stale data handling
* Cached news remains accessible during network failures
* Fresh data seamlessly replaces stale data when available

### Offline Support

* Core features work **offline for up to 1 hour**
* Designed for unreliable or intermittent connectivity

---

## 💬 Real-Time AI Chat

* Uses **Server-Sent Events (SSE)** for real-time streaming
* AI responses are streamed as Markdown
* Rendered incrementally for a smooth chat experience
* POST-based handshake + persistent stream

---

## 🧠 AI Context Modes (Hallucination-Safe)

The chat operates in two automatic modes:

### 🔹 General Mode

* AI receives:

  * Article titles
  * Sources
  * Short excerpts
* Optimized for:

  * Summaries
  * Trend analysis
  * Broad questions
* Keeps context minimal → higher accuracy

### 🔹 Article Mode

* Triggered automatically when an article is selected as context
* Full article content is passed to the AI
* Enables deep, focused analysis

Switching between modes is **automatic and seamless**, requiring no user intervention.

---

## 🧩 Contextual Filtering

* Source & category filters are shared across:

  * Feed UI
  * Chat UI
* Filters can be applied **mid-chat**
* Only filtered content is passed to the AI

This manual + automatic filtering acts as an additional guardrail against hallucinations while remaining user-friendly.

---

## 🚧 Areas for Improvement

Due to time constraints, some features were deferred:

1. **Product Naming**

   * “AI News” is placeholder-level at best

2. **User Accounts & Sessions**

   * Architecture already supports easy integration

3. **User Insights Dashboard**

   * Reading history
   * Frequently viewed categories
   * Engagement metrics

4. **Minor UI Polish**

   * Small UX refinements

---

## 📌 Project Status

* ✅ MVP / POC complete
* 🧪 Actively usable
* 🧱 Built with scalability in mind

---

## 🙌 Acknowledgements

* shadcn/ui
* TanStack Query
* Open-source AI & RAG tooling
