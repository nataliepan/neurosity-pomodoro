import React, { useState, useEffect } from "react";
import { Bars3Icon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import chime from "../../assets/bell.mp3";
import endSound from "../../assets/level-up-191997.mp3";
import { useNavigate } from "react-router-dom";
import { neurosity, useNeurosity } from "../../services/notion";
import { Nav } from "../../components/Nav";
import ProgressCircle from "../../components/ProgressCircle";
import useAudioPlayer from "../../services/useAudioPlayer";
import startImage from "../../assets/headset-start.png";
import endImage from "../../assets/celebrate.png";
import track1 from "../../assets/track-1.png";
import track2 from "../../assets/track-2.png";
import track3 from "../../assets/track-3.png";
import track4 from "../../assets/track-4.png";
import warning from "../../assets/warning.mp3";
import FocusRating from "../../components/FocusRating";
import { start } from "repl";
const STATE = { START: "START", FOCUS: "FOCUS", BREAK: "BREAK", LONG_BREAK: "LONG_BREAK" };
const STATE_TIME = { FOCUS: 10, BREAK: 3, LONG_BREAK: 7 };
// { FOCUS: 25 * 60, BREAK: 5 * 60, LONG_BREAK: 25 * 60 };

const SOUND_TYPE = { BELL: "BELL", END: "END" };
const STAGE = [
  {
    state: STATE.START,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Start Pomodoro",
    description: "Click the button to start the Pomodoro timer.",
    sound: SOUND_TYPE.BELL,
    getFeedback: false,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "Get to work! You'll have a short break after this session.",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: track1,
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
    sound: SOUND_TYPE.BELL,
    getFeedback: true,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "If you pause, you'll have to start this focus session over.",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: track2,
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
    sound: SOUND_TYPE.BELL,
    getFeedback: true,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "Wear your headset so we can create your personal focus model.",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: track3,
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
    sound: SOUND_TYPE.BELL,
    getFeedback: true,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "You're almost done! Keep going!",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.LONG_BREAK,
    time: STATE_TIME.LONG_BREAK,
    image: track4,
    title: "Congrats You Finished a Series!",
    description: "Celebrate your hard work with a LONG break.",
    sound: null,
    getFeedback: true,
  },
  {
    state: STATE.LONG_BREAK,
    time: 0,
    image: endImage,
    title: "Congrats You Finished a Series!",
    description: "Celebrate your hard work with a LONG break.",
    sound: null,
  },
];

export function Start() {
  // State to track remaining time in seconds
  const navigate = useNavigate();
  const [sound, setSound] = useState(true);
  const audioPlayer = useAudioPlayer(chime, sound);
  const endAudioPlayer = useAudioPlayer(endSound, sound);
  const warningAudioPlayer = useAudioPlayer(warning, sound);

  const [currentStage, setCurrentStage] = useState(0); // Index of the current stage
  const [timeLeft, setTimeLeft] = useState(STAGE[0].time);
  const [timerActive, setTimerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [focus, setFocus] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [showRateFocus, setShowRateFocus] = useState(false);
  const { user } = useNeurosity();

  const [warnPossible, setWarnPossible] = useState(true);

  const onMenuClick = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    let timeoutId;

    if (STAGE[currentStage].state === STATE.FOCUS && focus > 0 && focus < 40 && warnPossible) {
      // Assuming warningAudioPlayer.play() returns a Promise. Adjust as necessary.
      warningAudioPlayer.play().catch((error) => {
        console.error("Failed to play warning audio:", error);
      });
      setWarnPossible(false);

      // Set a timeout to re-enable warnings after a delay
      timeoutId = setTimeout(() => {
        setWarnPossible(true);
      }, 5000); // Adjust the delay as needed
    }

    // Cleanup function to clear the timeout
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [focus, currentStage, warnPossible]); // Removed setWarnPossible from dependencies

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const subscription = neurosity.focus().subscribe((f) => {
      const focusScore = Math.trunc(f.probability * 100);
      setFocus(focusScore);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    setWarnPossible(true);
  }, [currentStage]);

  useEffect(() => {
    const MAX_TIME = STAGE[currentStage].time; // Define MAX_TIME based on the current stage's time
    let interval = null;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          setProgress((100 * (MAX_TIME - newTimeLeft)) / MAX_TIME); // Update progress based on new time left
          return newTimeLeft;
        });
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setProgress(100);

      // Since the play method returns a promise, handle it asynchronously
      if (STAGE[currentStage].sound) {
        const playPromise =
          STAGE[currentStage].sound == SOUND_TYPE.END ? audioPlayer.play() : endAudioPlayer.play();

        playPromise
          .then(() => {
            // This block runs after the audio finishes playing
            setTimeout(() => {
              const nextStage = (currentStage + 1) % STAGE.length;
              setCurrentStage(nextStage); // Update the current stage
              setTimeLeft(STAGE[nextStage].time); // Update time left based on the new stage
              setProgress(0); // Reset progress for the new stage
              if (nextStage == STAGE.length - 1) {
                setTimerActive(false);
              }
            }, 100); // A short delay to ensure the UI updates
          })
          .catch((error) => console.error("Error playing audio:", error));
      }
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, currentStage, audioPlayer, endAudioPlayer]);

  const onStartClick = async () => {
    if (!timerActive) {
      try {
        const nextStage = (currentStage + 1) % STAGE.length;
        setCurrentStage(nextStage);
        await audioPlayer.play();
        // Audio has finished playing, proceed with updating timer or state
        setTimerActive(true);
        // You can now safely change time or update any state here
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    } else {
      setTimerActive(false);
    }
  };

  // Convert seconds into MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const onToggleSound = () => {
    setSound(!sound);
  };

  useEffect(() => {
    if (STAGE[currentStage].getFeedback) {
      setShowRateFocus(true);
    } else {
      setShowRateFocus(false);
    }
  }, [currentStage, setShowRateFocus]);

  const onRateFocusClose = () => {
    setShowRateFocus(false);
  };

  return (
    <div className="px-5">
      <div className="flex justify-end">
        <button className="p-5" onClick={onMenuClick}>
          <Bars3Icon className="h-6 w-6 text-black-500" />
        </button>
        <div className={`position absolute z-10 top-10 ${!showNav ? "hidden" : ""}`}>
          <Nav />
        </div>
      </div>
      <div className="flex justify-end">
        <div className={`position absolute z-10 top-10`}>
          <FocusRating isVisible={showRateFocus} onClose={onRateFocusClose}></FocusRating>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 h-screen text-center">
        <h1 className="text-2xl">{STAGE[currentStage].title}</h1>
        <p>{STAGE[currentStage].description}</p>

        <div
          className="relative flex items-center justify-center"
          style={{ width: "160px", height: "210px" }}
        >
          <ProgressCircle progress={progress} />
          <div className="absolute bottom-0">{focus > 0 && <span>Focus {focus}%</span>}</div>
          <div className="absolute">
            <img src={STAGE[currentStage].image} alt="start" className="w-40 h-40" />
          </div>
        </div>
        <div>
          <button onClick={onToggleSound}>
            {sound ? (
              <SpeakerWaveIcon className="h-6 w-6 text-black-500" />
            ) : (
              <SpeakerXMarkIcon className="h-6 w-6 text-black-500" />
            )}
          </button>
          <p className="text-8xl">{formatTime(timeLeft)}</p>
          <button onClick={onStartClick} className={`card-btn ${timerActive ? "opacity-50" : ""}`}>
            {timerActive ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
}
