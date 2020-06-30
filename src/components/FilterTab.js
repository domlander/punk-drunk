import React from 'react';
import classnames from 'classnames'
import styles from './FilterTab.module.scss';

const FilterTab = ({
  setShowFilters,
  isFiltersActive,
  center = false,
  children,
}) => {
  const classNames = classnames(styles.filters, {
    [styles.center]: !!center,
  });

  return (
    <div
      onClick={() => setShowFilters(!isFiltersActive)}
      className={classNames}
    >
      {children}
    </div>
  );
}

export default FilterTab;
