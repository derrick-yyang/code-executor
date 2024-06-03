from contextlib import redirect_stdout
from io import StringIO
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict
import sqlite3
import traceback

app = FastAPI()

# Add CORS middleware to allow requests from the React app
origins = [
    "http://localhost:3000",  # React app is served from localhost:3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeInput(BaseModel):
    code: str

def compile_and_execute_code(code: str) -> Dict[str, Any]:
    # Create a safe namespace
    exec_globals = {}
    exec_locals = {}

    with StringIO() as stdout:
        with redirect_stdout(stdout):
            # Compile the code and handle compile-time errors
            compiled_code = compile(code, "<string>", "exec")

            # Execute the code
            exec(compiled_code, exec_globals, exec_locals)
            
            return stdout.getvalue()

@app.post("/execute/")
async def execute(payload: CodeInput) -> Dict[str, Any]:
    code = payload.code
    try:
        result = compile_and_execute_code(code)
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "error": str(e), "traceback": traceback.format_exc()}

@app.post("/submit/")
async def submit_code(payload: CodeInput) -> Dict[str, Any]:
    code = payload.code
    try:
        result = compile_and_execute_code(code)
    except Exception as e:
        return {"status": "error", "error": str(e), "traceback": traceback.format_exc()}
    
    conn = sqlite3.connect("code.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY,
            code TEXT NOT NULL,
            result TEXT NOT NULL
        )
        ''')
    cursor.execute('''
    INSERT INTO submissions (code, result) VALUES (?, ?)
    ''', (code, str(result)))
    conn.commit()
    conn.close()

    return {"status": "success"}



