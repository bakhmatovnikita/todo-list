const initialState = {
  todos: [
    {
      title: '',
      isDelite: false,
      isImportant: false,
      isDone: false,
      id: new Date(),
    },
  ],
  count: 0,
};
const ADD_TASK = 'ADD_TASK';
const DELITE_TASK = 'DELITE_TASK';
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.title,
            isDelite: false,
            isImportant: false,
            isDone: false,
            id: new Date(),
          },
        ],
        count: state.count + 1,
      };
    }
    case DELITE_TASK: {
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.id),
        count: state.count - 1,
      };
    }
    default:
      return state;
  }
};

export const addTask = (title) => {
  return (dispatch) => {
    return dispatch({ type: ADD_TASK, title });
  };
};
export const deliteTask = (id) => {
  return (dispatch) => {
    return dispatch({ type: DELITE_TASK, id });
  };
};
