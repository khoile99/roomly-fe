import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PersonIcon from "assets/person-icon";
import { Button } from "native-base";
import { RootScreens } from "@/Screens";


export const RegisterNow = (props:
    { onNavigate: (string: RootScreens) => void; }) => {
    return (
        <View>
            <View style={styles.registerContainer}>
                <Text>{i18n.t(LocalizationKey.DONT_HAVE_ACCOUNT)}?</Text>
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
