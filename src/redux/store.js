import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import authReducer from "./auth/reducer";
import appReducer from "./app/reducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({ auth: authReducer, app: appReducer });

const networkRequestMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    const func = action;
    return func(store.dispatch, store.getState);
  } else {
    return next(action);
  }
};

// const loggerMiddleWare = (store) => (next) => (action) => {
//   console.log("Dispatching the action in 1", action);
//   console.log(store.getState());
//   const value = next(action);
//   console.log(value);
//   console.log(store.getState());
//   console.log("end of 1");
// };
// const loggerMiddleWare2 = (store) => (next) => (action) => {
//   console.log("Dispatching the action in 2", action);
//   console.log(store.getState());
//   const value = next(action);
//   console.log(value);
//   console.log(store.getState());
//   console.log("end of 2");
//   return "value";
// };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnhancers(applyMiddleware(networkRequestMiddleware))
);

// function loggerMiddleWare() {
//   return function (next) {
//     return function (action) {
//       console.log("Dispatching the action", action);
//     };
//   };
// }

console.log(store.getState());
