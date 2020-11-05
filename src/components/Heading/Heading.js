import React from 'react';
import styles from './Heading.module.scss';

const Heading = ({ size = "h1", children }) => {
  const Tag = `${size}`;

  return (
    <Tag className={styles.heading}>{children}</Tag>
  );
}

export default Heading;
