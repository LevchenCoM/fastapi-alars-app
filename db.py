import os

from databases import Database
import sqlalchemy
from envparse import env

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
env.read_envfile(os.path.join(BASE_DIR, '.env'))

db = Database(os.environ.get('DB_URL'))
metadata = sqlalchemy.MetaData()
