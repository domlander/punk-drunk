import React from 'react';
import Card from './Card'
// import Chip from './Chip'
import Heading from './Heading'
import FilterTab from './FilterTab'

import styles from './Beers.module.scss';

const Beers = React.forwardRef(({ beers, activeFilters, handleFiltersClick }, ref) => {
  return (
    <>
      <div className={styles.container}>
        <Heading>Beer</Heading>
        <div className={styles.caption}>
          {beers.length}<span className={styles.captionCopy}> BEERS FOUND</span>
        </div>
        {/* <div className={styles.chips}>
          {activeFilters.map(filter => <Chip>{filter}</Chip>)}
        </div> */}
        <div className={styles.beers}>
          {
            beers.map((beer, i) => beers.length === i + 1
              ? <Card key={beer.id} beer={beer} />
              : <span key={beer.id} ref={ref}><Card beer={beer} /></span>)
          }
        </div>
      </div>
      <FilterTab position="right" handleClick={handleFiltersClick}>
        Filters
    </FilterTab>
    </>
  )
}
)

export default Beers;
