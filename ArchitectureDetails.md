✅ Project Summary (MVP / POC)

Smart News Digest for Busy Professionals
A lightweight AI-driven news assistant that fetches news from user-chosen RSS feeds, summarizes them, performs RAG-based query answering, and allows deeper article-level analysis — all optimized for minimal backend storage and maximum scalability.

✅ Core Features to Implement
Frontend (React + shadcn)

✓ Fetch and parse user-selected RSS feeds (client-side caching)
✓ Display articles (title, description, date, source)
✓ Query interface: user asks questions like
 - “Summarize today’s tech news”
 - “What happened in sports this week?”
✓ “Deep Analyze” button per article
✓ RSS subscription management UI
✓ Simple, clean UI using shadcn components

Backend (Node + Express)

✓ LLM Query Endpoint
✓ Accepts feed items (title + description) from frontend
✓ Embeds with nomic-embed-text
✓ Runs semantic cosine similarity
✓ Uses local LLM (Gemma 3 270M via Ollama) to answer queries
✓ Article Analysis Endpoint
✓ Frontend sends full HTML from article link
✓ Backend extracts readable text using @mozilla/readability (optional server-side fallback)
✓ LLM analyzes/summarizes the full content

Minimal SQLite Storage 

✓ User table
✓ User → RSS feed subscriptions
✓ (No article storage, no periodical caching)

✅ Technical Stack & Dependencies
Frontend

1. React (UI framework)
2. shadcn/ui (component library)
3. rss-parser (client-side RSS fetching & parsing)
4. @mozilla/readability (client-side full-text extraction when user requests analysis)
5. @tanstack/react-query

Backend

1. Node.js + Express (REST API)
2. sqlite3 (light user-storage only)
3. ollama (local LLM runtime)
4. gpt-oss:20b for generation
5. qwen3 for embeddings
6. In-memory vector store and search
