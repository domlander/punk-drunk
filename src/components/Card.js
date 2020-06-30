import React from 'react'
import styles from './Card.module.scss'

const Card = ({ beer }) => {
  console.log(beer);
  return (
    <div className={styles.container}>
      <img className={styles.image} src={beer.image_url} alt="beer"></img>
      <div className={styles.info}>
        <div>
          <h4 className={styles.name}>{beer.name}</h4>
          <p className={styles.tagline}>{beer.tagline}</p>
        </div>
        <p className={styles.abv}>
          ABV: <span className="abvValue">{beer.abv}</span>%
          </p>
      </div>
    </div>
  )
}

export default Card;