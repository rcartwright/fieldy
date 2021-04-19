//import("react-redux").DefaultRootState)
import React, { useEffect } from 'react'
import {fetchUsers, userSlice, getUsers } from './../../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export function Users() {
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.users.status)
    const users = useSelector(state => state.users.users)
   // const users = useSelector(getUsers);
    console.log('users', users);

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])

    let content;

    if (userStatus === 'loading') {
        content = <div>Loading...</div>;
    } else if (userStatus === 'success') {
        console.log('users when success', users)
        function showUsers(users) {
            return users?.map((user) => {
                return user.email;
            })
        }

        content = <div>{showUsers(users)}</div>;
    } else if (userStatus === 'error') {
        content = <div>error</div>;
    }

    return <div>{content}</div>



}