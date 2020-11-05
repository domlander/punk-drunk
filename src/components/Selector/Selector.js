import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styles from './Selector.module.scss';

const PrettoSlider = withStyles({
  root: {
    width: '90%'
  },
  thumb: {
    height: '1.5em',
    width: '1.5em',
    color: '#0086A8',
    'margin-top': 0
  },
  track: {
    color: '#8EE8FF',
    height: '1.5em',
    'padding-right': '0.3em',
    'margin-left': '0.3em',
  },
  rail: {
    'border-radius': '1.5em',
    color: '#fff',
    height: '1.5em',
    'padding-right': '1em',
  },
  valueLabel: {
    left: 'auto'
  }
})(Slider);

const Selector = ({
  low,
  high,
  min = 0,
  max,
  isDisplayValue = true,
  step = 1,
  value,
  setValue,
}) => {
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.slider}>
      <PrettoSlider
        className={styles.muiSlider}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay={isDisplayValue ? "auto" : "off"}
        aria-labelledby="range-slider"
      />
      <div className={styles.values}>
        <div className={styles.lowValue}>{low}</div>
        <div className={styles.highValue}>{high}</div>
      </div>
    </div>
  )
}

export default Selector;



