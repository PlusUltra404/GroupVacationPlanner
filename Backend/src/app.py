# coding=utf-8
from datetime import timedelta, datetime, timezone
from flask.cli import FlaskGroup
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask import Flask, jsonify, request,redirect,render_template, session, url_for
from sqlalchemy import null, select
from .models import Session, engine, Base
from .models import User, Group, Group_Member, Event
from urllib.request import  urlopen
import json
import requests
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager



#Imports for connecting backend to auth0
from six.moves.urllib.request import urlopen
from functools import wraps
import json
from os import environ as env
from werkzeug.exceptions import HTTPException
from dotenv import load_dotenv, find_dotenv
# from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode
# from .auth import API_AUDIENCE, AuthError, requires_auth




# creating the Flask application
server = Flask(__name__)
server.config.from_object("src.config.Config")
server.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(server)
CORS(server)
cli = FlaskGroup(server)



sessiondb = Session()

@server.before_request
def before_request_func():
    return {'Allow' : 'POST' }, 200, { 'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Methods' : 'PUT,GET,POST' , 'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Headers': 'access-control-allow-origin,content-type'}

############################
# Routes for messaging
############################
@server.route('/api/chatscreen', methods=['GET'])
def chat_screen():
    
    r = requests.post('https://api.chatengine.io/chats/',

        headers={'User-Name' : session['profile'].get('username'), 'Project-ID' : 'd84aadd4-ad67-4b0b-b507-415a6fb05ae2' , 'User-Secret' : session['profile'].get('password')}
    )

###########################
# Routes for Calender
##########################
@server.route('/api/calender', methods=['GET'])
def show_calender():
    
    return 'success'


@server.route('/api/event',methods=['POST'])
def create_event():
    
    json_data = request.json

    user = User.query.filter_by(username=json_data['user']).first()


    #mount event object
    event = Event(
        user_id = user.id,
        group_id =json_data['group_id'],
        title = json_data['title'],
        date = json_data['date'],
        content = json_data['content']
    )

    try:
        # persist event
        sessiondb.add(event)
        sessiondb.commit()
        status = 'succes'
    except:
        status = 'error unknown error'
    sessiondb.close()
    return jsonify({'result': status})
   


#API
@server.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@server.route('/api/token', methods=["POST"])
@cross_origin(supports_credentials=True)
def create_token():
    
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    access_token = create_access_token(identity=email)
    json_data = request.json
    user = User.query.filter_by(email=json_data['email']).first()
    if user(
            user.password, json_data['password']):
        session['logged_in'] = True
        status = True
    else:
        status = False
    response = {"access_token":access_token}
    session['profile'] = {
        'password': user['password'],
        'username': user['username'],
    }
    return response

@server.route('/api', methods=["POST"])
def home():
    data = {"data": "Hello World"}
    return jsonify(data)
    
     

@server.route('/api/get-started', methods=['POST'])
def get_started():
    json_data = request.json
    #mount group object

    NewChat = [
        {'title': json_data['title']},
        {'is_direct_chat': False},
    ]

    r = requests.post('https://api.chatengine.io/chats/',
            data=NewChat,
            headers={'User-Name' : session['profile'].get('username'), 'Project-ID' : 'd84aadd4-ad67-4b0b-b507-415a6fb05ae2' , 'User-Secret' : session['profile'].get('password')}
        )
    print(r.content)
    data = r.json()
    print(data)


    group = Group(
        created_by = json_data['created_by'],
        title = json_data['title'],
        status = json_data['status'],
        profile = json_data['profile']
    )
    

    try:
        

        # persist group 
        sessiondb.add(group)
        sessiondb.commit()
        status = 'succes'
    except:
        status = 'error unknown error'
    sessiondb.close()

    return jsonify({'result': status})

@server.route('/api/join')
#@requires_auth
def joinGroup():
    json_data = request.json
    # receives data from frontend. parses data into columns to be inputted
    member = Group_Member(
        group_id = json_data['access_key'],
        user_id = json_data['user_id'],
        status = json_data['status']
    )

    NewChat = [
        {'username': session['profile'].get('username')}
    ]
    try:
        #get chat id
        r = requests.post('https://api.chatengine.io/chats/{{chat_id}}/people/',
            data=NewChat,
            headers={'User-Name' : session['profile'].get('username'), 'Project-ID' : 'd84aadd4-ad67-4b0b-b507-415a6fb05ae2' , 'User-Secret' : session['profile'].get('password')}
        )
        
        # persist group 
        sessiondb.add(member)
        sessiondb.commit()
        status = 'succes'
    except:
        status = 'error unknown error'
    sessiondb.close()

    return jsonify({'result': status})



@server.route('/api/send-access-key')
def accesskey():
    return render_template('join.html')

@server.route('/api/send-invite')
def sendinvite():
    return render_template('Intro.html')

############################
# Register user to app and messaging
############################
@server.route('/api/register', methods=['POST'])
def register():
    json_data = request.json
    print(json_data)
      # mount User object
    user = User(

        username=json_data['username'],
        password=json_data['password'],
        email=json_data['email'],
        firstname=json_data['firstname'],
        lastname=json_data['lastname'],
        mobile=json_data['mobile'],
        intro=json_data['intro'],
        profile=json_data['profile']       
    )
    chatuser = [
        {'first_name': User.firstname},
        {'last_name': User.lastname},
        {'username' : User.username},
        {'email' : User.email},
        {'secret' : User.password},
    ]
    try:
        r = requests.post('https://api.chatengine.io/users/',
            data=chatuser,
            headers={'Private-Key' : 'ca-0c4de29c-0ea1-4b4d-99f8-a6cc3f53fe39'}
        )
        # persist user
        sessiondb.add(user)
        sessiondb.commit()
        status = 'success'
    except:
        status = 'this user is already registered'
     # return created user

    sessiondb.close()
    return jsonify({'result': status})
   

@server.route('/api/logout')
def logout():
    # Clear session stored data
    session.clear()
    session.pop('logged_in', None)
    # Redirect user to logout endpoint
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
   # params = {'returnTo': url_for('home', _external=True), 'client_id': 'ECUr7U2H6cH2fdYno1UWDIOaRYwDwsA1'}
   # return redirect('https://https://dev-dm6nugc4.us.auth0.com' + '/v2/logout?' + urlencode(params))

@server.route('/api/callback')
def callback_handling():
    # Handles response from token endpoint
    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    # Store the user information in flask session.
    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture']
    }
    return redirect('/dashboard')

