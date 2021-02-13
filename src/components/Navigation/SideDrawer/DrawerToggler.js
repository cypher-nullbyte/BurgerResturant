import React from "react";
import classes from './DrawerToggler.module.css'
const DrawerToggler=(props)=>(
    <div className={classes.DrawerToggler} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
export default DrawerToggler;