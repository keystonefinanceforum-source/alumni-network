import { useState, useEffect, useRef } from "react";
import { SCENARIOS } from "./gameData";
import styles from "./GameScreen.module.css";

const TIMER_MAX = 45; // seconds per question

export default function GameScreen({ playerName, onEnd }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_MAX);
  const [timedOut, setTimedOut] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(true);
  const timerRef = useRef(null);

  const scenario = SCENARIOS[current];

  // Timer logic
  useEffect(() => {
    if (revealed) return;
    setTimeLeft(TIMER_MAX);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimedOut(true);
          setRevealed(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [current, revealed]);

  // Enter animation
  useEffect(() => {
    setEntering(true);
    const t = setTimeout(() => setEntering(false), 400);
    return () => clearTimeout(t);
  }, [current]);

  const handleSelect = (idx) => {
    if (revealed) return;
    clearInterval(timerRef.current);
    setSelected(idx);
    setRevealed(true);
    setTimedOut(false);

    if (idx === scenario.correct) {
      const timeBonus = Math.floor((timeLeft / TIMER_MAX) * 20);
      setScore((s) => s + scenario.points + timeBonus);
    }
  };

  const handleNext = () => {
    // Save answer record
    const rec = {
      scenarioId: scenario.id,
      title: scenario.title,
      category: scenario.category,
      selected: timedOut ? -1 : selected,
      correct: scenario.correct,
      isCorrect: !timedOut && selected === scenario.correct,
      points: scenario.points,
      framework: scenario.framework,
    };
    const newAnswers = [...answers, rec];

    if (current + 1 >= SCENARIOS.length) {
      onEnd(score + (!timedOut && selected === scenario.correct ? 0 : 0), newAnswers);
      // score is already updated in handleSelect; just pass it
      onEnd(score, newAnswers);
      return;
    }

    setExiting(true);
    setTimeout(() => {
      setAnswers(newAnswers);
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setTimedOut(false);
      setExiting(false);
    }, 300);
  };

  const timerPercent = (timeLeft / TIMER_MAX) * 100;
  const timerColor =
    timeLeft > 20 ? "#10b981" : timeLeft > 10 ? "#f59e0b" : "#ef4444";

  const optionState = (idx) => {
    if (!revealed) return "neutral";
    if (idx === scenario.correct) return "correct";
    if (idx === selected && idx !== scenario.correct) return "wrong";
    return "neutral";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} aria-hidden="true" />

      {/* Top HUD */}
      <div className={styles.hud}>
        <div className={styles.hudLeft}>
          <span className={styles.playerTag}>👤 {playerName}</span>
        </div>
        <div className={styles.hudCenter}>
          <span className={styles.questionCount}>
            CASE {current + 1} / {SCENARIOS.length}
          </span>
        </div>
        <div className={styles.hudRight}>
          <span className={styles.scoreDisplay}>
            ⬟ {score.toLocaleString()} pts
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        {SCENARIOS.map((_, i) => (
          <div
            key={i}
            className={`${styles.progressSegment} ${
              i < current
                ? styles.progressDone
                : i === current
                ? styles.progressActive
                : ""
            }`}
          />
        ))}
      </div>

      {/* Main card */}
      <div
        className={`${styles.card} ${exiting ? styles.cardExit : ""} ${
          entering ? styles.cardEnter : ""
        }`}
      >
        {/* Card header */}
        <div className={styles.cardHeader}>
          <div className={styles.categoryBadge}>
            <span>{scenario.icon}</span>
            <span>{scenario.category}</span>
          </div>
          <div className={styles.difficultyBadge}>{scenario.difficulty}</div>
        </div>

        {/* Timer */}
        <div className={styles.timerRow}>
          <div className={styles.timerTrack}>
            <div
              className={styles.timerFill}
              style={{
                width: `${timerPercent}%`,
                background: timerColor,
                transition: "width 1s linear, background 0.3s",
              }}
            />
          </div>
          <span
            className={styles.timerNum}
            style={{ color: timerColor }}
          >
            {timeLeft}s
          </span>
        </div>

        {/* Title */}
        <h2 className={styles.caseTitle}>{scenario.title}</h2>

        {/* Situation */}
        <div className={styles.situationBox}>
          <div className={styles.situationLabel}>THE SITUATION</div>
          <p className={styles.situation}>{scenario.situation}</p>
        </div>

        {/* Options */}
        <div className={styles.options}>
          {scenario.options.map((opt, idx) => (
            <button
              key={idx}
              className={`${styles.option} ${
                styles["option_" + optionState(idx)]
              } ${revealed ? styles.optionRevealed : ""}`}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
            >
              <span className={styles.optionLetter}>
                {["A", "B", "C", "D"][idx]}
              </span>
              <span className={styles.optionText}>{opt}</span>
              {revealed && idx === scenario.correct && (
                <span className={styles.optionIcon}>✓</span>
              )}
              {revealed &&
                idx === selected &&
                idx !== scenario.correct && (
                  <span className={styles.optionIcon}>✗</span>
                )}
            </button>
          ))}
        </div>

        {/* Explanation panel */}
        {revealed && (
          <div
            className={`${styles.explanation} ${
              timedOut
                ? styles.explanationTimeout
                : selected === scenario.correct
                ? styles.explanationCorrect
                : styles.explanationWrong
            }`}
          >
            <div className={styles.explanationHeader}>
              {timedOut
                ? "⏱ TIME'S UP!"
                : selected === scenario.correct
                ? "✓ CORRECT!"
                : "✗ NOT QUITE"}
              <span className={styles.frameworkTag}>
                📐 {scenario.framework}
              </span>
            </div>
            <p className={styles.explanationText}>{scenario.explanation}</p>

            {!timedOut && selected === scenario.correct && (
              <div className={styles.pointsEarned}>
                +{scenario.points} pts
                {timeLeft > 0 && (
                  <span className={styles.bonusPts}>
                    {" "}+{Math.floor((timeLeft / TIMER_MAX) * 20)} time bonus
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Next button */}
        {revealed && (
          <button className={styles.nextBtn} onClick={handleNext}>
            {current + 1 >= SCENARIOS.length
              ? "SEE MY RESULTS →"
              : "NEXT CASE →"}
          </button>
        )}
      </div>
    </div>
  );
}
