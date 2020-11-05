import React from 'react';
import Card from '../Card'
import Heading from '../Heading'
import Tab from '../Tab'

import styles from './Beers.module.scss';

const Beers = React.forwardRef(({ beers, handleFiltersClick }, ref) => (
  <>
    <div className={styles.container}>
      <Heading>Beer</Heading>
      <div className={styles.caption}>
        {beers.length}<span className={styles.captionCopy}> BEERS FOUND</span>
      </div>
      <div className={styles.beers}>
        {
          beers.map((beer, i) => beers.length === i + 1
            ? <Card key={beer.id} beer={beer} />
            : <span key={beer.id} ref={ref}><Card beer={beer} /></span>)
        }
      </div>
    </div>
    <Tab position="right" handleClick={handleFiltersClick}>
      Filters
    </Tab>
  </>
))

export default Beers;
