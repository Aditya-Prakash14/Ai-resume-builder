import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'


function parseMarkdownIntoBlocks(markdown){
  // First, normalize newlines to ensure consistent handling
  const normalizedMarkdown = markdown.replace(/\r\n/g, '\n');
  
  // Preserve double spaces at end of lines (markdown line breaks)
  const preservedSpaces = normalizedMarkdown.replace(/(\s\s)$/gm, '  \n');
  
  // Split the content by double newlines before parsing
  const sections = preservedSpaces.split(/\n\n+/);
  
  // Parse each section separately to maintain spacing
  const blocks= [];
  
  for (const section of sections) {
    if (!section.trim()) {
      continue; // Skip empty sections
    }
    
    const tokens = marked.lexer(section);
    let currentBlock = '';
    
    for (let i = 0; i  {
    return (
      
         {children},
            ol) => (
              
                {children}
              
            ),
            li) => (
              
                {children}
              
            ),
            // Handle line breaks explicitly
            br) => ,
            // Proper paragraph styling with spacing
            p) => {children},
            // Proper heading styles
            h1) => {children},
            h2) => {children},
            h3) => {children},
            h4) => {children},
            h5) => {children},
            h6) => {children},
            // Code block styling
            code) => {
              // If it's an inline code block
              if (inline) {
                return {children};
              }
              
              // For code blocks, we return a div wrapper instead of pre directly
              return (
                
                  {/*  */}
                    {children}
                  {/*  */}
                
              );
            },
            // Proper blockquote styling
            blockquote) => (
              {children}
            ),
          }}
        >
          {content}
        
      
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(
  ({ content, id }: { content; id) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      
    ));
  },
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';