import React, { FC } from 'react';
import 'github-markdown-css';
import MarkdownToJSX from 'markdown-to-jsx';

interface IMarkdownProps {
  content: string;
}

const Markdown: FC<IMarkdownProps> = ({ content }) => {
  return (
    <div className="markdown-body">
      <MarkdownToJSX>{content}</MarkdownToJSX>
    </div>
  );
};

export default Markdown;
