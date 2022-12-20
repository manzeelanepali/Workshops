import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore } from "redux";
import noteReducer from './reducers/noteReducer';



const store = createStore(noteReducer)







const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
}
renderApp()


store.subscribe(renderApp)