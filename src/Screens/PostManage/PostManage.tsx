import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { Place } from "@/Services";
import { PlaceCard } from "@/Components/PlaceCard";
import { ProfileScreens } from "..";
import { store } from "@/Store";

export interface IManagePostProps {
  isLoading: boolean;
  onNavigate: (string: ProfileScreens, props: any) => void;
}

export const PostManage = (props: IManagePostProps) => {
  const { isLoading } = props;
  const [places, setPlaces] = useState<Place[]>([]);
  store.subscribe(() => setPlaces(store.getState().place.places))

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
          {
            places?.map((place) => {
              return <PlaceCard
                place={place}
                key={place.id}
                pressDelete={() => { console.log(`delete ${place.id}`) }}
                pressEdit={() => { props.onNavigate(ProfileScreens.EDIT_POST, { id: place.id }) }}
                showEdit={true}>
              </PlaceCard>
            })
          }
        </View>
      )
      }
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
