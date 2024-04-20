import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../app/app.slice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {thunk} from 'redux-thunk';
import {combineReducers} from 'redux';
import navSlice from "../app/nav.slice";
import actualiteSlice from "../app/actualite.slice";
import publicationSlice from "../app/publication.slice"
import agendaSlice from "../app/agenda.slice";
import videoBlogSlice from "../app/video.slice"
import indexSlice from "../app/index.slice";
const persistConfig = {
    key: 'root',
    storage,
  }


const rootReducer = combineReducers({ 
    app: appSlice,
    nav: navSlice,
    index: indexSlice,
    actualites: actualiteSlice,
    publications: publicationSlice,
    agendas: agendaSlice,
    videoBlog: videoBlogSlice
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer:persistedReducer,
    middleware: () => [thunk]
})
export const persistor = persistStore(store)


