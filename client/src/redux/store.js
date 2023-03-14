import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from './cartRedux';
import userReducer from "./userRedux";
import storage from "redux-persist/lib/storage";
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";


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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER],
        },
    })
})

store.dispatch(getTotals());

export const persistor = persistStore(store);

