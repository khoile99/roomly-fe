import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import { HomeScreens, ProfileScreens, MainScreens, SearchScreens } from "@/Screens";
import { ProfileInformationContainer } from "@/Screens/ProfileInformation";
import { ChangePasswordContainer } from "@/Screens/ChangePassword";
import { LogoutContainer } from "@/Screens/Logout";
import { PostManageContainer } from "@/Screens/PostManage";
import { EditPostContainer } from "@/Screens/EditPost";
import { PostDetailContainer } from "@/Screens/PostDetail";
import { SearchResultContainer } from "@/Screens/SearchResult";

const Tab = createBottomTabNavigator();

export type ProfileStackParamList = {
  [ProfileScreens.PROFILE]: undefined;
  [ProfileScreens.PROFILE_INFORMATION]: undefined;
  [ProfileScreens.POST_MANAGE]: undefined;
  [ProfileScreens.CHANGE_PASSWORD]: undefined;
  [ProfileScreens.LOGOUT]: undefined;
  [ProfileScreens.EDIT_POST]: undefined;
};
export type HomeStackParamList = {
  [HomeScreens.HOME]: undefined;
  [HomeScreens.POST_DETAIL]: undefined;
};
export type SearchStackParamList = {
  [SearchScreens.SEARCH]: undefined;
  [SearchScreens.SEARCH_RESULT]: undefined;
  [SearchScreens.POST_DETAIL]: undefined;
};
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();


// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={MainScreens.HOME}
        children={HomeNavigator}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return HomeIcon(color);
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={MainScreens.SEARCH}
        children={SearchNavigator}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return SearchIcon(color);
          },
          headerShown: false
        }}
      />
      <Tab.Screen
        name={MainScreens.POST}
        component={PostContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return PostIcon(color);
          },
        }}
      />
      <Tab.Screen
        name={MainScreens.FAVORITE}
        component={FavoriteContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return FavoriteIcon(color);
          },
        }}
      />
      <Tab.Screen
        name={MainScreens.PROFILE}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return ProfileIcon(color);
          },
          headerShown: false,
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
        name={ProfileScreens.POST_MANAGE}
        component={PostManageContainer}
      />
      <ProfileStack.Screen
        name={ProfileScreens.CHANGE_PASSWORD}
        component={ChangePasswordContainer}
      />
      <ProfileStack.Screen
        name={ProfileScreens.LOGOUT}
        component={LogoutContainer}
      />
      <ProfileStack.Screen
        name={ProfileScreens.EDIT_POST}
        component={EditPostContainer}
      />
    </ProfileStack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HomeScreens.HOME}
        component={HomeContainer}
      />
      <HomeStack.Screen
        name={HomeScreens.POST_DETAIL}
        component={PostDetailContainer}
      />
    </HomeStack.Navigator>
  );
};

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={SearchScreens.SEARCH}
        component={SearchContainer}
      />
      <SearchStack.Screen
        name={SearchScreens.SEARCH_RESULT}
        component={SearchResultContainer}
      />
      <SearchStack.Screen
        name={SearchScreens.POST_DETAIL}
        component={PostDetailContainer}
      />
    </SearchStack.Navigator>
  );
};