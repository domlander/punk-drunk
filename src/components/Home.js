import React, { useState, useEffect } from 'react';
import Filters from './Filters'
import Beers from './Beers';
import useIntersect from '../hooks/useIntersect'
import * as utils from "../utils";
// import styles from './Home.module.scss';

export const baseUrl = "https://api.punkapi.com/v2/beers";

// const isBottomOfPage = () => window.innerHeight + document.documentElement.scrollTop + (window.innerHeight / 2) > document.documentElement.offsetHeight;

let timesReachedEndOfPage = 1;

const Home = () => {
  const defaultStrengthLowFilter = parseInt(localStorage.getItem("strength_low")) || utils.filterLimits["weakestPossibleStrength"];
  const defaultStrengthHighFilter = parseInt(localStorage.getItem("strength_high")) || utils.filterLimits["strongestPossibleStrength"];
  const defaultBitternessLowFilter = parseInt(localStorage.getItem("bitterness_low")) || utils.filterLimits["lowestPossibleBitterness"];
  const defaultBitternessHighFilter = parseInt(localStorage.getItem("bitterness_high")) || utils.filterLimits["highestPossibleBitterness"];
  const defaultColourLowFilter = parseInt(localStorage.getItem("colour_low")) || utils.filterLimits["palestPossibleColour"];
  const defaultColourHighFilter = parseInt(localStorage.getItem("colour_high")) || utils.filterLimits["darkestPossibleColour"];

  const [strength, setStrength] = React.useState([defaultStrengthLowFilter, defaultStrengthHighFilter]);
  const [bitterness, setBitterness] = React.useState([defaultBitternessLowFilter, defaultBitternessHighFilter]);
  const [colour, setColour] = React.useState([defaultColourLowFilter, defaultColourHighFilter]);

  const [showFilters, setShowFilters] = useState(false);
  const [beers, setBeers] = useState([]);
  const [page, setPage] = useState(1);
  const [ref, entry] = useIntersect({});
  // const [endOfPageReached, setEndOfPageReached] = useState(false);
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    // console.log(" - - - - - endOfPageReached", isVisible)
    // setEndOfPageReached(isVisible);
    if (!isVisible) return;
    timesReachedEndOfPage++
    setPage(timesReachedEndOfPage);
  }, [isVisible])

  useEffect(() => {
    // Collect the filters that we need for the api call
    let apiFilters = []
    strength[0] !== utils.filterLimits["weakestPossibleStrength"] && apiFilters.push(`abv_gt=${strength[0]}`)
    strength[1] !== utils.filterLimits["strongestPossibleStrength"] && apiFilters.push(`abv_lt=${strength[1]}`)
    bitterness[0] !== utils.filterLimits["lowestPossibleBitterness"] && apiFilters.push(`ibu_gt=${utils.bitternessConverter[bitterness[0]]}`)
    bitterness[1] !== utils.filterLimits["highestPossibleBitterness"] && apiFilters.push(`ibu_lt=${utils.bitternessConverter[bitterness[1]]}`)
    colour[0] !== utils.filterLimits["palestPossibleColour"] && apiFilters.push(`ebc_gt=${colour[0]}`)
    colour[1] !== utils.filterLimits["darkestPossibleColour"] && apiFilters.push(`ebc_lt=${colour[1]}`)

    // Build the api url from the filters
    let url = baseUrl
    if (apiFilters.length !== 0) {
      url = url + `?${apiFilters.shift()}`
      apiFilters.map(filter => url = url + `&${filter}`)
    }

    console.log('dependencies:', strength, bitterness, colour, page)

    if (page > 1) {
      const delimiter = url === baseUrl ? '?' : "&"
      url = `${url}${delimiter}page=${page}`
    }

    console.log('url:', url)

    fetch(url)
      .then(res => res.json())
      .then(res => console.log('res', res) || res)
      .then(data => setBeers(page === 1 ? data : prevState => ([...prevState, ...data])));

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
          <button onClick={() => setPage(page + 1)}>More</button>
        </>
      )
  )
}

export default Home;
