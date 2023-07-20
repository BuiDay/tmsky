import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit';

const reduxStore = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore