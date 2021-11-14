import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../PieChart/PieChart';
import './Summary.css';
import Button from '../Button/Button';

const Summary = (props) => {
  const { setIsWebcamPage } = props;
  const data = [
    { label: 'dogs', value: 140 },
    { label: 'cats', value: 91 },
    { label: 'hamsters', value: 88 },
    { label: 'parrots', value: 74 },
    { label: 'rabbits', value: 63 },
  ];

  return (
    <div className="Summary">
      <span className="Summary-heading">Your CO2 Emission Summary</span>
      <PieChart data={data} />
      <Button text="Start Scanning" onClick={() => setIsWebcamPage(true)} />
    </div>
  );
};

Summary.propTypes = {
  setIsWebcamPage: PropTypes.func.isRequired,
};

export default Summary;
