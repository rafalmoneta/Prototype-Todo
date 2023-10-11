import React from "react";
import { StyleSheet } from "react-native";

import TodoItem from "./TodoItem";
import { View } from "../Themed";
import { Todo } from "@/types/todo";

interface TodosListProps {
  todos: Todo[];
}

export const TodosList = ({ todos }: TodosListProps) => {
  return (
    <View style={styles.todoListContainer}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  todoListContainer: {
    marginTop: 16,
    gap: 8,
  },
});