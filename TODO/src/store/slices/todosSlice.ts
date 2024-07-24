import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Store } from "..";
import { ITodo, TodoId } from "../../types";

const initialState = {
	todos: [] as ITodo[],
};

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<ITodo>) => {
			console.log(action.payload);

			state.todos = [...state.todos, action.payload];
		},
		deleteTodo: (state, action: PayloadAction<TodoId>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		checkTodo: (state, action: PayloadAction<TodoId>) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
			);
		},

		editTodo: (state, action: PayloadAction<ITodo>) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
			);
		},
	},
});

export const { addTodo, deleteTodo, checkTodo, editTodo } = todosSlice.actions;

export const selectTodos = (store: Store) => store.todos.todos;

export default todosSlice.reducer;
