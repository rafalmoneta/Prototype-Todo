import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Text, View, useThemeColor } from "../Themed";
import { useTodoStore } from "@/stores/todos";
import { Todo } from "@/types/todo";
import { Link } from "expo-router";

const TodoItem = ({ todo }: { todo: Todo }) => {
  // TODO: move or think about that - it should be moved up
  // case: when you dont want to display inbox icon
  // and it is not reusable
  const toggleCompleteTodo = useTodoStore((state) => state.toggleCompleteTodo);
  const toggleFavoriteTodo = useTodoStore((state) => state.toggleFavoriteTodo);
  const moveToInbox = useTodoStore((state) => state.moveToInbox);
  const iconColors = useThemeColor({}, "iconDefault");

  const isTodoChecked = todo.isCompleted;

  return (
    <View style={styles.todoItemContainer}>
      <BouncyCheckbox
        disableBuiltInState
        fillColor={iconColors}
        unfillColor={"transparent"}
        iconStyle={{ borderColor: iconColors, borderRadius: 4 }}
        innerIconStyle={{
          borderColor: iconColors,
          borderRadius: 4,
        }}
        isChecked={isTodoChecked}
        onPress={() => toggleCompleteTodo(todo.id)}
      />

      <Link asChild href={`/todo/${todo.id}`} style={styles.todoItemText}>
        <TouchableOpacity>
          <Text
            style={{
              textDecorationLine: isTodoChecked ? "line-through" : "none",
            }}
            numberOfLines={1}
          >
            {todo.text}
          </Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.todoItemOptions}>
        <TouchableOpacity onPress={() => moveToInbox(todo.id)}>
          <Ionicons
            name="file-tray-full-outline"
            size={24}
            color={iconColors}
          />
        </TouchableOpacity>

        {/* TODO: Move to seperated component? */}
        <TouchableOpacity onPress={() => toggleFavoriteTodo(todo.id)}>
          <Ionicons
            name={todo.isFavorite ? "star" : "star-outline"}
            size={24}
            color={todo.isFavorite ? "#FFE900" : iconColors}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
  todoItemOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  todoItemText: {
    flex: 1,
    marginRight: 16,
  },
});

export default TodoItem;
