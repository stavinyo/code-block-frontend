import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

export function CodeBlockPreview() {
    const { codeBlockId } = useParams()
    const location = useLocation()
    const { codeBlocks } = location.state || {}

    // console.log('codeBlockId:', codeBlockId);
    // console.log('codeBlocks:', codeBlocks);

    const selectedCodeBlock = codeBlocks && codeBlocks.find(codeBlock => codeBlock._id === codeBlockId)

    if (!selectedCodeBlock) {
        return <div>Code block not found</div>
    }

    return (
        <section className="code-block-preview">
            <div key={selectedCodeBlock._id} className='code-text-preview'>
                <h1>{selectedCodeBlock.title}</h1>
                <div className="code-content">
                    <pre>
                        <code>{selectedCodeBlock.codeContent}</code>
                    </pre>
                </div>
            </div>
        </section>
    )
}
