import { i18n, LocalizationKey } from "@/Localization";
import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import SecureStore from "@/Store/SecureStore";
import { ResponseFail, useCreatePlace1Mutation, useCreatePlace2Mutation, useCreatePlace3Mutation } from "@/Services";


export const Post = () => {
  const [step, setStep] = useState(1); // Quản lý bước hiện tại của form
  const [createPlace1, { isLoading: isLoadingStep1, isError, error }] = useCreatePlace1Mutation();
  const [createPlace2, { isLoading: isLoadingStep2, isError: isError2, error: error2 }] = useCreatePlace2Mutation();
  const [createPlace3, { isLoading: isLoadingStep3, isError: isError3, error: error3 }] = useCreatePlace3Mutation();

  const [formData, setFormData] = useState({
    namePost: "",
    typeRoom: "",
    price: 0,
    deposit: 0,
    description: "",
    address: "",
    bedroom: 0,
    bathroom: 0,
    comfort: "",
  });
  const amenities = ["TV", "Máy lạnh", "Tủ lạnh", "Máy giặt", "Wifi"];

  const toggleAmenity = (item: string) => {
    if (formData.comfort.split(";").includes(item)) {
      setFormData({ ...formData, comfort: formData.comfort.replaceAll(`;${item}`, "").replaceAll(`${item};`, "") });
    } else {
      setFormData({ ...formData, comfort: `${formData.comfort};${item}` });
    }
  };

  const onNext = async (step: number) => {
    const accessToken = await SecureStore.getAccessToken();
    switch (step) {
      case 2:
        try {
          const data = {
            namePost: formData.namePost,
            typeRoom: formData.typeRoom,
            price: formData.price,
            deposit: formData.deposit,
            description: formData.description
          }
          const response = await createPlace1({ accessToken: accessToken, body: data }).unwrap();
          alert(response.message);
          setStep(step)
        } catch (err) {
          const error = err as ResponseFail;
          if (error.data.message) {
            alert(error.data.message);
          } else {
            alert(i18n.t(LocalizationKey.CREATE_FAIL))
          }
        }
        return;
      case 3:
        try {
          const data = {
            address: formData.address,
            bedroom: formData.bedroom,
            bathroom: formData.bathroom,
            comfort: formData.comfort,
          }
          const response = await createPlace2({ accessToken: accessToken, body: data }).unwrap();
          alert(response.message);
          setStep(step)
        } catch (err) {
          const error = err as ResponseFail;
          if (error.data.message) {
            alert(error.data.message);
          } else {
            alert(i18n.t(LocalizationKey.CREATE_FAIL))
          }
        }
        return;
      case 4:
        try {
          const response = await createPlace3({ accessToken: accessToken }).unwrap();
          alert(response.message);
          setStep(step)
        } catch (err) {
          console.log(err);
          const error = err as ResponseFail;
          if (error.data.message) {
            alert(error.data.message);
          } else {
            alert(i18n.t(LocalizationKey.CREATE_FAIL))
          }
        }
        return;
    }
  }

  return (
    <ScrollView style={styles.container}>
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
        {step === 1 &&
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
              <Picker.Item label="Nhà riêng" value="Nhà riêng" />
              <Picker.Item label="Căn hộ mini" value="Căn hộ mini" />
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
        }

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
                    formData.comfort.split(";").includes(item) && styles.activeAmenity,
                  ]}
                  onPress={() => toggleAmenity(item)}
                >
                  <Text
                    style={[
                      styles.amenityText,
                      formData.comfort.split(";").includes(item) &&
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
              style={styles.nextButton}
              onPress={() => onNext(step + 1)}
            >
              <Text style={styles.buttonText}>Tiếp theo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => onNext(4)}
            >
              <Text style={styles.buttonText}>Hoàn thành</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
