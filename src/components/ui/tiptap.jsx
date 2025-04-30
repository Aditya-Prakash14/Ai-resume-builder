'use client'

import { useCallback, useMemo, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import debounce from 'lodash/debounce'
import Bold from '@tiptap/extension-bold'
import History from '@tiptap/extension-history'
import { memo } from 'react'
import { cn } from '@/lib/utils'

;
  };
}

const Tiptap = memo(
  ({ content, onChange, className, readOnly, variant = 'default', editorProps=> {
    // Transform content to HTML before loading
    const transformContent = useCallback((content) => {
      return content.replace(/\*\*(.*?)\*\*/g, '$1');
    }, []);

    // Debounce the onChange callback
    const debouncedOnChange = useMemo(
      () => debounce((text) => {
        onChange(text);
      }, 300),
      [onChange]
    );

    // Memoize editor configuration
    const extensions = useMemo(
      () => [Document, Text, Paragraph, Bold, History],
      []
    );

    const editorProps = useMemo(
      () => ({
        attributes: {
          class: cn(
            "prose w-full rounded-lg border border-input bg-white/50 text-xs md:text-sm ring-offset-background",
            "placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Apply different styles based on variant
            variant === 'default' && "min-h-[80px] px-3 py-2",
            variant === 'skill' && "px-3",
            className
          ),
          ...customEditorProps?.attributes
        },
      }),
      [className, customEditorProps?.attributes, variant]
    );

    const editor = useEditor({
      extensions,
      content,
      editable: !readOnly,
      onUpdate) => {
        const html = editor.getHTML();
        // Convert  tags back to asterisks
        const textWithAsterisks = html
          .replace(/(.*?)/g, '**$1**')
          .replace(//g, '')
          .replace(//g, '')
          .trim();
        debouncedOnChange(textWithAsterisks);
      },
      immediatelyRender);

    // Sync editor content when content prop changes
    useEffect(() => {
      if (editor && content !== editor.getHTML().replace(//g, '').replace(//g, '').trim()) {
        editor.commands.setContent(transformContent(content));
      }
    }, [content, editor, transformContent]);

    return ;
  },
  (prevProps, nextProps) => {
    // Update memo comparison to include content changes
    return (
      prevProps.className === nextProps.className &&
      prevProps.readOnly === nextProps.readOnly &&
      prevProps.content === nextProps.content &&
      prevProps.variant === nextProps.variant
    );
  }
);

// Add display name for debugging
Tiptap.displayName = 'Tiptap';

export default Tiptap;
