import React, { useEffect } from 'react'
import {fetchUsers, userSlice } from './../../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export function Users() {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userData)

    useEffect(() => {
        if (userState.status === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userState.status, dispatch])

    function showUsers(users) {
        return users?.map((user) => {
            return user.email;
        })
    }

    let content;
    if (userState.status === 'loading') {
        content = <div>Loading...</div>;
    } else if (userState.status === 'success') {
        console.log('userState.users', userState.users)
        content = <div>{showUsers(userState.users)}</div>;
    } else if (userState.status === 'error') {
        content = <div>error</div>;
    }

    return <div>{content}</div>



}