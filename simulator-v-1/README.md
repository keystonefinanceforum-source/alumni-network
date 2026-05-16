#  Think Like a Consultant
### A Strategic Thinking Game for Grade 9–10

A browser-based game that challenges students to think like real management consultants through 10 real-world business scenarios. No textbook answers — pure strategic reasoning.

---

##  File Structure

```
consultant-game/
├── index.html              ← HTML entry point
├── main.jsx                ← React app root
├── App.jsx                 ← Screen router (Start → Game → Result)
├── gameData.js             ← All 10 scenarios, ranks, scoring logic
├── StartScreen.jsx         ← Landing/name entry screen
├── StartScreen.module.css  ← Start screen styles
├── GameScreen.jsx          ← Core gameplay (timer, options, explanations)
├── GameScreen.module.css   ← Game screen styles
├── ResultScreen.jsx        ← Score, rank, performance breakdown
├── ResultScreen.module.css ← Result screen styles
├── index.css               ← Global styles / CSS reset
├── package.json            ← Dependencies
└── vite.config.js          ← Vite bundler config
```

---

##  Getting Started

### Prerequisites
- Node.js 18+ installed

### Setup

```bash
# 1. Clone or copy all files into a folder
cd consultant-game

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output goes to /dist
# Deploy to any static host (Netlify, Vercel, GitHub Pages)
```

---

##  Game Features

| Feature | Details |
|---|---|
| **Scenarios** | 10 unique business cases |
| **Timer** | 45 seconds per question |
| **Time Bonus** | Extra points for fast answers |
| **Frameworks** | MECE, ROI, 5 Whys, Pyramid Principle, etc. |
| **Explanations** | Detailed reasoning after every answer |
| **Rank System** | Intern → Junior Analyst → Associate → Senior Associate → Engagement Manager → Partner |
| **Review** | Full case-by-case breakdown on results screen |
| **Grade Level** | Designed for Grade 9–10 (ages 14–16) |

---

##  Consultant Frameworks Covered

1. **Market Research First** — Gather data before spending
2. **MECE** — Mutually Exclusive, Collectively Exhaustive problem breakdown
3. **Impact vs. Urgency Matrix** — Prioritize by business survival
4. **Data in Context** — Seasonal vs structural problems
5. **Stakeholder Mapping** — Power + Interest grid
6. **5 Whys / Root Cause Analysis** — Don't accept the first answer
7. **Competitive Differentiation** — Win where competitors are weakest
8. **Return on Investment (ROI)** — Never scale a losing model
9. **Pyramid Principle** — Lead with the answer
10. **Consultant Ethics** — Truth + solutions = real value

---

##  Design

- **Theme**: Dark editorial / consulting boardroom aesthetic
- **Fonts**: Georgia (serif) + Courier New (monospace)
- **Colors**: Deep black (#030712), gold (#fbbf24), emerald (#10b981)
- **Animations**: Smooth slide-in transitions, timer bar, celebration particles
- **Responsive**: Works on mobile and desktop

---

##  Scoring

- Questions worth 100–250 pts based on difficulty
- **Time bonus**: Up to +20 pts for fast answers
- **Max score**: 1,800 pts (+ up to 200 time bonus)

### Rank Thresholds

| Score % | Rank |
|---|---|
| 0–20% |  Intern |
| 21–40% |  Junior Analyst |
| 41–60% |  Associate |
| 61–75% |  Senior Associate |
| 76–89% |  Engagement Manager |
| 90–100% |  Partner |

---

Built with React + Vite. Zero external UI dependencies.
