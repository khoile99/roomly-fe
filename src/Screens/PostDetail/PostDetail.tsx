import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { Place } from "@/Services";

export interface IPostDetailProps {
  data: Place;
  isLoading: boolean;
}

export const PostDetail = (props: IPostDetailProps) => {
  const { data, isLoading } = props;

  const amenitiesData = [
    { id: "1", name: "Tivi", icon: "tv" },
    { id: "2", name: "Tủ lạnh", icon: "kitchen" },
    { id: "3", name: "Máy giặt", icon: "local_laundry_service" },
    { id: "4", name: "Máy lạnh", icon: "ac-unit" },
    { id: "5", name: "Wifi", icon: "wifi" },
  ];

  const handleCall = () => {
    Linking.openURL(props.data.userPhone);
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
        <ScrollView>
          <Image
            src={props.data.image}
            style={styles.mainImage}
          />

          <View style={styles.details}>
            <Text style={styles.roomTitle}>
              {props.data.namePost}
            </Text>
            <Text style={styles.roomPrice}>${props.data.price} /tháng</Text>
            <Text style={styles.roomLocation}>
              <Icon name="place" size={16} color="#555" />{props.data.address}
            </Text>
          </View>

          <View style={styles.details1}>
            <View style={styles.detailItem}>
              <Icon name="apartment" size={20} color="#333" />
              <Text style={styles.detailText}>{props.data.typeRoom}</Text>
            </View>
            <View style={styles.detailItemCenter}>
              <Icon name="bed" size={20} color="#333" />
              <Text style={styles.detailText}>{props.data.bedroom} phòng ngủ</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="bathtub" size={20} color="#333" />
              <Text style={styles.detailText}>{props.data.bathroom} phòng tắm</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/profile-icon-male-avatar_48369-2117.jpg?ga=GA1.1.931533855.1730958815&semt=ais_hybrid",
              }} // Thay bằng link đến hình đại diện
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{props.data.userName}</Text>
              <Text style={styles.role}>Chủ phòng</Text>
            </View>
            <Icon name="phone" size={24} color="#000" />
          </View>

          <View style={styles.details}>
            <Text style={styles.roomTitle}>Mô tả</Text>
            <Text>
              {props.data.description}
            </Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.roomTitle}>Tiện nghi</Text>
            <Text style={styles.itemContainer}>
              {props.data.comfort}
            </Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.roomTitle}>Thông tin cơ bản</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Ngày đăng:</Text>
              <Text style={styles.value}>{props.data.createdAt}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Loại:</Text>
              <Text style={styles.value}>{props.data.typeRoom}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Diện tích:</Text>
              <Text style={styles.value}>{props.data.size}m2</Text>
            </View>
          </View>

          <View style={styles.details}>
            <Text style={styles.roomTitle}>Bản đồ</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 10.762622,
                longitude: 106.660172,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude: 10.762622, longitude: 106.660172 }}
                title="Nhà trọ"
              />
            </MapView>
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>Các phòng tương tự</Text>
            <View style={styles.grid}>
              {
                <View key={data.id} style={styles.card}>
                  <Image
                    source={{ uri: data.image }}
                    style={styles.image}
                  />
                  <Text style={styles.roomName}>{data.namePost}</Text>
                  <Text>{data.address}</Text>
                  <Text style={styles.price}>{data.price} / tháng</Text>
                  {/* <Text>{data.area}</Text> */}
                </View>
              }
            </View>
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={handleCall}>
              <Text style={styles.buttonText}>Gọi ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  mainImage: { width: "100%", height: 200, borderRadius: 8 },
  details: { padding: 16 },
  roomTitle: { fontSize: 18, fontWeight: "bold" },
  roomPrice: {
    fontSize: 16,
    color: "#f00",
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#f00"
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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "#888",
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },

  extendConatiner: {
    flexDirection: "row",
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    flexWrap: "wrap",
    display: "flex",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#555", // Màu xám cho giá trị
  },
  map: {
    height: 200,
    padding: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Chiều rộng của mỗi thẻ
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  price: {
    color: "#e91e63",
    fontWeight: "bold",
  },
  containerButton: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00A3E0", // Màu nền của nút
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    // marginLeft: 8,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
