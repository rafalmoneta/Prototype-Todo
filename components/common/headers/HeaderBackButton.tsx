import { TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../../Themed";

export const HeaderBackButton = () => {
  const navigation = useNavigation();
  const iconColors = useThemeColor(
    { light: "#222", dark: "#FFF" },
    "iconDefault"
  );

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" color={iconColors} size={24} />
    </TouchableOpacity>
  );
};
