import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { material } from '@uiw/codemirror-theme-material';
import { EditorView } from '@codemirror/view';
import './Editor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

function Editor({ value, onChange, displayName = "Editor", language = "js" }) {
  const [isOpen, setIsOpen] = useState(true);

  let extensions = [EditorView.lineWrapping];

  switch (language) {
    case 'html':
      extensions.push(html());
      break;
    case 'css':
      extensions.push(css());
      break;
    case 'js':
    default:
      extensions.push(javascript({ jsx: true }));
      break;
  }

  return (
    <div className={`editor-container ${!isOpen ? 'collapsed' : ''}`}>
      <div className="editor-title">
        {displayName}
        <button onClick={() => setIsOpen(prev => !prev)}>
          <FontAwesomeIcon icon={isOpen ? faCompressAlt : faExpandAlt} />
        </button>
      </div>

      {isOpen && (
        <CodeMirror
          value={value}
          extensions={extensions}
          theme={material}
          onChange={(val) => onChange(val)}
          className="code-mirror-wrapper"
          height="100%"
        />
      )}
    </div>
  );
}

export default Editor;
