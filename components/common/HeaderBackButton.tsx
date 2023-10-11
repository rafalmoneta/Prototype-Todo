import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../Themed";

const HeaderLeftButton = () => {
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

export default HeaderLeftButton;
