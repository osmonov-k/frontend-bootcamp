import { useEffect } from 'react';
import './trafficLight.css';
import { useState } from 'react';

const TrafficLight = () => {
  const [index, setIndex] = useState(0);
  const [light, setLight] = useState([
    { duration: 5000, bgColor: 'green' },
    { duration: 1000, bgColor: 'yellow' },
    { duration: 3000, bgColor: 'red' },
  ]); // [green, yellow, red] durations in milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % light.length); // Cycle through lights
    }, light[index]?.duration); // Change every duration seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="traffic-light-container">
      {light.map((light, i) => (
        <div key={i} className={`light ${index === i ? 'active' : ''}`}></div>
      ))}
    </div>
  );
};

export default TrafficLight;

/**
 * green 5 sec
 * yellow 1 sec
 * red 3 sec
 */
