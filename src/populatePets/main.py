import postgresql
import requests
import simplejson as json
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

user = 'perry'
password = 'theplatypus'
host = '35.167.211.19'
port = 5432
database = 'petron'

#db = postgresql.open('pq://{}:{}@{}:{}/{}'.format(user, password, host, port, database))
engine = create_engine("postgresql+pypostgresql://{}:{}@{}:{}/{}".format(user, password, host, port, database))

Base = declarative_base()

class Pet(Base):
    __tablename__ = 'pets'
    id = Column(Integer, primary_key=True)
    pet_id = Column(Integer, unique=True, nullable=False)
    name = Column(String(1000), nullable=False)

    def __init__(self, pet_id, name):
        self.pet_id = pet_id
        self.name = name

Base.metadata.create_all(engine)

api_key = '150d5bff08a3c97e69c2417d726c084d'
ct = 1000
url = "http://api.petfinder.com/pet.find?key={}&location=94720&format=json&count={}".format(api_key, ct)

response = requests.get(url) # synchronous
payload = json.loads(response.text)
pets = payload['petfinder']['pets']['pet']

Session = sessionmaker(bind=engine)
session = Session()

for k,pet in enumerate(pets):
    if k < 100: continue
    id = int(pet['id']['$t'])
    name = pet['name']['$t']
    print(id)
    insert = Pet(id, name)
    session.add(insert)

try:
    session.commit()
except SQLAlchemyError as e:
    session.rollback()
    print (str(e)) 

