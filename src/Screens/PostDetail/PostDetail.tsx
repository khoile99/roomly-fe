import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
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
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
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

            <View style={styles.infoContainer}>
              <Image
                source={{
                  uri: "https://img.freepik.com/premium-vector/profile-icon-male-avatar_48369-2117.jpg?ga=GA1.1.931533855.1730958815&semt=ais_hybrid",
                }} // Thay bằng link đến hình đại diện
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>Nguyen Van A</Text>
                <Text style={styles.role}>Chủ phòng</Text>
              </View>
              <Icon name="phone" size={24} color="#000" />
            </View>

            <View style={styles.details}>
              <Text style={styles.roomTitle}>Mô tả</Text>
              <Text>
                Nhà trọ Lam Giang là nơi ở lý tưởng cho các bạn học sinh, sinh
                viên. Chúng tôi cung cấp môi trường năng động và dịch vụ chu đáo
                phục vụ cho công việc và học tập.
              </Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.roomTitle}>Tiện nghi</Text>
              <FlatList
                data={amenitiesData}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Icon name={item.icon} size={24} color="#000" />
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>

            <View style={styles.details}>
              <Text style={styles.roomTitle}>Thông tin cơ bản</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Ngày đăng:</Text>
                <Text style={styles.value}>22/11/2024</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Loại:</Text>
                <Text style={styles.value}>Chung cư</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Tầng:</Text>
                <Text style={styles.value}>3</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Diện tích:</Text>
                <Text style={styles.value}>20m2</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Số người:</Text>
                <Text style={styles.value}>3</Text>
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
              // nestedScrollEnabled={true}
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
    width: "30%",
    flexWrap: "wrap",
    display: "flex",
    // justifyContent: "space-between",
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
