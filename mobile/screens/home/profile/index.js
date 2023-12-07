import React, { Profiler, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  TabView,
  StyleSheet,
  SectionList,
  FlatList,
  ImageBlurShadow,
  RefreshControl,
  ImageBackground,
} from "react-native";
import SegmentedControl from "react-native-segmented-control-2";
import { Colors } from "react-native/Libraries/NewAppScreen";
import axios from "./../../../config/axios";
import { getUserId } from "../../../helpers/Utils";
import { Rating } from "@kolking/react-native-rating";
import _ from "lodash";
import details from "../search/album/details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BlurView } from "@react-native-community/blur";
import Album from "../search/album";
import Artist from "../search/album/artist";

const Stack = createNativeStackNavigator();

export default Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Details"
          component={details}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="Album" component={Album} />
        <Stack.Screen name="Artist" component={Artist} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [addedSongs, setAddedSongs] = useState(null);
  const [addedAlbums, setAddedAlbums] = useState(null);
  const [addedArtists, setAddedArtists] = useState(null);

  const [currentSegment, setCurrentSegment] = useState(0);

  const fetchStuff = () => {
    getUserId().then((userId) => {
      // axios.get("/user/profile/" + userId).then((res) => {
      //   setUserInfo(res);
      // });
      axios.get("/user/added-songs/" + userId).then((res) => {
        setUserInfo(res[0].user);
        const addedSongs = res.map((item) => {
          return {
            song: item.song,
            userState: {
              addTime: item.addTime,
              liked: item.liked,
              likeTime: item.likeTime,
              rating: item.rating,
              ratingTime: item.ratingTime,
            },
          };
        });
        setAddedSongs(addedSongs);
      });
      axios.get("/user/added-albums/" + userId).then((res) => {
        const addedAlbums = res.map((item) => {
          return {
            album: item.album,
            userState: {
              addTime: item.addTime,
              liked: item.liked,
              likeTime: item.likeTime,
              rating: item.rating,
              ratingTime: item.ratingTime,
            },
          };
        });
        setAddedAlbums(addedAlbums);
      });
      axios.get("/user/added-artists/" + userId).then((res) => {
        const artistsArray = res.map((item) => {
          return {
            artist: item.artist,
            userState: {
              addTime: item.addTime,
              liked: item.liked,
              likeTime: item.likeTime,
              rating: item.rating,
              ratingTime: item.ratingTime,
            },
          };
        });
        setAddedArtists(artistsArray);
      });
    });
  };

  useEffect(() => {
    fetchStuff();
  }, []);

  const onRefresh = () => {
    fetchStuff();
  };

  const onRatingChange = (track, rating, i) => {
    const updatedAddedSongs = [...addedSongs];
    const indexOfItemToUpdate = i;
    console.log("aayo?", track);
    updatedAddedSongs[indexOfItemToUpdate] = {
      song: track.song,
      userState: {
        ...track.userState,
        rating: [...track.userState.rating, rating],
        ratingTime: track.userState.ratingTime
          ? [...track.userState.ratingTime, Date.now()]
          : [Date.now()],
      },
    };
    setAddedSongs(updatedAddedSongs);

    debouncedRatingChange(track, rating, i);
  };

  const onLikedChanged = (track, liked, i) => {
    const updatedAddedSongs = [...addedSongs];
    const indexOfItemToUpdate = i;
    updatedAddedSongs[indexOfItemToUpdate] = {
      song: track.song,
      userState: {
        ...track.userState,
        liked: liked,
      },
    };
    setAddedSongs(updatedAddedSongs);

    debouncedLikedChanged(track, liked, i);
  };

  const debouncedRatingChange = _.debounce((track, rating, i) => {
    getUserId().then((userId) => {
      // const indexOfItemToUpdate = updatedAddedSongs.findIndex(
      //   (item) => item.song.id === res.song.id
      // );
      axios
        .post("/rate/song/" + userId + "/" + rating, track.song)
        .then((res) => {
          const updatedAddedSongs = [...addedSongs];
          const indexOfItemToUpdate = i;
          updatedAddedSongs[indexOfItemToUpdate] = {
            song: res.song,
            userState: {
              addTime: res.addTime,
              liked: res.liked,
              likeTime: res.likeTime,
              rating: res.rating,
              ratingTime: res.ratingTime,
            },
          };
          setAddedSongs(updatedAddedSongs);
        });
    });
  }, 1000);

  const debouncedLikedChanged = _.debounce((track, i) => {
    getUserId().then((userId) => {
      // const indexOfItemToUpdate = updatedAddedSongs.findIndex(
      //   (item) => item.song.id === res.song.id
      // );
      axios.post("/like/song/" + userId, track.song).then((res) => {
        const updatedAddedSongs = [...addedSongs];
        const indexOfItemToUpdate = i;
        updatedAddedSongs[indexOfItemToUpdate] = {
          song: res.song,
          userState: {
            addTime: res.addTime,
            liked: res.liked,
            likeTime: res.likeTime,
            rating: res.rating,
            ratingTime: res.ratingTime,
          },
        };
        setAddedSongs(updatedAddedSongs);
      });
    });
  }, 1000);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {userInfo && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: "#c0c3c0",
                display: "flex",
                height: 85,
                width: 85,
                borderRadius: 999,
                marginTop: 25,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                source={require("./../../../assets/icons/pp.png")}
                resizeMode="contain"
                style={{
                  height: 85,
                  width: 85,
                  borderRadius: 999,
                }}
              />
            </View>
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              {userInfo.username}
            </Text>
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 5,
                fontWeight: "bold",
                fontSize: 12,
                color: "#9ba3af",
              }}
            >
              {userInfo.email + " | profile"}
            </Text>
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 8,
                fontWeight: "bold",
                fontSize: 13,
                color: "#7e7e7e",
              }}
            >
              {userInfo.followers
                ? userInfo.followers
                : 0 +
                  " followers • " +
                  (userInfo.following ? userInfo.following : 0 + " following")}
            </Text>

            <View
              style={{
                backgroundColor: "white",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                marginTop: 20,
                height: "100%",
                padding: 10,
              }}
            >
              <SegmentedControl
                style={{
                  // marginTop: 32,
                  marginLeft: "auto",
                  marginRight: "auto",
                  // width: "100%",
                  backgroundColor: "#f9f9f9",
                }}
                activeTabColor="#e8e8e8"
                onChange={(index) => setCurrentSegment(index)}
                // activeTextColor="#fff"
                tabs={[
                  <View
                    style={{
                      display: "flex",
                      gap: 8,
                      paddingTop: 8,
                      paddingBottom: 8,
                    }}
                  >
                    <Image
                      style={{
                        width: 28,
                        height: 28,
                        marginLeft: "auto",
                        marginRight: "auto",
                        tintColor: "#9ba3af",
                      }}
                      source={require("./../../../assets/icons/songs.png")}
                    />
                    <Text
                      style={{
                        color: "#7e7e7e",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      Songs
                    </Text>
                  </View>,
                  <View
                    style={{
                      display: "flex",
                      gap: 8,
                      paddingTop: 8,
                      paddingBottom: 8,
                    }}
                  >
                    <Image
                      style={{
                        width: 28,
                        height: 28,
                        marginLeft: "auto",
                        marginRight: "auto",
                        tintColor: "#9ba3af",
                      }}
                      source={require("./../../../assets/icons/albums.png")}
                    />
                    <Text
                      style={{
                        color: "#7e7e7e",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      Albums
                    </Text>
                  </View>,
                  <View
                    style={{
                      display: "flex",
                      gap: 8,
                      paddingTop: 8,
                      paddingBottom: 8,
                    }}
                  >
                    <Image
                      style={{
                        width: 28,
                        height: 28,
                        marginLeft: "auto",
                        marginRight: "auto",
                        tintColor: "#9ba3af",
                      }}
                      source={require("./../../../assets/icons/artists.png")}
                    />
                    <Text
                      style={{
                        color: "#7e7e7e",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      Artists
                    </Text>
                  </View>,
                ]}
                // onChange={(index: number) => console.log("Index: ", index)}
              />
              {addedSongs && addedAlbums && addedArtists && (
                <View style={{ marginTop: 20 }}>
                  {currentSegment == 0
                    ? addedSongs.map((track, i) => {
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
                              // backgroundColor: "#f9f9f9",
                            }}
                            key={i}
                            onPress={() =>
                              navigation.navigate("Details", {
                                data: track.song,
                                source: "profile",
                              })
                            }
                          >
                            <Rating
                              size={15}
                              rating={track.userState.liked}
                              maxRating={1}
                              variant="hearts-outline"
                              // fillColor="#fff"
                              baseColor="#48484A"
                              onChange={() =>
                                onLikedChanged(track, !track.userState.liked, i)
                              }
                            />
                            <View style={{ marginLeft: 20 }}>
                              <Text
                                style={{ fontWeight: "bold", fontSize: 15 }}
                              >
                                {track.song.name}
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
                                {track.song.artistsName[0]}
                              </Text>
                              <Rating
                                size={15}
                                rating={
                                  track.userState.rating[
                                    track.userState.rating.length - 1
                                  ]
                                }
                                variant="stars-outline"
                                fillColor="#c2a30a"
                                baseColor="#48484A"
                                touchColor="#c2a30a"
                                style={{ marginTop: 5 }}
                                onChange={(rating) =>
                                  onRatingChange(track, rating, i)
                                }
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })
                    : currentSegment == 1
                    ? addedAlbums.map((record, i) => {
                        return (
                          <TouchableOpacity
                            key={record.album.name}
                            style={{
                              width: "100%",
                              //   padding: 5,
                              borderRadius: 5,
                              overflow: "hidden",
                              marginTop: 10,
                            }}
                            onPress={() =>
                              navigation.navigate("Album", { data: record })
                            }
                          >
                            <ImageBackground
                              source={{ uri: record.album.imageUrl }}
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
                                source={{ uri: record.album.imageUrl }}
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 5,
                                }}
                              />
                              <View style={{ marginLeft: 15, gap: 5 }}>
                                <Text
                                  style={{ fontWeight: "bold", fontSize: 15 }}
                                >
                                  {record.album.name}
                                </Text>
                                <Text
                                  style={{ color: "#0007", fontWeight: 500 }}
                                >
                                  {record.album.artistsName[0] + " • "}
                                  <Text style={{ fontWeight: "normal" }}>
                                    {record.album.releaseDate}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      })
                    : currentSegment == 2 &&
                      addedArtists.map((item, i) => {
                        return (
                          <TouchableOpacity
                            key={item.artist.name}
                            style={{
                              width: "100%",
                              //   padding: 5,
                              borderRadius: 5,
                              overflow: "hidden",
                              marginTop: 10,
                            }}
                            onPress={() =>
                              navigation.navigate("Artist", { data: item })
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
                                source={{ uri: item.artist.imageUrl }}
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 40,
                                }}
                              />
                              <View style={{ marginLeft: 15, gap: 5 }}>
                                <Text
                                  style={{ fontWeight: "bold", fontSize: 15 }}
                                >
                                  {item.artist.name}
                                </Text>
                                <Text style={{ color: "#0007" }}>
                                  <Text style={{ fontWeight: 500 }}>
                                    {"artist"}
                                  </Text>
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
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 20,
    color: "black",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    borderRadius: 30,
    marginVertical: 20,
  },
  itemText: {
    color: "black",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});
