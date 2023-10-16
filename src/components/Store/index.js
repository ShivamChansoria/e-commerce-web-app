import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import mainReducer from '../../reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { configureStore} from "redux";


const persistConfig = {
    key: 'root',
    storage,
    version: 1
  }
  const persistedReducer = persistReducer(persistConfig, mainReducer)
  const store = createStore(
    persistedReducer, 
    {}, 
    composeWithDevTools(applyMiddleware(thunk))
    );
 export let persistor= persistStore(store);
 export default store;

  
