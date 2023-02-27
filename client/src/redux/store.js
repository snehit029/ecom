import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartReducer from './cartRedux';
import userReducer from "./userRedux";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";


const persistConfig = {
    key: 'root',
    storage,
  }
  

const rootReducer = combineReducers({
    cart: cartReducer,
        auth: userReducer
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer: persistedReducer,
    
    devTools: true, 
    middleware: [thunk]  
})

export const persistor = persistStore(store);

