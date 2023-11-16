import React, { useState } from "react";
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

const sampleArtists = [
  {
    name: "Bon Iver",
    image: require("./../../../assets/temp/artist/boniver.jpeg"),
  },
  {
    name: "Weyes Blood",
    image: require("./../../../assets/temp/artist/weyesblood.jpg"),
  },
];

const sampleData = [
  {
    image: [require("./../../../assets/temp/cover/boniver.jpg")],
    name: "For Emma, Forever Ago",
    artists: [sampleArtists[0]],
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
    artists: [sampleArtists[1]],
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
  const [searchType, setSearchType] = useState(0);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          height: "100%",
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
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Image
            style={{ width: 16, height: 16, tintColor: "#9ba3af" }}
            source={require("./../../../assets/icons/search.png")}
          />
          <TextInput
            required
            placeholder="Search"
            placeholderTextColor={"#9ba3af"}
            style={{
              width: "100%",
              fontSize: 17,
              fontWeight: "bold",
            }}
            returnKeyType="search"
          />
        </View>
        <SegmentedControl
          values={["Songs", "Albums", "Artists"]}
          selectedIndex={searchType}
          style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}
          onChange={(event) => {
            setSearchType(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <ScrollView
          style={{ display: "flex", gap: 5, width: "100%", padding: 10 }}
          //   showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 60,
          }}
        >
          {searchType == 1
            ? sampleData.map((album, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      //   padding: 5,
                      borderRadius: 5,
                      overflow: "hidden",
                      marginTop: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("Album", { data: album })
                    }
                  >
                    <ImageBackground
                      source={album.image[0]}
                      resizeMode="cover"
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                      }}
                    ></ImageBackground>
                    <BlurView
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                      }}
                      blurType="light"
                      blurAmount={100}
                      // reducedTransparencyFallbackColor="white"
                      // overlayColor="rgba(255, 255, 255)"
                    />
                    <View
                      style={{
                        padding: 5,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={album.image[0]}
                        style={{ width: 80, height: 80, borderRadius: 5 }}
                      />
                      <View style={{ marginLeft: 15, gap: 5 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          {album.name}
                        </Text>
                        <Text style={{ color: "#0007" }}>
                          {album.artists[0].name + " • "}
                          <Text style={{ fontWeight: 500 }}>{album.type}</Text>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            : searchType == 2 &&
              sampleArtists.map((artist, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      //   padding: 5,
                      borderRadius: 5,
                      overflow: "hidden",
                      marginTop: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("Artist", { data: artist })
                    }
                  >
                    <View
                      style={{
                        padding: 5,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={artist.image}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                      />
                      <View style={{ marginLeft: 15, gap: 5 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          {artist.name}
                        </Text>
                        <Text style={{ color: "#0007" }}>
                          <Text style={{ fontWeight: 500 }}>{"artist"}</Text>
                        </Text>
                      </View>
                      <Image
                        style={{ width: 24, height: 24, marginLeft: "auto" }}
                        source={require("./../../../assets/icons/arrow.png")}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Album", { data: sampleData[0] })}
        >
          <Text>For Emma, Forever Ago</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Album", { data: sampleData[1] })}
        >
          <Text>Titanic Rising</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};
