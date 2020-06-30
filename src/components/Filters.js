import React, { useState } from 'react';
import FilterTab from './FilterTab';
import Heading from './Heading';
import Selector from './Selector';

import styles from './Filters.module.scss';

const Filters = ({ setShowFilters }) => {
  const [abvLow, setAbvLow] = useState(0);
  const [abvHigh, setAbvHigh] = useState([]);
  const [bitternessLow, setBitternessLow] = useState(0);
  const [bitternessHigh, setBitternessHigh] = useState([]);
  const [colourLow, setColourLow] = useState(0);
  const [colourHigh, setColourHigh] = useState([]);

  return (
    <>
      <div className={styles.container}>
        <Heading>Filters</Heading>
        <hr className={styles.line} />
        <div className={styles.filter}>
          <Heading size="h3">Strength</Heading>
          <Selector low="0%" high="20%"></Selector>
        </div>
        <div className={styles.filter}>
          <Heading size="h3">Bitterness</Heading>
          <Selector low="0%" high="20%"></Selector>
        </div>
        <div className={styles.filter}>
          <Heading size="h3">Colour</Heading>
          <Selector low="0%" high="20%"></Selector>
        </div>
      </div>
      <FilterTab center={true} setShowFilters={setShowFilters} isFiltersActive={true}>
        Apply Filters
      </FilterTab>
    </>
  );
}

export default Filters;
