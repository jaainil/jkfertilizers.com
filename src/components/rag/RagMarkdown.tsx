import React from 'react';
import { Link } from 'react-router-dom';

interface RagMarkdownProps {
  content: string;
  className?: string;
}

/**
 * High-performance Markdown renderer for J K Fertilizers RAG responses
 * Renders verified [[N]](/url) citations as interactive pill badges
 */
export const RagMarkdown: React.FC<RagMarkdownProps> = ({ content, className = '' }) => {
  // Parse citation badges: [[1]](/products/prom)
  const renderFormattedText = (text: string) => {
    // Regex for citations [[N]](url)
    const citationRegex = /\[\[(\d+)\]\]\(([^)]+)\)/g;

    const elements: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = citationRegex.exec(text)) !== null) {
      const preceding = text.slice(lastIdx, match.index);
      if (preceding) {
        elements.push(parseInlineFormatting(preceding, `text-${lastIdx}`));
      }

      const citationNum = match[1];
      const citationUrl = match[2];

      const isExternal = citationUrl.startsWith('http');

      if (isExternal) {
        elements.push(
          <a
            key={`cite-${match.index}`}
            href={citationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 text-[10px] font-bold font-mono text-[#163D26] bg-[#E8F3EB] border border-[#2D7A4A]/30 rounded hover:bg-[#2D7A4A] hover:text-white transition-colors duration-150 align-super"
            title={`Source [${citationNum}]: ${citationUrl}`}
          >
            {citationNum}
          </a>
        );
      } else {
        elements.push(
          <Link
            key={`cite-${match.index}`}
            to={citationUrl}
            className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 text-[10px] font-bold font-mono text-[#163D26] bg-[#E8F3EB] border border-[#2D7A4A]/30 rounded hover:bg-[#2D7A4A] hover:text-white transition-colors duration-150 align-super cursor-pointer"
            title={`Source [${citationNum}]: ${citationUrl}`}
          >
            {citationNum}
          </Link>
        );
      }

      lastIdx = match.index + match[0].length;
    }

    const trailing = text.slice(lastIdx);
    if (trailing) {
      elements.push(parseInlineFormatting(trailing, `text-${lastIdx}`));
    }

    return elements;
  };

  const parseInlineFormatting = (str: string, keyPrefix: string): React.ReactNode => {
    // Split by bold (**text**)
    const boldParts = str.split(/(\*\*[^*]+\*\*)/g);

    return boldParts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic (*text*)
      const italicParts = part.split(/(\*[^*]+\*)/g);
      return italicParts.map((sub, j) => {
        if (sub.startsWith('*') && sub.endsWith('*')) {
          return <em key={`${keyPrefix}-i-${i}-${j}`}>{sub.slice(1, -1)}</em>;
        }
        return sub;
      });
    });
  };

  // Split content into blocks: paragraphs, lists, headers
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      blocks.push(
        <ul key={`list-${key}`} className="my-2.5 space-y-1.5 pl-1">
          {currentList.map((item, idx) => (
            <li key={`item-${idx}`} className="flex items-start text-sm leading-relaxed text-foreground/90">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2D7A4A] mt-2 mr-2 shrink-0" />
              <span>{renderFormattedText(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.replace(/^[-•*]\s*/, ''));
      return;
    }

    flushList(idx);

    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h4 key={`h4-${idx}`} className="font-heading font-semibold text-sm sm:text-base text-foreground mt-3 mb-1 text-emerald-950">
          {renderFormattedText(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      blocks.push(
        <h3 key={`h3-${idx}`} className="font-heading font-bold text-base sm:text-lg text-emerald-950 mt-4 mb-1.5">
          {renderFormattedText(trimmed.slice(3))}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      blocks.push(
        <h2 key={`h2-${idx}`} className="font-heading font-extrabold text-lg sm:text-xl text-emerald-950 mt-4 mb-2">
          {renderFormattedText(trimmed.slice(2))}
        </h2>
      );
    } else {
      blocks.push(
        <p key={`p-${idx}`} className="text-sm leading-relaxed text-foreground/90 my-1.5">
          {renderFormattedText(trimmed)}
        </p>
      );
    }
  });

  flushList(lines.length);

  return <div className={`rag-markdown space-y-1 ${className}`}>{blocks}</div>;
};
