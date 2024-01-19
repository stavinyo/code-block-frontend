import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import io from 'socket.io-client';

import 'highlight.js/styles/agate.css'
import { codeBlockService } from '../services/code-block.service'

hljs.registerLanguage('javascript', javascript)

const socket = io('http://localhost:5173', { withCredentials: true });


export function CodeBlockPreview() {
    const { codeBlockId } = useParams()
    const location = useLocation()
    const { codeBlocks } = location.state || {}


    const selectedCodeBlock = Array.isArray(codeBlocks) && codeBlocks.find((codeBlock) => codeBlock._id === codeBlockId);

    const preRef = useRef(null);
    const [codeContent, setCodeContent] = useState(selectedCodeBlock ? selectedCodeBlock.codeContent : '')

    useEffect(() => {
        if (preRef.current) {
            hljs.highlightBlock(preRef.current)
        }
    }, [codeContent])

    useEffect(() => {
        const handleCodeBlockUpdate = (updatedCodeBlock) => {
            console.log('Received codeBlockUpdated event:', updatedCodeBlock)
            console.log(`Code block updated: ${updatedCodeBlock._id}`)
            setCodeContent(updatedCodeBlock.codeContent)
        }
        socket.on('codeBlockUpdated', handleCodeBlockUpdate)
        return () => {
            socket.off('codeBlockUpdated', handleCodeBlockUpdate)
        }
    }, [codeBlockId])


    function handleContentChange(ev) {
        const updatedContent = ev.target.innerText
        onUpdateContent(updatedContent)
    }

    async function onUpdateContent(newCodeContent) {

        if (selectedCodeBlock) {
            const updatedCodeBlock = {
                ...selectedCodeBlock,
                codeContent: newCodeContent,
            }

            setCodeContent(newCodeContent)
            try {
                const savedCodeBlock = await codeBlockService.save(updatedCodeBlock)
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
    )
}
