import React from 'react';
import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.Loader}>
  <div className={classes.Circles}>
    <span className={classes.one}></span>
    <span className={classes.two}></span>
    <span className={classes.three}></span>
  </div>
  <div className={classes.Pacman}>
    <span className={classes.top}></span>
    <span className={classes.bottom}></span>
    <span className={classes.left}></span>
    <div className={classes.Eye}></div>
  </div>
</div>
);

export default spinner;