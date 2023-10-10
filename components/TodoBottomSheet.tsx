import React from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import TodoBottomSheetContent from "./TodoBottomSheetContent";
import { useThemeColor } from "./Themed";

const TodoBottomSheet = React.forwardRef<BottomSheetModal>(
  (props: any, ref) => {
    const snapPoints = React.useMemo(() => ["30%"], []);
    const backgroundColor = useThemeColor({}, "background");

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
        backgroundStyle={{ backgroundColor }}
        // handleIndicatorStyle={{ display: "none" }} // Hide the handle indicator.
      >
        <TodoBottomSheetContent />
      </BottomSheetModal>
    );
  }
);

export default TodoBottomSheet;
