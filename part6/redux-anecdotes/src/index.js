import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  message: messageReducer,
});

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
