import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore,combineReducers } from "redux";
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import { Provider } from "react-redux";
import App from './App';




const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})


const store = createStore(reducer)


  ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <App/> 
    </Provider>
    )




