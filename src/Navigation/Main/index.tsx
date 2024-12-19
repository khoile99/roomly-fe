import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return HomeIcon(color);
          }
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return SearchIcon(color);
          }
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return PostIcon(color);
          }
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return FavoriteIcon(color);
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ size, focused, color }) => {
            return ProfileIcon(color);
          },
        }}
      />
    </Tab.Navigator>
  );
};
