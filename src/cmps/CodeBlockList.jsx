import React from 'react'
import { useNavigate } from 'react-router-dom'

export function CodeBlockList({ codeBlocks }) {
    const navigate = useNavigate()

    function onGetDetails(codeBlockId) {
        navigate(`/codeBlockPreview/${codeBlockId}`, {
            state: { codeBlocks },
        });
    }

    return (
        <section className="code-block-list">
            {Array.isArray(codeBlocks) &&
                codeBlocks.map((codeBlock) => (
                    <div
                        className='btn-code-block'
                        key={codeBlock._id}
                        onClick={() => onGetDetails(codeBlock._id)}>
                        <h1>{codeBlock.title}</h1>
                    </div>
                ))}
        </section>
    );
}
