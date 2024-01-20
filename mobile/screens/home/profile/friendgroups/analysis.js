import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "./../../../../config/axios";
import { BarChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

export default GroupAnalysis = ({ route, navigation }) => {
  const { data } = route.params;

  const [loading, setLoading] = useState(true);

  const [addList, setAddList] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [likeList, setLikeList] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [avgList, setAvgList] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios.get("/group/analysis-playlist/" + data.userSong.id).then((res) => {
      const usernames = res.userList.map((user) => user.username);
      setAddList({
        labels: usernames,
        datasets: [
          {
            data: res.addList,
          },
        ],
      });
      setLikeList({
        labels: usernames,
        datasets: [
          {
            data: res.likeList,
          },
        ],
      });
      setAvgList({
        labels: usernames,
        datasets: [
          {
            data: res.avgList,
          },
        ],
      });
      setLoading(false);
    });
  }, []);

  return (
    <View style={{ paddingTop: 80, backgroundColor: "white", height: "100%" }}>
      {loading ? (
        <View
          style={{
            height: 100,
            width: 100,
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <LottieView
            source={require("./../../../../assets/anim/loading.json")}
            autoPlay
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      ) : (
        <ScrollView
          style={{
            height: "100%",
            // alignItems: "center",
            // padding: 20,
            paddingTop: 20,
          }}
          contentContainerStyle={{
            paddingBottom: 100,
            justifyContent: "center",
            display: "flex",
          }}
        >
          <View style={{ marginLeft: "auto", marginRight: "auto" }}>
            <View
              style={
                {
                  // elevation: 1,
                }
              }
            >
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    padding: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Songs Added
                </Text>
                <BarChart
                  style={{
                    // marginVertical: 8,
                    borderRadius: 16,
                    marginTop: 15,
                  }}
                  data={addList}
                  width={Dimensions.get("window").width * (9 / 10)} // from react-native
                  height={220}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      // borderRadius: 16,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                  }}
                  // verticalLabelRotation={30}
                />
              </View>
            </View>
          </View>
          <View
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                padding: 0,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Songs Liked
            </Text>
            <BarChart
              style={{
                // marginVertical: 8,
                borderRadius: 16,
                marginTop: 15,
              }}
              data={likeList}
              width={Dimensions.get("window").width * (9 / 10)} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  // borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              // verticalLabelRotation={30}
            />
          </View>
          <View
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                padding: 0,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Rated Songs
            </Text>
            <BarChart
              style={{
                // marginVertical: 8,
                borderRadius: 16,
                marginTop: 15,
              }}
              data={avgList}
              width={Dimensions.get("window").width * (9 / 10)} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  // borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              // verticalLabelRotation={30}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 25, padding: 20 }}>
            All Songs Mixed
          </Text>
          {data.songList.map((track, i) => (
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
                // backgroundColor: "#f9f9f9",
              }}
              key={i}
              onPress={() =>
                navigation.navigate("Details", {
                  data: track,
                  source: "profile",
                })
              }
            >
              <Image
                style={{ height: 50, width: 50, borderRadius: 10 }}
                source={{ uri: track.albumImageURL }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {track.name}
                </Text>

                <Text
                  style={{
                    color: "#48484A",
                    fontSize: 12,
                    fontWeight: "normal",
                    marginTop: 5,
                  }}
                >
                  {track.artistsName[0]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
