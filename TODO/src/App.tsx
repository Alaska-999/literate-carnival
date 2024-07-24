import styled from "styled-components";
import AddTodoForm from "./components/AddTodoForm";
import FlyingSecret from "./components/FLyingSecret";
import TodoList from "./components/TodoList";

function App() {
	return (
		<>
			<Container>
				<AddTodoForm />
				<TodoList />
			</Container>
			<FlyingSecret />
		</>
	);
}

const Container = styled.div`
	margin: 50px auto;
	width: 50%;
	min-width: 350px;
	max-width: 550px;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 10;
`;

export default App;
