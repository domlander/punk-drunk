import React, { useState } from 'react';
import FilterTab from './FilterTab';
import Tab from './Tab';
import Heading from './Heading';
import Selector from './Selector';

import styles from './Filters.module.scss';

const Filters = ({ setShowFilters, strength, setStrength, bitterness, setBitterness, colour, setColour }) => {
  const [strengthLocal, setStrengthLocal] = useState(strength);
  const [bitternessLocal, setBitternessLocal] = useState(bitterness);
  const [colourLocal, setColourLocal] = useState(colour);

  const handleExit = () => {
    setShowFilters(false);
  }

  const handleApplyFilters = () => {
    saveFilters();
    setShowFilters(false);
  }

  const saveFilters = () => {
    setStrength(strengthLocal);
    setBitterness(bitternessLocal);
    setColour(colourLocal);

    localStorage.setItem('strength_low', strengthLocal[0]);
    localStorage.setItem('strength_high', strengthLocal[1]);
    localStorage.setItem('bitterness_low', bitternessLocal[0]);
    localStorage.setItem('bitterness_high', bitternessLocal[1]);
    localStorage.setItem('colour_low', colourLocal[0]);
    localStorage.setItem('colour_high', colourLocal[1]);
  }

  return (
    <>
      <div className={styles.container}>
        <Heading>Filters</Heading>
        <hr className={styles.line} />
        <div className={styles.selectors}>
          <div className={styles.filter}>
            <Heading size="h3">Strength</Heading>
            <div className={styles.selector}>
              <Selector
                low="0%"
                high="20%"
                max={20}
                value={strengthLocal}
                setValue={setStrengthLocal}
              />
            </div>
          </div>
          <div className={styles.filter}>
            <Heading size="h3">Bitterness</Heading>
            <div className={styles.selector}>
              <Selector
                high="Bitter"
                max={5}
                isDisplayValue={false}
                value={bitternessLocal}
                setValue={setBitternessLocal}
              />
            </div>
          </div>
          <div className={styles.filter}>
            <Heading size="h3">Colour</Heading>
            <div className={styles.selector}>
              <Selector
                low="Light"
                high="Dark"
                step={10}
                isDisplayValue={false}
                value={colourLocal}
                setValue={setColourLocal}
              />
            </div>
          </div>
        </div>
      </div>
      <FilterTab position="center" handleClick={handleApplyFilters}>
        Apply Filters
      </FilterTab>
      <Tab handleClick={handleExit} position="left">X</Tab>
    </>
  );
}

export default Filters;
