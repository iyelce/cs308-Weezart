import React from "react";
import Album from "./album";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Details from "./album/details";

const Stack = createNativeStackNavigator();

export default Search = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Album"
          component={Album}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const sampleData = [
  {
    image: [require("./../../../assets/temp/cover/boniver.jpg")],
    name: "For Emma, Forever Ago",
    artists: ["Bon Iver"],
    type: "album",
    trackAmount: 9,
    releaseDate: "2008",
    tracks: [
      { name: "Flume", duration: "3:39", explicit: false, popularity: 0.5 },
      { name: "Lump Sum", duration: "3:21", explicit: false, popularity: 0.5 },
      {
        name: "Skinny Love",
        duration: "3:59",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "The Wolves (Act I and II)",
        duration: "5:22",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Blindsided",
        duration: "5:29",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Creature Fear",
        duration: "3:06",
        explicit: false,
        popularity: 0.5,
      },
      { name: "Team", duration: "1:57", explicit: false, popularity: 0.5 },
      { name: "For Emma", duration: "3:41", explicit: false, popularity: 0.5 },
      {
        name: "Re: Stacks",
        duration: "6:41",
        explicit: false,
        popularity: 0.5,
      },
    ],
  },
  {
    image: [require("./../../../assets/temp/cover/weyesblood.jpg")],
    name: "Titanic Rising",
    artists: ["Weyes Blood"],
    type: "album",
    trackAmount: 10,
    releaseDate: "2019",
    tracks: [
      {
        name: "A Lot's Gonna Change",
        duration: "4:22",
        explicit: false,
        popularity: 0.5,
      },
      { name: "Andromeda", duration: "4:40", explicit: false, popularity: 0.5 },
      {
        name: "Everyday",
        duration: "5:07",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Something To Believe",
        duration: "4:46",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Titanic Rising",
        duration: "1:36",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Movies",
        duration: "5:54",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Mirror Forever",
        duration: "5:06",
        explicit: false,
        popularity: 0.5,
      },
      { name: "Wild Time", duration: "6:09", explicit: false, popularity: 0.5 },
      {
        name: "Picture Me Better",
        duration: "3:42",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Nearer To Thee",
        duration: "1:06",
        explicit: false,
        popularity: 0.5,
      },
    ],
  },
];

const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          height: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Album", { data: sampleData[0] })}
        >
          <Text>For Emma, Forever Ago</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Album", { data: sampleData[1] })}
        >
          <Text>Titanic Rising</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
