import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet, Text } from "react-native";



export const Login = () => {
  return (
    <View style={styles.container}>
      <Text>
        {i18n.t(LocalizationKey.LOGIN)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
