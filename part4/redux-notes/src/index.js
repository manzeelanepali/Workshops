import React from 'react';
import ReactDOM from 'react-dom/client';
// import {createStore,combineReducers } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
// import noteReducer,{appendNote} from './reducers/noteReducer';} from './reducers/noteReducer';
// import store from "./store"
// import noteReducer from './reducers/noteReducer';
// import filterReducer from './reducers/filterReducer';
import { Provider } from "react-redux";
import App from './App';
import store from './store';
// import { setNotes } from './reducers/noteReducer';












  ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <App/> 
    </Provider>
    )




