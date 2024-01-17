import React from 'react';
// const { Link, NavLink } = ReactRouterDOM
import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h1>Code Blocks</h1>
        </Link>
        {/* <nav>
            <NavLink to="/">LobbyPage</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav> */}
    </header>
}
