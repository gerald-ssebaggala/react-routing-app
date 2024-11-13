import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";
import { UserTodo } from "../dataTypes";
import { useFetchData } from "../Hooks/useFetchData";

export default function TodosPage() {
  const { fetchedData: todos, error } = useFetchData<UserTodo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  const todoList = todos?.map((todo) => (
    <Todo
      key={todo.id}
      id={todo.id}
      completed={todo.completed}
      title={todo.title}
    />
  ));

  return (
    <div className="todos-container">
      <h1>Todos</h1>
      {todos && <div className="todos">{todoList}</div>}
      {!error && !todos && <LoadingSpinner />}
      {error && <div className="error">Something went wrong.</div>}
    </div>
  );
}
