import React, { Profiler, useEffect, useRef, useState } from "react";
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
  Animated,
  Modal,
  Linking,
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
import { Swipeable, RectButton } from "react-native-gesture-handler";
import artist from "../search/album/artist";
import DocumentPicker from "react-native-document-picker";
import Dialog from "react-native-dialog";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import Toast from "react-native-simple-toast";
import LinearGradient from "react-native-linear-gradient";
import Friendgroups from "./friendgroups";

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
      <Stack.Screen
        name="FriendGroups"
        component={Friendgroups}
        options={{ headerShown: false }}
      />
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
    setRefreshing(true);
    fetchStuff();
    setRefreshing(false);
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

  const debouncedLikedChanged = _.debounce((track, liked, i) => {
    getUserId().then((userId) => {
      // const indexOfItemToUpdate = updatedAddedSongs.findIndex(
      //   (item) => item.song.id === res.song.id
      // );
      if (liked == false) {
        axios.post("/unlike/song/" + userId, track.song).then((res) => {
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
      } else {
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
      }
    });
  }, 1000);

  const onSongRemove = (track, i) => {
    getUserId().then((userId) => {
      axios
        .delete("/remove/song/" + userId, { data: track.song })
        .then((res) => {
          const updatedAddedSongs = addedSongs.filter(
            (_, index) => index !== i
          );
          setAddedSongs(updatedAddedSongs);
        });
    });
  };

  const onAlbumRemove = (record, i) => {
    getUserId().then((userId) => {
      axios
        .delete("/remove/album/" + userId, { data: record.album })
        .then((res) => {
          const updatedAddedAlbums = addedAlbums.filter(
            (_, index) => index !== i
          );
          setAddedAlbums(updatedAddedAlbums);
        });
    });
  };

  const onArtistRemove = (singer, i) => {
    getUserId().then((userId) => {
      axios
        .delete("/remove/artist/" + userId, { data: singer.artist })
        .then((res) => {
          const updatedAddedArtists = addedArtists.filter(
            (_, index) => index !== i
          );
          setAddedArtists(updatedAddedArtists);
        });
    });
  };

  const importFile = () => {
    getUserId().then((userId) => {
      try {
        DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        }).then((file) => {
          const formData = new FormData();
          formData.append("file", file[0]);

          axios
            .post(`/file/import/${userId}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              Toast.show("Success :)");
              fetchStuff();
            });
        });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
          console.error("Error picking document:", err);
        }
      }
    });
  };

  const [dbModalVisible, setDbModalVisible] = useState(false);
  const [dbData, setDbData] = useState({ url: "", username: "", password: "" });

  const handleOpenDbModal = () => setDbModalVisible(true);
  const handleCloseDbModal = () => setDbModalVisible(false);

  const handleDbModalSubmit = () => {
    getUserId().then((userId) => {
      axios.post("/add-from-db/db/" + userId, dbData).then((res) => {
        Toast.show("Successful :)");
      });
    });
  };
  const handleExport = () => {
    getUserId().then((userId) => {
      try {
        axios
          .post(`/file/export/${userId}`, {
            responseType: "blob",
          })
          .then(async (res) => {
            const jsonData = JSON.stringify(res);

            const fileName = `exported_weezart_${new Date().getTime()}.json`;
            const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
            await RNFS.writeFile(filePath, jsonData, "utf8");
            Share.open({
              url: `file://${filePath}`,
              type: "application/json",
              failOnCancel: false,
            });
          });
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Dialog.Container visible={dbModalVisible}>
        <Dialog.Title>Import from DB</Dialog.Title>
        <Dialog.Description>
          Import your song data by connecting to your database server
        </Dialog.Description>
        <Dialog.Input
          onChange={(text) => setDbData({ ...dbData, url: text })}
          label="URL"
        />
        <Dialog.Input
          onChange={(text) => setDbData({ ...dbData, username: text })}
          label="Username"
        />
        <Dialog.Input
          onChange={(text) => setDbData({ ...dbData, password: text })}
          label="Password"
        />
        <Dialog.Button label="Cancel" onPress={handleCloseDbModal} />
        <Dialog.Button label="Connect" onPress={handleDbModalSubmit} />
      </Dialog.Container>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {userInfo && (
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "center", gap: 3 }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#f3f3f3",
                  borderRadius: 16,
                  borderTopLeftRadius: 999,
                  borderBottomLeftRadius: 999,
                  padding: 9,
                  paddingLeft: 20,
                  paddingRight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  backgroundColor: "#e8e8e8",
                }}
                onPress={importFile}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#7e7e7e", fontSize: 11 }}
                >
                  Import from file
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#f3f3f3",
                  // borderRadius: 16,
                  // borderTopRightRadius: 999,
                  // borderBottomRightRadius: 999,
                  padding: 9,
                  paddingLeft: 20,
                  paddingRight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  backgroundColor: "#e8e8e8",
                }}
                onPress={handleExport}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#7e7e7e", fontSize: 11 }}
                >
                  Export
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#f3f3f3",
                  borderRadius: 16,
                  borderTopRightRadius: 999,
                  borderBottomRightRadius: 999,
                  padding: 9,
                  paddingLeft: 20,
                  paddingRight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  backgroundColor: "#e8e8e8",
                }}
                onPress={handleOpenDbModal}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#7e7e7e", fontSize: 11 }}
                >
                  Import from DB
                </Text>
              </TouchableOpacity>
            </View>
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
            <View
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 8,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#7e7e7e",
                  }}
                >
                  {(userInfo.followers ? userInfo.followers.length : 0) +
                    " followers • "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#7e7e7e",
                  }}
                >
                  {(userInfo.following ? userInfo.following.length : 0) +
                    " following"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ display: "flex" }}>
              <TouchableOpacity
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  alignSelf: "flex-start",
                }}
                onPress={() => navigation.navigate("FriendGroups")}
              >
                <LinearGradient
                  colors={["#4a5568", "#2d3748"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#2d3748",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Friend Groups
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "white",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                marginTop: 10,
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
                          // <Swipeable
                          //   key={i}
                          //   renderRightActions={(progress, dragX) =>
                          //     renderRightActions(progress, dragX, () => {
                          //       // onRemove(i)
                          //     })
                          //   }
                          // >
                          <Swipeable
                            key={track.song.id}
                            renderRightActions={(progress, dragX, onClick) => (
                              <TouchableOpacity
                                style={{
                                  margin: 0,
                                  alignContent: "center",
                                  justifyContent: "center",
                                  width: 70,
                                  marginRight: 20,
                                }}
                                onPress={() => onSongRemove(track, i)}
                              >
                                <Image
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginLeft: "auto",
                                    tintColor: "red",
                                  }}
                                  source={require("../../../assets/icons/trash.png")}
                                />
                              </TouchableOpacity>
                            )}
                            onSwipeableOpen={() => {
                              // console.log("closerow");
                              // if (
                              //   prevOpenedRow &&
                              //   prevOpenedRow !== row[index]
                              // ) {
                              //   prevOpenedRow.close();
                              // }
                              // prevOpenedRow = row[index];
                            }}
                            rightOpenValue={-100}
                          >
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
                                  onLikedChanged(
                                    track,
                                    !track.userState.liked,
                                    i
                                  )
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
                          </Swipeable>
                        );
                      })
                    : currentSegment == 1
                    ? addedAlbums.map((record, i) => {
                        return (
                          <Swipeable
                            key={record.album.id}
                            renderRightActions={(progress, dragX, onClick) => (
                              <TouchableOpacity
                                style={{
                                  margin: 0,
                                  alignContent: "center",
                                  justifyContent: "center",
                                  width: 70,
                                  marginRight: 20,
                                }}
                                onPress={() => onAlbumRemove(record, i)}
                              >
                                <Image
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginLeft: "auto",
                                    tintColor: "red",
                                  }}
                                  source={require("../../../assets/icons/trash.png")}
                                />
                              </TouchableOpacity>
                            )}
                            onSwipeableOpen={() => {}}
                            rightOpenValue={-100}
                          >
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
                          </Swipeable>
                        );
                      })
                    : currentSegment == 2 &&
                      addedArtists.map((item, i) => {
                        return (
                          <Swipeable
                            key={item.artist.id}
                            renderRightActions={(progress, dragX, onClick) => (
                              <TouchableOpacity
                                style={{
                                  margin: 0,
                                  alignContent: "center",
                                  justifyContent: "center",
                                  width: 70,
                                  marginRight: 20,
                                }}
                                onPress={() => onArtistRemove(item, i)}
                              >
                                <Image
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginLeft: "auto",
                                    tintColor: "red",
                                  }}
                                  source={require("../../../assets/icons/trash.png")}
                                />
                              </TouchableOpacity>
                            )}
                            onSwipeableOpen={() => {}}
                            rightOpenValue={-100}
                          >
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
                          </Swipeable>
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
