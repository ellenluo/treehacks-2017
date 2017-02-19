from __future__ import print_function
import json
import requests
import sqlalchemy
import psycopg2
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import random

verify_token = "perrytheplatypus"
PAGE_ACCESS_TOKEN = "EAAJjL86GCNQBAKofF9TZC7vtTSUQXXkt6fCCirOPg7ZC2HDZAzfKhvfAcxY4kTQ0IFpA1K6OXVxRrK85x5vRvmmsECPIzgZAZBFa5ObuozDa9tq9XxXc3HXWJCT6ogYEEj89r1bPx3K4nTRXMtyCNMThiv7pwCEOk1ZAF5ZBxULZCwZDZD"
PETFINDER_API_KEY = "150d5bff08a3c97e69c2417d726c084d"
DEFAULT_IMG = "http://photos.petfinder.com/photos/pets/28854051/3/?bust=1432951081&width=500&-x.jpg"

engine, Session = None, None
connected = False

def list_pets(event, context):
    session = connectDb()
    pets = session.query(Pet).all()
    pets = [{'id':pet.id, 'name': pet.name, 'pledged': pet.pledged} for pet in pets]
    return json.dumps(pets)

def get_pet(event, context):
    print(json.dumps(event))
    session = connectDb()
    return json.dumps({})
    #pet = session.query(Pet).all()
    

Base = declarative_base()
class Pet(Base):
    __tablename__ = 'pets'
    id = Column(Integer, primary_key=True)
    pet_id = Column(Integer, unique=True, nullable=False)                              
    name = Column(String(1000), nullable=False) 
    pledged = Column(Integer, nullable=False)

    def __init__(self, pet_id, name):
        self.pet_id = pet_id
        self.name = name
        self.pledged = 0

def connectDb():
    if connected: return Session()

    global engine
    global connected
    user = 'perry'
    password = 'theplatypus'
    host = 'petron.ckcrv4vmtlra.us-west-2.rds.amazonaws.com'
    port = 5432
    database = 'petron'

    engine = create_engine('postgresql+psycopg2://{}:{}@{}:{}/{}'.format(user, password, host, port, database))
    connected = True
    Session = sessionmaker(bind=engine)
    return Session()
    

def getRandomPet():
    ct = 1000
    idx = random.randint(0, ct -1)
    Session = sessionmaker(bind=engine)
    session = Session()
    query = session.query(Pet)
    return query.offset(idx).first()

def naturalLanguage(category):
    if category == "emphatic":
        choices = ["Aww.", "Cutie.", ":D"]
        return choices[random.randint(0, len(choices) -1)]

def parsePetFromId(id):
    r = requests.get("http://api.petfinder.com/pet.get?format=json&key={}&id={}".format(PETFINDER_API_KEY, id))
    data = json.loads(r.text)
    pet = data['petfinder']['pet']
    desc_key = pet['description'].keys()
    desc_key = desc_key[0] if desc_key else None
    description = pet['description'].get(desc_key, None)
    if description:
        description = description.encode('utf-8', 'ignore')
        if len(description) > 640:
            description = description[:637] + '...'
        skip_text = ["This is the Animal Description Header", "This is the Animal Description Footer"]
        for skip in skip_text:
            description = description.replace(skip, "")
        description = description.strip()
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

    return (description, img)
