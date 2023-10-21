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
    const date = editedDate
      ? editedDate.includes("Z")
        ? editedDate
        : editedDate.replace(/(\d{3})$/, "Z")
      : undefined;
    return Math.floor(
      Math.abs(new Date().getTime() - new Date(date).getTime()) / 60000
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
  }, [isEdited, editedDate]);

  const isLessThanTenMinutes = minutesDiff >= 0 && minutesDiff <= 10;

  return (
    <>
      {children}
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
