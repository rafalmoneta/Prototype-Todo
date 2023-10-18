import { Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

export type Option = { label: string; value: string | number };

interface OptionsProps {
  options: Option[];
  onSelect: (option: Option) => void;
  value?: string | number;
}

interface OptionItemProps extends PressableProps {
  selected?: boolean;
  label: string;
}

function keyExtractor(item: Option) {
  return `select-item-${item.value}`;
}

const Option = React.memo(
  ({ label, selected = false, ...props }: OptionItemProps) => {
    return (
      <Pressable style={styles.optionItem} {...props}>
        <Text>{label}</Text>
        {selected && <Ionicons name="checkmark" />}
      </Pressable>
    );
  }
);

export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  ({ options, onSelect, value }, ref) => {
    const snapPoints = React.useMemo(() => ["30%"], []);

    const renderSelectItem = React.useCallback(
      ({ item }: { item: Option }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          selected={value === item.value}
          onPress={() => onSelect(item)}
        />
      ),
      [onSelect, value]
    );

    const renderBackdrop = React.useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        overDragResistanceFactor={0}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        // backgroundStyle={{ backgroundColor }}
        // handleIndicatorStyle={{ display: "none" }} // Hide the handle indicator.
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
        />
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 16,
  }
})