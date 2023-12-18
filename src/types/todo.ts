export type CreateTodoInput = {
  title: string;
  content: string;
};

export type UpdateTodoInput = {
  id: string;
  isDone: boolean;
};

export type DeleteTodoInput = {
  id: string;
};

export type Todo = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

export type FirebaseTodo = {
  title: string;
  content: string;
  isDone: boolean;
};
