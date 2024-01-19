import React, { useEffect, useState } from 'react'
import { CodeBlockList } from "./cmps/CodeBlockList"
import { codeBlockService } from "./services/code-block.service"

export function LobbyPage() {
    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        loadCodeBlocks()
    }, [])

    async function loadCodeBlocks() {
        try {
            const blocks = await codeBlockService.query()
            setCodeBlocks(blocks)
        } catch (err) {
            console.log('Cannot load code blocks', err)
        }
    }

    return (
        <div className='main-container'>
            <h1 className='lobby-title'>Choose code block</h1>
            <main className='lobby-main'>
                <CodeBlockList codeBlocks={codeBlocks} />
            </main>
        </div>
    )
}
