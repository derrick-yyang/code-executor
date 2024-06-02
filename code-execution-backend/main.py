from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
from typing import Any
import sqlite3

app = FastAPI()

class CodeSubmission(BaseModel):
    code: str

def execute_code(code: str) -> Any:
    try:
        exec_globals = {}
        exec(code, exec_globals)
        return exec_globals
    except Exception as e:
        return str(e)

@app.post("/test")
async def test_code(submission: CodeSubmission):
    result = execute_code(submission.code)
    return {"result": result}

@app.post("/submit")
async def submit_code(submission: CodeSubmission):
    result = execute_code(submission.code)
    conn = sqlite3.connect('code_submissions.db')
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
    ''', (submission.code, str(result)))
    conn.commit()
    conn.close()
    return {"status": "success", "result": result}

