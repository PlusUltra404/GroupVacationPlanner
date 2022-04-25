
from array import array
from ast import Str
from datetime import datetime
from os import access
from sqlite3 import DatabaseError
# from typing import Text
from unicodedata import category
from sqlalchemy import MetaData, create_engine, Column, Text, String, Integer, DateTime, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields



#Database variables
db_url = 'localhost:5432'
db_name = 'VacationIO'
db_user = 'postgres'
db_password = 'postgres'

#Connect to database through sqlalchemy
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}')
Session = sessionmaker(bind=engine)

Base = declarative_base()





class User_Post(Base):
    """Message acount for user"""

    __tablename__ = "user_post"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    user_id = Column(Integer,nullable=False)
    sender_id = Column(Integer,nullable=False)
    message = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, user_id, sender_id, message, created_at, updated_at):

        self.user_id = user_id
        self.sender_id = sender_id
        self.message = message
        self.created_at = created_at
        self.updated_at = updated_at


class User_Message(Base):
    """Message acount for user"""

    __tablename__ = "user_message"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    source_id = Column(Integer,nullable=False)
    target_id = Column(Integer,nullable=False)
    message = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, source_id, target_id, message, created_at, updated_at):

        self.source_id = source_id
        self.target_id = target_id
        self.message = message
        self.created_at = created_at
        self.updated_at = updated_at


class User(Base):
    """User account."""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    username = Column(String(255), unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    mobile = Column(String(255))
    firstname = Column(String(255))
    lastname = Column(String(255))
    intro = Column(Text)
    profile = Column(Text)

    def __init__(self,  username, password,email,mobile, firstname,lastname, intro, profile):
        
        self.username = username
        self.password = password
        self.email = email
        self.mobile = mobile
        self.firstname = firstname
        self.lastname = lastname
        self.intro = intro
        self.profile = profile

class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    password = fields.Str()
    email = fields.Str()
    mobile = fields.Str()
    firstname = fields.Str()
    lastname = fields.Str()
    intro = fields.Str()
    profile = fields.Str()
    

class Group(Base):
    """Group table."""

    __tablename__ = "group"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    created_by = Column(String(255))
    title = Column(String(255))
    chatid = Column(Integer)
    profile = Column(Text)
    membercount = Column(Integer, autoincrement = "auto")


    def __init__(self,  created_by , title ,chatid, profile, membercount):
        
        self.created_by = created_by
        self.title = title
        self.chatid = chatid
        self.profile = profile
        self.membercount = membercount

    
class GroupSchema(Schema):
    id = fields.Number()
    created_by = fields.Str()
    title = fields.Str()
    chatid = fields.Number()
    profile = fields.Str()
    membercount = fields.Number()
 


class Group_Member(Base):
    """Group member table."""

    __tablename__ = "group_member"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    group_id = Column(Integer)
    user_id = Column(Integer)
    
   
    

    def __init__(self,  group_id , user_id ):
        
        self.group_id = group_id
        self.user_id = user_id
    

class Group_Message(Base):
    """Message acount for group"""

    __tablename__ = "group_message"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    group_id = Column(Integer,nullable=False)
    user_id = Column(Integer,nullable=False)
    message = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, group_id, user_id, message, created_at, updated_at):

        self.group_id = group_id
        self.user_id = user_id
        self.message = message
        self.created_at = created_at
        self.updated_at = updated_at

class Group_Post(Base):
    """Message acount for group"""

    __tablename__ = "group_post"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    group_id = Column(Integer,nullable=False)
    user_id = Column(Integer,nullable=False)
    message = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, group_id, user_id, message, created_at, updated_at):

        self.group_id = group_id
        self.user_id = user_id
        self.message = message
        self.created_at = created_at
        self.updated_at = updated_at

## Polling and Survey Database Schema

class Poll(Base):
    """Poll table"""

    __tablename__ = "Poll"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    host_id = Column(Integer,nullable=False)
    title = Column(String(255))
    meta_title = Column(String(255))
    slug = Column(String)
    summary = Column(String)
    type = Column(Integer)
    published = Column(Integer)
    starts_at = Column(DateTime)
    ends_at = Column(DateTime)
    content = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, host_id, title, meta_title, slug,summary, type, published,starts_at,ends_at,content,created_at ,updated_at):

        self.host_id = host_id
        self.title = title
        self.meta_title = meta_title
        self.slug = slug
        self.summary = summary
        self.type = type
        self.published = published
        self.starts_at = starts_at
        self.ends_at = ends_at
        self.content = content
        self.created_at = created_at
        self.updated_at = updated_at

class Poll_Question(Base):
    """Poll Question table"""

    __tablename__ = "Poll_Question"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    poll_id = Column(Integer,nullable=False)
    type = Column(String)
    content = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, poll_id, type,content,created_at ,updated_at):

        self.poll_id = poll_id
        self.type = type
        self.content = content
        self.created_at = created_at
        self.updated_at = updated_at

class Poll_Answer(Base):
    """Poll Answer table"""

    __tablename__ = "Poll_Answer"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    poll_id = Column(Integer,nullable=False)
    question_id = Column(Integer,nullable=False)
    content = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, poll_id, question_id,content,created_at ,updated_at):

        self.poll_id = poll_id
        self.question_id = question_id
        self.content = content
        self.created_at = created_at
        self.updated_at = updated_at

class Poll_Vote(Base):
    """Poll Vote table"""

    __tablename__ = "Poll_Vote"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    poll_id = Column(Integer,nullable=False)
    question_id = Column(Integer,nullable=False)
    answer_id = Column(Integer,nullable=False)
    user_id = Column(Integer)
    content = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, poll_id, question_id,answer_id,user_id, content,created_at ,updated_at):

        self.poll_id = poll_id
        self.question_id = question_id
        self.answer_id = answer_id
        self.user_id = user_id
        self.content = content
        self.created_at = created_at
        self.updated_at = updated_at


class Event(Base):
    """Events"""

    __tablename__ = "event"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    user_id = Column(Integer)
    group_id = Column(Integer)
    title = Column(String(255))
    date = Column(String(255))
    content = Column(Text)

    def __init__(self,user_id,group_id, title , date, content):
        
        self.user_id = user_id
        self.group_id = group_id
        self.title = title
        self.date = date
        self.content = content
    
class EventSchema(Schema):
    id = fields.Number()
    user_id = fields.Number()
    group_id = fields.Number()
    title = fields.Str()
    date = fields.Str()
    content = fields.Str()
        
 
