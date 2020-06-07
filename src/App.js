import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [{ xAcceleration, yAcceleration }, setMotion] = useState({ x: 0, y: 0 });
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!window.DeviceMotionEvent) {
      setSupported(false);
    }
    const handleMotionEvent = event => {

      console.log(event);

      requestAnimationFrame(() =>
        setMotion({
          xAcceleration: -event.accelerationIncludingGravity.x * 5,
          yAcceleration: event.accelerationIncludingGravity.y * 5,
        }),
      );
    };

    window.addEventListener('devicemotion', handleMotionEvent, true);

    return () => window.removeEventListener('devicemotion', handleMotionEvent);
  }, []);

  if (!supported) {
    return <p>Not supported</p>;
  }


  return (
    <div className="App">
      <p>X Accelleration: {xAcceleration}</p>
      <p>Y Accelleration: {yAcceleration}</p>
    </div>
  );
}

export default App;
