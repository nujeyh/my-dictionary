// npm install --save redux react-redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import dictionary from "./modules/dictionary";

// 미들웨어를 하나로 합친다.
const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);

// 리듀서들을 합쳐서 스토어를 만든다.
const rootReducer = combineReducers({ dictionary });
const store = createStore(rootReducer, enhancer);

export default store;
