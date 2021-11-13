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
        height={600}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={600}
        screenshotQuality={1}
        videoConstraints={{
          width: 600,
          height: 600,
          facingMode: { exact: 'environment' },
        }}
      />
      {(!startCapturing) && (<button type="submit" onClick={() => handleStartCapturing()}>Start Capturing</button>)}
      {(startCapturing) && (<button type="submit" onClick={() => handleStopCapturing()}>Stop Capturing</button>)}
    </div>
  );
};

export default WebcamComponent;
