import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

function CustomNavLink({ content, path, classes, activeClassName }) {
    return (
        <NavLink
            to={path}
            exact
            activeClassName={activeClassName}
            className={classes}
            >{content}</NavLink>
    )
}

export default CustomNavLink