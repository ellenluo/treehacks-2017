import sqlalchemy
import psycopg2
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError

engine, Session = None, None
connected = False
Base = declarative_base()

class Pledge(Base):
    __tablename__ = 'pledges'
    id = Column(Integer, primary_key=True)
    user_id = Column(String(50), nullable=False)                              
    pet_id = Column(Integer, nullable=False)                              
    amount = Column(Integer, nullable=False)                              

    def __init__(self, user_id, pet_id, amount):
        self.user_id = str(user_id)
        self.pet_id = pet_id
        self.amount = amount

def connectDb():
    global engine
    global connected
    global Session
    
    if connected: return Session()
    user = 'perry'
    password = 'theplatypus'
    host = 'petron.ckcrv4vmtlra.us-west-2.rds.amazonaws.com'
    port = 5432
    database = 'petron'

    engine = create_engine('postgresql+psycopg2://{}:{}@{}:{}/{}'.format(user, password, host, port, database))
    connected = True
    Session = sessionmaker(bind=engine)
    return Session()

connectDb()
Base.metadata.create_all(engine)

