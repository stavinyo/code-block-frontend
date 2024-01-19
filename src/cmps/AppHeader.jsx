import React from 'react';
import { Link } from 'react-router-dom'

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h1>&#123; Code Blocks &#125;</h1>
        </Link>
    </header>
}
