import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { Place } from "@/Services";
import { HomeScreens } from "..";


export interface IHomeProps {
  data: Place[] | undefined;
  isLoading: boolean;
  onNavigate: (string: HomeScreens, props: any) => void;

}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const [typeId, setTypeId] = React.useState(0);
  const [places, setPlaces] = React.useState([] as Place[]);
  const [topPlaces, setTopPlaces] = React.useState([] as Place[]);

  const placeTypes = [
    "Nhà trọ",
    "Căn hộ mini",
    "Chung cư",
    "Nhà riêng",
  ]
  const onPressPlace = (id: number) => {
    setTypeId(id);
    var filter = data?.filter((place) => place.typeRoom == placeTypes[id])
    if (filter) {
      setPlaces(filter)
    }
  }

  useEffect(() => {
    if (data && data.length > 0) {
      const initialPlaces = data.filter((place) => place.typeRoom === placeTypes[0]);
      setPlaces(initialPlaces);
      setTopPlaces([data[0], data[1], data[2]])
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.logo}>Roomly</Text>
            <Icon name="bell" size={20} color="#000" />
          </View>

          <View style={styles.filterTabs}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {placeTypes.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tab, index === typeId && styles.activeTab]}
                  onPress={() => onPressPlace(index)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      index === index && styles.activeTabText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {places.map((place, index) => (
                <TouchableOpacity key={place.id} onPress={() => props.onNavigate(HomeScreens.POST_DETAIL, { id: place.id })}>
                  <View style={styles.card}>
                    <Image
                      src={place.image}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardDistance}>{place.size}m2</Text>
                    <Text style={styles.cardName}>{place.namePost}</Text>
                    <Text style={styles.cardLocation}>{place.address}</Text>
                  </View>
                </TouchableOpacity>
              )
              )}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Những lựa chọn tốt nhất</Text>
            {topPlaces?.map((place, index) => (
              <TouchableOpacity key={place.id} onPress={() => props.onNavigate(HomeScreens.POST_DETAIL, { id: place.id })}>
                <View style={styles.listItem}>
                  <Image
                    src={place.image}
                    style={styles.listImage}
                  />
                  <View>
                    <Text style={styles.listName}>{place.namePost}</Text>
                    <Text style={styles.listPrice}>{place.price} VND/tháng</Text>
                    <Text style={styles.listDetails}>{place.bedroom} phòng ngủ</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  logo: { fontSize: 24, fontWeight: "bold", color: "#000" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 8,
  },
  searchInput: { flex: 1, marginHorizontal: 8, fontSize: 14 },
  filterTabs: { flexDirection: "row", marginVertical: 16 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 8,
  },
  activeTab: { backgroundColor: "#5db0ff" },
  tabText: { fontSize: 14, color: "#888" },
  activeTabText: { color: "#fff" },
  section: { marginVertical: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  seeMore: { color: "#5db0ff", alignSelf: "flex-end", fontSize: 14 },
  horizontalScroll: { flexDirection: "row" },
  card: { width: 150, marginRight: 16 },
  cardImage: { width: "100%", height: 100, borderRadius: 8 },
  cardDistance: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#000",
    color: "#fff",
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  cardName: { fontWeight: "bold", marginTop: 8 },
  cardLocation: { color: "#888", fontSize: 12 },
  listItem: { flexDirection: "row", marginVertical: 8 },
  listImage: { width: 100, height: 100, borderRadius: 8, marginRight: 16 },
  listName: { fontWeight: "bold", fontSize: 16 },
  listPrice: { color: "#5db0ff", fontSize: 14 },
  listDetails: { color: "#888", fontSize: 12 },
});
