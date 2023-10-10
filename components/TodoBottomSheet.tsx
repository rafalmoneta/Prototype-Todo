import React from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import TodoBottomSheetContent from "./TodoBottomSheetContent";

const TodoBottomSheet = React.forwardRef<BottomSheetModal>(
  (props: any, ref) => {
    const snapPoints = React.useMemo(() => ["30%"], []);

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
        // handleIndicatorStyle={{ display: "none" }} // Hide the handle indicator.
      >
        <TodoBottomSheetContent />
      </BottomSheetModal>
    );
  }
);

export default TodoBottomSheet;
