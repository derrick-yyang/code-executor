import React from 'react';

interface OutputPanelProps {
  output: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output }) => {
  return (
    <div className="w-1/2 bg-dark-gray text-white p-4 rounded-md overflow-y-auto">
      <h2 className="text-sm font-bold mb-2">Output</h2>
      <pre className="whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default OutputPanel;