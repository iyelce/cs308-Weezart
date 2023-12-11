import React, { useEffect, useState } from "react";
import { Dimensions, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  BlurView,
  Rating,
  StyleSheet,
} from "react-native";
import axios from "./../../../config/axios";
import { getUserId } from "../../../helpers/Utils";
import { LineChart } from "react-native-chart-kit";

export default Main = ({ route, navigation }) => {
  const { data } = route.params;

  const [addedChartData, setAddedChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [likedChartData, setLikedChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [ratedChartData, setRatedChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [popular, setPopular] = useState([]);
  const [friendRecom, setFriendRecom] = useState([]);
  const [artistsRecom, setArtistsRecom] = useState([]);
  const [albumRecom, setAlbumRecom] = useState([]);

  useEffect(() => {
    fetchStuff();
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStuff().then(() => {
      setRefreshing(false);
    });
  };

  const fetchStuff = () => {
    return getUserId().then((userId) => {
      return Promise.all(
        axios.get("/analysis/song/daily-added/" + userId).then((res) => {
          const labels = Object.keys(res);
          const datasetData = Object.values(res);

          setAddedChartData({
            labels: labels,
            datasets: [
              {
                data: datasetData,
              },
            ],
          });
        }),
        axios.get("/analysis/song/daily-liked/" + userId).then((res) => {
          const labels = Object.keys(res);
          const datasetData = Object.values(res);

          setLikedChartData({
            labels: labels,
            datasets: [
              {
                data: datasetData,
              },
            ],
          });
        }),
        axios.get("/analysis/song/daily-rating/" + userId).then((res) => {
          const labels = Object.keys(res);
          const datasetData = Object.values(res);

          setRatedChartData({
            labels: labels,
            datasets: [
              {
                data: datasetData,
              },
            ],
          });
        }),

        axios.get("/recommendation/popular").then((res) => {
          setPopular(res);
        }),
        axios.get("/recommendation/friend/" + userId).then((res) => {
          setFriendRecom(res);
        }),
        axios.get("/recommendation/genre-artist/" + userId).then((res) => {
          setArtistsRecom(res);
        }),
        axios.get("/recommendation/release-date/" + userId).then((res) => {
          setAlbumRecom(res);
        })
      );
    });
  };

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <View style={{ backgroundColor: "white" }}>
      {addedChartData.labels.length != 0 &&
        likedChartData.labels.length != 0 &&
        ratedChartData.labels.length != 0 &&
        friendRecom.friendName != null && (
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ marginLeft: "auto", marginRight: "auto" }}>
              <ScrollView
                snapToInterval={360}
                decelerationRate={"fast"}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                contentContainerStyle={{
                  gap: 10,
                  paddingRight: 30,
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                    Your Daily Added Songs
                  </Text>
                  <LineChart
                    data={addedChartData}
                    width={Dimensions.get("window").width * (9 / 10)} // from react-native
                    height={220}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#fb8c00",
                      backgroundGradientTo: "#ffa726",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      marginTop: 15,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                    Your Daily Liked Songs
                  </Text>
                  <LineChart
                    data={likedChartData}
                    width={Dimensions.get("window").width * (9 / 10)} // from react-native
                    height={220}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#fb8c00",
                      backgroundGradientTo: "#a7a726",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      marginTop: 15,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                    Your Daily Rated Songs
                  </Text>
                  <LineChart
                    data={ratedChartData}
                    width={Dimensions.get("window").width * (9 / 10)} // from react-native
                    height={220}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#a7a700",
                      backgroundGradientTo: "#ffa726",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      marginTop: 15,
                    }}
                  />
                </View>
              </ScrollView>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Weezart Popular Songs
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
              contentContainerStyle={{
                gap: 10,
                paddingRight: 30,
              }}
            >
              {popular.map((song, i) => {
                return (
                  <View style={{ width: 150 }} key={song.id}>
                    <Image
                      style={{ width: 150, height: 150, borderRadius: 5 }}
                      source={{ uri: song.albumImageURL }}
                    />
                    <Text style={{ marginTop: 8, fontWeight: "bold" }}>
                      {song.name}
                    </Text>
                    <Text style={{ marginTop: 2, fontSize: 12 }}>
                      {song.artistsName[0]}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              {"What " + friendRecom.friendName + " recommends"}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
              contentContainerStyle={{
                gap: 10,
                paddingRight: 30,
              }}
            >
              {friendRecom.friendSongs.map((song, i) => {
                return (
                  <View style={{ width: 150 }} key={song.id}>
                    <Image
                      style={{ width: 150, height: 150, borderRadius: 5 }}
                      source={{ uri: song.albumImageURL }}
                    />
                    <Text style={{ marginTop: 8, fontWeight: "bold" }}>
                      {song.name}
                    </Text>
                    <Text style={{ marginTop: 2, fontSize: 12 }}>
                      {song.artistsName[0]}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                marginLeft: 20,
                marginTop: 40,
              }}
            >
              {"Artists to check out"}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
              contentContainerStyle={{
                gap: 30,
                paddingRight: 30,
              }}
            >
              {artistsRecom.length != 0 &&
                artistsRecom.map((artist, i) => {
                  return (
                    <View
                      style={{
                        width: 110,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={artist.id}
                    >
                      <Image
                        style={{ width: 110, height: 110, borderRadius: 150 }}
                        source={{ uri: artist.imageUrl }}
                      />
                      <Text style={{ marginTop: 8, fontWeight: "bold" }}>
                        {artist.name}
                      </Text>
                    </View>
                  );
                })}
            </ScrollView>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                marginLeft: 20,
                marginTop: 40,
              }}
            >
              {"Albums to check out"}
            </Text>
            {albumRecom.length != 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                contentContainerStyle={{
                  gap: 10,
                  paddingRight: 30,
                }}
              >
                {albumRecom.map((album, i) => {
                  return (
                    <View style={{ width: 150 }} key={album.id}>
                      <Image
                        style={{ width: 150, height: 150, borderRadius: 5 }}
                        source={{ uri: album.imageUrl }}
                      />
                      <Text style={{ marginTop: 8, fontWeight: "bold" }}>
                        {album.name}
                      </Text>
                      <Text style={{ marginTop: 2, fontSize: 12 }}>
                        {album.artistsName[0]}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </ScrollView>
        )}
    </View>
    // </SafeAreaView>
  );
};
