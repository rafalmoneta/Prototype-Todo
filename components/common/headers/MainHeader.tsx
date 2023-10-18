import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "../../Themed";

export const MainHeader = () => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <View style={styles.headerWrapper}>
        <Text>Custom Header</Text>
        <Text>There will be custom header</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
  },
  headerWrapper: {
    margin: 16,
    alignItems: "center",
  },
});
