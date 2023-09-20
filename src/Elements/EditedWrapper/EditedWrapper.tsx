import Typography from "@followBack/GenericElements/Typography";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";

interface EditedWrapperProps {
  children: React.ReactNode;
  isEdited?: boolean;
  isOwnMessage: boolean;
  editedDate: string;
}

const EditedWrapper = ({
  isEdited,
  children,
  isOwnMessage,
  editedDate,
}: EditedWrapperProps) => {
  const getMinutesDiff = () => {
    return Math.floor(
      Math.abs(new Date().getTime() - new Date(editedDate).getTime()) / 60000
    );
  };

  const [minutesDiff, setMinutesDiff] = useState<number>(getMinutesDiff());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isEdited) {
      setMinutesDiff(getMinutesDiff());
      intervalRef.current = setInterval(() => {
        setMinutesDiff(getMinutesDiff());
      }, 60000);
    }

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, [isEdited]);

  const isLessThanTenMinutes = minutesDiff >= 0 && minutesDiff <= 10;

  return (
    <>
      <View style={styles.container}>{children}</View>
      {isEdited && (
        <View
          style={{
            marginTop: 5,
            alignItems: isOwnMessage ? "flex-end" : "flex-start",
          }}
        >
          <Typography type="smallRegularBody" color="secondary">
            {isLessThanTenMinutes ? `edit ${minutesDiff} mins ago` : "edited"}
          </Typography>
        </View>
      )}
    </>
  );
};

export default EditedWrapper;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
  },
});
