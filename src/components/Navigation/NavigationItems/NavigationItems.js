import React from 'react';

import classes from './NavigationItems.css';

const navigationItems =() => (

    <ul className={classes.NavigationItems}>
        <li className={classes.Items}><a href="/" >CheckOut</a></li>
        <li className={classes.Items}><a href="/" >Burger</a></li>
        </ul>
);

export default navigationItems;