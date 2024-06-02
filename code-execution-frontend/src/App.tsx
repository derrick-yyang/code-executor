import React, { useState } from 'react';
import CodeEditor from './CodeEditor';

/*
TODO:
- Use ChakraUI to style the app
- Add UX feedback for text and submit buttons
  This includes
  - Toasts
  - button loading spinners
- Add code output execution environment
- Update README.md with instructions on how to run the app and high level implementation details
*/

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');

  const testCode = async () => {
    const response = await fetch('http://localhost:5000/test',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    console.log(result);
  };

  const submitCode = async () => {
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="App">
      <CodeEditor code={code} setCode={setCode} />
      <button onClick={testCode}>Test Code</button>
      <button onClick={submitCode}>Submit</button>
    </div>
  );
};

export default App;
