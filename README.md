# code-executor

Welcome to the code-executor workspace for Datacurve.io's Take-Home Assessment! This app provides a platform for executing Python3 code and supports the libraries `pandas` and `scipy`.

## Architecture

The code-executor project follows a containerized architecture, which allows for easy deployment and security. The architecture consists of the following components:

- Backend: The backend is responsible for executing code snippets, and submitting the code and output to an SQL Database. It is built using the API framework FastAPI

- Frontend: The frontend provides a user interface for interacting with the code-executor platform. It is built with Vite, React.js, ChakraUI, and TailwindCSS.

- SQL Database: The SQL database stores error-free user code, and the corresponding execution results.

## Getting Started

To get started with the code-executor application, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/code-executor.git`

2. Install dependencies: `cd code-executor && npm install`

3. Build and run the application: `make run`. 

4. Access the application in your browser at `http://localhost:3000`

## Basic Functionalities

The code-executor offers the following basic functionalities based on the take-home assessment description:

1. Code Execution: Users can run Python3 code, with an output console to view their code output. The application will execute the code and return the output or any error messages.

2. Python3 Libraries: This platform supports `pandas` and `scipy` libraries.

3. Code Submission: Users can submit their error-free code, in which the code and it's output will be safely stored in an SQL Database

4. Backend Security: SQL Queries in our backend to store the code are parameterized, making it invulnerable to SQL Injection Attacks.

5. Environment Security: The code is executed in an isolated containerized environment and will not affect any internal system or files.


