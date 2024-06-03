import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import { useToast } from "@chakra-ui/react";
import ExecutorButton from "./components/Button";
import OutputPanel from "./components/OutputPanel";

/*
TODO:
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
      if (result.result) {
        setOutput(result.result);
      } else {
        setOutput(result.traceback);
        throw new Error(result.error);
      }
      console.log(result);
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

      // Throw exception if there is an error in the response
      if (result.error) {
        setOutput(result.traceback);
        throw new Error(result.error);
      }

      console.log(result);
      showToast("Code Submission", "Code submitted successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Code Submission", "Code submission failed", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-light-gray h-screen text-gray-200">
      <header className="bg-light-gray px-4 pt-4">
        <h1 className="text-2xl font-bold">Python3 Executor</h1>
        <div className="bg-dark-gray p-4 rounded-lg flex-1 mt-2">
          <p className="text-sm text-white">
            This application allows you to execute Python3 code with support for
            pandas and scipy libraries. You can also submit your code to a
            database for future reference.
          </p>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden px-4 pb-4 bg-light-gray">
        <main className="flex flex-1 flex-col">
          <div className="flex justify-center my-4 space-x-4">
            <ExecutorButton
              onClick={testCode}
              isLoading={testLoading}
              buttonText="Test Code"
              buttonColor="gray"
            />
            <ExecutorButton
              onClick={submitCode}
              isLoading={submitLoading}
              buttonText="Submit Code"
              buttonColor="green"
            />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden space-x-4">
              <CodeEditor code={code} setCode={setCode} />
              <OutputPanel output={output} />
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-light-gray text-center p-4">
        <p className="text-sm text-white">
          2024 Python3 Executor. All rights reserved to Derrick 🤠
        </p>
      </footer>
    </div>
  );
};

export default App;
