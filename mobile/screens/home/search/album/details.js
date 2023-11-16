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

const Tab = createBottomTabNavigator();

export default Details = ({ route, navigation }) => {
  const { data, track, type } = route.params;

  const [rating, setRating] = useState(0);

  const handleChange = useCallback(
    // (value: number) => setRating(Math.round((rating + value) * 5) / 10),
    [rating]
  );

  return (
    <View style={{ height: "100%", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold", color: "#7e7e7e" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold", color: "#349eeb" }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          //   padding: 5,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={data.image[0]}
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
            source={data.image[0]}
            style={{ width: 100, height: 100, borderRadius: 5 }}
          />
          <View style={{ marginLeft: 15, gap: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {type == "song" ? data.tracks[track].name : data.name}
            </Text>
            <Text style={{ color: "#0007" }}>
              {data.artists[0].name + " • "}
              <Text style={{ fontWeight: 500 }}>
                {type == "song" ? type : data.type}
              </Text>
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
          backgroundColor: "#e3e3e3",
          padding: 20,
          paddingLeft: 40,
          paddingRight: 40,
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center", gap: 10 }}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../../../assets/icons/share.png")}
            />
            <Text>Share</Text>
          </View>
          <View style={{ alignItems: "center", gap: 10 }}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../../../assets/icons/love.png")}
            />
            <Text>Like</Text>
          </View>
          <View style={{ alignItems: "center", gap: 10 }}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../../../assets/icons/add.png")}
            />
            <Text>Add</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Rating
            size={20}
            rating={rating}
            fillColor="#000"
            baseColor="#000"
            //  onChange={handleChange}
          />
        </View>
      </View>

      {/* <Rating
        type="star"
        ratingCount={5}
        imageSize={60}
        // onFinishRating={this.ratingCompleted}
      /> */}
    </View>
  );
};
