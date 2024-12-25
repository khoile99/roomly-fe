import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { Place } from "@/Services";
import { PlaceCard } from "@/Components/PlaceCard";
import { ProfileScreens } from "..";



export interface IFavoriteProps {
  data: Place[] | undefined;
  isLoading: boolean;
  onNavigate: (string: ProfileScreens, props: any) => void;
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
              <TouchableOpacity key={place.id}
                onPress={() => props.onNavigate(ProfileScreens.POST_DETAIL, { id: place.id })}>
                <PlaceCard
                  place={place}
                  pressDelete={() => {
                    console.log(`delete ${place.id}`);
                  }}
                  pressEdit={() => {
                    props.onNavigate(ProfileScreens.POST_DETAIL, { id: place.id });
                  }}
                  showEdit={false}
                ></PlaceCard>
              </TouchableOpacity>
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
