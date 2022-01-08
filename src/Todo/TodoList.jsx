import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  removeTodo,
  toggleTodo
} from "../redux/app/action";
import { getTodos } from "./api";

function TodoItem({ title, status, id, onDelete, onToggle }) {
  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <div>{title}-</div>
      <div>{`${status}`}</div>
      <button
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          onToggle(id);
        }}
      >
        Toggle
      </button>
    </div>
  );
}

export default function TodoList() {
  const { todos, isLoading, isError } = useSelector(
    (state) => state.app,
    shallowEqual
  );
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };

  const getTodo = () => {
    dispatch(getTodos());
  };
  useEffect(() => {
    getTodo();
  }, []);

  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {todos.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            status={item.status}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        );
      })}
    </div>
  );
}
