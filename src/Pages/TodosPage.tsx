import Buttons from "../components/Buttons";
import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";
import { UserTodo } from "../dataTypes";
import { useDataFetch } from "../Hooks/useDataFetch";


export default function TodosPage() {
  // const { paginatedData: todos, error, handleNextPage,
  //   handlePrevPage,
  //   hasNextPage,
  //   hasPrevPage} = useFetchData<UserTodo>(
  //   "https://jsonplaceholder.typicode.com/todos"
  // );

  const {
    fetchedData: todos,
    error,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  } = useDataFetch<UserTodo[]>("todos", 10);

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
