import { i18n, LocalizationKey } from "@/Localization";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { Place } from "@/Services";

export interface IPostProps {
  data: Place;
  isLoading: boolean;
}

export const EditPost = (props: IPostProps) => {
  const { data, isLoading } = props;

  const [step, setStep] = useState(1); // Quản lý bước hiện tại của form
  const [isStepValid, setIsStepValid] = useState(false); // Trạng thái valid

  const [formData, setFormData] = useState(data);

  const [contact, setContact] = useState({ name: "", phone: "" }); // Dữ liệu bước 3

  const amenities = ["Tivi", "Máy lạnh", "Tủ lạnh", "Máy giặt", "Wifi"];

  // Kiểm tra điều kiện hợp lệ cho từng bước
  useEffect(() => {
    switch (step) {
      case 1:
        setIsStepValid(
          formData.namePost.trim() !== "" &&
          formData.price !== 0 &&
          formData.deposit !== 0
        );
        break;
      case 2:
        setIsStepValid(
          formData.address.trim() !== "" && amenities.length > 0
        );
        break;
      case 3:
        setIsStepValid(
          contact.name.trim() !== "" && contact.phone.trim() !== ""
        );
        break;
      default:
        setIsStepValid(false);
    }
  }, [step, formData, amenities, contact]);

  const toggleAmenity = (item: string) => {
    // if (amenities.includes(item)) {
    //   setFormData({
    //     ...formData,
    //     amenities: formData.amenities.filter((amenity) => amenity !== item),
    //   });
    // } else {
    //   setFormData({ ...formData, amenities: [...formData.amenities, item] });
    // }
  };

  const handleSubmit = () => {
    console.log("Dữ liệu form:", { formData });
    alert("Bài đăng đã được gửi thành công!");
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Thêm bài đăng</Text>
          </View>

          {/* Stepper */}
          <View style={styles.stepper}>
            {[1, 2, 3].map((item, index) => (
              <React.Fragment key={item}>
                {/* Hiển thị step */}
                <View style={[styles.step, step >= item && styles.activeStep]}>
                  <Text style={styles.stepText}>{item}</Text>
                </View>

                {/* Vẽ line nếu không phải step cuối */}
                {index < 3 && (
                  <View
                    style={[
                      styles.line,
                      step > item && styles.activeLine, // Line active khi vượt qua step
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Nội dung form */}
          {step === 1 && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView style={styles.form}>
                <Text style={styles.label}>Tiêu đề bài đăng</Text>
                <TextInput
                  value={formData.namePost}
                  style={styles.input}
                  placeholder="Phòng thường - Lầu 1 - Máy lạnh"
                  onChangeText={(text) =>
                    setFormData({ ...formData, namePost: text })
                  }
                />
                <Text style={styles.label}>Loại phòng</Text>
                <Picker
                  selectedValue={formData.typeRoom}
                  style={styles.input}
                  onValueChange={(itemValue) =>
                    setFormData({ ...formData, typeRoom: itemValue })
                  }
                >
                  <Picker.Item label="Chung cư" value="Chung cư" />
                  <Picker.Item label="Nhà trọ" value="Nhà trọ" />
                  <Picker.Item label="Nhà phố" value="Nhà phố" />
                </Picker>
                <Text style={styles.label}>Giá phòng</Text>
                <TextInput
                  value={formData.price.toString()}
                  style={styles.input}
                  placeholder="1000000"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setFormData({ ...formData, price: Number(text) })
                  }
                />
                <Text style={styles.label}>Tiền cọc</Text>
                <TextInput
                  value={formData.deposit.toString()}
                  style={styles.input}
                  placeholder="500000"
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setFormData({ ...formData, deposit: Number(text) })
                  }
                />

                {/* Trường mô tả */}
                <Text style={styles.label}>Mô tả</Text>
                <TextInput
                  value={formData.description}
                  style={[styles.input, styles.textArea]}
                  placeholder="Nhập mô tả về phòng..."
                  multiline
                  numberOfLines={3} // Hiển thị tối đa 3 dòng
                  textAlignVertical="top" // Nội dung canh từ trên cùng
                  onChangeText={(text) =>
                    setFormData({ ...formData, description: text })
                  }
                />
              </ScrollView>
            </KeyboardAvoidingView>
          )}

          {step === 2 && (
            <ScrollView style={styles.form}>
              <Text style={styles.label}>Địa chỉ</Text>
              <TextInput
                value={formData.address}
                style={styles.input}
                placeholder="Nhập địa chỉ"
                onChangeText={(text) =>
                  setFormData({ ...formData, address: text })
                }
              />
              <View style={styles.mapPlaceholder}>
                <Text>Bản đồ sẽ hiển thị tại đây</Text>
              </View>
              <Text style={styles.label}>Phòng ngủ</Text>
              <Picker
                selectedValue={formData.bedroom}
                style={styles.input}
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, bedroom: itemValue })
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
              </Picker>
              <Text style={styles.label}>Phòng tắm</Text>
              <Picker
                selectedValue={formData.bathroom}
                style={styles.input}
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, bathroom: itemValue })
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
              </Picker>
              <Text style={styles.label}>Tiện nghi</Text>
              <View style={styles.amenitiesContainer}>
                {amenities.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.amenityButton,
                      [formData.comfort].includes(item) && styles.activeAmenity,
                    ]}
                    onPress={() => toggleAmenity(item)}
                  >
                    <Text
                      style={[
                        styles.amenityText,
                        [formData.comfort].includes(item) &&
                        styles.activeAmenityText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}

          {step === 3 && (
            <View style={styles.form}>
              <Text style={styles.label}>Tên liên hệ</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên của bạn"
                value={formData.userId}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    userId: text,
                  })
                }
              />
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value={formData.userId}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    userId: text,
                  })
                }
              />
              <Text style={styles.label}>Ghi chú thêm (nếu có)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Nhập ghi chú thêm"
                value={formData.description}
                multiline
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    description: text,
                  })
                }
              />
            </View>
          )}

          {/* Nút điều hướng */}
          <View style={styles.buttonContainer}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(step - 1)}
              >
                <Text style={styles.buttonText}>Quay lại</Text>
              </TouchableOpacity>
            )}
            {step < 3 ? (
              <TouchableOpacity
                // style={styles.nextButton}
                style={[
                  styles.nextButton,
                  { opacity: isStepValid ? 1 : 0.5 }, // Thay đổi độ mờ của nút
                ]}
                onPress={() => setStep(step + 1)}
                disabled={!isStepValid} // Disable nếu không hợp lệ
              >
                <Text style={styles.buttonText}>Tiếp theo</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Hoàn thành</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#ccc",
  },
  activeStep: { borderColor: "#5db0ff", backgroundColor: "#5db0ff" },
  stepText: { color: "#fff" },
  line: {
    position: "absolute",
    height: 4, // Độ dày của line
    backgroundColor: "#ccc",
    top: "50%",
    left: 20, // Bắt đầu từ bên phải của step trước
    right: 20, // Kết thúc ở bên trái của step kế tiếp
    zIndex: 0,
  },
  activeLine: {
    backgroundColor: "#5db0ff", // Màu xanh cho line active
  },
  form: { marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  mapPlaceholder: {
    height: 150,
    backgroundColor: "#e9e9e9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  amenityButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  activeAmenity: { backgroundColor: "#5db0ff", borderColor: "#5db0ff" },
  amenityText: { color: "#555" },
  activeAmenityText: { color: "#fff" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  backButton: {
    padding: 15,
    backgroundColor: "#ccc",
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  nextButton: {
    padding: 15,
    backgroundColor: "#5db0ff",
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
