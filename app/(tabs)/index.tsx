import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View, useThemeColor } from "@/components/Themed";
import TodosList from "@/components/TodosList";
import Colors from "@/constants/Colors";
import { useTodoStore } from "@/stores/todos";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import TodoBottomSheet from "@/components/TodoBottomSheet";

export default function TodoScreen() {
  const createTodoBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const backgroundColor = useThemeColor({}, "background");
  const todos = useTodoStore((state) => state.todos);

  const handleOpenModal = () => {
    createTodoBottomSheetRef.current?.present();
  };

  const unCompletedTodo = todos.filter((todo) => !todo.isCompleted);
  const completedTodo = todos.filter((todo) => todo.isCompleted);
  const favoriteTodo = unCompletedTodo.filter((todo) => todo.isFavorite);
  const unfavoriteTodo = unCompletedTodo.filter((todo) => !todo.isFavorite);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <TodoBottomSheet ref={createTodoBottomSheetRef} />

      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Favorited Todos</Text>
          <TodosList todos={favoriteTodo} />
        </View>

        <View style={[styles.content, { marginBottom: 0 }]}>
          <Text style={styles.title}>All Todo</Text>
          <TodosList todos={unfavoriteTodo} />
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View style={styles.content}>
          <Text style={styles.title}>Completed</Text>
          <TodosList todos={completedTodo} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Text style={{ textAlign: "center" }}>Add new task!</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.footer}>
        <Text style={{ textAlign: "center" }}>Footer with finished tasks</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    borderTopWidth: 0.25,
    borderTopColor: Colors.dark.tabIconDefault,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
});
