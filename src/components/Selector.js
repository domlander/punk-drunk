import React from 'react';
import Slider from '@material-ui/core/Slider';
import styles from './Selector.module.scss';

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
      <Slider
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



