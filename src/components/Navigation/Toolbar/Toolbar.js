import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationnItems";
import DrawerToggler from "../SideDrawer/DrawerToggler";
import classes from './Toolbar.module.css';

const ToolBar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);
export default ToolBar;