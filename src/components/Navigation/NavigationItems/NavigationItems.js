import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';

const navigationItems =() => (

    <ul className={classes.NavigationItems}>
        <li className={classes.Items}><NavLink to="/orders" >Orders</NavLink></li>
        <li className={classes.Items}><NavLink to="/" >Burger Builder</NavLink></li>
        </ul>
);

export default navigationItems;