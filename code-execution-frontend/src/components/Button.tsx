import React from "react";

interface ButtonProps {
  onClick: () => void;
  isLoading: boolean;
  buttonText: string;
  buttonColor: string;
}

const ExecutorButton: React.FC<ButtonProps> = ({
  onClick,
  isLoading,
  buttonText,
  buttonColor,
}) => {
  const loadingColor = buttonColor == "gray" ? "bg-gray-600" : "bg-green-800";
  const defaultColor =
    buttonColor == "gray"
      ? "bg-gray-600 hover:bg-gray-500"
      : "bg-green-800 hover:bg-green-700";

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        isLoading ? loadingColor : defaultColor
      }`}
    >
      {isLoading ? <span>Loading...</span> : <>{buttonText}</>}
    </button>
  );
};

export default ExecutorButton;
