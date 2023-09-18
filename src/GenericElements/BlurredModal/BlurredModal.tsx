import { BlurView } from "expo-blur";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";

const { height: layoutHeight } = Dimensions.get("window");

interface ModalProps {
  menuVisible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  triggerHeight: number;
}

const BlurredModal = ({
  menuVisible,
  closeModal,
  children,
  triggerHeight,
}: ModalProps) => {
  return (
    <Modal transparent visible={menuVisible}>
      {menuVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModal}
          style={styles.modalWrapper}
        >
          <BlurView
            intensity={Platform.OS === "ios" ? 30 : 120}
            tint="dark"
            style={{
              paddingBottom:
                triggerHeight > layoutHeight - 300 ? 300 : undefined,
              ...styles.modalContent,
            }}
          >
            {children}
          </BlurView>
        </TouchableOpacity>
      )}
    </Modal>
  );
};

export default BlurredModal;

const styles = StyleSheet.create({
  modalWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
