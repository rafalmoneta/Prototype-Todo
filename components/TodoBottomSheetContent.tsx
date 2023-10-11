import { StyleSheet } from "react-native";
import React from "react";
import { Text, View, useThemeColor } from "./Themed";
import {
  BottomSheetTextInput,
  TouchableOpacity,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useTodoStore } from "@/stores/todos";

const TodoBottomSheetContent = () => {
  // TODO: move to Zustand store or/and use ReactHookForm (!)
  // or use simple ref to store and update the value

  // why this is so slow when typing fast or deleting
  // what force rerender? BottomSheetTextInput? or Zustand?
  // or useBottomSheetModal?

  // const [newTodo, setNewTodo] = React.useState("");
  const newTodo = useTodoStore((state) => state.newTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const setNewTodo = useTodoStore((state) => state.setNewTodo);

  const { dismiss } = useBottomSheetModal();

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "iconDefault");

  return (
    <View style={styles.contentContainer}>
      <View>
        <Text>New Todo:</Text>
        <BottomSheetTextInput
          placeholder="Enter your todo"
          // value={newTodo}
          value={newTodo.text}
          autoCorrect={false}
          // onChangeText={(text) => setNewTodo(text)}
          onChangeText={(text) => setNewTodo(text)}
          style={[styles.createTodoTextInput, { color: textColor }]}
        />
      </View>

      <View style={styles.createTodoOptionsContainer}>
        <TouchableOpacity
          onPress={() => {
            dismiss();
            setNewTodo("");
          }}
          style={[styles.createTodoOptionsButton, { backgroundColor }]}
        >
          <Text style={{ color: textColor }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addTodo("WAITING");
            setNewTodo("");
          }}
          style={[styles.createTodoOptionsButton, { backgroundColor }]}
        >
          <Text style={{ color: textColor }}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  createTodoTextInput: {
    fontSize: 16,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createTodoOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  createTodoOptionsButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default TodoBottomSheetContent;
