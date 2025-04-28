import { createStore, combineReducers } from "redux";
import authReducer from './redux/authSlice';
import dataReducer from "./redux/dataSlice";
import categoryReducer from './redux/categorySlice';


const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  categories: categoryReducer
});

const store = createStore(rootReducer);
export default store;