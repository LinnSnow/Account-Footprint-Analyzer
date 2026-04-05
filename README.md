# Account Footprint Analyzer

A privacy-first web application that helps users discover, evaluate, and manage their forgotten online accounts by analyzing Gmail metadata — without ever reading email content.

---

## What it does

Most people have dozens of forgotten accounts scattered across the internet — old signups, unused services, dormant platforms. These forgotten accounts are a real security risk, especially if any have been involved in data breaches.

Account Footprint Analyzer solves this by:

- Scanning Gmail metadata (sender, subject, date — never the body) to detect services you've registered with
- Cross-referencing detected accounts against public breach databases
- Scoring each account by risk level based on breach history, dormancy, and service category
- Providing direct deletion links for accounts you no longer need

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | FastAPI (Python) |
| Authentication | Google OAuth 2.0 + OpenID Connect |
| Gmail Analysis | Gmail API (metadata scope only) |
| Breach Data | HaveIBeenPwned API v3 |
| Deletion Data | JustDeleteMe dataset |
| Database | PostgreSQL + SQLAlchemy |
| Caching | Redis |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Features

- **Google OAuth 2.0 login** — secure authentication without storing passwords
- **Gmail metadata scanning** — identifies platforms and services from sender history
- **NLP-based service classification** — maps sender domains to known service names
- **Breach correlation** — real-time cross-reference with HaveIBeenPwned
- **Risk scoring engine** — weighted scoring based on breach history, dormancy, and category
- **Deletion links** — direct links to account deletion pages with difficulty ratings
- **Privacy-first architecture** — only email metadata is accessed, never content

---

## Privacy

This application requests only the `gmail.metadata` OAuth scope — the most restricted Gmail scope available. This means:

- Email **bodies are never accessed or stored**
- Only sender address, subject line, and date are read
- No email content ever leaves your Google account
- All detected account data is stored only in your personal session

---

## Project Structure

```
Footprint_analyzer/
├── backend/
│   ├── main.py          # FastAPI app, OAuth routes, Gmail scanning
│   ├── .env             # Environment variables (not committed)
│   └── fp_analyzer/     # Python virtual environment (not committed)
├── frontend/
│   ├── src/
│   │   └── App.jsx      # React frontend
│   ├── index.html
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A Google Cloud Console account

### Backend Setup

```bash
cd backend
python -m venv fp_analyzer
fp_analyzer\Scripts\activate   # Windows
pip install fastapi uvicorn google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client python-dotenv requests
```

Create a `.env` file in the backend folder:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
SECRET_KEY=your_random_secret_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Google Cloud Console Setup

1. Create a new project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the **Gmail API** and **Google People API**
3. Configure the OAuth consent screen (External, Testing mode)
4. Create OAuth 2.0 credentials (Web application type)
5. Add `http://127.0.0.1:8000/auth/callback` as an authorized redirect URI
6. Add your Gmail address as a test user

---

## Roadmap

- [ ] Phase 1 — Environment setup and foundations
- [ ] Phase 2 — Google OAuth 2.0 authentication
- [ ] Phase 3 — Gmail metadata extraction
- [ ] Phase 4 — Service classification engine
- [ ] Phase 5 — PostgreSQL database integration
- [ ] Phase 6 — HaveIBeenPwned breach correlation
- [ ] Phase 7 — Risk scoring engine
- [ ] Phase 8 — JustDeleteMe deletion links
- [ ] Phase 9 — Dashboard UI
- [ ] Phase 10 — Error handling audit
- [ ] Phase 11 — CI/CD pipeline
- [ ] Phase 12 — Chrome extension (v2)
- [ ] Phase 13 — Deployment

---

## Author

Built by [Anushka Mette](https://github.com/LinnSnow)
