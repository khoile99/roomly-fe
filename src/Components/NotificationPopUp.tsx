import { i18n, LocalizationKey } from "@/Localization";
import { Button } from "native-base";
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AlertIcon from "assets/alert-icon";

export const NotificationPopUp = (props: {
  visible: boolean;
  message: string;
  buttonText: string;
  onClose: () => void;
  success?: boolean; // Thêm thuộc tính này để xác định trạng thái thành công
}) => {
  const iconUri = props.success
    ? "https://cdn-icons-png.flaticon.com/512/845/845646.png" // Biểu tượng thành công
    : "https://cdn-icons-png.flaticon.com/512/845/845649.png"; // Biểu tượng thất bại

  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Image source={{ uri: iconUri }} style={styles.icon} />
          </View>
          {/* Message */}
          <Text style={styles.message}>{props.message}</Text>
          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={props.onClose}>
            <Text style={styles.buttonText}>{props.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
    backgroundColor: "#E6F7FF",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
