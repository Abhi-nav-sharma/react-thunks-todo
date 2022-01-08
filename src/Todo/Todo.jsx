import { useDispatch } from "react-redux";
import {
  addTodo,
  addTodosFailure,
  addTodosRequest,
  addTodosSuccess
} from "../redux/app/action";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import { addTodos, getTodos } from "./api";

export default function Todo() {
  const dispatch = useDispatch();
  const handleAdd = (text) => {
    dispatch(addTodos(text)).then((res) => {
      dispatch(getTodos());
    });
  };
  return (
    <div>
      <div>
        <TodoInput onAdd={handleAdd} />
      </div>
      <TodoList />
    </div>
  );
}
