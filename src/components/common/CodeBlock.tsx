import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  showLineNumbers = true,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div
      className={`relative rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#F7F5F0] dark:bg-[#1C1B19] text-[#242424] dark:text-[#EAE6DF] overflow-hidden transition-colors ${className}`}
    >
      {/* Top micro-bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#E8E5DF] dark:border-[#2C2A26] bg-[#EFECE5]/60 dark:bg-[#242220] text-xs font-mono text-[#77736D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C96B45]/70" />
          <span className="text-[11px] font-medium tracking-wide uppercase">{language}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] hover:bg-[#E8E5DF] dark:hover:bg-[#2E2B27] text-[#77736D] hover:text-[#242424] dark:hover:text-[#FAF9F6] transition-colors"
          title="Copy code"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#287A52]" />
              <span className="text-[#287A52] font-sans font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents with comfortable spacing */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
        <pre className="font-mono text-[#242424] dark:text-[#F3F1EC]">
          {lines.map((line, idx) => (
            <div key={idx} className="table-row">
              {showLineNumbers && (
                <span className="table-cell pr-4 text-[#A8A49D] dark:text-[#55514B] select-none text-right w-6 text-xs">
                  {idx + 1}
                </span>
              )}
              <span className="table-cell whitespace-pre">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
