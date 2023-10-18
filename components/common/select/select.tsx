import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/components/Themed";
import { Option, Options } from "./options";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface SelectProps {
  value?: string;
  placeholder: string;
  options: Option[];
  onSelect: (option: Option) => void;
}

export const Select = ({
  onSelect,
  options,
  value,
  placeholder = "",
}: SelectProps) => {
  const selectTypeBottomSheedModal = React.useRef<BottomSheetModal>(null);
  const backgroundColor = useThemeColor({}, "buttonBackground");

  const handleOnSelect = (option: Option) => {
    onSelect(option);
    selectTypeBottomSheedModal.current?.dismiss();
  };

  const handleOnPress = () => {
    selectTypeBottomSheedModal.current?.present();
  };

  return (
    <>
      <TouchableOpacity onPress={handleOnPress}>
        <View style={[styles.selectButtonContainer, { backgroundColor }]}>
          <Text>{value ?? placeholder}</Text>
          <Ionicons name="list" />
        </View>
      </TouchableOpacity>

      <Options
        ref={selectTypeBottomSheedModal}
        options={options}
        onSelect={handleOnSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  selectButtonContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
});
