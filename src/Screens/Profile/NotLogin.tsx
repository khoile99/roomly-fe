import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PersonIcon from "assets/person-icon";
import { Button } from "native-base";
import { RootScreens } from "..";


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
            <View style={styles.registerContainer}>
                <Text>{i18n.t(LocalizationKey.DONT_HAVE_ACCOUNT)}</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => props.onNavigate(RootScreens.REGISTER)}>
                    <Text style={styles.registerTxt}>
                        {i18n.t(LocalizationKey.REGISTER_NOW)}
                    </Text>
                </TouchableOpacity>
            </View>
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
    registerContainer: {
        flexDirection: "row",
        gap: 20,
    },
    registerTxt: {
        fontWeight: 600,
        textDecorationLine: "underline",
        color: "blue",
    }
});
