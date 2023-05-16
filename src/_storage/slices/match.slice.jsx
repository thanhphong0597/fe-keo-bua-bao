import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from '../../_helpers/fetch-wrapper'


const name = 'match'
const initialState = createInitialState();
const reducers = createReducers()
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers })


export const matchActions = { ...slice.actions, ...extraActions }
export const matchReducer = slice.reducer

function createInitialState() {
    return {
        match: { status: 0, message: '', data: {} },
        matchAll: { status: 0, message: '', data: [] },
        matchId: 0,
        user1: null,
        user2: null,
        status: null

    }
}

function createReducers() {
    return {
        clearMatch,
        matchId
    }
    function clearMatch(state) {
        state.id = null
    }
    function matchId(state, action) {
        state.id = action.payload
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/matches`;

    return {
        createMatch: createMatch(),
        joinMatch: joinMatch(),
        findMatch: findMatch(),
        allMatch: allMatch(),
        join: join(),
        find: find(),
        // find3: find3()
    }

    function createMatch() {

        return createAsyncThunk(
            `${name}/create`,
            async () => {
                return fetchWrapper.post(`${baseUrl}/create`)
            }
        )
    }
    function join() {

        return createAsyncThunk(
            `${name}/join2`,
            async (matchId) => await fetchWrapper.get(`${baseUrl}/join/${matchId}`)

        )
    }
    function joinMatch() {

        return createAsyncThunk(
            `${name}/joins`,
            async (matchId) => await fetchWrapper.get(`${baseUrl}/join/${matchId}`)

        )
    }
    function findMatch() {

        return createAsyncThunk(
            `${name}/find`,
            async (id) => {
                return await fetchWrapper.get(`${baseUrl}/find/${id}`)
            }
        )
    }
    function find() {

        return createAsyncThunk(
            `${name}/find2`,
            async (id) => {
                return await fetchWrapper.get(`${baseUrl}/find/${id}`)
            }
        )
    }
    // function find3() {

    //     return createAsyncThunk(
    //         `${name}/find3`,
    //         async (id) => {
    //             return await fetchWrapper.get(`${baseUrl}/find/${id}`)
    //         }
    //     )
    // }
    function allMatch() {

        return createAsyncThunk(
            `${name}/all`,
            async () => {
                return await fetchWrapper.get(`${baseUrl}/allMatch`)
            }
        )
    }
}


function createExtraReducers() {
    return {
        ...createMatch(),
        ...joinMatch(),
        ...findMatch(),
        ...allMatch(),
        ...join(),
        ...find(),
        // ...find3(),
    }

    // matchId: 0,
    // user1: null,
    // user2: null,
    // state: null
    function createMatch() {
        var { pending, fulfilled, rejected } = extraActions.createMatch;
        return {
            [pending]: (state) => {
                state.match.status = 1
            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1 = action.payload.data.user_id_1
                state.status = action.payload.data.status

            },
            [rejected]: (state) => {
                state.user.status = 2
            }
        }

    }
    function join() {
        var { pending, fulfilled, rejected } = extraActions.join;
        return {
            [pending]: (state) => {
                state.match.status = 1
            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1 = action.payload.data.user_id_1
                state.user2 = action.payload.data.user_id_2
                state.status = action.payload.data.status

            },
            [rejected]: (state) => {
                state.user.status = 2
            }
        }

    }
    function joinMatch() {
        var { pending, fulfilled, rejected } = extraActions.joinMatch;
        return {
            [pending]: (state) => {
                state.test.status = 3
            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1 = action.payload.data.user_id_1
                state.user2 = action.payload.data.user_id_2
                state.status = action.payload.data.status
            },
            [rejected]: (state) => {
                state.status = 2
            }
        }

    }
    function findMatch() {
        var { pending, fulfilled, rejected } = extraActions.findMatch;
        return {
            [pending]: (state) => {
                state.test.status = 3
            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1 = action.payload.data.user_id_1
                state.user2 = action.payload.data.user_id_2
                state.status = action.payload.data.status
            },
            [rejected]: (state) => {
                state.status = 2
            }
        }

    }
    function find() {
        var { pending, fulfilled, rejected } = extraActions.find;
        return {
            [pending]: (state) => {
                state.test.status = 3
            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1 = action.payload.data.user_id_1
                state.user2 = action.payload.data.user_id_2
                state.status = action.payload.data.status
            },
            [rejected]: (state) => {
                state.status = 2
            }
        }

    }
    // function find3() {
    //     var { pending, fulfilled, rejected } = extraActions.find3;
    //     return {
    //         [pending]: (state) => {
    //             state.test.status = 3
    //         },
    //         [fulfilled]: (state, action) => {
    //             state.matchId = action.payload.data.id
    //             state.user1 = action.payload.data.user_id_1
    //             state.user2 = action.payload.data.user_id_2
    //             state.status = action.payload.data.status
    //         },
    //         [rejected]: (state) => {
    //             state.status = 2
    //         }
    //     }

    // }
    function allMatch() {
        var { pending, fulfilled, rejected } = extraActions.allMatch;
        return {
            [pending]: (state) => {
                state.matchAll.status = 1
            },
            [fulfilled]: (state, action) => {
                state.matchAll.status = action.payload.status
                state.matchAll.message = action.payload.message
                state.matchAll.data = action.payload.data
            },
            [rejected]: (state) => {
                state.user.status = 2
            }
        }

    }

}

// async function emitSocketEvent(eventName, eventData) {
//     socket.emit(eventName, eventData);
// }
