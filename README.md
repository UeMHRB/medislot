Name: Test Patient
Email: testpatient@example.com
Password: Test1234!

# MediSlot

A full-stack doctor appointment booking platform with AI-powered symptom-to-specialty triage — built as a portfolio project to learn full-stack development from the ground up.

## Status

🚧 **In active development** — Milestone 1 complete, Milestone 2 in progress.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Database | MongoDB Atlas + Mongoose |
| Auth | NextAuth v4 (Credentials provider) |
| Styling | Tailwind CSS |
| AI | Gemini API (symptom triage) |
| Language | JavaScript |

## Features

- 🔐 Role-based authentication — separate Patient and Doctor accounts, with credential-based login and bcrypt password hashing
- 🩺 *(planned)* Doctor & patient profile management
- 📅 *(planned)* Slot-based appointment booking
- 🤖 *(planned)* AI symptom triage — suggests a medical specialty based on plain-text symptoms, isolated in its own API route so an AI outage never breaks core booking

## Roadmap

- [x] **Milestone 1** — Auth + DB setup
- [ ] **Milestone 2** — Doctor & patient profile CRUD
- [ ] **Milestone 3** — Search + booking flow *(non-AI app fully functional at this point)*
- [ ] **Milestone 4** — AI symptom triage
- [ ] **Milestone 5** — Deploy + polish

## Architecture
Browser (Next.js pages)
↓
Next.js API routes (Node.js runtime)
↓
MongoDB (Mongoose)


AI calls are isolated in a dedicated `/api/triage` route, kept separate from core CRUD routes by design.

## Getting Started

```bash
git clone https://github.com/UeMHRB/medislot.git
cd medislot
npm install
```

Create a `.env.local` file:
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
Run the dev server:
```bash
npm run dev
```

## Author

Muhammad Hamza — built as a learning project to demonstrate full-stack + AI engineering skills.



