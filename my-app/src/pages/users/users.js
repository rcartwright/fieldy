import React, { useEffect } from 'react'
import {fetchUsers, userSlice } from './../../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export function Users() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.users.status)
    const users = useSelector(state => state.users.users)
   // const status = userState.status;
   // console.log('userState', userState);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers())
        }
    }, [status, dispatch])

    function showUsers(users) {
        return users?.map((user) => {
            return user.email;
        })
    }

    let content;
    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'success') {
        console.log('users', users)
        content = <div>{showUsers(users)}</div>;
    } else if (status === 'error') {
        content = <div>error</div>;
    }

    return <div>{content}</div>



}