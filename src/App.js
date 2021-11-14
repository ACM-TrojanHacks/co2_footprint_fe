import React, { useState } from 'react';
import './App.css';
import Summary from './Components/Summary/Summary';
import WebcamComponent from './Components/Webcam/Webcam';

const App = () => {
  const [isWebcamPage, setIsWebcamPage] = useState(true);
  return (
    <div className="App">
      {isWebcamPage && <WebcamComponent setIsWebcamPage={setIsWebcamPage} />}
      {!isWebcamPage && <Summary setIsWebcamPage={setIsWebcamPage} />}
    </div>
  );
};

export default App;
