import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth.slice";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use local storage
import { baseApi } from "./services/api";

const rootReducer = combineReducers({
  auth: AuthReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "to-do", // Root key in storage
  storage, // Use local storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);
