import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Place, useLazyGetAllPlacesQuery } from "@/Services";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { SearchScreens } from "..";

export interface ISearchResult {
  search: string;
  isType: Boolean;
  onNavigate: (string: SearchScreens, props: any) => void;
}

export const SearchResult = (props: ISearchResult) => {
  const [places, setPlaces] = useState([] as Place[])
  const [fetchPlaces, { data, isSuccess, isLoading, error }] =
    useLazyGetAllPlacesQuery();

  useEffect(() => {
    const fetchData = async () => {
      fetchPlaces("");
    };

    fetchData();
  }, [props.search, fetchPlaces]);

  useEffect(() => {
    var searchPlaces = [] as Place[]
    if (data?.data) {
      if (searchPlaces) {
        searchPlaces = data?.data.filter((place) => place.typeRoom.toLowerCase().includes(props.search.toLowerCase()));
      } else {
        searchPlaces = data?.data.filter((place) => place.namePost.toLowerCase().includes(props.search.toLowerCase()));
      }
    }
    setPlaces(searchPlaces);
  }, [data]);

  const renderCard = (item: Place) => (
    <TouchableOpacity onPress={() => props.onNavigate(SearchScreens.POST_DETAIL, { id: item.id })}>
      <View style={styles.card}>
        <Image src={item.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.namePost}</Text>
          <Text style={styles.cardLocation}>
            <Icon name="location-on" size={16} color="#888" /> {item.address}
          </Text>
          <Text style={styles.cardPrice}>{item.price} / tháng</Text>
          <View style={styles.cardInfo}>
            <Text>{item.bedroom} phòng ngủ</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <View style={styles.container}>
            {/* Tiêu đề kết quả */}
            <Text style={styles.resultTitle}>
              Kết quả tìm kiếm cho "{props.search}"
            </Text>
            <Text style={styles.resultCount}>{places.length} kết quả</Text>

            {/* Danh sách kết quả */}
            <FlatList
              data={places}
              // renderItem={({ place }) => (renderCard(place))}
              renderItem={({ item }) => (
                renderCard(item)
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  filterButton: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  resultCount: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2, // Tạo hiệu ứng bóng trên Android
    shadowColor: "#000", // Tạo hiệu ứng bóng trên iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#555",
  },
});
