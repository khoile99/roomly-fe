import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { Place } from "@/Services";
import { PlaceCard } from "@/Components/PlaceCard";
import { ProfileNavigator } from "@/Components/ProfileNavigator";
import { ProfileScreens } from "..";
import { useNavigation } from "@react-navigation/native";

export interface IManagePostProps {
  places: Place[] | undefined;
  isLoading: boolean;
}

export const PostManage = (props: IManagePostProps) => {
  const { places, isLoading } = props;
  const navigation = useNavigation();
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
          {places?.map((place) => {
            return (
              <PlaceCard
                place={place}
                key={place.id}
                pressDelete={() => {
                  console.log(`delete ${place.id}`);
                }}
                pressEdit={() => {
                  navigation.navigate("Edit Post", { id: place.id });
                }}
              ></PlaceCard>
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
