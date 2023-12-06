import React, { Component, useState, useEffect, useCallback } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "@react-native-community/blur";
// import { Rating } from "react-native-ratings";
import { Rating } from "@kolking/react-native-rating";
import axios from "./../../../../config/axios";
import { getUserId } from "../../../../helpers/Utils";

const Tab = createBottomTabNavigator();

export default Details = ({ route, navigation }) => {
  // const { data, track, type } = route.data;
  const { data, source } = route.params;

  const handleSave = () => {
    getUserId().then((userId) => {
      axios.post("/add/manual-song-accepted/" + userId, data).then((res) => {
        navigation.goBack();
        // if (res == "SONG_SAVED") {
        // axios
        //   .post("/like/song/" + userId, {
        //     id: data.id,
        //     name: data.name,
        //     albumName: data.albumName,
        //     albumId: data.albumId,
        //     albumRelease: data.albumRelease,
        //     artistsName: data.artistsName,
        //     artistsId: data.artistsId,
        //     popularity: data.popularity,
        //     duration_ms: data.duration_ms,
        //     explicit: data.explicit,
        //   })
        //   .then((likeRes) => {
        //     console.log("result be here", likeRes);
        //   });
        // }
      });
    });
  };

  return (
    <View style={{ height: "100%", padding: 10, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", color: "#7e7e7e" }}
            onPress={() => navigation.goBack()}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        {source != "profile" && (
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ fontWeight: "bold", color: "#349eeb" }}>
              Save & Add
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ paddingRight: 5, paddingLeft: 5 }}>
        <View
          style={{
            width: "100%",
            //   padding: 5,
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={{ uri: data.albumImageURL }}
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
              source={{ uri: data.albumImageURL }}
              style={{ width: 100, height: 100, borderRadius: 5 }}
            />
            <View style={{ marginLeft: 15, gap: 5 }}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {data.name}
              </Text>
              <Text style={{ color: "#0007" }}>
                {data.artistsName[0] + " • "}
                <Text style={{ fontWeight: 500 }}>{"song"}</Text>
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: "black",
            borderRadius: 5,
            marginTop: 10,
            backgroundColor: "#f3f3f3",
            // backgroundColor: "white",
            // padding: 20,
            // paddingLeft: 40,
            // paddingRight: 40,
            // shadowColor: "#000",
            // shadowOffset: {
            //   width: 0,
            //   height: 1,
            // },
            // shadowOpacity: 0.18,
            // shadowRadius: 1.0,

            // elevation: 1,
          }}
        >
          <View>
            {/* <View
              style={{
                flexDirection: "row",
                padding: 13,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Rating
                size={18}
                rating={rating}
                variant="stars-outline"
                fillColor="#c2a30a"
                baseColor="#48484A"
                touchColor="#c2a30a"
                onChange={handleRatingChange}
              />
              <Rating
                size={18}
                rating={liked}
                maxRating={1}
                variant="hearts-outline"
                // fillColor="#fff"
                baseColor="#48484A"
                onChange={handleLikedChange}
              />
            </View> */}
            <View
              style={{ height: 2, backgroundColor: "white", width: "100%" }}
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 13,
              }}
            >
              <Text style={{ fontSize: 13 }}>{"Album"}</Text>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                {data.albumName}
              </Text>
            </View>
            <View
              style={{ height: 2, backgroundColor: "white", width: "100%" }}
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 13,
              }}
            >
              <Text style={{ fontSize: 13 }}>{"Release Date"}</Text>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                {data.albumRelease}
              </Text>
            </View>
            <View
              style={{ height: 2, backgroundColor: "white", width: "100%" }}
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 13,
              }}
            >
              <Text style={{ fontSize: 13 }}>{"Duration"}</Text>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                {Math.floor(Math.floor(data.duration_ms / 1000) / 60) +
                  ":" +
                  (Math.floor(data.duration_ms / 1000) % 60)}
              </Text>
            </View>
            <View
              style={{ height: 2, backgroundColor: "white", width: "100%" }}
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 13,
              }}
            >
              <Text style={{ fontSize: 13 }}>{"Popularity"}</Text>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                {data.popularity + "/100"}
              </Text>
            </View>
          </View>
        </View>

        {/* <Rating
        type="star"
        ratingCount={5}
        imageSize={60}
        // onFinishRating={this.ratingCompleted}
      /> */}
      </View>
    </View>
  );
};
