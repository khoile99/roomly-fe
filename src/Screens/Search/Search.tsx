import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SearchScreens } from "..";

export interface ISearchProps {
  onNavigate: (string: SearchScreens, props: any) => void;
}

export const Search = (props: ISearchProps) => {
  const [search, setSearch] = React.useState("")

  const suggestions = [
    { id: 1, name: "Nhà trọ", image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/17/1081975/Nha-Tro.jpg" },
    { id: 2, name: "Chung cư", image: "https://hn.ss.bfcplatform.vn/tckt/2019/10/19A10003-2.jpg" },
    { id: 3, name: "Căn hộ mini", image: "https://xaydungkienxanh.com/wp-content/uploads/2023/08/can-ho-gac-lung-4.jpg" },
    { id: 4, name: "Nhà riêng", image: "https://vn.toto.com/wp-content/uploads/2024/07/thiet-ke-nha-20.jpg" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm tại đây . . ."
            value={search}
            onChangeText={(newText) => setSearch(newText)}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => { props.onNavigate(SearchScreens.SEARCH_RESULT, { search: search, isType: false }) }}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>
            Có thể bạn sẽ muốn tìm kiếm
          </Text>
          <FlatList
            data={suggestions}
            horizontal={true}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionCard} onPress={() => props.onNavigate(SearchScreens.SEARCH_RESULT, { search: item.name, isType: true })}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.suggestionImage}
                />
                <Text style={styles.suggestionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
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
  historyContainer: {
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyText: {
    fontSize: 14,
    color: "#333",
  },
  removeText: {
    color: "#FF3B30",
    fontSize: 16,
  },
  suggestionsContainer: {
    flex: 1,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  suggestionCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  suggestionImage: {
    width: "100%",
    height: 100,
  },
  suggestionText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
  },
});
