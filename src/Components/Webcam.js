import axios from 'axios';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import https from 'https';

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1;
  }
  return new File([u8arr], filename, { type: mime });
};

const WebcamComponent = () => {
  const [startCapturing, setStartCapturing] = useState();
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    async () => {
      const imgSrc = webcamRef.current.getScreenshot();
      const file = dataURLtoFile(imgSrc);
      const formData = new FormData();
      formData.append('file', file);
      const options = {
        url: 'upload_image',
        method: 'POST',
        data: formData,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const result = await axios(options);
      console.log(result.data);
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

  return (
    <div>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        screenshotQuality={1}
        videoConstraints={{
          width: 400,
          height: 400,
          facingMode: { exact: 'environment' },
          // facingMode: 'user',
        }}
      />
      {(!startCapturing) && (<button type="submit" onClick={() => handleStartCapturing()}>Start Capturing</button>)}
      {(startCapturing) && (<button type="submit" onClick={() => handleStopCapturing()}>Stop Capturing</button>)}
    </div>
  );
};

export default WebcamComponent;
