import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import { useToast } from "@chakra-ui/react";

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
  const [code, setCode] = useState<string>("");
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const toast = useToast();

  const showToast = (
    title: string,
    description: string,
    status: "success" | "error"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  const testCode = async () => {
    setTestLoading(true);
    try {
      const response = await fetch("http://localhost:5000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      console.log(result);
      if (result.result) {
        setOutput(result.result);
      } else {
        setOutput(result.traceback);
      }
      showToast("Code Execution", "Code executed successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Code Execution", "Code execution failed", "error");
    } finally {
      setTestLoading(false);
    }
  };

  const submitCode = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      console.log(result);
      showToast("Code Execution", "Code executed successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Code Execution", "Code execution failed", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-600 h-screen text-gray-200">
      <header className="bg-black p-4">
        <h1 className="text-2xl font-bold">Python3 Executor</h1>
      </header>
      <div className="flex flex-1 overflow-hidden p-4">
        <main className="flex flex-1 flex-col">
          <div className="flex justify-center my-4 space-x-4">
            <button
              onClick={testCode}
              disabled={testLoading}
              className={`flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                testLoading ? "bg-gray-800" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {testLoading ? <span>Loading...</span> : <>Test Code</>}
            </button>
            <button
              onClick={submitCode}
              disabled={submitLoading}
              className={`flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                submitLoading
                  ? "bg-green-700"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {submitLoading ? <span>Loading...</span> : <>Submit Code</>}
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden space-x-4">
              <CodeEditor code={code} setCode={setCode} />
              <div className="w-1/2 bg-dark-gray text-white p-4 rounded-md overflow-y-auto">
                <h2 className="text-md font-bold mb-2">Output</h2>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-gray-900 text-center p-4">
        <p className="text-sm text-white">
          2024 Python3 Executor. All rights reserved to Derrick 🤠
        </p>
      </footer>
    </div>
  );
};

export default App;
