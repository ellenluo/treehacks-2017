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
PETFINDER_API_KEY = "150d5bff08a3c97e69c2417d726c084d"
DEFAULT_IMG = "http://photos.petfinder.com/photos/pets/28854051/3/?bust=1432951081&width=500&-x.jpg"

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
                page.send(sender, "This pet is {}!".format(pet.name))
                page.send(sender, "(DEBUG pet_id ={})".format(pet.pet_id))
                description, img = parsePetFromId(pet.pet_id)
                attachment = Attachment.Image(img)
                page.send(sender, attachment)
                if description: page.send(sender, description)
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

def parsePetFromId(id):
    r = requests.get("http://api.petfinder.com/pet.get?format=json&key={}&id={}".format(PETFINDER_API_KEY, id))
    data = json.loads(r.text)
    pet = data['petfinder']['pet']
    print(pet['description'])
    description = pet['description'].get('$t', None)
    photos = pet['media']['photos']['photo']
    img = DEFAULT_IMG
    sizing = ['t', 'pnt', 'fpm', 'pn', 'x']
    biggest = -1
    for photo in photos:
        size = photo['@size']
        if size not in sizing: continue
        if sizing.index(size) > biggest:
            img = photo['$t']
            biggest = sizing.index(size)

    return description, img
        
