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
import { getUserId } from "../../../helpers/Utils";
import axios from "./../../../config/axios";
import Toast from "react-native-simple-toast";

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

const SearchScreen = ({ navigation }) => {
  const [searchType, setSearchType] = useState(0);
  const [addType, setAddType] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [songData, setSongData] = useState("");
  const [albumData, setAlbumData] = useState("");
  const [artistData, setArtistData] = useState("");

  const [friendUsername, setFriendUsername] = useState("");

  useEffect(() => {
    console.log("the current user id", getUserId());
  }, []);

  handleSearch = () => {
    switch (searchType) {
      case 0:
        axios
          .get("/api/spotify/search-song?query=" + searchInput)
          .then((res) => {
            setSongData(res);
            setSearchInput("");
          });
        break;
      case 1:
        axios
          .get("/api/spotify/search-album?query=" + searchInput)
          .then((res) => {
            setAlbumData(res);
            setSearchInput("");
          });
        break;
      case 2:
        axios
          .get("/api/spotify/search-artist?query=" + searchInput)
          .then((res) => {
            setArtistData(res);
            setSearchInput("");
          });
        break;
    }
  };

  addSongClicked = (song) => {
    getUserId().then((userId) => {
      axios.post("/add/song/" + userId, song).then((res) => {
        console.log("is id returned?", res);
        if (res.id) {
          Toast.Show("Added Successfully");
        } else {
          Toast.Show("Already Added");
        }
      });
    });
  };

  const AddFriend = () => {
    Keyboard.dismiss();

    getUserId().then((id) => {
      axios.get("/user/profile/" + id).then((myProfile) => {
        axios
          .post("/add/friend/" + myProfile.username + "/" + friendUsername)
          .then((res) => {
            if (res.iduser) {
              Toast.show("Added :)");
            } else {
              Toast.show("Failed :(");
            }
          });
      });
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          height: "100%",
        }}
      >
        <View>
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
              value={searchInput}
              style={{
                width: "100%",
                fontSize: 17,
                fontWeight: "bold",
              }}
              returnKeyType="search"
              onChangeText={(text) => {
                setSearchInput(text);
              }}
              onSubmitEditing={() => {
                handleSearch();
              }}
            />
          </View>
          <SegmentedControl
            values={["Songs", "Albums", "Artists"]}
            selectedIndex={searchType}
            style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}
            onChange={(event) => {
              console.log(event.nativeEvent.selectedSegmentIndex);
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
            {searchType == 0
              ? songData &&
                songData.map((song, i) => {
                  return (
                    <TouchableOpacity
                      style={{
                        //   backgroundColor: "#f3f3f3",
                        padding: 20,
                        paddingBottom: 15,
                        paddingTop: 15,
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 10,
                        justifyContent: "space-between",
                        // backgroundColor: "#f9f9f9",
                      }}
                      key={song.id}
                      onPress={() =>
                        navigation.navigate("Details", {
                          data: song,
                          // source: "profile",
                        })
                      }
                    >
                      <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          {song.name}
                          {/* <Text
                          style={{
                            color: "#48484A",
                            fontSize: 12,
                            fontWeight: "normal",
                          }}
                        >
                          {track.song.artistsName[0]}
                        </Text> */}
                        </Text>

                        <Text
                          style={{
                            color: "#48484A",
                            fontSize: 12,
                            fontWeight: "normal",
                            marginTop: 5,
                          }}
                        >
                          {song.artistsName[0]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : searchType == 1
              ? albumData &&
                albumData.map((album, i) => {
                  return (
                    <TouchableOpacity
                      key={album.id}
                      style={{
                        width: "100%",
                        //   padding: 5,
                        borderRadius: 5,
                        overflow: "hidden",
                        marginTop: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("Album", {
                          data: { userState: null, album: album },
                        })
                      }
                    >
                      <ImageBackground
                        source={{ uri: album.imageUrl }}
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
                          source={{ uri: album.imageUrl }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 5,
                          }}
                        />
                        <View style={{ marginLeft: 15, gap: 5 }}>
                          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                            {album.name}
                          </Text>
                          <Text style={{ color: "#0007", fontWeight: 500 }}>
                            {album.artistsName[0] + " • "}
                            <Text style={{ fontWeight: "normal" }}>
                              {album.releaseDate}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : searchType == 2 &&
                artistData &&
                artistData.map((artist, i) => {
                  return (
                    <TouchableOpacity
                      key={artist.id}
                      style={{
                        width: "100%",
                        //   padding: 5,
                        borderRadius: 5,
                        overflow: "hidden",
                        marginTop: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("Artist", {
                          data: { userState: null, artist: artist },
                        })
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
                          source={{ uri: artist.imageUrl }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                          }}
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
                          style={{
                            width: 24,
                            height: 24,
                            marginLeft: "auto",
                          }}
                          source={require("./../../../assets/icons/arrow.png")}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
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
