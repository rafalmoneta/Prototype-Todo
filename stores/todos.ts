import { Todo, TodoStatus } from "@/types/todo";
import { create } from "zustand";

interface TodoState {
  todos: Todo[];
  newTodo: Omit<Todo, "id">;
  setNewTodo: (newTodo: string) => void;
  addTodo: (todo: TodoStatus) => void;
  toggleCompleteTodo: (id: number) => void;
  toggleFavoriteTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, todoFields: Partial<Todo>) => void;
  moveToInbox: (id: number) => void;
}

const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Join Software Mansion",
    status: "COMPLETED",
    isCompleted: true,
    isFavorite: true,
  },
  {
    id: 2,
    text: "Go to the gym",
    status: "WAITING",
    isCompleted: false,
    isFavorite: false,
  },
  {
    id: 3,
    text: "Start a pomodoro timer",
    status: "WAITING",
    isCompleted: false,
    isFavorite: false,
  },
  {
    id: 4,
    text: "Buy a new phone",
    status: "WAITING",
    isCompleted: false,
    isFavorite: false,
  },
  {
    id: 5,
    text: "Add async storage",
    status: "WAITING",
    isCompleted: false,
    isFavorite: true,
  },
  {
    id: 6,
    text: "Create Todo Screen",
    isCompleted: false,
    status: "INBOX",
    isFavorite: true,
  },
  {
    id: 7,
    text: "Make Inbox Functionality",
    isCompleted: false,
    status: "WAITING",
    isFavorite: false,
  },
  {
    id: 8,
    text: "Fix Dark Theme",
    status: "WAITING",
    isCompleted: false,
    isFavorite: false,
  },
];

export const initialNewTodo = {
  text: "",
  status: "INBOX" as TodoStatus,
  isCompleted: false,
  isFavorite: false,
};

const addTodo = (
  todos: Todo[],
  todoText: string,
  todoStatus: TodoStatus
): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text: todoText,
    status: todoStatus,
    isCompleted: false,
    isFavorite: false,
  },
];

const deleteTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const updateTodo = (todos: Todo[], id: number, todoFields: Partial<Todo>) =>
  todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, ...todoFields };
    }
    return todo;
  });

const toggleCompleteTodo = (todos: Todo[], id: number) =>
  todos.map((todo) => ({
    ...todo,
    isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
  }));

const toggleFavoriteTodo = (todos: Todo[], id: number) =>
  todos.map((todo) => ({
    ...todo,
    isFavorite: todo.id === id ? !todo.isFavorite : todo.isFavorite,
  }));

export const useTodoStore = create<TodoState>()((set) => ({
  todos: [...initialTodos],
  newTodo: initialNewTodo,
  setNewTodo: (newTodoText: string) =>
    set((state) => ({
      ...state,
      newTodo: { ...state.newTodo, text: newTodoText },
    })),
  addTodo: (todoStatus: TodoStatus) =>
    set((state) => ({
      ...state,
      todos: addTodo(state.todos, state.newTodo.text, todoStatus),
      newTodo: initialNewTodo,
    })),
  deleteTodo: (id: number) =>
    set((state) => ({
      ...state,
      todos: deleteTodo(state.todos, id),
    })),
  updateTodo: (id: number, todoFields: Partial<Todo>) =>
    set((state) => ({
      ...state,
      todos: updateTodo(state.todos, id, todoFields),
    })),
  toggleCompleteTodo: (id: number) =>
    set((state) => ({
      ...state,
      todos: toggleCompleteTodo(state.todos, id),
    })),
  toggleFavoriteTodo: (id: number) =>
    set((state) => ({
      ...state,
      todos: toggleFavoriteTodo(state.todos, id),
    })),
  moveToInbox: (id: number) =>
    set((state) => ({
      ...state,
      todos: updateTodo(state.todos, id, { status: "INBOX" }),
    })),
}));
