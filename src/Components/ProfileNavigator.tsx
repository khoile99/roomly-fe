import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import RightVector from "assets/right-vector";


export const ProfileNavigator = (props:
    {
        onPress: () => void;
        title: string;
        icon: React.ElementType;
    }) => {
    return (
        <Button style={styles.btn} onPress={() => props.onPress()}>
            <View style={styles.navigator}>
                <View style={styles.title}>
                    <View style={styles.imgContainer}><props.icon /></View>
                    <Text style={styles.titleTxt}>{props.title}</Text>
                </View>
                <RightVector />
            </View>
        </Button>
    );
};

const styles = StyleSheet.create({
    imgContainer: {
        width: 44,
        height: 44,
        backgroundColor: "#EFF6FF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    navigator: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    titleTxt: {
        fontWeight: 600,
    },
    btn: {
        backgroundColor: "white"
    }
});
