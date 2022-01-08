import {
  addTodosFailure,
  addTodosRequest,
  addTodosSuccess,
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess
} from "../redux/app/action";

export const getTodos = () => (dispatch) => {
  const requestAction = getTodosRequest();
  dispatch(requestAction);
  return fetch("https://json-server-mocker-kittu.herokuapp.com/tasks")
    .then((res) => res.json())
    .then((res) => {
      const successAction = getTodosSuccess(res);
      dispatch(successAction);
    })
    .catch((res) => {
      const failureAction = getTodosFailure();
      dispatch(failureAction);
    });
};

export const addTodos = (text) => (dispatch) => {
  const requestAction = addTodosRequest();
  dispatch(requestAction);
  return fetch("https://json-server-mocker-kittu.herokuapp.com/tasks", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: text,
      status: false
    })
  })
    .then((res) => res.json())
    .then((res) => {
      const successAction = addTodosSuccess(res);
      dispatch(successAction);
    })
    .catch((res) => {
      const failureAction = addTodosFailure();
      dispatch(failureAction);
    });
};
