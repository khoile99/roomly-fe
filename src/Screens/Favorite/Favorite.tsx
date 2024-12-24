import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
// import { View, Text, StyleSheet } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";

export interface IFavoriteProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Favorite = (props: IFavoriteProps) => {
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
      ) : (
        <>
          <Text>{i18n.t(LocalizationKey.FAVORITE)}</Text>
          <Heading color="primary.500" fontSize="md">
            {data?.username}
          </Heading>
        </>
      )}
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
