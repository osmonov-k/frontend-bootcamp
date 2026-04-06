import React, { useEffect } from 'react';
import './ProgressBar.css';
import { useState } from 'react';

const ProgressBarEasy = () => {
  const [bars, setBars] = useState<number[]>([]);

  console.log(bars);
  const handleClick = () => {
    setBars((prev) => [...prev, 0]);
  };
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      {bars.length > 0 &&
        bars.map((progress, index) => (
          <div
            key={index}
            style={{
              width: '300px',
              height: '20px',
              backgroundColor: 'lightgray',
              marginTop: '10px',
            }}
          >
            <div style={{ color: 'green', width: `${progress}%` }}></div>
          </div>
        ))}
    </div>
  );
};

export default ProgressBarEasy;
