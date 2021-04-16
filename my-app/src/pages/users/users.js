//import("react-redux").DefaultRootState)
import { fetchUsers, userSlice } from './../../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export function Users() {
    // const dispatch = useDispatch();
    // const users = dispatch(fetchUsers());
    const users = useSelector(state => state.users)

    function showUsers(users) {
        return users?.map((user) => {
            return user.email;
        })
    }

    return (
        <div>{showUsers(users)}</div>
    )
}