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
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";

export interface ISearchProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Search = (props: ISearchProps) => {
  const { data, isLoading } = props;

  const [searchHistory, setSearchHistory] = useState([
    "nhà trọ quận 9",
    "nhà trọ 2 phòng ngủ",
    "chung cư tại quận 2",
  ]);

  const suggestions = [
    { id: 1, name: "Nhà trọ", image: "https://example.com/image1.jpg" },
    { id: 2, name: "Chung cư", image: "https://example.com/image2.jpg" },
    { id: 3, name: "Căn hộ mini", image: "https://example.com/image3.jpg" },
    {
      id: 4,
      name: "Thuê nhà nguyên căn",
      image: "https://example.com/image4.jpg",
    },
  ];

  const handleRemoveHistory = (index) => {
    const newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    setSearchHistory(newHistory);
  };

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
          <ScrollView style={styles.container}>
            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm tại đây . . ."
              />
              {/* <TouchableOpacity style={styles.filterButton}>
                <Image
                  // source={require("./assets/filter-icon.png")}
                  style={styles.filterIcon}
                />
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.filterButton}>
                <Icon name="filter-list" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Lịch sử tìm kiếm */}
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>Lịch sử tìm kiếm</Text>
              {searchHistory.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyText}>{item}</Text>
                  <TouchableOpacity onPress={() => handleRemoveHistory(index)}>
                    <Text style={styles.removeText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Danh sách đề xuất */}
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>
                Có thể bạn sẽ muốn tìm kiếm
              </Text>
              <FlatList
                data={suggestions}
                horizontal={false}
                numColumns={1}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.suggestionCard}>
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
