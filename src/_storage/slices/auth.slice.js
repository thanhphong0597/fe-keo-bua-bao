import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { history } from '../../_helpers/history';
import { fetchWrapper } from '../../_helpers/fetch-wrapper';


// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        role: '',
        status: 'watting',
        error: null
    }
}

function createReducers() {
    return {
        logout,
        roleChange,
        statusChange
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/login');
    }
    function roleChange(state, action) {
        //action = 'master' - 'client'
        state.role = action.payload
    }
    function statusChange(state, action) {
        //acton = 'playing' 'waitting'
        state.status = action.payload
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
        login: login()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ user_name, password }) => await fetchWrapper.post(`${baseUrl}/login`, { user_name, password })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
