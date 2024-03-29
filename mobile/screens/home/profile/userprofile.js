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

export default UserProfile = ({ route, navigation }) => {
  const { param } = route.params;
  const username = param;

  const [userData, setUserData] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [addedSongs, setAddedSongs] = useState(null);
  const [addedAlbums, setAddedAlbums] = useState(null);
  const [addedArtists, setAddedArtists] = useState(null);

  const [currentSegment, setCurrentSegment] = useState(0);

  const fetchStuff = () => {
    // axios.get("/user/profile/" + userId).then((res) => {
    //   setUserInfo(res);
    // });
    axios.get("/user/profile/" + username).then((res) => {
      const userId = res.iduser;
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

  const [followingModal, setFollowingModal] = useState(false);

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={followingModal}
        onRequestClose={() => {
          setFollowingModal(!followingModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Followings</Text>
            {userInfo.following &&
              userInfo.following.map((user) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setFollowingModal(false);
                      //   navigation.navigate("UserProfile", { param: user });
                    }}
                  >
                    <Text>{user}</Text>
                  </TouchableOpacity>
                );
              })}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setFollowingModal(!followingModal)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
                source={require("./../../../assets/icons/pp.jpeg")}
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
              <TouchableOpacity onPress={() => setFollowingModal(true)}>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
