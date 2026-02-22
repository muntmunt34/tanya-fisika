# AI Pintar - Integration Guide

This small addition provides `pages/ai.html` (chat UI) and a tiny Node.js proxy server to connect to AI providers like OpenAI.

Quick start (local):

1. Install dependencies:

```bash
npm install
```

2. Start server (set OpenAI key if you want real responses):

```bash
# Linux/Mac
export OPENAI_API_KEY="sk-..."
npm start

# Windows PowerShell
$env:OPENAI_API_KEY = 'sk-...'
npm start
```

3. Open your browser at `http://localhost:3000/pages/ai.html` and use the UI. Choose provider `mock` if you don't have an API key.

Notes:
- The server proxies `POST /api/chat` and will call OpenAI when `provider: 'openai'`.
- `deepseek` is left as a placeholder for your provider and requires you to add the appropriate API call code in `server.js`.
- For production, secure your API key and add rate limiting / authentication.

If you want, I can add support for other providers (Deepseek) — tell me which provider(s) and I'll add adapters.