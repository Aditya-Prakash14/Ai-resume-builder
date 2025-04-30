'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { 
  Bold1,
  Heading2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'



function CoverLetterEditor({ 
  initialData, 
  onChange, 
  containerWidth,
  isPrintVersion = false 
}) {

  const editor = useEditor({
    immediatelyRender,
    extensions,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
    ],
    content: initialData?.content'Start writing your cover letter...',
    editorProps: {
      attributes: {
        class: 'prose prose-xxs focus:outline-none h-full overflow-none max-w-none text-black ',
      },
    },
    onUpdate) => {
      onChange?.({
        content: editor.getHTML(),
        lastUpdated).toISOString(),
      });
    }
  })

  // Update effect to handle content changes
  useEffect(() => {
    if (editor && initialData?.content) {
      const currentContent = editor.getHTML()
      const newContent = initialData.content!== currentContent) {
        editor.commands.setContent(newContent)
      }
    }
  }, [initialData?.content, editor])

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  return (
    
      {editor && (
        
          {/* Text Style */}
          
             editor.chain().focus().toggleBold().run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive('bold') && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
            
             editor.chain().focus().toggleItalic().run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive('italic') && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
            
             editor.chain().focus().toggleUnderline().run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive('underline') && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
            
             editor.chain().focus().toggleStrike().run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive('strike') && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
          

          

          {/* Text Alignment */}
          
             editor.chain().focus().setTextAlign('left').run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive({ textAlign: 'left' }) && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
            
             editor.chain().focus().setTextAlign('center').run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive({ textAlign: 'center' }) && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
            
             editor.chain().focus().setTextAlign('right').run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive({ textAlign: 'right' }) && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
          

          

          {/* Headings */}
          
             editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive('heading', { level: 1 }) && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
            
             editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={cn(
                "h-8 px-3 hover:bg-gray-100 transition-colors",
                editor.isActive('heading', { level: 2 }) && "bg-gray-100 text-gray-900"
              )}
              variant="ghost"
              size="sm"
            >
              
            
          
        
      )}
      
        
            
          
        
      
    
  )
}

export default CoverLetterEditor