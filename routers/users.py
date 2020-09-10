from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response, status

from core.users.auth import get_current_user_or_401, get_password_hash
from models import UserService
from schemas import User, UserCreate, User

router = APIRouter()


@router.get('/api/me', response_model=User)
async def get_users_list(user: User = Depends(get_current_user_or_401)):
    return user


@router.get('/api/users', response_model=List[User])
async def get_users_list(user: User = Depends(get_current_user_or_401)):
    users = await UserService.get_all_users()
    return users


@router.post('/api/users')
async def create_user(new_user: UserCreate, response: Response, user: User = Depends(get_current_user_or_401)):
    new_user.password = get_password_hash(new_user.password)
    await UserService.create(new_user.dict())
    response.status_code = status.HTTP_201_CREATED


@router.get('/api/users/{user_id}', response_model=User)
async def get_user(user_id: int, user: User = Depends(get_current_user_or_401)):
    user = await UserService.get_by_id(user, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Item not found")
    return user


@router.put('/api/users/{user_id}', response_model=User)
async def update_user(user_id: int, user: User, current_user: User = Depends(get_current_user_or_401)):
    user_exist = await UserService.get_by_id(current_user, user_id)
    if user_exist:
        if await UserService.has_duplicates_by_username(user_id, user.username):
            raise HTTPException(status_code=422, detail="User with this username already exist.")
        else:
            await UserService.update(current_user, user_id, user.dict())
    else:
        raise HTTPException(status_code=404, detail="Item not found")


@router.delete('/api/users/{user_id}')
async def delete_user(user_id: int, response: Response, user: User = Depends(get_current_user_or_401)):
    await UserService.delete(user_id)
    response.status_code = status.HTTP_204_NO_CONTENT
