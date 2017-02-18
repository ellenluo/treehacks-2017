import postgresql
user = 'perry'
password = 'theplatypus'
host = '35.167.211.19'
port = 5432
database = petron

db = postgresql.open('pq://{}:{}@{}:{}/{}'.format(user, password, host, port, database)

