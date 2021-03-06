# coding=utf-8
from curses.ascii import US
from datetime import timedelta, datetime, timezone
from flask.cli import FlaskGroup
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask import Flask, jsonify, request,redirect,render_template, session, url_for
from sqlalchemy import null, select
from models import Session, engine, Base
from models import User, Group, Group_Member, Event, EventSchema,GroupSchema, UserSchema
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
server.config.from_object("config.Config")
server.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
server.config['SECRET_KEY'] = 'f3cfe9ed8fae309f02079dbf'
jwt = JWTManager(server)
CORS(server)
cli = FlaskGroup(server)



sessiondb = Session()


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
    id = ' '

    user = sessiondb.query(User).filter_by(username= json_data['user'] )
    for key in user:
        id = key.id
   


    #mount event object
    event = Event(
        user_id = id,
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
   

@server.route('/api/events',methods=['POST'])
def get_events():

    json_data = request.json
    id = ' '
    group_id = ' '

    user = sessiondb.query(User).filter_by(username = json_data['user'] )
    for key in user:
        id = key.id
    group = sessiondb.query(Group_Member).filter_by(user_id= id)
    for key in group:
        group_id = key.group_id

   

     # fetching from the database

    event_objects = sessiondb.query(Event).filter_by(group_id = group_id)
    
    # transforming into JSON-serializable objects
    schema = EventSchema(many=True)
    events = schema.dump(event_objects)


    # serializing as JSON
    sessiondb.close()
    return jsonify(events)

@server.route('/api/groups',methods=['POST'])
def get_groups():
    json_data = request.json
    id = ' '

    user = sessiondb.query(User).filter_by(username= json_data['user'] )
    for key in user:
        id = key.id
     # fetching from the database

    group_objects = sessiondb.query(Group).filter(Group_Member.user_id != id)
    
    # transforming into JSON-serializable objects
    schema = GroupSchema(many=True)
    groups = schema.dump(group_objects)


    # serializing as JSON
    sessiondb.close()
    return jsonify(groups)

@server.route('/api/user', methods=['POST'])
def get_users():

    Username = request.json.get("username", None)
    user_obj = sessiondb.query(User).filter_by(username = Username )

    schema = UserSchema(many=True)
    user = schema.dump(user_obj)

    sessiondb.close()
    return jsonify(user)


@server.route('/api/update', methods=['POST'])
def update_user():
    json_data = request.json
    Username = request.json.get("username", None)
    user_obj = sessiondb.query(User).filter_by(username = Username ).update({'username': json_data['username'],
    'firstname': json_data['firstname'],
    'lastname': json_data['lastname'],
    'mobile': json_data['mobile'],
    'intro': json_data['intro'],
    'email': json_data['email'],
    'password': json_data['password']
    })
    sessiondb.commit()

    sessiondb.close()
    return jsonify({'result': 'status'})

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
def create_token():
    
    
    Username = request.json.get("username", None)
    password = request.json.get("password", None)

    access_token = create_access_token(identity=Username)
    json_data = request.json
    user = sessiondb.query(User).filter_by(username= Username )
    Upassword = ' '
    for key in user:
        Upassword = key.password
    if (Upassword == json_data['password']):
        session['logged_in'] = True
        status = True
    else:
        status = False
    response = {"access_token":access_token}
    session['profile'] = {
        'password': Upassword,
        'username': Username,
    }
    return response

@server.route('/api', methods=["POST"])
def home():
    data = {"data": "Hello World"}
    return jsonify(data)
    
     

@server.route('/api/get-started', methods=['POST'])
def get_started():
    id = ' '
    username = request.json.get("username", None)
    json_data = request.json

    user = sessiondb.query(User).filter_by(username= username )
    Upassword = ' '
    for key in user:
        Upassword = key.password
    #mount group object


    group = Group(
        created_by = username,
        title = json_data['title'],
        chatid= json_data['id'],
        membercount=0,
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

@server.route('/api/join',methods=['POST'])
#@requires_auth
def joinGroup():
    json_data = request.json
    # receives data from frontend. parses data into columns to be inputted
    id = ' '
    group_id = ' '
    chat_id = 2


    group = sessiondb.query(Group).filter_by(title= json_data['group'] )
    
    for key in group:
        group_id = key.id
        chat_id = key.chatid

    user = sessiondb.query(User).filter_by(username= json_data['username'] )
    for key in user:
        id = key.id
    
    member = Group_Member(
        group_id = group_id,
        user_id = id
       
    )
   
        
    
    try:
        
        # persist group 
        sessiondb.add(member)
        sessiondb.commit()
        status = 'succes'
    except:
        status = 'error unknown error'
    sessiondb.close()

    return jsonify({'result': status})





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

    chat = {
        'first_name': User.firstname,
        'last_name' : User.lastname , 
        'username' : User.username , 
        'email' : User.email, 
        'secret' : User.password
        }
    

    r = requests.post('https://api.chatengine.io/users/',
            data=chat,
            headers={'Private-Key': '99ca68a1-4735-4bb7-8182-52eaa4b095e9'}
        )

    try:
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

