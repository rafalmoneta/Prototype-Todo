export type TodoStatus =
  | "INBOX"
  | "WAITING"
  | "NEXT-ACTION"
  | "IN-PROGRESS"
  | "COMPLETED"; // probably not needed

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
  isCompleted: boolean;
  isFavorite: boolean;
}
