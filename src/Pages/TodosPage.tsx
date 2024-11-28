import Buttons from "../components/Buttons";
import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";
import { useFetchTodos } from "../Hooks/useFetchTodos";

export default function TodosPage() {
  const {
    todos,
    error,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  } = useFetchTodos(10);

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
      {todos && (
        <Buttons
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </div>
  );
}
