import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todosReducer from "./slices/todosSlice";

const persistConfig = {
	key: "root",
	storage,
};

const persistedTodosReducer = persistReducer(persistConfig, todosReducer);

const store = configureStore({
	reducer: {
		todos: persistedTodosReducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
export default store;

export const persistor = persistStore(store);
