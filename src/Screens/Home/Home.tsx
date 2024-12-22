import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
// import { View, Text, StyleSheet } from "react-native";
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
import { User } from "@/Services";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>Roomly</Text>
            <Icon name="bell" size={20} color="#000" />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={16} color="#ccc" />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm chỗ ở gần bạn ..."
            />
            <Icon name="sliders-h" size={16} color="#5db0ff" />
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterTabs}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Chỗ này cần data category để map */}
              {[
                "Nhà trọ",
                "Căn hộ mini",
                "Chung cư",
                "Nhà thuê nguyên căn",
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tab, index === 0 && styles.activeTab]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      index === 0 && styles.activeTabText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Nearby Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nơi ở gần bạn</Text>
            <Text style={styles.seeMore}>Xem thêm</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {/* Chỗ này cân data các bài đăng gần với vị trí */}
              {[
                "Nhà trọ Tân Phú",
                "Nhà trọ Tân Lập",
                "Nhà trọ ABC",
                "Nhà trọ XYZ",
              ].map((name, index) => (
                <View key={index} style={styles.card}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/150" }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardDistance}>1.8 km</Text>
                  <Text style={styles.cardName}>{name}</Text>
                  <Text style={styles.cardLocation}>Nguyễn Minh Tâm</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Best Choices Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Những lựa chọn tốt nhất</Text>
            <Text style={styles.seeMore}>Xem thêm</Text>
            {/* Chỗ này cần data các bài đăng best theo tiêu chí nào thì chưa biết */}
            {[
              "Nhà trọ Thiên Sơn 1",
              "Nhà trọ Thiên Sơn 2",
              "Nhà trọ Thiên Sơn 3",
            ].map((name, index) => (
              <View key={index} style={styles.listItem}>
                <Image
                  source={{ uri: "https://via.placeholder.com/100" }}
                  style={styles.listImage}
                />
                <View>
                  <Text style={styles.listName}>{name}</Text>
                  <Text style={styles.listPrice}>$3,500 / tháng</Text>
                  <Text style={styles.listDetails}>1 phòng ngủ</Text>
                </View>
              </View>
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
