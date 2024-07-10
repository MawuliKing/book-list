import { Tabs } from "expo-router";
import React, { useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { IBook } from ".";
import { FavoriteBooksProvider } from "@/components/context/favorite.context";

export default function TabLayout() {
  return (
    <FavoriteBooksProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors["light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Quick Search",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "book" : "book-outline"}
                color={color}
              />
            ),
            headerShown: true,
            headerTitle: "Explore",
            headerBackgroundContainerStyle: {
              backgroundColor: Colors["light"].background,
            },
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "heart" : "heart-outline"}
                color={color}
              />
            ),
            headerShown: true,
            headerTitle: "Favorites",
            headerBackgroundContainerStyle: {
              backgroundColor: Colors["light"].background,
            },
          }}
        />
      </Tabs>
    </FavoriteBooksProvider>
  );
}
