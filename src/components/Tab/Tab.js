import React from 'react';
import classnames from 'classnames'
import styles from './Tab.module.scss';

const Tab = ({
  children,
  handleClick,
  position,
  secondaryStyle = false
}) => {
  const classNames = classnames(styles.filters, {
    [styles.left]: position === "left",
    [styles.center]: position === "center",
    [styles.right]: position === "right",
    [styles.secondary]: secondaryStyle,
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
