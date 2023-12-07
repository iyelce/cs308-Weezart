import React, { useEffect, useState } from "react";
import Album from "./album";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Details from "./album/details";
import Artist from "./album/artist";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BlurView } from "@react-native-community/blur";
import axios from "./../../../config/axios";
import { getToken, getUserId } from "../../../helpers/Utils";
import manualAdd from "./manual-add";

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
          name="Artist"
          component={Artist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="ManualAdd"
          component={manualAdd}
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const SearchScreen = ({ navigation }) => {
  const [searchType, setSearchType] = useState(0);

  const [songSearch, setSongSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");

  const SearchClicked = () => {
    getUserId().then((id) => {
      axios
        .get(
          "/add/manual-song-assisted/" +
            songSearch +
            "/" +
            artistSearch +
            "/" +
            id
        )
        .then((res) => {
          navigation.navigate("Details", { data: res });
        });
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          height: "100%",
          paddingRight: 20,
          paddingLeft: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 7,
          }}
        >
          <View
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: 16,
              padding: 16,
              paddingLeft: 20,
              paddingRight: 20,
              // width: "100%",
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              flex: 1,
            }}
          >
            <Image
              style={{ width: 16, height: 16, tintColor: "#9ba3af" }}
              source={require("./../../../assets/icons/search.png")}
            />
            <TextInput
              required
              placeholder="Artist Name"
              placeholderTextColor={"#9ba3af"}
              value={artistSearch}
              onChangeText={(text) => {
                setArtistSearch(text);
              }}
              style={{
                width: "100%",
                fontSize: 17,
                fontWeight: "bold",
              }}
              returnKeyType="search"
            />
          </View>
          <View
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: 16,
              padding: 16,
              // width: "100%",
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              flex: 1,
            }}
          >
            <Image
              style={{ width: 16, height: 16, tintColor: "#9ba3af" }}
              source={require("./../../../assets/icons/search.png")}
            />
            <TextInput
              required
              placeholder="Song Name"
              placeholderTextColor={"#9ba3af"}
              value={songSearch}
              onChangeText={(text) => {
                setSongSearch(text);
              }}
              style={{
                width: "100%",
                fontSize: 17,
                fontWeight: "bold",
              }}
              returnKeyType="search"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#f3f3f3",
            borderRadius: 16,
            padding: 16,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: 10,
            backgroundColor: "black",
          }}
          onPress={SearchClicked}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
            Assisted Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#f3f3f3",
            borderRadius: 16,
            padding: 16,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: 10,
            backgroundColor: "black",
          }}
          onPress={() => navigation.navigate("ManualAdd")}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
            Add Your Song Manually
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
