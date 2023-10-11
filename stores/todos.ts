import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Todo, TodoStatus } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  newTodo: Omit<Todo, "id">;
  setNewTodo: (todoFields: Partial<Todo>) => void;
  addTodo: (todo: TodoStatus) => void;
  toggleCompleteTodo: (id: number) => void;
  toggleFavoriteTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, todoFields: Partial<Todo>) => void;
  moveToInbox: (id: number) => void;
  getTodoById: (id: number) => Todo | undefined;
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
  description: "",
  isCompleted: false,
  isFavorite: false,
};

const addTodo = (
  todos: Todo[],
  todoFields: Pick<Todo, "text" | "description" | "status">,
) => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    isCompleted: false,
    isFavorite: false,
    ...todoFields,
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

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [...initialTodos],
      newTodo: initialNewTodo,
      setNewTodo: (todoFields: Partial<Todo>) =>
        set((state) => ({
          ...state,
          newTodo: { ...state.newTodo, ...todoFields },
        })),
      addTodo: (todoStatus: TodoStatus) =>
        set((state) => ({
          ...state,
          todos: addTodo(state.todos, {
            ...state.newTodo,
            status: todoStatus,
          }),
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
      getTodoById: (id: number) => get().todos.find((todo) => todo.id === id),
    }),
    {
      name: "todos-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
