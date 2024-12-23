import { i18n, LocalizationKey } from "@/Localization";
import { Button } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AlertIcon from "assets/alert-icon";


export const PopUp = (props:
    {
        title: string;
        pressOK: () => void;
        pressBack: () => void;
    }) => {
    return (
        <View style={styles.container}>
            <AlertIcon />
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.btnContainer}>
                <Button style={styles.btn} colorScheme={"red"} onPress={() => props.pressOK()}><Text style={styles.txtBtn}>{i18n.t(LocalizationKey.YES)}</Text></Button>
                <Button style={styles.btn} onPress={() => props.pressBack()}><Text style={styles.txtBtn}>{i18n.t(LocalizationKey.COME_BACK)}</Text></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 339,
        height: 263,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 50,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "space-between"
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    btn: {
        width: 90,
        height: 40,
        borderRadius: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: 700,
    },
    txtBtn: {
        fontSize: 12,
        color: "white",
        fontWeight: 500,
    }
});
