import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PersonIcon from "assets/person-icon";
import { Button } from "native-base";
import { RootScreens } from "..";
import { RegisterNow } from "@/Components/RegisterNow";


export const NotLogin = (props: {
    onNavigate: (string: RootScreens) => void;
}) => {
    return (
        <View style={styles.container}>
            <PersonIcon />
            <Text>{i18n.t(LocalizationKey.LOGIN_WITH_ACCOUNT)}</Text>
            <Button style={styles.loginBtn} onPress={() => props.onNavigate(RootScreens.LOGIN)}>
                <Text style={styles.txtLoginBtn}>
                    {i18n.t(LocalizationKey.LOGIN)}
                </Text>
            </Button>
            <RegisterNow onNavigate={props.onNavigate}></RegisterNow>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    loginBtn: {
        width: 275,
        height: 60,
        borderRadius: 10
    },
    txtLoginBtn: {
        color: "white",
        fontSize: 20,
        fontWeight: 600,
    },
});
