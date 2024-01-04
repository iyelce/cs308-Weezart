import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "./../../../../config/axios";
import { getUserId } from "../../../../helpers/Utils";

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
    </Stack.Navigator>
  );
};

const Groups = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", height: "100%", display: "flex" }}>
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

const AddGroups = () => {
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
            return (
              <View>
                <View
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {user}
                  </Text>
                  <TouchableOpacity>
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
                          backgroundColor: "black",
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
        onPress={() => navigation.navigate("AddGroup")}
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
