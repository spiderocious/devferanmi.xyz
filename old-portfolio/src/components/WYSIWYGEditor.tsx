/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface WYSIWYGEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
  className?: string;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Start writing your post...",
  height = 600,
  className = ""
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const api_key = import.meta.env.VITE_EDITOR_API_KEY || 'no-api-key';

  return (
    <div className={`wysiwyg-editor ${className}`}>
      <Editor
        apiKey={api_key}
        onInit={(_evt: any, editor: any) => editorRef.current = editor}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
            'codesample', 'quickbars'
          ],
          toolbar: 
            'undo redo | formatselect | bold italic underline strikethrough | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | ' +
            'removeformat | link image media codesample | ' +
            'forecolor backcolor | emoticons | help | fullscreen',
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
          quickbars_insert_toolbar: 'quickimage quicktable',
          contextmenu: 'link image table',
          skin: 'oxide-dark',
          content_css: 'dark',
          placeholder: placeholder,
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              font-size: 16px; 
              line-height: 1.6;
              color: #e5e7eb;
              background-color: #1f2937;
              margin: 1rem;
            }
            h1, h2, h3, h4, h5, h6 { 
              color: #f9fafb; 
              font-weight: 600;
              margin: 1.5rem 0 1rem 0;
              line-height: 1.3;
            }
            h1 { font-size: 2.25rem; }
            h2 { font-size: 1.875rem; }
            h3 { font-size: 1.5rem; }
            h4 { font-size: 1.25rem; }
            p { 
              margin: 0 0 1rem 0; 
              color: #d1d5db;
            }
            a { 
              color: #60a5fa; 
              text-decoration: none;
            }
            a:hover { 
              color: #93c5fd; 
              text-decoration: underline;
            }
            blockquote {
              border-left: 4px solid #6366f1;
              margin: 1.5rem 0;
              padding: 1rem 1.5rem;
              background-color: #374151;
              border-radius: 0.5rem;
              font-style: italic;
              color: #d1d5db;
            }
            code {
              background-color: #374151;
              color: #f472b6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-family: 'Courier New', monospace;
              font-size: 0.875rem;
            }
            pre {
              background-color: #111827;
              color: #e5e7eb;
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              margin: 1rem 0;
              border: 1px solid #374151;
            }
            pre code {
              background: none;
              color: inherit;
              padding: 0;
            }
            ul, ol {
              margin: 1rem 0;
              padding-left: 2rem;
              color: #d1d5db;
            }
            li {
              margin: 0.5rem 0;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 1rem 0;
              background-color: #374151;
              border-radius: 0.5rem;
              overflow: hidden;
            }
            th, td {
              border: 1px solid #4b5563;
              padding: 0.75rem;
              text-align: left;
            }
            th {
              background-color: #4b5563;
              color: #f9fafb;
              font-weight: 600;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 0.5rem;
              margin: 1rem 0;
            }
          `,
          toolbar_mode: 'sliding',
          image_advtab: true,
          image_caption: true,
          noneditable_noneditable_class: 'mceNonEditable',
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          image_dimensions: false,
          object_resizing: true,
          link_default_target: '_blank',
          link_assume_external_targets: true,
          media_live_embeds: true,
          codesample_languages: [
            { text: 'JavaScript', value: 'javascript' },
            { text: 'TypeScript', value: 'typescript' },
            { text: 'HTML/XML', value: 'markup' },
            { text: 'CSS', value: 'css' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C#', value: 'csharp' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Go', value: 'go' },
            { text: 'SQL', value: 'sql' },
            { text: 'JSON', value: 'json' }
          ]
        }}
      />
      
      <style>{`
        .tox .tox-editor-header {
          background-color: #1f2937 !important;
          border-color: #374151 !important;
        }
        
        .tox .tox-toolbar,
        .tox .tox-toolbar__overflow,
        .tox .tox-toolbar__primary {
          background-color: #1f2937 !important;
          border-color: #374151 !important;
        }
        
        .tox .tox-tbtn {
          color: #9ca3af !important;
        }
        
        .tox .tox-tbtn:hover {
          background-color: #374151 !important;
          color: #f9fafb !important;
        }
        
        .tox .tox-tbtn--enabled,
        .tox .tox-tbtn--enabled:hover {
          background-color: #4f46e5 !important;
          color: #ffffff !important;
        }
        
        .tox .tox-edit-area {
          border-color: #374151 !important;
        }
        
        .tox .tox-statusbar {
          background-color: #1f2937 !important;
          border-color: #374151 !important;
          color: #9ca3af !important;
        }
        
        .tox .tox-menubar {
          background-color: #1f2937 !important;
          border-color: #374151 !important;
        }
        
        .tox .tox-split-button:hover {
          background-color: #374151 !important;
        }
        
        .tox .tox-tbtn__select-label {
          color: #9ca3af !important;
        }
        
        .tox .tox-listboxfield .tox-listbox--select {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #f9fafb !important;
        }
      `}</style>
    </div>
  );
};

export default WYSIWYGEditor;