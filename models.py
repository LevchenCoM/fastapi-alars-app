from db import db, metadata, sqlalchemy
from schemas import User, UserCreate, User

users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("username", sqlalchemy.String),
    sqlalchemy.Column("password", sqlalchemy.String),
    sqlalchemy.Column("first_name", sqlalchemy.String),
    sqlalchemy.Column("last_name", sqlalchemy.String),
    sqlalchemy.Column("is_admin", sqlalchemy.Boolean),
)


class UserService:
    @classmethod
    async def get_by_id(cls, user: User, user_id):
        query = users.select().where(users.c.id == user_id)
        user = await db.fetch_one(query)
        return User(**user) if user else None

    @classmethod
    async def get_by_username(cls, username, create=False):
        query = users.select().where(users.c.username == username)
        user = await db.fetch_one(query)
        if create:
            return UserCreate(**user)
        else:
            return User(**user)

    @classmethod
    async def has_duplicates_by_username(cls, user_id, username):
        query = users.select().where(users.c.username == username).where(users.c.id != user_id)
        user = await db.fetch_one(query)
        return True if user else False

    @classmethod
    async def create(cls, user):
        query = users.insert().values(**user, is_admin=False)
        user_id = await db.execute(query)
        return user_id

    @classmethod
    async def update(cls, user_id, user):
        query = users.update().where(users.c.id == user_id).values(**user)
        user_id = await db.execute(query)
        return user_id

    @classmethod
    async def delete(cls, user_id):
        query = users.delete().where(users.c.id == user_id)
        await db.execute(query)

    @classmethod
    async def get_all_users(cls):
        query = users.select()
        users_list = await db.fetch_all(query)
        return [User(**u) for u in users_list]
