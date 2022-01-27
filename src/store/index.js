import { configureStore } from '@reduxjs/toolkit'
import reducer from '../reducers'
import { createStore } from 'redux'
 
// const store = configureStore({
//   reducer: {reducer},
//   middleware: getDefaultMiddleware => getDefaultMiddleware(),
//   devTools: process.env.NODE_ENV !== 'production'
// })

const store =  createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;