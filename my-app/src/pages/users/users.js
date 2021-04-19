import React, { useEffect } from 'react'
import {fetchUsers, userSlice } from './../../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/layout.js'

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

    return <Layout>{content}</Layout>
}



        //   <Grid container spacing={3}>
        //     {/* Chart */}
        //     <Grid item xs={12} md={8} lg={9}>
        //       <Paper className={fixedHeightPaper}>
        //         Chart
        //       </Paper>
        //     </Grid>
        //     {/* Recent Deposits */}
        //     <Grid item xs={12} md={4} lg={3}>
        //       <Paper className={fixedHeightPaper}>
        //         Deposits
        //       </Paper>
        //     </Grid>
        //     {/* Recent Orders */}
        //     <Grid item xs={12}>
        //       <Paper className={classes.paper}>
        //         Orders
        //       </Paper>
        //     </Grid>
        //   </Grid>