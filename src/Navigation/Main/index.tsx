import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { PostContainer } from "@/Screens/Post";
import { ProfileContainer } from "@/Screens/Profile";
import { FavoriteContainer } from "@/Screens/Favorite";
import { SearchContainer } from "@/Screens/Search";

const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
    </Tab.Navigator>
  );
};
