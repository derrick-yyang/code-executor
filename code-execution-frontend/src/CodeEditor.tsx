import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}


const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {

  return (
    <div className="w-1/2 bg-dark-gray text-white p-4 rounded-md overflow-y-auto">
      <Editor
        height="100%"
        defaultLanguage="python"
        defaultValue={code}
        onChange={(value) => setCode(value || "")}
        theme='vs-dark'
      />
    </div>
  );
};

export default CodeEditor;
