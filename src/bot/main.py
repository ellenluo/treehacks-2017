from __future__ import print_function
import fbmq
from fbmq import Attachment, Template, QuickReply, Page
import json
import requests
import sqlalchemy
import psycopg2
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

verify_token = "perrytheplatypus"
PAGE_ACCESS_TOKEN = "EAAJjL86GCNQBAKofF9TZC7vtTSUQXXkt6fCCirOPg7ZC2HDZAzfKhvfAcxY4kTQ0IFpA1K6OXVxRrK85x5vRvmmsECPIzgZAZBFa5ObuozDa9tq9XxXc3HXWJCT6ogYEEj89r1bPx3K4nTRXMtyCNMThiv7pwCEOk1ZAF5ZBxULZCwZDZD"
default_img  = "http://photos.petfinder.com/photos/pets/28854051/3/?bust=1432951081&width=500&-x.jpg"

engine = None

def lambda_handler(event, context):
    if 'params' in event.keys():
        params = event['params']['querystring']
        if params and params['hub.mode'] == 'subscribe':
            if params['hub.verify_token'] == verify_token:
                return int(params['hub.challenge']), 200
            else:
                return "Verification error", 403
    else:
        messaging = json.loads(event['body'])
        messaging = messaging['entry'][0]['messaging'][0]

        if 'message' in messaging.keys() and 'text' in messaging['message'].keys():
            sender, message = messaging['sender']['id'], messaging['message']['text']
            sender = int(sender)

            page = fbmq.Page(PAGE_ACCESS_TOKEN)
            if message == 'next':
                connectDb()
                pet = getRandomPet()
                #attachment = Attachment.Image(default_img)
                #page.send(sender, attachment)
                page.send(sender, "This pet is {} (id = {}).".format(pet.name, pet.pet_id))
                page.send(sender, "Aww.")
        else:
            print(messaging)

    response = {
        'statusCode': 200,
        'body': json.dumps({ 'success': True }),
            'headers': {
                'Content-Type': 'application/json',
            }
    };

    return response

Base = declarative_base()
class Pet(Base):
    __tablename__ = 'pets'
    id = Column(Integer, primary_key=True)
    pet_id = Column(Integer, unique=True, nullable=False)                              
    name = Column(String(1000), nullable=False) 

    def __init__(self, pet_id, name):
        self.pet_id = pet_id
        self.name = name

def connectDb():
    global engine
    user = 'perry'
    password = 'theplatypus'
    host = 'petron.ckcrv4vmtlra.us-west-2.rds.amazonaws.com'
    port = 5432
    database = 'petron'

    engine = create_engine('postgresql+psycopg2://{}:{}@{}:{}/{}'.format(user, password, host, port, database))

def getRandomPet():
    import random
    ct = 1000
    idx = random.randint(0, ct -1)
    Session = sessionmaker(bind=engine)
    session = Session()
    query = session.query(Pet)
    return query.offset(idx).first()


