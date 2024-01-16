import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "./../../../../config/axios";
import { getUserId } from "../../../../helpers/Utils";
import { useFocusEffect } from "@react-navigation/native";
import GroupAnalysis from "./analysis";

const Stack = createNativeStackNavigator();

export default FriendGroups = ({ route, navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddGroup"
        component={AddGroups}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="GroupAnalysis"
        component={GroupAnalysis}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Groups = ({ navigation }) => {
  const [allPlaylists, setAllPlaylists] = useState([]);

  const fetchData = () => {
    getUserId().then((userId) => {
      axios.get("/group/get-all-playlists/" + userId).then((res) => {
        setAllPlaylists(res);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={{ backgroundColor: "white", height: "100%", display: "flex" }}>
      <View
        id="here"
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 70,
          justifyContent: "center",
          gap: 30,
        }}
      >
        {allPlaylists.map((playlist, index) => (
          <View style={{ marginTop: 10, width: 144 }} key={index}>
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                height: 144,
                borderRadius: 16,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // marginTop: 70,
                  justifyContent: "center",
                  gap: 7,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                onPress={() =>
                  navigation.navigate("GroupAnalysis", { data: playlist })
                }
              >
                {playlist.songList
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 4)
                  .map((song, i) => (
                    <Image
                      key={i}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        backgroundColor: song.albumImageURL
                          ? "transparent"
                          : "black",
                      }}
                      source={{
                        uri: song.albumImageURL,
                      }}
                    />
                  ))}
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{}}>
                {playlist.userSong.groupSongNames.map((name, i) => (
                  <View key={i} style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {name}
                    </Text>
                    {i !== playlist.userSong.groupSongNames.length - 1 && (
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {" "}
                        +{" "}
                      </Text>
                    )}
                  </View>
                ))}
              </Text>
              <Text style={{ fontSize: 15, color: "#7e7e7e", marginTop: 1 }}>
                4 Items
              </Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          alignSelf: "flex-start",
          marginTop: "auto",
          marginBottom: 100,
        }}
        onPress={() => navigation.navigate("AddGroup")}
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
            Add New Group
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const AddGroups = ({ navigation }) => {
  const [groupName, setGroupName] = useState("");
  const [followingUsers, setFollowingUsers] = useState([]);
  const [selectedFollowings, setSelectedFollowings] = useState([]);

  useEffect(() => {
    getUserId().then((userId) => {
      axios.get("/user/added-songs/" + userId).then((res) => {
        setFollowingUsers(res[0].user.following);
      });
    });
  }, []);

  const handleUserSelection = (username) => {
    // Toggle user selection
    setSelectedFollowings((prevSelected) => {
      if (prevSelected.includes(username)) {
        return prevSelected.filter((name) => name !== username);
      } else {
        return [...prevSelected, username];
      }
    });
  };

  const AddGroup = () => {
    getUserId().then((userId) => {
      let userIds = [userId];

      const requests = selectedFollowings.map((username) => {
        return axios.get("/user/profile/" + username).then((res) => {
          userIds.push(res.iduser);
        });
      });

      Promise.all(requests)
        .then(() => {
          console.log(userIds);
          axios
            .post("/group/post-playlist/" + userIds.join("-"))
            .then((res) => {
              navigation.goBack();
            });
        })
        .catch((error) => {
          console.error("Error fetching user profiles:", error);
        });
    });
  };

  return (
    <View style={{ backgroundColor: "#f3f3f3", height: "100%", padding: 20 }}>
      <View
        style={{
          backgroundColor: "#f3f3f3",
          backgroundColor: "#dedede",
          borderRadius: 16,
          padding: 16,
          paddingLeft: 20,
          paddingRight: 20,
          // width: "100%",
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
          gap: 6,
        }}
      >
        <TextInput
          required
          placeholder="Group Name"
          placeholderTextColor={"#9ba3af"}
          value={groupName}
          onChangeText={(text) => {
            setGroupName(text);
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
          gap: 20,
          borderRadius: 10,
          padding: 25,
          //   backgroundColor: "#dedede",
        }}
      >
        {followingUsers.length !== 0 &&
          followingUsers.map((user, i) => {
            const isSelected = selectedFollowings.includes(user);

            return (
              <View key={i}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {user}
                  </Text>
                  <TouchableOpacity onPress={() => handleUserSelection(user)}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderColor: "black",
                        borderWidth: 1,
                        borderStyle: "solid",
                        padding: 1,
                        borderRadius: 50,
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          borderRadius: 50,
                          backgroundColor: isSelected ? "black" : "transparent",
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </View>
      <TouchableOpacity
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          alignSelf: "flex-start",
          marginTop: "auto",
          marginBottom: 50,
        }}
        onPress={() => AddGroup()}
      >
        <LinearGradient
          colors={["#000", "#2d3748"]}
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
            Add
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
