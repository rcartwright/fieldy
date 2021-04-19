import React, { useEffect } from 'react'
import {fetchUsers, userSlice } from './../../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export function Users() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userState)

    useEffect(() => {
        if (userData.status === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userData.status, dispatch])

    function showUsers(users) {
        return users?.map((user) => {
            return user.email;
        })
    }

    let content;
    if (userData.status === 'loading') {
        content = <div>Loading...</div>;
    } else if (userData.status === 'success') {
        console.log('userData.users', userData.users)
        content = <div>{showUsers(userData.users)}</div>;
    } else if (userData.status === 'error') {
        content = <div>{userData.error}</div>;
    }

    return <div>{content}</div>
}