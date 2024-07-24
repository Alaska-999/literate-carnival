import { nanoid } from "nanoid";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addTodo } from "../store/slices/todosSlice";
import { ITodo } from "../types";

function AddTodoForm() {
	const [newTodoValue, setNewTodoValue] = useState<string>("");

	const dispatch = useAppDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoValue(event.target.value);
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newTodoValue) return;
		const newTodo: ITodo = {
			id: nanoid(),
			title: newTodoValue,
			done: false,
		};
		dispatch(addTodo(newTodo));
		setNewTodoValue("");
	};

	return (
		<Form onSubmit={submitHandler}>
			<Input
				type='text'
				value={newTodoValue}
				onChange={handleChange}
				placeholder='Type your todo'
			/>
			<FormButton type='submit'>Save</FormButton>
		</Form>
	);
}

const Form = styled.form`
	width: 100%;
	display: flex;
`;
const Input = styled.input`
	padding: 6px;
	width: 90%;
	outline: none;
`;
const FormButton = styled.button`
	width: 10%;
	cursor: pointer;
`;

export default AddTodoForm;
