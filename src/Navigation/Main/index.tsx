import React from "react";
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeContainer } from "@/Screens/Home";
import { PostContainer } from "@/Screens/Post";
import { ProfileContainer } from "@/Screens/Profile";
import { FavoriteContainer } from "@/Screens/Favorite";
import { SearchContainer } from "@/Screens/Search";
import HomeIcon from "assets/home-icon";
import SearchIcon from "assets/search-icon";
import PostIcon from "assets/post-icon";
import FavoriteIcon from "assets/favorite-icon";
import ProfileIcon from "assets/profile-icon";
import { ProfileScreens, MainScreens } from "@/Screens";
import { ProfileInformationContainer } from "@/Screens/ProfileInformation";
import { ChangePasswordContainer } from "@/Screens/ChangePassword";

const Tab = createBottomTabNavigator();

export type ProfileStackParamList = {
  [ProfileScreens.PROFILE]: undefined;
  [ProfileScreens.PROFILE_INFORMATION]: undefined;
  [ProfileScreens.POST_MANAGE]: undefined;
  [ProfileScreens.CHANGE_PASSWORD]: undefined;
  [ProfileScreens.LOGOUT]: undefined;
};
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={MainScreens.HOME}
        component={HomeContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return HomeIcon(color);
          }
        }}
      />
      <Tab.Screen
        name={MainScreens.SEARCH}
        component={SearchContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return SearchIcon(color);
          }
        }}
      />
      <Tab.Screen
        name={MainScreens.POST}
        component={PostContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return PostIcon(color);
          }
        }}
      />
      <Tab.Screen
        name={MainScreens.FAVORITE}
        component={FavoriteContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return FavoriteIcon(color);
          }
        }}
      />
      <Tab.Screen
        name={MainScreens.PROFILE}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return ProfileIcon(color);
          },
          headerShown: false
        }}
        children={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={ProfileScreens.PROFILE}
        component={ProfileContainer}
      />
      <ProfileStack.Screen
        name={ProfileScreens.PROFILE_INFORMATION}
        component={ProfileInformationContainer}
      />
      <ProfileStack.Screen
        name={ProfileScreens.CHANGE_PASSWORD}
        component={ChangePasswordContainer}
      />
    </ProfileStack.Navigator>
  );
};