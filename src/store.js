import { createStore, combineReducers } from "redux";
import authReducer from './redux/authSlice';
import dataReducer from "./redux/dataSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer
});

const store = createStore(rootReducer);
export default store;