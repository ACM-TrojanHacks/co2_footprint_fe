import React, { useState } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
  const [startCapturing, setStartCapturing] = useState();
  const [imageSrc, setImageSrc] = useState();
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imgSrc = webcamRef.current.getScreenshot();
      setImageSrc(imgSrc);
    },
    [webcamRef],
  );

  const handleStartCapturing = () => {
    const interval = setInterval(() => capture(), 1000);
    setStartCapturing(interval);
  };

  const handleStopCapturing = () => {
    clearInterval(startCapturing);
    setStartCapturing();
  };

  if (startCapturing !== undefined) {
    console.log(imageSrc);
  }

  return (
    <div>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={{
          width: 400,
          height: 400,
          facingMode: { exact: 'environment' },
        }}
      />
      {(!startCapturing) && (<button type="submit" onClick={() => handleStartCapturing()}>Start Capturing</button>)}
      {(startCapturing) && (<button type="submit" onClick={() => handleStopCapturing()}>Stop Capturing</button>)}
    </div>
  );
};

export default WebcamComponent;
