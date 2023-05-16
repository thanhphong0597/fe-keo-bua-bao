


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_storage/slices/users.slice';
import Match from './Match';
import { authActions } from '../_storage/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import { match2Actions } from '../_storage/slices/match2.slice';

export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user.data);
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(userActions.getAll());
        dispatch(match2Actions.allMatch())

    }, []);
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(authActions.logout())
    }

    return (
        <div>
            <button onClick={handleLogout}>log out</button>
            <h1>Hi {user?.user_name}!</h1>
            <Match user_id={user?.id} />
        </div>
    );
}
