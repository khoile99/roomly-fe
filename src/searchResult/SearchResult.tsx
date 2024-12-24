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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";

export interface ISearchResult {
  data: User | undefined;
  isLoading: boolean;
}

export const SearchResult = (props: ISearchProps) => {
  const { data, isLoading } = props;

  const searchResults = [
    {
      id: "1",
      title: "Nhà trọ Bình Tân 1",
      location: "Long Thạnh Mỹ, Quận 9",
      price: "2.500.000",
      area: "30 m²",
      bedrooms: 1,
      bathrooms: 1,
      image: "https://via.placeholder.com/150", // Thay bằng link ảnh thật
    },
    {
      id: "2",
      title: "Nhà trọ Bình Tân 2",
      location: "Long Thạnh Mỹ, Quận 9",
      price: "2.500.000",
      area: "30 m²",
      bedrooms: 1,
      bathrooms: 1,
      image: "https://via.placeholder.com/150", // Thay bằng link ảnh thật
    },
    // Thêm dữ liệu khác...
  ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLocation}>
          <Icon name="location-on" size={16} color="#888" /> {item.location}
        </Text>
        <Text style={styles.cardPrice}>{item.price} / tháng</Text>
        <View style={styles.cardInfo}>
          <Text>{item.bedrooms} phòng ngủ</Text>
          <Text>{item.area}</Text>
        </View>
      </View>
    </View>
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
            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm tại đây . . ."
              />
              <TouchableOpacity style={styles.filterButton}>
                <Icon name="filter-list" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Tiêu đề kết quả */}
            <Text style={styles.resultTitle}>
              Kết quả tìm kiếm cho "nhà trọ quận 9"
            </Text>
            <Text style={styles.resultCount}>50+ kết quả</Text>

            {/* Danh sách kết quả */}
            <FlatList
              data={searchResults}
              renderItem={renderCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ccontainer: {
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
