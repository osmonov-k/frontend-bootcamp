import React, { use, useEffect, useState } from 'react';

const StopWatch = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<
    { hours: number; minutes: number; seconds: number }[]
  >([]);

  const handleStart = () => {
    setIsRunning((prev) => !prev);
  };
  const handlePause = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
  };
  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.seconds === 59) {
          if (prevTime.minutes === 59) {
            return { hours: prevTime.hours + 1, minutes: 0, seconds: 0 };
          }
          return {
            hours: prevTime.hours,
            minutes: prevTime.minutes + 1,
            seconds: 0,
          };
        }
        return {
          hours: prevTime.hours,
          minutes: prevTime.minutes,
          seconds: prevTime.seconds + 1,
        };
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <span>{String(time.hours).padStart(2, '0')}</span>:
        <span>{String(time.minutes).padStart(2, '0')}</span>:
        <span>{String(time.seconds).padStart(2, '0')}</span>
      </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap}>Lap</button>
      <h2>Laps</h2>
      {laps.map((lap, index) => (
        <div key={index}>
          <span>{String(lap.hours).padStart(2, '0')}</span>:
          <span>{String(lap.minutes).padStart(2, '0')}</span>:
          <span>{String(lap.seconds).padStart(2, '0')}</span>
        </div>
      ))}
    </div>
  );
};

export default StopWatch;
