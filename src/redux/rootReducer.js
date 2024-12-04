import regReducer from "./slice"
import storage from "redux-persist/lib/storage"   // Use localStorage
import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"


const regPersistConfig={
    key:"user",
    storage,
    whiteList:["register"],
};

const rootReducer=combineReducers({
    user:persistReducer(regPersistConfig,regReducer)
})

export default rootReducer;