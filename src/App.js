import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [phase, setPhase] = useState("start");
  const [count, setCount] = useState(5);
  const [showAlert, setShowAlert] = useState(false);

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    setPhase("scan");
  };

  // Function to create floating hearts
  const createHearts = () =>
    Array.from({ length: 25 }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 6 + Math.random() * 5;
      const size = 15 + Math.random() * 25;
      return (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            fontSize: `${size}px`,
          }}
        >
          🖕🏿
        </div>
      );
    });

  useEffect(() => {
    if (phase === "scan") {
      const timer = setTimeout(() => {
        setPhase("countdown");
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === "countdown") {
      if (count > 0) {
        const timer = setTimeout(() => {
          setCount(count - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase("glitch");
      }
    }

    if (phase === "glitch") {
      const timer = setTimeout(() => {
        setPhase("reveal");
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (phase === "reveal") {
      setShowAlert(true);
      const alertTimer = setTimeout(() => {
        setShowAlert(false);
      }, 2500);
      return () => clearTimeout(alertTimer);
    }
  }, [phase, count]);

  return (
    <div className={`container ${phase}`}>
      {phase === "start" && (
        <>
          <h1 className="warning">Hi Cench!</h1>
          <button className="start-btn" onClick={enterFullscreen}>
            Click mo ko Please
          </button>
        </>
      )}

      {phase === "scan" && (
        <>
          <h1>You've just been Hacked!!!</h1>
          <p>Scanning device files...</p>
        </>
      )}

      {phase === "countdown" && (
        <>
          <h1>CRITICAL FAILURE</h1>
          <h2>System shutdown in {count}</h2>
        </>
      )}

      {phase === "glitch" && (
        <h1 className="glitch-text">██████ SYSTEM CORRUPTED ██████</h1>
      )}

      {phase === "reveal" && (
        <>
          {showAlert && (
            <div className="security-popup">
              <h2>⚠ SECURITY ANOMALY DETECTED ⚠</h2>
              <p>Unusual System activity detected.</p>
              <p>Analyzing System threat level...</p>
            </div>
          )}

          <div className="gif-circle">
            <img
              src="/vee.gif"
              alt="Valentine"
              className="gif"
            />
          </div>

          <h1 className="valentine">💘 HAPPY VALENTINE'S DAY CENCH 💘</h1>

          <p className="message">
            kasi ur single...<br />
            <strong>i hope di ka madapa ❤️</strong>
          </p>

          {/* Floating hearts overlay */}
          <div className="floating-container">{createHearts()}</div>
        </>
      )}
    </div>
  );
}

export default App;
