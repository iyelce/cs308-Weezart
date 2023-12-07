import { Rating } from "@kolking/react-native-rating";
import { BlurView } from "@react-native-community/blur";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageBlurShadow from "react-native-image-blur-shadow";
import _ from "lodash";
import { getUserId } from "../../../../helpers/Utils";
import axios from "./../../../../config/axios";

export default Album = ({ route, navigation }) => {
  const { data } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => false,
    });
  }, [navigation]);

  const [record, setRecord] = useState(data);

  const onRatingChange = (record, rating) => {
    let updatedRecord = record;
    updatedRecord = {
      album: record.album,
      userState: {
        ...record.userState,
        rating: record.userState.rating
          ? [...record.userState.rating, rating]
          : [rating],
        ratingTime: record.userState.ratingTime
          ? [...record.userState.ratingTime, Date.now()]
          : [Date.now()],
      },
    };
    setRecord(updatedRecord);

    debouncedRatingChange(record, rating);
  };

  const onLikedChanged = (record, liked) => {
    let updatedRecord = record;
    updatedRecord = {
      album: record.album,
      userState: {
        ...record.userState,
        liked: liked,
      },
    };
    setRecord(updatedRecord);

    debouncedLikedChanged(record, liked);
  };

  const debouncedRatingChange = _.debounce((record, rating) => {
    getUserId().then((userId) => {
      axios
        .post("/rate/album/" + userId + "/" + rating, record.album)
        .then((res) => {
          let updatedRecord = record;
          updatedRecord = {
            album: res.album,
            userState: {
              addTime: res.addTime,
              liked: res.liked,
              likeTime: res.likeTime,
              rating: res.rating,
              ratingTime: res.ratingTime,
            },
          };
          setRecord(updatedRecord);
        });
    });
  }, 1000);

  const debouncedLikedChanged = _.debounce((record, i) => {
    getUserId().then((userId) => {
      axios.post("/like/album/" + userId, record.album).then((res) => {
        let updatedRecord = record;
        updatedRecord = {
          album: res.album,
          userState: {
            addTime: res.addTime,
            liked: res.liked,
            likeTime: res.likeTime,
            rating: res.rating,
            ratingTime: res.ratingTime,
          },
        };
        setRecord(updatedRecord);
      });
    });
  }, 1000);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView
        //   showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <View
          style={{
            height: "100%",
            alignItems: "center",
          }}
        >
          <ImageBlurShadow
            style={{ marginTop: 20 }}
            source={{ uri: record.album.imageUrl }}
            imageWidth={260}
            imageHeight={260}
            imageBorderRadius={30}
            shadowOffset={38}
            shadowBlurRadius={48}
            shadowBackgroundColor={"#ffffff"}
          />
          <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: -10 }}>
            {record.album.name}
          </Text>
          <Text style={{ marginTop: 10, color: "#7e7e7e", fontSize: 15 }}>
            {"album" +
              " • " +
              record.album.releaseDate +
              " • " +
              record.album.numberOfTracks +
              " Tracks"}
          </Text>
          <View
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 15, height: 15 }}
              source={require("./../../../../assets/icons/mic.png")}
            />
            <TouchableOpacity
            // onPress={() =>
            // navigation.navigate("Artist", { record: record.album.artistsName[0] })
            // }
            >
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                }}
              >
                {record.album.artistsName[0]}
                {/* {"Bon Iver"} */}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ width: "80%", padding: 10 }}> */}
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              justifyContent: "space-between",
              backgroundColor: "#fefefe",
              //   width: "100%",
              padding: 13,
              paddingRight: 20,
              paddingLeft: 20,
              margin: 10,
              marginTop: 10,
              marginBottom: 0,
              borderRadius: 999,
              alignItems: "center",
              gap: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
            }}
          >
            <Rating
              size={15}
              rating={record.userState.liked}
              maxRating={1}
              variant="hearts-outline"
              // fillColor="#fff"
              baseColor="#48484A"
              onChange={() => onLikedChanged(record, !record.userState.liked)}
            />
            <Rating
              size={17}
              rating={
                record.userState.rating
                  ? record.userState.rating[record.userState.rating.length - 1]
                  : 0
              }
              variant="stars-outline"
              fillColor="#c2a30a"
              baseColor="#48484A"
              touchColor="#c2a30a"
              onChange={(rating) => onRatingChange(record, rating)}
            />
          </View>
          {/* </View> */}
          <View style={{ display: "flex", gap: 5, width: "100%", padding: 10 }}>
            {record.album.songsName.map((track, i) => {
              return (
                <TouchableOpacity
                  style={{
                    //   backgroundColor: "#f3f3f3",
                    padding: 20,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={i}
                  // onPress={() =>
                  //   navigation.navigate("Details", {
                  //     data: data,
                  //     track: i,
                  //     type: "song",
                  //   })
                  // }
                >
                  <Text style={{ color: "#7e7e7e" }}>{i + 1}</Text>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {track}
                    </Text>
                    <Text style={{ color: "#7e7e7e", marginTop: 5 }}>
                      {/* {track.duration} */}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
