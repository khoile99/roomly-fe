import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet } from "react-native";
import { PopUp } from "@/Components/Popup";
import { ProfileScreens } from "..";

export const Logout = (props: {
  onNavigate: (string: ProfileScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <PopUp
        title={i18n.t(LocalizationKey.CONFIRM_LOGOUT)}
        pressOK={() => console.log("logout")}
        pressBack={() => props.onNavigate(ProfileScreens.PROFILE)} />
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
