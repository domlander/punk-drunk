import React from 'react';
import classnames from 'classnames'
import styles from './FilterTab.module.scss';

const FilterTab = ({
  handleClick,
  position,
  children,
}) => {
  const classNames = classnames(styles.filters, {
    [styles.left]: position === "left",
    [styles.center]: position === "center",
    [styles.right]: position === "right",
  });

  return (
    <div
      onClick={handleClick}
      className={classNames}
    >
      {children}
    </div>
  );
}

export default FilterTab;
