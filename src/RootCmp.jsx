import React from 'react'
import { Routes, Route } from 'react-router'
import { LobbyPage } from "./LobbyPage.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { CodeBlockPreview } from './cmps/CodeBlockPreview.jsx'

export function RootCmp() {
    return <div>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<LobbyPage />} />
                <Route path="/codeBlockPreview/:codeBlockId" element={<CodeBlockPreview />} />
            </Routes>
        </section>
    </div>
}
