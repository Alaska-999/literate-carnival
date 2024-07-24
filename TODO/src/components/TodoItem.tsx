import { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { checkTodo, deleteTodo, editTodo } from "../store/slices/todosSlice";
import { ITodo } from "../types";

interface TodoItemProps {
	todoItem: ITodo;
}

function TodoItem({ todoItem }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState<Boolean>(false);
	const [newTitle, setNewTitle] = useState<string>(todoItem.title);

	const dispatch = useAppDispatch();

	const handleDeleteTodoItem = () => {
		dispatch(deleteTodo(todoItem.id));
	};

	const checkTodoItem = () => {
		dispatch(checkTodo(todoItem.id));
	};

	const handleEditTodo = () => {
		setIsEditing(!isEditing);
	};

	const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTitle(event.target.value);
	};

	const handleCancelEditing = () => {
		setIsEditing(false);
		setNewTitle(todoItem.title);
	};

	const handleSaveNewTitle = () => {
		if (!newTitle) return;
		const updatedTodoItem: ITodo = {
			done: todoItem.done,
			title: newTitle,
			id: todoItem.id,
		};
		dispatch(editTodo(updatedTodoItem));
		setIsEditing(false);
	};

	return (
		<TodoItemContainer>
			<TodoItemInfo>
				<DoneCheckox
					type='checkbox'
					checked={todoItem.done}
					onChange={checkTodoItem}
				/>
				{isEditing ? (
					<input
						type='text'
						value={newTitle}
						onChange={handleEditTitle}
					/>
				) : (
					<TodoItemTitle checked={todoItem.done}>{todoItem.title}</TodoItemTitle>
				)}
			</TodoItemInfo>
			<div>
				<Button onClick={isEditing ? handleSaveNewTitle : handleEditTodo}>
					{isEditing ? "Done" : "Edit"}
				</Button>
				{isEditing && <Button onClick={handleCancelEditing}>Cancel</Button>}
				<Button onClick={handleDeleteTodoItem}>Delete</Button>
			</div>
		</TodoItemContainer>
	);
}

const TodoItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 5px;
	background-color: #c8acd6;
	border-radius: 5px;
`;

const TodoItemInfo = styled.div``;

interface TodoItemTitleProps extends HTMLAttributes<HTMLDivElement> {
	checked: boolean;
}

const TodoItemTitle = styled.span<TodoItemTitleProps>`
	text-decoration: ${(props) => props.checked && "line-through"};
`;

const DoneCheckox = styled.input`
	display: inline-block;
	margin-right: 5px;
	cursor: pointer;
`;

const Button = styled.button`
	background-color: #2e236c;
	padding: 5px;
	border: none;
	outline: none;
	color: #e3c4f2;
	font-weight: 500;
	transition: all 0.2s;
	width: 50px;
	cursor: pointer;
	& + & {
		margin-left: 5px;
	}

	&:hover {
		background-color: #443887;
	}
`;

export default TodoItem;
