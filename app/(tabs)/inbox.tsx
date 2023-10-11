import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View, useThemeColor } from "@/components/Themed";
import { TodosList } from "@/components/todo";
import Colors from "@/constants/Colors";
import { useTodoStore } from "@/stores/todos";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import TodoBottomSheet from "@/components/TodoBottomSheet";

export default function InboxScreen() {
  // const createTodoBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const backgroundColor = useThemeColor({}, "background");
  const todos = useTodoStore((state) => state.todos);

  // const handleOpenModal = () => {
  //   createTodoBottomSheetRef.current?.present();
  // };

  const todosWithInboxStatus = todos.filter(
    (todo) => !todo.isCompleted && todo.status === "INBOX"
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* <TodoBottomSheet ref={createTodoBottomSheetRef} /> */}

      <ScrollView>
        <View style={[styles.content, { marginBottom: 0 }]}>
          <Text style={styles.title}>Inbox</Text>
          <TodosList todos={todosWithInboxStatus} />
        </View>
      </ScrollView>

      {/* <View style={styles.footer}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Text style={{ textAlign: "center" }}>Add new task to the Inbox!</Text>
        </TouchableOpacity>
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
