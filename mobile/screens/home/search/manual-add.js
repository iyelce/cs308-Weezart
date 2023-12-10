import React, { Component, useState, useEffect, useCallback } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  Switch,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "@react-native-community/blur";
// import { Rating } from "react-native-ratings";
import { Rating } from "@kolking/react-native-rating";
import { getUserId } from "./../../../helpers/Utils";
import axios from "./../../../config/axios";

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
  const [artistsName, setArtistsName] = useState("");
  const [artistsId, setArtistsId] = useState([]);
  const [popularity, setPopularity] = useState([]);
  const [duration_ms, setDurationMs] = useState(0);
  const [explicit, setExplicit] = useState(false);

  const [albumRelease, setAlbumRelease] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const toggleSwitch = () => setExplicit((previousState) => !previousState);

  const handleConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    if (selectedDate) {
      setAlbumRelease(selectedDate);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const addSong = () => {
    getUserId().then((userId) => {
      // console.log("ARRAY?: ", artistsName.split(","));

      const songPayload = {
        id: "",
        name: songName,
        albumName,
        albumId: "",
        artistsName: artistsName.split(","),
        artistsId: [],
        popularity: -1,
        duration_ms: parseInt(duration_ms),
        explicit: explicit,
        albumRelease: moment(albumRelease).format("YYYY-MM-DD"),
      };

      axios
        .post(`/add/manual-song-unique/${userId}`, songPayload)
        .then((response) => {
          navigation.goBack();
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
            flexDirection: "column",
            gap: 7,
            paddingBottom: 20,
            flex: 1,
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
              display: "flex",
              gap: 6,
            }}
          >
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
            }}
          >
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
              paddingLeft: 20,
              paddingRight: 20,
              // width: "100%",
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
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
              paddingLeft: 20,
              paddingRight: 20,
              // width: "100%",
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
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
            }}
          >
            <View
              style={{
                backgroundColor: "#f3f3f3",
                borderRadius: 16,
                padding: 16,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Text
                style={{ marginRight: 10, fontSize: 17, fontWeight: "bold" }}
              >
                Release Date:
              </Text>
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  {moment(albumRelease).format("YYYY-MM-DD")}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold", marginRight: 10 }}>
              Explicit:
              {explicit ? "True" : "False"}
            </Text>
            <Switch
              style={{}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={explicit ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={explicit}
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
          onPress={addSong}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
            Add Your Song
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
