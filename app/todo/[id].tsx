import React from "react";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { View, Text, useThemeColor } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useTodoStore } from "@/stores/todos";
import Colors from "@/constants/Colors";

const TodoInfoPage = () => {
  const params = useGlobalSearchParams();
  const navigation = useNavigation();
  const store = useTodoStore();
  const todo = store.getTodoById(Number(params.id));

  const buttonBackground = useThemeColor({}, "buttonBackground");
  const iconColor = useThemeColor({}, "iconDefault");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const textSecondaryColor = useThemeColor({}, "textSecondary");
  const borderColor = useThemeColor(
    { light: "#eee", dark: "rgba(255,255,255,0.1)" },
    "background"
  );

  if (!todo)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Todo with this ID not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, backgroundColor }}>
        <View style={styles.content}>
          <TextInput
            multiline
            value={todo.text}
            onChangeText={(text) => store.updateTodo(todo.id, { text })}
            style={[
              styles.todoTextInput,
              { color: textColor, fontWeight: "500" },
            ]}
            placeholder="Todo title"
          />

          <View style={styles.fieldContainer}>
            <Ionicons
              name="reader-outline"
              size={24}
              color={iconColor}
              style={styles.fieldContainerIcon}
            />
            <TextInput
              multiline
              value={todo.description}
              onChangeText={(description) =>
                store.updateTodo(todo.id, { description })
              }
              style={[
                styles.fieldContainerContent,
                { color: textSecondaryColor, fontSize: 16, lineHeight: 22 },
              ]}
              placeholder="Todo's description"
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderColor }]}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: buttonBackground }]}
          onPress={() => {
            store.deleteTodo(todo.id);
            navigation.goBack();
          }}
        >
          <Ionicons name="trash-outline" size={20} color={Colors.red} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { flex: 1, backgroundColor: buttonBackground },
          ]}
          onPress={() => store.toggleCompleteTodo(todo.id)}
        >
          <Text style={{ textAlign: "center" }}>
            {todo.isCompleted ? "Mark as uncompleted!" : "Mark as completed!"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  todoTextInput: {
    fontSize: 24,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  actionButton: {
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  fieldContainerIcon: {
    marginTop: 8,
    marginRight: 12,
  },
  fieldContainerContent: {
    flex: 1,
  },
});

export default TodoInfoPage;
