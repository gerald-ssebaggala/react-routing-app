interface TodoProps {
  id?: number;
  title: string;
  completed: boolean;
}

export default function Todo({ title, completed }: TodoProps) {
  return (
    <ul className="todos-list">
      <li className={completed ? "todo" : "finished"}>{title}</li>
    </ul>
  );
}
