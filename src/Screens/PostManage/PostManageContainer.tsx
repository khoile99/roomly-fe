import { PostManage } from "./PostManage";
import React, { useEffect } from "react";
import { useGetPlacesMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "@/Navigation/Main";
import { ProfileScreens } from "..";


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
      fetchPlaces({ accessToken });
    };

    fetchData();
  }, [fetchPlaces]);

  return <PostManage places={data?.posts} isLoading={false} onNavigate={onNavigateProfileScreen} />;
};
