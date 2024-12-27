import { LoginNow } from "@/Components/LoginNow";
import { i18n, LocalizationKey } from "@/Localization";
import { Button } from "native-base";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { RootScreens } from "..";
import { ResponseFail, useRegister1Mutation } from "@/Services";

export const Register = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const [step, setStep] = useState(1);
  const [register, setRegister] = useState({
    fName: "",
    lName: "",
    phone: "",
    email: "",
    password: "",
  })

  const [code, setCode] = useState(Array(6).fill(""));

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
  };

  const handleVerify = () => {
    alert("Hiện tại otp chỉ có thể gửi cho 1 số điện thoại duy nhất. Người dùng có thể sử dụng tài khoản.\nEmail: tanguyentiendung@gmail.com\npassowrd: 123456")
  };

  const handleResend = () => {
  };
  const [register1, { isLoading, isError, error }] = useRegister1Mutation();
  const onRegister = async () => {
    try {
      const response = await register1(register).unwrap();
      setStep(2);
      alert(response.message);
    } catch (err) {
      const error = err as ResponseFail;
      alert(error.data.message);
    }
  }
  return (
    <ScrollView>
      {(step == 1) ? (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.txtHeader}>
                {i18n.t(LocalizationKey.REGISTER)},
              </Text>
              <Text>{i18n.t(LocalizationKey.ENTER_REGISTER)}</Text>
            </View>
            <TextInput
              placeholder={i18n.t(LocalizationKey.LAST_NAME)}
              style={styles.input}
              onChangeText={(newText) => setRegister({ ...register, lName: newText })}
            ></TextInput>
            <TextInput
              placeholder={i18n.t(LocalizationKey.FIRST_NAME)}
              style={styles.input}
              onChangeText={(newText) => setRegister({ ...register, fName: newText })}
            ></TextInput>
            <TextInput
              placeholder={i18n.t(LocalizationKey.EMAIL)}
              style={styles.input}
              onChangeText={(newText) => setRegister({ ...register, email: newText })}
            ></TextInput>
            <TextInput
              placeholder={i18n.t(LocalizationKey.PHONE_NUMBER)}
              style={styles.input}
              onChangeText={(newText) => setRegister({ ...register, phone: newText })}
            ></TextInput>
            <TextInput
              placeholder={i18n.t(LocalizationKey.PASSWORD)}
              style={styles.input}
              onChangeText={(newText) => setRegister({ ...register, password: newText })}
              secureTextEntry
            ></TextInput>
            <View style={styles.btnContainer}>
              <Button style={{ width: "100%" }} onPress={() => onRegister()}>
                {i18n.t(LocalizationKey.REGISTER)}
              </Button>
              <LoginNow onNavigate={props.onNavigate}></LoginNow>
            </View>
          </View>
        </View>) : (
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Kiểm tra SMS của bạn</Text>
          <Text style={styles.description}>
            Chúng tôi đã gửi OTP đến số điện thoại {register.phone}. Nhập OTP:
          </Text>

          {/* Code Input */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Xác minh code</Text>
          </TouchableOpacity>

          {/* Resend Link */}
          <Text style={styles.resendText}>
            Bạn chưa nhận được OTP,
            <Text style={styles.resendLink} onPress={handleResend}>
              Gửi lại
            </Text>
          </Text>
          <Button onPress={() => alert("Hiện tại otp chỉ có thể gửi cho 1 số điện thoại duy nhất. Người dùng có thể sử dụng tài khoản.\nEmail: tanguyentiendung@gmail.com\npassowrd: 123456")}>CLick Me</Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 30,
  },
  innerContainer: {
    gap: 30,
  },
  txtHeader: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
  },
  btnContainer: {
    gap: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
  },
  bold: {
    fontWeight: "600",
    color: "#000",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    backgroundColor: "#fff",
  },
  button: {
    height: 48,
    backgroundColor: "#3498db",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  resendText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  resendLink: {
    color: "#3498db",
    fontWeight: "500",
  },
});
