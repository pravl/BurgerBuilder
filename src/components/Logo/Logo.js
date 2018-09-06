import React from 'react';

import burgerLogo from '../../assets/images/132 burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Toolbar}>
        <img src={burgerLogo} alt="My Burger"/>
    </div>
);

export default logo;
