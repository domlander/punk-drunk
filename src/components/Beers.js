import React, { useState, useEffect } from 'react';
import Card from './Card'
import Heading from './Heading'
import Filters from './Filters'
import FilterTab from './FilterTab'

import styles from './Beers.module.scss';

const Beers = () => {
  const [beers, setBeers] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then(res => res.json())
      .then(data => setBeers(data));
  }, [])

  return (
    showFilters
      ? <Filters setShowFilters={setShowFilters} />
      : (
        <>
          <div className={styles.container}>
            <Heading>Beer</Heading>
            <div className={styles.caption}>
              {beers.length}<span className={styles.captionCopy}> BEERS FOUND</span>
            </div>
            <div className={styles.beers}>
              {beers.slice(0, 5).map(beer => <Card key={beer.id} beer={beer} />)}
            </div>
          </div>
          <FilterTab setShowFilters={setShowFilters} isFiltersActive={false}>
            Filters
          </FilterTab>
        </>
      )
  )
}

export default Beers;
