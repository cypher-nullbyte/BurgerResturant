import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const NavigationItems=()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
        <NavigationItem link="/" active={false}>Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;