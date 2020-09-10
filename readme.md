# Installation guide

### Requirenments:

* python3.7+
* virtualenv

First of all - download the project:

```
git clone https://github.com/LevchenCoM/fastapi-alarstudio-app.git
```

Then create virtualenv

```
python3 -m venv venv
```
Note - you can use any suitable for you method to create virtualenv.

Then install requirenments.
Activate your virtualenv and do next steps:

```
cd alarstudios_app
pip install -r requirenments.txt
```

To start app you need to have a database. To set database url for our projects we should create .env file in root folder. You can use .env.sample:
```
cp .env.sample .env
```

Then set DB_URL in .env. Example:
```
DB_URL=postgresql://username:password@localhost:5432/db_name
```

Now we can run alembic migrations to create all tables and create superuser:

```
alembic upgrade head
```

Now you can run app using code below:

```
uvicorn main:app --reload
```

Go to http://localhost:8000 and enjoy!

Note: Username and password for super-user - "admin"
