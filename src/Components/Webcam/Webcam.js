import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import Slider from '@mui/material/Slider';
import https from 'https';
import './Webcam.css';
import Button from '../Button/Button';

const emojiMapping = (val) => {
  if (val >= 0 && val < 20) { return '😌'; }
  if (val >= 20 && val < 40) { return '🥲'; }
  if (val >= 40 && val < 60) { return '😭'; }
  return '😡';
};

const WebcamComponent = (props) => {
  const { setIsWebcamPage } = props;
  const [startCapturing, setStartCapturing] = useState();
  const [CO2Levels, setCO2Levels] = useState([]);
  const webcamRef = React.useRef(null);

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
      if (result.data) {
        if (result.data.msg) {
          const { min, max } = result.data.msg;
          if (min !== Infinity && max !== -Infinity) {
            const tempArr = [];
            tempArr.push((min * 100) / 24);
            tempArr.push((max * 100) / 24);
            setCO2Levels(tempArr);
          }
        }
      }
      // console.log(result.data);
    },
    [webcamRef],
  );

  const handleStartCapturing = () => {
    const interval = setInterval(() => capture(), 3000);
    setStartCapturing(interval);
  };

  const handleStopCapturing = () => {
    clearInterval(startCapturing);
    setStartCapturing();
  };

  return (
    <div className="Webcam">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        videoConstraints={{
          width: 400,
          height: 400,
          facingMode: { exact: 'environment' },
          // facingMode: 'user',
        }}
      />
      {(CO2Levels.length > 0) && (
        <div className="Slider">
          <Slider
            valueLabelFormat={() => emojiMapping(CO2Levels[1])}
            value={CO2Levels}
            valueLabelDisplay="on"
            disableSwap
          />
        </div>
      )}
      {(!startCapturing) && (<Button text="Start Capturing" onClick={() => handleStartCapturing()} />)}
      {(startCapturing) && (<Button text="Stop Capturing" onClick={() => handleStopCapturing()} />)}
      <Button text="Summary Report" onClick={() => setIsWebcamPage(false)} />
    </div>
  );
};

WebcamComponent.propTypes = {
  setIsWebcamPage: PropTypes.func.isRequired,
};

export default WebcamComponent;
