import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import {persistReducer , persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import productReducer from "./product/productsSlice";
import imagesReducer from './upload/uploadFileSlice';
import cartReducer from "./cart/cartSlice";
const rootReducer=combineReducers({
  user:userReducer,
  products:productReducer,
  images:imagesReducer,
  cart:cartReducer
// otherSlice: otherSliceReducer, // Exclude the slice you don't want to persist
})
const persistConfig={
    key:'root',
    storage,
    version:1,
    blacklist:['products','images']
    
      // blacklist: ['otherSlice'], // Exclude the slice you don't want to persist
}
const persistedReducer= persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor= persistStore(store)
