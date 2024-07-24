import styled from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectTodos } from "../store/slices/todosSlice";
import TodoItem from "./TodoItem";

function TodoList() {
	const todos = useAppSelector(selectTodos);

	return (
		<TodoListContainer>
			{todos?.map((todoItem) => (
				<TodoItem
					todoItem={todoItem}
					key={todoItem.id}
				/>
			))}
		</TodoListContainer>
	);
}

export default TodoList;

const TodoListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 5px;
	margin-top: 10px;
`;
