import React, { useState } from 'react';
import Tab from '../Tab';
import Heading from '../Heading';
import Selector from '../Selector';
import filters from '../../filterData'

import styles from './Filters.module.scss';

const Filters = ({ setShowFilters, strength, setStrength, bitterness, setBitterness, colour, setColour, setPage }) => {
  const [strengthLocal, setStrengthLocal] = useState(strength);
  const [bitternessLocal, setBitternessLocal] = useState(bitterness);
  const [colourLocal, setColourLocal] = useState(colour);

  const handleExitFilters = () => {
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
    setPage(1);

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
                low={filters.strength.lowDescriptor}
                high={filters.strength.highDescriptor}
                max={filters.strength.max}
                step={filters.strength.step}
                isDisplayValue={filters.strength.displayValueInSlider}
                value={strengthLocal}
                setValue={setStrengthLocal}
              />
            </div>
          </div>
          <div className={styles.filter}>
            <Heading size="h3">Bitterness</Heading>
            <div className={styles.selector}>
              <Selector
                low={filters.bitterness.lowDescriptor}
                high={filters.bitterness.highDescriptor}
                max={filters.bitterness.max}
                step={filters.bitterness.step}
                isDisplayValue={filters.bitterness.displayValueInSlider}
                value={bitternessLocal}
                setValue={setBitternessLocal}
              />
            </div>
          </div>
          <div className={styles.filter}>
            <Heading size="h3">Colour</Heading>
            <div className={styles.selector}>
              <Selector
                low={filters.colour.lowDescriptor}
                high={filters.colour.highDescriptor}
                max={filters.colour.max}
                step={filters.colour.step}
                isDisplayValue={filters.colour.displayValueInSlider}
                value={colourLocal}
                setValue={setColourLocal}
              />
            </div>
          </div>
        </div>
      </div>
      <Tab position="center" handleClick={handleApplyFilters}>Apply Filters</Tab>
      <Tab handleClick={handleExitFilters} position="left" secondaryStyle>X</Tab>
    </>
  );
}

export default Filters;
