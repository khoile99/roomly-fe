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

  const similarRooms = [
    {
      id: "1",
      name: "Nhà trọ Bình Tân 1",
      location: "Long Thạnh Mỹ, quận 9",
      price: "2.500.000",
      area: "10 m2",
    },
    {
      id: "2",
      name: "Nhà trọ Bình Tân 1",
      location: "Long Thạnh Mỹ, quận 9",
      price: "2.500.000",
      area: "10 m2",
    },
    {
      id: "3",
      name: "Nhà trọ Bình Tân 1",
      location: "Long Thạnh Mỹ, quận 9",
      price: "2.500.000",
      area: "10 m2",
    },
    {
      id: "4",
      name: "Nhà trọ Bình Tân 1",
      location: "Long Thạnh Mỹ, quận 9",
      price: "2.500.000",
      area: "10 m2",
    },
  ];

  const handleCall = () => {
    Linking.openURL(`tel:123456789`);
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
          {/* <Text>{i18n.t(LocalizationKey.FAVORITE)}</Text>
          <Heading color="primary.500" fontSize="md">
            {data?.username}
          </Heading> */}

          <ScrollView>
            {/* Header */}
            {/* <View style={styles.header}>
              <TouchableOpacity>
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Chi tiết</Text>
            </View> */}

            {/* Image Section */}
            <Image
              source={{ uri: "https://via.placeholder.com/300x200" }}
              style={styles.mainImage}
            />

            {/* Room Details */}
            <View style={styles.details}>
              <Text style={styles.roomTitle}>
                Phòng thường - Lầu 1 - Máy lạnh
              </Text>
              <Text style={styles.roomPrice}>1.000.000 VND/tháng</Text>
              <Text style={styles.roomLocation}>
                <Icon name="place" size={16} color="#555" /> Nhà trọ Lam Giang,
                An Phú Đông, quận 9, TP.HCM
              </Text>
            </View>

            <View style={styles.details1}>
              <View style={styles.detailItem}>
                <Icon name="apartment" size={20} color="#333" />
                <Text style={styles.detailText}>Chung cư</Text>
              </View>
              <View style={styles.detailItemCenter}>
                <Icon name="bed" size={20} color="#333" />
                <Text style={styles.detailText}>1 phòng ngủ</Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="bathtub" size={20} color="#333" />
                <Text style={styles.detailText}>1 phòng tắm</Text>
              </View>
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
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2196F3",
  },
  headerTitle: {
    marginLeft: 16,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  mainImage: { width: "100%", height: 200 },
  details: { padding: 16 },
  roomTitle: { fontSize: 18, fontWeight: "bold" },
  roomPrice: {
    fontSize: 16,
    color: "#f00",
    marginVertical: 8,
    borderRadius: 4,
    border: "1px solid #f00",
  },
  roomLocation: { fontSize: 14, color: "#555" },

  details1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItemCenter: {
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 14,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
});
