import os

from databases import Database
import sqlalchemy
from envparse import env

import settings

BASE_DIR = os.path.dirname(__file__)
env.read_envfile(os.path.join(BASE_DIR, '.env'))

db = Database(settings.DB_URL)
metadata = sqlalchemy.MetaData()
