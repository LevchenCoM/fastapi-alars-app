from . import auth
from . import website
from . import users

routers = (
    auth.router,
    users.router,
    website.router
)
