export type TodoId = string;

export interface ITodo {
	title: string;
	done: boolean;
	id: string;
}

export interface TodosState {
	todos: ITodo[];
}
