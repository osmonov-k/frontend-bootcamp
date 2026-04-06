import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import TrafficLight from './challenges/traffic-light/TrafficLight';
import StopWatch from './challenges/stopwatch/StopWatch';
import ProgressBarEasy from './challenges/progress-bar-easy/ProgressBarEasy';
import GenerateTable from './challenges/generate-table/GenerateTable';

function App() {
  return (
    <div>
      <img src={reactLogo} alt="React logo" />
      {/* <TrafficLight /> */}
      {/* <StopWatch /> */}
      {/* <ProgressBarEasy /> */}
      <GenerateTable />
    </div>
  );
}

export default App;
