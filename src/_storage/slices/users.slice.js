import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../../_helpers/fetch-wrapper';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const userReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        users: { state: 0, message: '', data: [] }
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
        getAll: getAll()
    };

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`${baseUrl}/getAll`)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.users.state = 1;
            },
            [fulfilled]: (state, action) => {
                state.users.status = action.payload.status
                state.users.message = action.payload.message
                state.users.data = action.payload.data
            },
            [rejected]: (state) => {
                state.users.state = 3;

            }
        };
    }
}
