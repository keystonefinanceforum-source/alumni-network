import { useState } from "react";
import styles from "./StartScreen.module.css";

export default function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!name.trim()) {
      setError("Enter your name to begin the case.");
      return;
    }
    onStart(name.trim());
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleStart();
  };

  return (
    <div className={styles.wrapper}>
      {/* Animated grid background */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Floating orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      <div className={styles.container}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          STRATEGIC THINKING CHALLENGE
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          <span className={styles.titleLine1}>THINK LIKE</span>
          <span className={styles.titleLine2}>A CONSULTANT</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          10 real-world business scenarios. No textbook answers. <br />
          Can you crack the case?
        </p>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {[
            { label: "Cases", value: "10" },
            { label: "Frameworks", value: "10" },
            { label: "Grade Level", value: "9–10" },
            { label: "Max Points", value: "1,800" },
          ].map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>YOUR NAME / CODENAME</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. Alex, Strategy Wolf, Case Cracker..."
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            onKeyDown={handleKey}
            maxLength={30}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <button className={styles.startBtn} onClick={handleStart}>
          <span className={styles.btnText}>OPEN THE CASE FILE</span>
          <span className={styles.btnArrow}>→</span>
        </button>

        {/* Frameworks preview */}
        <div className={styles.frameworksRow}>
          {["MECE", "ROI", "5 WHYS", "PYRAMID", "STAKEHOLDERS"].map((f) => (
            <span key={f} className={styles.framework}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
