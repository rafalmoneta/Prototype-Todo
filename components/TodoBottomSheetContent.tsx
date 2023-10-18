import { StyleSheet } from "react-native";
import React from "react";
import { Text, View, useThemeColor } from "./Themed";
import {
  BottomSheetTextInput,
  TouchableOpacity,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useTodoStore } from "@/stores/todos";
import { Select } from "./common/select";
import { TodoStatus } from "@/types/todo";

const TodoBottomSheetContent = () => {
  // TODO: move to Zustand store or/and use ReactHookForm (!)
  // or use simple ref to store and update the value

  // const [newTodo, setNewTodo] = React.useState("");
  const newTodo = useTodoStore((state) => state.newTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const setNewTodo = useTodoStore((state) => state.setNewTodo);

  const { dismiss } = useBottomSheetModal();

  const textColor = useThemeColor({}, "text");
  const textSecondaryColor = useThemeColor({}, "textSecondary");
  const textPlaceholderColor = useThemeColor({}, "textPlaceholder");
  const backgroundColor = useThemeColor({}, "buttonBackground");

  return (
    <View style={styles.contentContainer}>
      <View style={styles.contentInputsContainer}>
        <Text style={{ color: textSecondaryColor }}>New Todo:</Text>

        <BottomSheetTextInput
          placeholder="Enter your todo"
          value={newTodo.text}
          autoCorrect={false}
          onChangeText={(text) => setNewTodo({ text })}
          style={[styles.createTodoTextInput, { color: textColor }]}
          placeholderTextColor={textPlaceholderColor}
        />

        <BottomSheetTextInput
          multiline
          placeholder="Your todo description"
          value={newTodo.description}
          autoCorrect={false}
          onChangeText={(description) => setNewTodo({ description })}
          style={[
            styles.createTodoDescriptionInput,
            { color: textSecondaryColor },
          ]}
          placeholderTextColor={textPlaceholderColor}
        />

        <Select
          value={newTodo.status}
          placeholder="Select a Todo status"
          onSelect={(option) =>
            setNewTodo({ status: option.value as TodoStatus })
          }
          options={[
            { label: "Inbox", value: "INBOX" },
            { label: "Waiting", value: "WAITING" },
            { label: "Next Action", value: "NEXT-ACTION" },
            { label: "In Progress", value: "IN-PROGRESS" },
            { label: "Completed", value: "COMPLETED" },
          ]}
        />
      </View>

      <View style={styles.createTodoOptionsContainer}>
        <TouchableOpacity
          onPress={() => {
            dismiss();
            setNewTodo({ text: "", description: "" });
          }}
          style={[styles.createTodoOptionsButton, { backgroundColor }]}
        >
          <Text style={{ color: textColor }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addTodo(newTodo.status);
            setNewTodo({ text: "", description: "" });
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
    paddingBottom: 0,
  },
  contentInputsContainer: {
    marginBottom: 8,
  },
  createTodoTextInput: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 2,
    borderRadius: 8,
  },
  createTodoDescriptionInput: {
    fontSize: 14,
    marginBottom: 8,
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
