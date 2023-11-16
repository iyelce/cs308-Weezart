import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageBlurShadow from "react-native-image-blur-shadow";

export default Album = ({ route, navigation }) => {
  const { data } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          height: "100%",
          alignItems: "center",
        }}
      >
        <ImageBlurShadow
          style={{ marginTop: 20 }}
          source={data.image[0]}
          imageWidth={260}
          imageHeight={260}
          imageBorderRadius={30}
          shadowOffset={38}
          shadowBlurRadius={48}
          shadowBackgroundColor={"#ffffff"}
        />
        <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: -10 }}>
          {data.name}
        </Text>
        <Text style={{ marginTop: 10, color: "#7e7e7e", fontSize: 15 }}>
          {data.type +
            " • " +
            data.releaseDate +
            " • " +
            data.trackAmount +
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
            onPress={() =>
              navigation.navigate("Artist", { data: data.artists[0] })
            }
          >
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              {data.artists[0].name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", padding: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#f3f3f3",
              //   width: "100%",
              padding: 13,
              margin: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Details", { data: data })}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 12, height: 12 }}
                source={require("./../../../../assets/icons/rate.png")}
              />
              <Text style={{ fontWeight: "500", fontSize: 15, marginLeft: 8 }}>
                {"Rate and view details"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ display: "flex", gap: 5, width: "100%", padding: 10 }}
          //   showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 60,
          }}
        >
          {data.tracks.map((track, i) => {
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
                onPress={() =>
                  navigation.navigate("Details", {
                    data: data,
                    track: i,
                    type: "song",
                  })
                }
              >
                <Text style={{ color: "#7e7e7e" }}>{i + 1}</Text>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {track.name}
                  </Text>
                  <Text style={{ color: "#7e7e7e", marginTop: 5 }}>
                    {track.duration}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
