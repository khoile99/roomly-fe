import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
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
import { Place } from "@/Services";
import { PlaceCardFavorite } from "@/Components/PlaceCard";

export interface IFavoriteProps {
  data: Place[] | undefined;
  isLoading: boolean;
}

export const Favorite = (props: IFavoriteProps) => {
  const { data, isLoading } = props;

  return (
    <ScrollView>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View style={styles.container}>
          {data?.map((place) => {
            return (
              <PlaceCardFavorite
                place={place}
                key={place.id}
                pressDelete={() => {
                  console.log(`delete ${place.id}`);
                }}
                pressEdit={() => {
                  navigation.navigate("Edit Post", { id: place.id });
                }}
              ></PlaceCardFavorite>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
});
