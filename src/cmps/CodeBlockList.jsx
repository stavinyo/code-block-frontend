import React from 'react';
import { useNavigate } from 'react-router-dom'

export function CodeBlockList({ codeBlocks, setCodeBlocks }) {
    const navigate = useNavigate()

    function onGetDetails(codeBlockId) {
        navigate(`/codeBlockPreview/${codeBlockId}`, {
            state: { codeBlocks, setCodeBlocks }
        })
    }

    return (
        <section className="code-block-list">
            {codeBlocks.map((codeBlock) => (
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
