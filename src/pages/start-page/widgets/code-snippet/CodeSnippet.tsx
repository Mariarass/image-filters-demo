import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import copyIcon from '../../../../assets/image/copy-icon-1700x2048-cphbgd2b.png';
import s from './CodeSnippet.module.css';

type CodeSnippetProps = {
    code: string;
};

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code }) => {
    const [copyStatus, setCopyStatus] = useState<'Copy' | 'Copied!'>('Copy');
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopyStatus('Copied!');

        setTimeout(() => {
            setCopyStatus('Copy');
        }, 1500);
    };

    return (
        <div className={s.container}>
            <div
                className={s.copy_container}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <img
                    src={copyIcon}
                    className={s.copy}
                    onClick={handleCopy}
                />
                {showTooltip && <span className={s.tooltip}>{copyStatus}</span>}
            </div>

            <SyntaxHighlighter language="jsx">
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeSnippet;
