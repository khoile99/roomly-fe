import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { Button } from "native-base";
import { View, Text, StyleSheet, Image } from "react-native";
import { Place } from "@/Services/places";
import PlaceMarkerIcon from "assets/place-marker-icon";


export const PlaceCard = (props:
  {
    place: Place;
    pressDelete: () => void;
    pressEdit: () => void;
    showEdit: Boolean;
  }) => {
  const urls = ["https://khoi-public.s3.ap-northeast-1.amazonaws.com/8bc7add356f6f20160387c15cae5e71a.png"]
  return (
    <View style={styles.container}>
      <Image style={styles.img} src={urls[0]} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          {props.place.namePost}
        </Text>
        <View style={styles.address}>
          <PlaceMarkerIcon />
          <Text style={styles.addressTxt}>{props.place.address}</Text>
        </View>
        <Text style={styles.price}>$ {props.place.price} / {i18n.t(LocalizationKey.MONTH)}</Text>
      </View>
      {props.showEdit &&
        <View style={styles.btnContainer}>
          <Button style={styles.btn} colorScheme={"red"} onPress={() => props.pressDelete()}><Text style={styles.txtBtn}>{i18n.t(LocalizationKey.DELETE)}</Text></Button>
          <Button style={styles.btn} onPress={() => props.pressEdit()}><Text style={styles.txtBtn}>{i18n.t(LocalizationKey.EDIT)}</Text></Button>
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 172,
    borderWidth: 1,
    borderRadius: 10,
  },
  img: {
    height: 105,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  innerContainer: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addressTxt: {
    color: "#848484",
    fontSize: 10,
    width: 120,
  },
  price: {
    fontWeight: 600,
    fontSize: 13,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  btn: {
    width: 70,
    height: 30,
    borderRadius: 5,
  },
  txtBtn: {
    fontSize: 8,
    color: "white",
    fontWeight: 500,
  }
});
