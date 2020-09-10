from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

router = APIRouter()

templates = Jinja2Templates(directory="templates")


@router.get('/auth', response_class=HTMLResponse)
async def auth(request: Request):
    return templates.TemplateResponse("auth.html", {"request": request})


@router.get('/', response_class=HTMLResponse)
async def users_list(request: Request):
    return templates.TemplateResponse("users_list.html", {"request": request})


@router.get('/users/create', response_class=HTMLResponse)
async def users_create(request: Request):
    return templates.TemplateResponse("user_create_page.html", {"request": request})


@router.get('/users/{user_id}', response_class=HTMLResponse)
async def users_page(request: Request):
    return templates.TemplateResponse("user_page.html", {"request": request})
