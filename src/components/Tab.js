import React from 'react';
import classnames from 'classnames'
import styles from './Tab.module.scss';

const Tab = ({
  handleClick,
  position,
  children,
}) => {
  const classNames = classnames(styles.tab, {
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

export default Tab;
