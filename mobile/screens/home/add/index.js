import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BlurView } from "@react-native-community/blur";
import axios from "../../../config/axios";
import { getToken, getUserId } from "../../../helpers/Utils";
import ManualAdd from "./manual-add";
import Toast from "react-native-simple-toast";

const Stack = createNativeStackNavigator();

export default Add = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManualAdd"
        component={ManualAdd}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

const AddScreen = ({ navigation }) => {
  const [searchType, setSearchType] = useState(0);

  const [songSearch, setSongSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");

  const [addType, setAddType] = useState(0);

  const [friendUsername, setFriendUsername] = useState("");

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
          Keyboard.dismiss();
        });
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <SegmentedControl
        values={["Add Songs", "Add Friends"]}
        selectedIndex={searchType}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 5,
          marginTop: 20,
        }}
        // tintColor="black"
        onChange={(event) => {
          setAddType(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      {addType == 0 ? (
        <View
          style={{
            height: "100%",
            paddingRight: 20,
            paddingLeft: 20,
            marginTop: 20,
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
              backgroundColor: "#4d4d4d",
            }}
            onPress={() => navigation.navigate("ManualAdd")}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
              Add Your Song Manually
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            paddingRight: 20,
            paddingLeft: 20,
            marginTop: 20,
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
                placeholder="Friends Username"
                placeholderTextColor={"#9ba3af"}
                value={friendUsername}
                onChangeText={(text) => {
                  setFriendUsername(text);
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
            onPress={AddFriend}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
              Add Friend
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
