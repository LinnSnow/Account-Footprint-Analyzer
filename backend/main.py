from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from google_auth_oauthlib.flow import Flow
from dotenv import load_dotenv
import os
import requests as http_requests
from googleapiclient.discovery import build
import re

# temporary in-memory token store
token_store = {}

load_dotenv() #loads all variables from .env as environment variables while a process is running

app = FastAPI()

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" #"hey google-auth-oauthlib, I know I'm using HTTP and not HTTPS, I'm giving you permission to be okay with that."

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID") #gets all the environment variables in a process's environment
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

#scopes define what data can the token access, i.e. in this case: email,profile,metadata and openid
SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/gmail.metadata"
]

flow = Flow.from_client_config(
    {
        "web": {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth", #the base address of google login page
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://127.0.0.1:8000/auth/callback"] #after loging in, this link is opened with the requested data
        }
    },
    scopes=SCOPES,
    redirect_uri="http://127.0.0.1:8000/auth/callback"
)

@app.get("/")
def root():
    return {"message": "Footprint Analyzer API is running"}

@app.get("/login")
def login():
    auth_url, state = flow.authorization_url(prompt="consent")
    return RedirectResponse(auth_url) #auth_url is the complete login page url which contains all the other parameters, without this google wouldnt know who is requesting, what they are requesting

@app.get("/auth/callback")
def callback(code: str, state: str):
    flow.fetch_token(code=code) #fetches the token and stores it in flow object
    credentials = flow.credentials #fetches the token from the flow object

    # send an http request with token for authorization . once token is confirmed, return response in json 
    # format and the required fields are fetched in the return message     
    user_info_response = http_requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {credentials.token}"}
    )

    user_info = user_info_response.json()
    email = user_info.get("email")
    token_store[email] = credentials
    
    return {
        "message": "Login successful",
        "user": {
            "name": user_info.get("name"),
            "email": email,
            "picture": user_info.get("picture")
        }
    }

@app.get("/scan/gmail")
def fetch_gmail(email:str):
    if email in token_store:
        return {
            "message": "Credentials found"
        }
    else:
        return{
            "message": "please login first"
        }