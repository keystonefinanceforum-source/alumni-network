import { useMemo } from "react";
import { SCENARIOS, TOTAL_POINTS, getRank } from "./gameData";
import styles from "./ResultScreen.module.css";

export default function ResultScreen({ score, answers, playerName, onRestart }) {
  const percent = Math.round((score / TOTAL_POINTS) * 100);
  const rank = getRank(percent);

  const correct = useMemo(
    () => answers.filter((a) => a.isCorrect).length,
    [answers]
  );

  const categoryBreakdown = useMemo(() => {
    const map = {};
    answers.forEach((a) => {
      if (!map[a.category]) map[a.category] = { correct: 0, total: 0 };
      map[a.category].total++;
      if (a.isCorrect) map[a.category].correct++;
    });
    return Object.entries(map);
  }, [answers]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} aria-hidden="true" />

      {/* Celebration particles */}
      {percent >= 70 && (
        <div className={styles.particles} aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.particle} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              background: ["#fbbf24","#10b981","#6366f1","#f43f5e"][i % 4],
            }} />
          ))}
        </div>
      )}

      <div className={styles.container}>

        {/* Rank card */}
        <div className={styles.rankCard} style={{ "--rank-color": rank.color }}>
          <div className={styles.rankEmoji}>{rank.emoji}</div>
          <div className={styles.rankLabel}>YOU RANKED AS</div>
          <div className={styles.rankTitle} style={{ color: rank.color }}>
            {rank.title}
          </div>
          <div className={styles.rankPlayer}>{playerName}</div>
          <p className={styles.rankDescription}>{rank.description}</p>
        </div>

        {/* Score big display */}
        <div className={styles.scoreBlock}>
          <div className={styles.scoreMain}>
            <span className={styles.scoreNum}>{score.toLocaleString()}</span>
            <span className={styles.scoreMax}>/ {TOTAL_POINTS.toLocaleString()}</span>
          </div>
          <div className={styles.percentBar}>
            <div
              className={styles.percentFill}
              style={{
                width: `${percent}%`,
                background: rank.color,
              }}
            />
          </div>
          <div className={styles.percentLabel}>{percent}% score · {correct}/{SCENARIOS.length} correct</div>
        </div>

        {/* Category breakdown */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>PERFORMANCE BY AREA</div>
          <div className={styles.breakdown}>
            {categoryBreakdown.map(([cat, data]) => (
              <div key={cat} className={styles.breakdownRow}>
                <span className={styles.breakdownCat}>{cat}</span>
                <div className={styles.breakdownBar}>
                  <div
                    className={styles.breakdownFill}
                    style={{
                      width: `${(data.correct / data.total) * 100}%`,
                      background: data.correct === data.total ? "#10b981" : data.correct === 0 ? "#ef4444" : "#f59e0b",
                    }}
                  />
                </div>
                <span className={styles.breakdownScore}>
                  {data.correct}/{data.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Answer review */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>CASE REVIEW</div>
          <div className={styles.reviewList}>
            {answers.map((a, i) => {
              const sc = SCENARIOS.find((s) => s.id === a.scenarioId);
              return (
                <div
                  key={i}
                  className={`${styles.reviewItem} ${
                    a.isCorrect ? styles.reviewCorrect : styles.reviewWrong
                  }`}
                >
                  <div className={styles.reviewTop}>
                    <span className={styles.reviewNum}>CASE {i + 1}</span>
                    <span className={styles.reviewCategory}>{a.category}</span>
                    <span className={styles.reviewResult}>
                      {a.isCorrect ? "✓" : a.selected === -1 ? "⏱" : "✗"}
                    </span>
                  </div>
                  <div className={styles.reviewTitle}>{a.title}</div>
                  <div className={styles.reviewFramework}>
                    📐 {a.framework}
                  </div>
                  {!a.isCorrect && sc && (
                    <div className={styles.reviewCorrectAnswer}>
                      Correct: {sc.options[a.correct]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Insight message */}
        <div className={styles.insightBox}>
          <div className={styles.insightTitle}>YOUR CONSULTING INSIGHT</div>
          <p className={styles.insightText}>
            {percent >= 90
              ? "Exceptional. You think in frameworks, ask the right questions, and communicate clearly. The boardroom is waiting for you."
              : percent >= 75
              ? "Strong performance. You understand the core of strategic thinking. Practice structuring your reasoning — and you'll go far."
              : percent >= 60
              ? "Good instincts. You got the big ideas right. Work on data interpretation and stakeholder thinking to sharpen your edge."
              : percent >= 40
              ? "Solid foundation. The frameworks you learned here are used by top firms daily. Review the explanations and try again."
              : "Keep learning! Every great consultant started exactly where you are. The frameworks are learnable — the curiosity is already there."}
          </p>
        </div>

        <button className={styles.restartBtn} onClick={onRestart}>
          ↩ TAKE A NEW CASE
        </button>
      </div>
    </div>
  );
}