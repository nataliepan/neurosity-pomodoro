import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { notion, useNotion } from "../../services/notion";
import { Nav } from "../../components/Nav";
import ProgressCircle from "../../components/ProgressCircle";

const STATE = { FOCUS: "FOCUS", BREAK: "BREAK", LONG_BREAK: "LONG_BREAK" };
const STATE_TIME = { FOCUS: 25, BREAK: 5, LONG_BREAK: 25 };
// { FOCUS: 25 * 60, BREAK: 5 * 60, LONG_BREAK: 25 * 60 };

const STAGE = [
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: "",
    title: "Start Pomodoro",
    description: "Click the button to start the Pomodoro timer.",
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: "",
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: "",
    title: "Focus Time!",
    description: "If you pause, you'll have to start this focus session over.",
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: "",
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: "",
    title: "Focus Time!",
    description: "Wear your headset so we can create your personal focus model.",
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: "",
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: "",
    title: "Focus Time!",
    description: "You're almost done! Keep going!",
  },
  {
    state: STATE.LONG_BREAK,
    time: STATE_TIME.LONG_BREAK,
    image: "",
    title: "Congrats You Finished a Series!",
    description: "Celebrate your hard work with a LONG break.",
  },
];

export function Start() {
  // State to track remaining time in seconds
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0); // Index of the current stage
  const [timeLeft, setTimeLeft] = useState(STAGE[0].time);
  const [timerActive, setTimerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [focus, setFocus] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const { user } = useNotion();

  const onMenuClick = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const subscription = notion.focus().subscribe((f) => {
      const focusScore = Math.trunc(f.probability * 100);
      setFocus(focusScore);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    let interval = null;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
        const maxTime = STAGE[currentStage].time;
        setProgress((100 * (maxTime - timeLeft)) / maxTime);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      clearInterval(interval); // Clear the interval to prevent it from continuing to run
      setTimerActive(false); // Stop the timer
      alert(STAGE[currentStage].title + " is over!"); // Alert based on the stage title
      const nextStage = (currentStage + 1) % STAGE.length; // Move to the next stage or loop back to the start
      setCurrentStage(nextStage); // Update the current stage
      setTimeLeft(STAGE[nextStage].time); // Set the time for the next stage
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, currentStage]);

  const onStartClick = () => {
    if (!timerActive) {
      setTimerActive(true);
    }
  };

  // Convert seconds into MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="flex justify-end">
        <button className="p-5" onClick={onMenuClick}>
          <Bars3Icon className="h-6 w-6 text-black-500" />
        </button>
        <div className={`position absolute z-10 top-10 ${!showNav ? "hidden" : ""}`}>
          <Nav />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 justify-center h-screen text-center">
        <h1 className="text-2xl">{STAGE[currentStage].title}</h1>
        <p>{STAGE[currentStage].description}</p>

        <div>
          <ProgressCircle progress={progress} />
          <p>{focus > 0 && <span>Focus {focus}%</span>}</p>
        </div>
        <div>
          <p className="text-8xl">{formatTime(timeLeft)}</p>
          <button
            onClick={onStartClick}
            className={`card-btn ${timerActive ? "opacity-50" : ""}`}
            disabled={timerActive}
          >
            {timerActive ? "Running..." : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
}
