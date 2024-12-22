import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
// import { View, Text, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";

export interface IProfileProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Profile = (props: IProfileProps) => {
  const { data, isLoading } = props;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : data?.User ? (
        <>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </>
      ) : (
        <View style={styles.container}>
          {/* Biểu tượng người dùng */}
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
              style={styles.icon}
            />
          </View>

          {/* Text hướng dẫn */}
          <Text style={styles.description}>
            Đăng nhập tài khoản hiện tại của bạn
          </Text>

          {/* Nút đăng nhập */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableOpacity>

          {/* Liên kết đăng ký */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  description: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#4AA8FF",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  registerLink: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
});
