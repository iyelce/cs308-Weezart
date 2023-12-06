import React, { Component, useState, useEffect, useCallback } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "@react-native-community/blur";
// import { Rating } from "react-native-ratings";
import { Rating } from "@kolking/react-native-rating";
import { getUserId } from "../../../../helpers/Utils";

export default ManualAdd = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => false,
    });
  }, [navigation]);

  // const [rating, setRating] = useState(0);

  const [songId, setSongId] = useState("");
  const [songName, setSongName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [artistsName, setArtistsName] = useState([]);
  const [artistsId, setArtistsId] = useState([]);
  const [popularity, setPopularity] = useState("");
  const [duration_ms, setDurationMs] = useState(0);
  const [explicit, setExplicit] = useState(false);
  const [albumRelease, setAlbumRelease] = useState("");

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
            paddingBottom: 20,
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
              placeholder="Song ID"
              placeholderTextColor={"#9ba3af"}
              value={songId}
              onChangeText={(text) => {
                setSongId(text);
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
              value={songName}
              onChangeText={(text) => {
                setSongName(text);
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 7,
            paddingBottom: 20,
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
              placeholder="Album Name"
              placeholderTextColor={"#9ba3af"}
              value={albumName}
              onChangeText={(text) => {
                setAlbumName(text);
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
              placeholder="Album ID"
              placeholderTextColor={"#9ba3af"}
              value={albumId}
              onChangeText={(text) => {
                setAlbumId(text);
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 7,
            paddingBottom: 20,
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
              placeholder="Artists Name"
              placeholderTextColor={"#9ba3af"}
              value={artistsName}
              onChangeText={(text) => {
                setArtistsName(text);
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
              placeholder="Artists ID"
              placeholderTextColor={"#9ba3af"}
              value={artistsId}
              onChangeText={(text) => {
                setArtistsId(text);
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 7,
            paddingBottom: 20,
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
              placeholder="Popularity"
              placeholderTextColor={"#9ba3af"}
              value={popularity}
              onChangeText={(text) => {
                setPopularity(text);
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
              placeholder="Duration"
              placeholderTextColor={"#9ba3af"}
              value={duration_ms}
              onChangeText={(text) => {
                setDurationMs(text);
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 7,
            paddingBottom: 20,
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
              placeholder="Explicit"
              placeholderTextColor={"#9ba3af"}
              value={explicit}
              onChangeText={(text) => {
                setExplicit(text);
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
              placeholder="Release Date"
              placeholderTextColor={"#9ba3af"}
              value={albumRelease}
              onChangeText={(text) => {
                setAlbumRelease(text);
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
          onPress={() => navigation.navigate("ManualAdd")}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
            Add Your Song
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
