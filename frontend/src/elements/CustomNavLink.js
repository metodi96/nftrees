import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

function CustomNavLink({ content, path, classes }) {
    return (
        <NavLink
            to={path}
            exact
            activeClassName='nav-link-active'
            className={classes}
            >{content}</NavLink>
    )
}

export default CustomNavLink