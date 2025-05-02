import { createStore, combineReducers } from "redux";
import authReducer from './redux/authSlice';
import dataReducer from "./redux/dataSlice";
import categoryReducer from './redux/categorySlice';
import adminReducer from './redux/adminSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  categories: categoryReducer,
  admin: adminReducer
});

const store = createStore(rootReducer);
export default store;