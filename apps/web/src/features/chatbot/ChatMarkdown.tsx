import { memo, useEffect, useRef, useState } from 'react';
import { Copy } from '../../components/Icons';

interface ChatMarkdownProps {
  content: string;
  isUser?: boolean;
}

/**
 * Safely parse inline formatting: **bold**, `inline code`, and plain text
 */
function renderInline(text: string, isUser = false) {
  // Regex to match **bold** or `code`
  const regex = /(\[[^\]]+\]\(https:\/\/[^\s)]+\)|\*\*.*?\*\*|`[^`]+?`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^\s)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">{link[1]}</a>;
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={index}
          className={isUser ? 'font-bold text-white' : 'font-bold htsv-chat-tag'}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className={`mx-0.5 rounded px-1.5 py-0.5 font-mono text-[11px] ${
            isUser
              ? 'bg-white/20 text-white'
              : 'htsv-chat-inline-code'
          }`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * Code Block component with 1-click Copy button like ChatGPT/Gemini
 */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  const handleCopy = () => {
    if (!navigator.clipboard) return;
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => { setCopied(false); });
  };

  return (
    <div className="htsv-chat-code my-2.5 overflow-hidden rounded-xl">
      <div className="htsv-chat-code-header flex items-center justify-between gap-2 px-3 py-1.5 text-[10px]">
        <span className="font-mono uppercase font-semibold">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="htsv-chat-code-copy flex items-center gap-1 rounded px-2 py-0.5"
        >
          <Copy className="h-3 w-3" />
          <span>{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Enhanced lightweight markdown parser for chat messages (Gemini/ChatGPT style)
 */
export const ChatMarkdown = memo(function ChatMarkdown({ content, isUser = false }: ChatMarkdownProps) {
  if (isUser) {
    return <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{content}</div>;
  }

  // Split into code blocks and normal text blocks
  // Code blocks are denoted by ```[lang]\n[code]```
  const tokens: Array<{ type: 'code'; code: string; language: string } | { type: 'text'; content: string }> = [];

  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }
    tokens.push({
      type: 'code',
      language: match[1] || 'plaintext',
      code: match[2].trimEnd(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    tokens.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {tokens.map((token, tokenIdx) => {
        if (token.type === 'code') {
          return <CodeBlock key={tokenIdx} code={token.code} language={token.language} />;
        }

        // Render normal text blocks
        const paragraphs = token.content.split(/\n{2,}/);

        return (
          <div key={tokenIdx} className="space-y-2">
            {paragraphs.map((para, paraIdx) => {
              const lines = para.trim().split('\n');

              // Check if paragraph is a heading
              if (lines.length === 1 && lines[0].startsWith('### ')) {
                return (
                  <h4 key={paraIdx} className="mt-2 text-xs font-bold htsv-chat-title sm:text-sm">
                    {renderInline(lines[0].slice(4))}
                  </h4>
                );
              }
              if (lines.length === 1 && lines[0].startsWith('## ')) {
                return (
                  <h3 key={paraIdx} className="mt-2.5 text-sm font-bold htsv-chat-title">
                    {renderInline(lines[0].slice(3))}
                  </h3>
                );
              }
              if (lines.length === 1 && lines[0].startsWith('# ')) {
                return (
                  <h2 key={paraIdx} className="mt-3 text-sm font-extrabold htsv-chat-title sm:text-base">
                    {renderInline(lines[0].slice(2))}
                  </h2>
                );
              }

              // Check if paragraph is list items
              const isList = lines.some((line) => /^(\* |- |\d+\. )/.test(line.trim()));

              if (isList) {
                return (
                  <ul key={paraIdx} className="my-1.5 space-y-1 pl-1">
                    {lines.map((line, lineIdx) => {
                      const trimmed = line.trim();
                      const bulletMatch = trimmed.match(/^(\* |- )/);
                      const numberMatch = trimmed.match(/^(\d+\. )/);

                      if (bulletMatch) {
                        return (
                          <li key={lineIdx} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                            <span className="flex-1">{renderInline(trimmed.slice(bulletMatch[0].length))}</span>
                          </li>
                        );
                      }

                      if (numberMatch) {
                        return (
                          <li key={lineIdx} className="flex items-start gap-1.5">
                            <span className="font-semibold htsv-chat-tag shrink-0">
                              {numberMatch[0]}
                            </span>
                            <span className="flex-1">{renderInline(trimmed.slice(numberMatch[0].length))}</span>
                          </li>
                        );
                      }

                      return (
                        <div key={lineIdx} className="pl-3.5">
                          {renderInline(trimmed)}
                        </div>
                      );
                    })}
                  </ul>
                );
              }

              // Normal text lines
              return (
                <p key={paraIdx} className="leading-relaxed">
                  {lines.map((line, lineIdx) => (
                    <span key={lineIdx} className={lineIdx > 0 ? 'block mt-1' : 'block'}>
                      {renderInline(line)}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});
