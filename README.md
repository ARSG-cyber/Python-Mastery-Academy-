# 🐍 Python Mastery Academy

An interactive, beginner-friendly educational web application built to master Python through interactive quizzes, code-output prediction, detailed misconception analysis, progress tracking, and a spaced repetition Mistakes Notebook.

---

## 🌟 Key Features

- **📊 Comprehensive Learning Dashboard**: Real-time stats on total questions answered, overall accuracy percentage, active learning streak, weak topic detection, and recent quiz sessions.
- **📚 50-Topic Structured Curriculum**: Spanning Beginner, Control Flow, Collections, Functions & Modules, Intermediate, and Advanced tracks.
- **🎯 90+ Verified Question Bank**:
  - Over 65 verified string questions covering all 47 standard Python `str` methods, immutability, slicing, formatting, and edge cases.
  - History & fundamentals covering Guido van Rossum, 1991 release, Monty Python name origin, bytecode execution, dynamic typing, and collections.
- **🕹️ Flexible Practice Modes**: Quick Quiz (10 Qs), Standard (20 Qs), Deep Practice (up to 50 Qs), Challenge Mode (difficult only), and Revision Mode.
- **💡 Rich Pedagogical Feedback**: Identifies the correct answer, explains the underlying Python concept, and breaks down the exact misconception behind chosen wrong options.
- **📓 Mistakes Notebook**: Automatically logs missed questions with attempt history, topic grouping, and "Mark as Understood" tracking.
- **⏱️ Optional Timer & Audio Feedback**: Synthesized Web Audio API sound effects and customizable countdown timers.
- **💾 Resilient Local Storage**: Versioned schema with corrupted storage recovery, progress export as JSON, and import support.
- **🌓 Light, Dark & System Themes**: Modern, high-contrast, accessible UI styled with Tailwind CSS.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Routing**: React Router v6
- **Testing**: Vitest, React Testing Library, JSDOM
- **Persistence**: Browser `localStorage` (Zero external dependencies or API keys required)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Run the Test Suite
```bash
npm run test
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Structure

```
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── router.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types/          # Typed models for questions, topics, progress
│   ├── data/
│   │   ├── topics.ts   # 50 curriculum topics
│   │   └── questions/  # 90+ verified questions (strings, fundamentals, control flow)
│   ├── lib/
│   │   ├── storage.ts  # Versioned localStorage engine & JSON backup
│   │   ├── scoring.ts  # Evaluation & safe accuracy calculation
│   │   └── sound.ts    # Web Audio sound synthesizers
│   ├── context/        # Progress & Theme contexts
│   ├── components/
│   │   ├── layout/     # Sidebar, Navbar, Layout
│   │   ├── common/     # Card, Badge, Button, CodeBlock, Modal, ProgressBar
│   │   └── quiz/       # QuestionViewer, FeedbackCard, QuizTimer
│   └── pages/          # 11 distinct application pages
└── test/               # Vitest unit & integration tests
```
