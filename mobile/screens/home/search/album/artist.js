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
import { getUserId } from "../../../../helpers/Utils";
import axios from "./../../../../config/axios";
import _ from "lodash";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-simple-toast";

export default Artist = ({ route, navigation }) => {
  const { data } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => false,
    });
  }, [navigation]);

  const [singer, setSinger] = useState(data);

  const onRatingChange = (singer, rating) => {
    let updatedSinger = singer;
    updatedSinger = {
      artist: singer.artist,
      userState: {
        ...singer.userState,
        rating: singer.userState.rating
          ? [...singer.userState.rating, rating]
          : [rating],
        ratingTime: singer.userState.ratingTime
          ? [...singer.userState.ratingTime, Date.now()]
          : [Date.now()],
      },
    };
    setSinger(updatedSinger);

    debouncedRatingChange(singer, rating);
  };

  const onLikedChanged = (singer, liked) => {
    let updatedSinger = singer;
    updatedSinger = {
      artist: singer.artist,
      userState: {
        ...singer.userState,
        liked: liked,
      },
    };
    setSinger(updatedSinger);

    debouncedLikedChanged(singer, liked);
  };

  const debouncedRatingChange = _.debounce((singer, rating) => {
    getUserId().then((userId) => {
      axios
        .post("/rate/artist/" + userId + "/" + rating, singer.artist)
        .then((res) => {
          let updatedSinger = singer;
          updatedSinger = {
            artist: res.artist,
            userState: {
              addTime: res.addTime,
              liked: res.liked,
              likeTime: res.likeTime,
              rating: res.rating,
              ratingTime: res.ratingTime,
            },
          };
          setSinger(updatedSinger);
        });
    });
  }, 1000);

  const debouncedLikedChanged = _.debounce((singer, liked) => {
    getUserId().then((userId) => {
      if (liked == false) {
        axios.post("/unlike/artist/" + userId, singer.artist).then((res) => {
          let updatedSinger = singer;
          updatedSinger = {
            artist: res.artist,
            userState: {
              addTime: res.addTime,
              liked: res.liked,
              likeTime: res.likeTime,
              rating: res.rating,
              ratingTime: res.ratingTime,
            },
          };
          setSinger(updatedSinger);
        });
      } else {
        axios.post("/like/artist/" + userId, singer.artist).then((res) => {
          let updatedSinger = singer;
          updatedSinger = {
            artist: res.artist,
            userState: {
              addTime: res.addTime,
              liked: res.liked,
              likeTime: res.likeTime,
              rating: res.rating,
              ratingTime: res.ratingTime,
            },
          };
          setSinger(updatedSinger);
        });
      }
    });
  }, 1000);

  const addArtist = () => {
    // console.log("record.album", record.album);
    getUserId().then((userId) => {
      axios.post("/add/artist/" + userId, singer.artist).then((res) => {
        Toast.show("Successfully added :)");
        navigation.goBack();
      });
    });
  };

  return (
    <View>
      {singer.userState && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            marginTop: 60,
            marginRight: 15,
            zIndex: 99,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <BlurView
              blurType="light"
              blurAmount={100}
              style={{
                height: 35,
                width: 35,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Rating
                size={15}
                rating={singer.userState.liked}
                maxRating={1}
                variant="hearts-outline"
                baseColor="#48484A"
                onChange={() => onLikedChanged(singer, !singer.userState.liked)}
              />
            </BlurView>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        style={{
          height: "100%",
          // alignItems: "center",
        }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: data.artist.imageUrl }}
            style={{ height: 400, resizeMode: "cover", width: "100%" }}
          />

          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
              bottom: 0,
              left: 0,
              position: "absolute",
              margin: 15,
            }}
          >
            {data.artist.name}
          </Text>
          {singer.userState && (
            <BlurView
              blurType="light"
              blurAmount={100}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: 10,
                padding: 12,
                borderRadius: 20,
              }}
            >
              <Rating
                size={16}
                rating={
                  singer.userState.rating
                    ? singer.userState.rating[
                        singer.userState.rating.length - 1
                      ]
                    : 0
                }
                variant="stars-outline"
                fillColor="#c2a30a"
                baseColor="#48484A"
                touchColor="#c2a30a"
                onChange={(rating) => onRatingChange(singer, rating)}
              />
            </BlurView>
          )}
        </View>
        {!singer.userState && (
          <TouchableOpacity
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              alignSelf: "flex-start",
              marginTop: "auto",
            }}
            onPress={() => addArtist()}
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
                Add artist
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            margin: 20,
          }}
        >
          {data.artist.genres.map((genre, i) => {
            return (
              <View
                key={i}
                style={{
                  padding: 15,
                  paddingRight: 20,
                  paddingLeft: 20,
                  backgroundColor: "#dbdbdb",
                  borderRadius: 30,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{genre}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
