import { configureStore } from '@reduxjs/toolkit';
import { matchReducer } from './slices/match.slice';
import { userReducer } from './slices/users.slice';
import { authReducer } from './slices/auth.slice';
import { match2Reducer } from './slices/match2.slice';
import { roundReducer } from './slices/round.slice';
// import socket from './socketService';

// const socketMiddleware = (storeAPI) => {
//   return (next) => (action) => {
//     if (typeof action === 'function') {
//       // If the action is a thunk, invoke it with the necessary arguments
//       return action({ socket, ...storeAPI });
//     }

//     // Pass the action through to the next middleware
//     return next(action);
//   };
// };

export const store = configureStore({
  reducer: {
    match: match2Reducer,
    round: roundReducer,
    users: userReducer,
    auth: authReducer
  }
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});


export default store;
