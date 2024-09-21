import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from starlette.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from jose import jwt 
from pydantic import BaseModel
from database import db


dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)


SECERT_KEY = os.environ.get('API_KEY')
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World"}


@app.get("/login")
async def user_login(username: str, password: str):
    data = jsonable_encoder({'username': username, 'password': password})

    user = db.get_user(data['username'])
    if user and user['password'] == data['password']:
        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {
            "status": "ok",
            "message": "",
            "username": username,
            "token": encoded_jwt
        }
    else:
        return {
            "status": "Error",
            "message":"Неправильный логин или пароль"
        }


@app.get("/signup")
async def user_signup(username: str, password: str):
    user = jsonable_encoder({'username': username, 'password': password})
    
    if db.get_user(user['username']):
        return {
            "status": "Error",
            "message":"Человек с даным username уже существует"
        }
    else:  
        db.add_user(user)
        encoded_jwt = jwt.encode(user, SECERT_KEY, algorithm=ALGORITHM)
        return {
            "status": "ok",
            "message": '',
            "username": username,
            "token": encoded_jwt
        }
        

@app.get("/notes/get")
async def user_login(username: str):
    notes = db.get_notes(username)
    
    return {
        "status": "ok",
        "message": "",
        "username": username,
        "notes": notes
    }
    

@app.get("/notes/add")
async def user_login(username: str, note_title: str, note_description: str):
    notes = db.add_note(
        {
            'title': note_title, 
            'description': note_description
        },
        username
    )
    
    return {
        "status": "ok",
        "message": ""
    }
    

@app.get("/notes/save")
async def save_note(id: str, note_title):
    notes = db.save_note(
        id, 
        note_title
    )
    
    return {
        "status": "ok",
        "message": ""
    }
        

    
@app.get("/todos/get")
async def user_login(username: str):
    todos = db.get_todos(username)
    
    return {
        "status": "ok",
        "message": "",
        "username": username,
        "todos": todos
    }
    

@app.get("/todos/add")
async def user_login(username: str, todo_title: str):
    notes = db.add_todo(
        {
            'title': todo_title, 
        },
        username
    )
    
    return {
        "status": "ok",
        "message": ""
    }