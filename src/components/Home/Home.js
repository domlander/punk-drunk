import React, { useState, useEffect } from 'react';
import Filters from '../Filters'
import Beers from '../Beers';
import useIntersect from '../../hooks/useIntersect'
import filters from '../../filterData'
import * as utils from "../../utils";
// import styles from './Home.module.scss';

const baseUrl = "https://api.punkapi.com/v2/beers";
let timesReachedEndOfPage = 1;

const Home = () => {
  // Remember the user's previous filters
  const defaultStrengthLowFilter = parseInt(localStorage.getItem("strength_low")) || filters.strength.min
  const defaultStrengthHighFilter = parseInt(localStorage.getItem("strength_high")) || filters.strength.max
  const defaultBitternessLowFilter = parseInt(localStorage.getItem("bitterness_low")) || filters.bitterness.min
  const defaultBitternessHighFilter = parseInt(localStorage.getItem("bitterness_high")) || filters.bitterness.max
  const defaultColourLowFilter = parseInt(localStorage.getItem("colour_low")) || filters.colour.min
  const defaultColourHighFilter = parseInt(localStorage.getItem("colour_high")) || filters.colour.max

  const [strength, setStrength] = React.useState([defaultStrengthLowFilter, defaultStrengthHighFilter]);
  const [bitterness, setBitterness] = React.useState([defaultBitternessLowFilter, defaultBitternessHighFilter]);
  const [colour, setColour] = React.useState([defaultColourLowFilter, defaultColourHighFilter]);

  const [showFilters, setShowFilters] = useState(false);
  const [beers, setBeers] = useState([]);
  const [page, setPage] = useState(1);
  const [ref, entry] = useIntersect({});
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    if (!isVisible) return;
    timesReachedEndOfPage++
    setPage(timesReachedEndOfPage);
  }, [isVisible])

  useEffect(() => {
    // Collect the filters that we need for the api call
    let apiFilters = []
    strength[0] !== filters.strength.min && apiFilters.push(`abv_gt=${strength[0]}`)
    strength[1] !== filters.strength.max && apiFilters.push(`abv_lt=${strength[1]}`)
    bitterness[0] !== filters.bitterness.min && apiFilters.push(`ibu_gt=${utils.bitternessConverter[bitterness[0]]}`)
    bitterness[1] !== filters.bitterness.max && apiFilters.push(`ibu_lt=${utils.bitternessConverter[bitterness[1]]}`)
    colour[0] !== filters.colour.min && apiFilters.push(`ebc_gt=${colour[0]}`)
    colour[1] !== filters.colour.max && apiFilters.push(`ebc_lt=${colour[1]}`)

    // Build the api url from the filters
    let url = baseUrl
    if (apiFilters.length !== 0) {
      url = url + `?${apiFilters.shift()}`
      apiFilters.map(filter => url = url + `&${filter}`)
    }

    if (page > 1) {
      const delimiter = url === baseUrl ? '?' : "&"
      url = `${url}${delimiter}page=${page}`
    }

    fetch(url)
      .then(res => res.json())
      .then(res => console.log('res', res) || res)
      .then(data => setBeers(page > 1 ? prevState => ([...prevState, ...data]) : data));

  }, [strength, bitterness, colour, page])

  const handleFiltersClick = () => {
    setShowFilters(true);
  }

  return (
    showFilters
      ? (
        <Filters
          setShowFilters={setShowFilters}
          strength={strength}
          setStrength={setStrength}
          bitterness={bitterness}
          setBitterness={setBitterness}
          colour={colour}
          setColour={setColour}
          setPage={setPage}
        />
      ) : (
        <>
          <Beers
            ref={ref}
            beers={beers}
            handleFiltersClick={handleFiltersClick}
          />
        </>
      )
  )
}

export default Home;
