import React from 'react'
import styles from './Chip.module.scss'

const Chip = ({ children }) => {
  return (
    <div className={styles.chip}>
      {/* <span onClick={() => closeChip} className={styles.close}>X</span> */}
      {children}
    </div>
  )
}

export default Chip;