import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import https from 'https';
import BubbleChart from '../PieChart/PieChart';
import './Summary.css';
import Button from '../Button/Button';

const Summary = (props) => {
  const { setIsWebcamPage } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSummary = async () => {
      const options = {
        url: 'get_summary',
        method: 'GET',
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      };
      const result = await axios(options);
      if (result.data) {
        if (result.data.msg) {
          setData(result.data.msg);
        }
      }
    };
    getSummary();
  }, []);

  return (
    <div className="Summary">
      <span className="Summary-heading">
        Your CO
        <sub>2</sub>
        {' '}
        Emission Summary
      </span>
      {(data.length > 0) && (<div className="Summary-bubble"><BubbleChart data={data} /></div>)}
      <Button text="Start Scanning" onClick={() => setIsWebcamPage(true)} />
    </div>
  );
};

Summary.propTypes = {
  setIsWebcamPage: PropTypes.func.isRequired,
};

export default Summary;
