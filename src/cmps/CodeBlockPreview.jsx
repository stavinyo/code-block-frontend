import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

import 'highlight.js/styles/agate.css'
import { codeBlockService } from '../services/code-block.service'

hljs.registerLanguage('javascript', javascript)

export function CodeBlockPreview() {
    const { codeBlockId } = useParams()
    const location = useLocation()
    const { codeBlocks } = location.state || {}

    const selectedCodeBlock = codeBlocks && codeBlocks.find((codeBlock) => codeBlock._id === codeBlockId)

    const preRef = useRef(null);
    console.log('preRef', preRef)
    const [codeContent, setCodeContent] = useState(selectedCodeBlock ? selectedCodeBlock.codeContent : '')

    useEffect(() => {
        if (preRef.current) {
            hljs.highlightBlock(preRef.current)
        }
    }, [codeContent])

    function handleContentChange(ev) {
        const updatedContent = ev.target.innerText
        onUpdateContent(updatedContent)
        console.log('codeBlocks4', codeBlocks)
    }

    async function onUpdateContent(newCodeContent) {
        console.log('codeBlocks1', codeBlocks)
        if (selectedCodeBlock) {
            const updatedCodeBlock = {
                ...selectedCodeBlock,
                codeContent: newCodeContent,
            }
            console.log('codeBlocks2', codeBlocks)

            setCodeContent(newCodeContent)
            console.log('codeBlocks3', codeBlocks)
            try {
                const savedCodeBlock = await codeBlockService.save(updatedCodeBlock)
                console.log('codeBlocks5', codeBlocks)
                console.log('Code block saved successfully', savedCodeBlock)
            } catch (error) {
                console.error('Error saving code block', error)
            }
        }
    }



    if (!selectedCodeBlock) {
        return <div>Code block not found</div>;
    }

    return (
        <section className="code-block-preview">
            <div key={selectedCodeBlock._id} className="code-text-preview">
                <h1>{selectedCodeBlock.title}</h1>
                <div className="code-content">
                    <pre
                        ref={preRef}
                        contentEditable={true}
                        onInput={handleContentChange}
                        suppressContentEditableWarning={true}
                    >
                        <code className="language-javascript">{codeContent}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}
