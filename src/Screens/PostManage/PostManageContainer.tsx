import { PostManage } from "./PostManage";
import React, { useEffect } from "react";
import { useGetPlacesMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "@/Navigation/Main";
import { ProfileScreens } from "..";
import { store } from "@/Store";
import { changePlaces } from "@/Store/reducers/place";


export const PostManageContainer = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList>) => {
  const onNavigateProfileScreen = (screen: ProfileScreens, props: any) => {
    navigation.navigate(screen, props);
  };
  const [fetchPlaces, { data, isSuccess, isLoading, error }] =
    useGetPlacesMutation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      var data = await fetchPlaces({ accessToken }).unwrap();
      store.dispatch(changePlaces(data.posts))
    };

    fetchData();
  }, [fetchPlaces]);

  return <PostManage isLoading={isLoading} onNavigate={onNavigateProfileScreen} />;
};
