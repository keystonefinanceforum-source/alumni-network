// Consultant Thinking Challenge — Scenarios for Grade 9-10
// Each scenario has a situation, 4 options, correct answer index, explanation, and framework used

export const SCENARIOS = [
  {
    id: 1,
    category: "Market Entry",
    difficulty: "Junior Analyst",
    icon: "🌍",
    title: "The Bubble Tea Dilemma",
    situation:
      "Your client, a popular bubble tea brand from Taiwan, wants to expand to your city. They have ₹50 lakhs to invest. Which first step is MOST important?",
    options: [
      "Immediately rent a shop in the most expensive mall",
      "Research competitor prices, foot traffic, and customer preferences first",
      "Start a social media account and wait for followers to build up",
      "Hire 20 staff members and begin training before finding a location",
    ],
    correct: 1,
    framework: "Market Research First",
    explanation:
      "Consultants always gather data before spending money. Understanding the market (who are your competitors, what do customers want, where do they go) prevents expensive mistakes. Spending without data is like driving blindfolded.",
    points: 100,
  },
  {
    id: 2,
    category: "Problem Structuring",
    difficulty: "Junior Analyst",
    icon: "🔍",
    title: "The Falling Grades Problem",
    situation:
      "A school principal tells you: 'Our math scores dropped 30% this year!' A consultant's first move is to:",
    options: [
      "Immediately fire the math teachers",
      "Buy new textbooks for everyone",
      "Ask: Did ALL classes drop, or just specific grades? Is it tests or homework?",
      "Announce a school-wide math competition to motivate students",
    ],
    correct: 2,
    framework: "MECE Problem Breakdown",
    explanation:
      "Before solving any problem, consultants break it down into specific, non-overlapping parts (called MECE — Mutually Exclusive, Collectively Exhaustive). The principal sees one symptom; a consultant finds the ROOT CAUSE by asking precise questions.",
    points: 100,
  },
  {
    id: 3,
    category: "Prioritization",
    difficulty: "Associate",
    icon: "⚡",
    title: "The Startup Crisis",
    situation:
      "A startup has ₹2 lakhs left and 3 urgent problems: (A) Website is broken, (B) Their best employee quit, (C) A key client is unhappy. With only 1 week of runway, what do you tackle FIRST?",
    options: [
      "Fix the website — digital presence is everything",
      "The unhappy client — they may pay you and extend your runway",
      "Hire a replacement employee immediately",
      "All three simultaneously, split the team",
    ],
    correct: 1,
    framework: "Impact vs. Urgency Matrix",
    explanation:
      "The unhappy client = immediate cash flow = survival. A consultant uses the Eisenhower Matrix: what is both URGENT and HIGH IMPACT? Losing a paying client closes the business faster than a broken website. Save revenue first, then fix operations.",
    points: 150,
  },
  {
    id: 4,
    category: "Data Analysis",
    difficulty: "Associate",
    icon: "📊",
    title: "The Ice Cream Insight",
    situation:
      "An ice cream shop saw sales rise 200% in July but drop 80% in December. The owner panics about December. What does a consultant say?",
    options: [
      "The business is failing and should shut down",
      "This is SEASONAL variation — it's normal and expected. Plan inventory accordingly",
      "The owner should work harder in December",
      "Start selling hot drinks to compensate",
    ],
    correct: 1,
    framework: "Data in Context",
    explanation:
      "Context transforms data. Ice cream is seasonal — comparing July to December without context is meaningless. A consultant always asks: 'Compared to WHAT baseline?' Before panicking, look at the same month last year, industry benchmarks, and trends. Numbers without context are just noise.",
    points: 150,
  },
  {
    id: 5,
    category: "Stakeholder Management",
    difficulty: "Associate",
    icon: "🤝",
    title: "The Committee Conflict",
    situation:
      "You're presenting a cost-cutting plan. The Finance Director loves it. The HR Director hates it (it means layoffs). Operations is neutral. You need ALL three to approve. What's your move?",
    options: [
      "Present data showing why Finance is right and HR is wrong",
      "Cancel the plan since there's disagreement",
      "Meet with HR privately first, understand their concerns, and redesign the plan to address them",
      "Escalate to the CEO and let them decide",
    ],
    correct: 2,
    framework: "Stakeholder Mapping",
    explanation:
      "Consultants map stakeholders by power and interest. HR is a BLOCKER — they can veto. You never ambush a blocker in a group meeting. Meet privately, listen genuinely, and co-create a solution that works for everyone. Win people BEFORE the room, not in it.",
    points: 150,
  },
  {
    id: 6,
    category: "Root Cause Analysis",
    difficulty: "Senior Associate",
    icon: "🌳",
    title: "The Restaurant Mystery",
    situation:
      "A restaurant's revenue is down 40%. The owner blames 'bad economy.' But you notice: food quality ratings are the same, the restaurant is always full at lunch, but empty at dinner. What's the REAL problem?",
    options: [
      "The bad economy is correct — nothing can be done",
      "Something specific about the DINNER experience is broken (safety, menu, timing, competition)",
      "They should close for dinner and only do lunch",
      "Reduce all staff to cut costs",
    ],
    correct: 1,
    framework: "5 Whys / Root Cause Analysis",
    explanation:
      "Never accept the first explanation. The pattern (full lunch, empty dinner) tells you it's NOT the economy — it's dinner-specific. A consultant uses the '5 Whys' technique: keep asking WHY until you hit a solvable root cause. Maybe a new competitor opened nearby, or the neighborhood becomes unsafe at night, or the menu is wrong for that time slot.",
    points: 200,
  },
  {
    id: 7,
    category: "Strategy",
    difficulty: "Senior Associate",
    icon: "♟️",
    title: "The Bookstore Battle",
    situation:
      "A beloved local bookstore is losing customers to Amazon. They can't compete on price or delivery speed. A consultant advises them to:",
    options: [
      "Match Amazon's prices even if it means losing money",
      "Close the physical store and go fully online",
      "Create unique value Amazon CAN'T offer: events, community, expert curation, cozy atmosphere",
      "Petition the government to regulate Amazon",
    ],
    correct: 2,
    framework: "Competitive Differentiation",
    explanation:
      "Competing on someone else's strengths is a losing game. Amazon WINS on price and speed — don't fight there. Find your UNFAIR ADVANTAGE: what can a physical, human-run store offer that an algorithm never can? Emotional experience, community, discovery, expert recommendations. This is called differentiation — win where competitors are weakest.",
    points: 200,
  },
  {
    id: 8,
    category: "Financial Thinking",
    difficulty: "Senior Associate",
    icon: "💰",
    title: "The School Canteen ROI",
    situation:
      "The school canteen spends ₹10,000/month upgrading equipment but earns ₹8,000 extra revenue from it. After 1 year, they want to expand the upgrade. You say:",
    options: [
      "Great idea — more investment means more revenue!",
      "Stop the upgrade — you're losing ₹2,000/month. Fix the negative ROI first",
      "Continue, because students are happier",
      "Borrow money to expand even faster",
    ],
    correct: 1,
    framework: "Return on Investment (ROI)",
    explanation:
      "ROI = (Gain - Cost) / Cost. Here: (₹8,000 - ₹10,000) / ₹10,000 = -20%. That means they LOSE money on every rupee invested. Before expanding, a consultant asks: why is revenue below cost? Is the pricing wrong? Are we targeting the right customers? NEVER scale a losing model — fix it first.",
    points: 200,
  },
  {
    id: 9,
    category: "Communication",
    difficulty: "Manager",
    icon: "🎯",
    title: "The Pyramid Principle",
    situation:
      "You have 2 minutes with the CEO to present your findings. You found 15 interesting data points. What's the consultant approach?",
    options: [
      "Share all 15 points quickly so they have full information",
      "Start with your 1 key recommendation, then give 3 supporting reasons, then details if asked",
      "Create a 30-slide deck and ask for more time",
      "Email them everything and skip the meeting",
    ],
    correct: 1,
    framework: "Pyramid Principle (Barbara Minto)",
    explanation:
      "The Pyramid Principle: Lead with the ANSWER, then the supporting arguments, then the data. Executives don't have time for story-building — they want the insight NOW and will ask for detail if needed. Think of it as a newspaper: the headline tells you everything; you read on only if you want more.",
    points: 250,
  },
  {
    id: 10,
    category: "Ethics & Judgment",
    difficulty: "Manager",
    icon: "⚖️",
    title: "The Uncomfortable Truth",
    situation:
      "After 3 weeks of analysis, you discover your client's core product is harmful to the environment — something they didn't know when they hired you. The honest finding will cost them business. You:",
    options: [
      "Hide the finding — they didn't ask about environmental impact",
      "Present the finding clearly, along with potential solutions and strategic pivots",
      "Soften the data so it doesn't look as bad",
      "Wait for someone else to discover it",
    ],
    correct: 1,
    framework: "Consultant Ethics & Client Duty",
    explanation:
      "A consultant's value is TRUST. Hiding uncomfortable truths destroys that trust permanently — and in this case, could harm society. Great consultants deliver hard news WITH a path forward. 'Your product has an emissions problem. Here are 3 strategies to fix it while staying competitive.' Truth + solutions = real consulting value.",
    points: 250,
  },
];

export const TOTAL_POINTS = SCENARIOS.reduce((sum, s) => sum + s.points, 0);

export const RANKS = [
{ min: 0,  max: 20,  title: "Intern",             emoji: "📋", color: "#6b7280" },
{ min: 21, max: 40,  title: "Junior Analyst",      emoji: "🔍", color: "#3b82f6" },
{ min: 41, max: 60,  title: "Associate",           emoji: "📊", color: "#8b5cf6" },
{ min: 61, max: 75,  title: "Senior Associate",    emoji: "⚡", color: "#f59e0b" },
{ min: 76, max: 89,  title: "Engagement Manager",  emoji: "♟️", color: "#10b981" },
{ min: 90, max: 100, title: "Partner",             emoji: "🏆", color: "#ef4444" },
];

export const getRank = (percentScore) => {
  return RANKS.find((r) => percentScore >= r.min && percentScore <= r.max) || RANKS[0];
};