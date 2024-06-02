import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <Editor
      height="90vh"
      defaultLanguage="python"
      defaultValue={code}
      onChange={(value) => setCode(value || '')}
    />
  );
};

export default CodeEditor;
