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

export default Artist = ({ route, navigation }) => {
  const { data } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => false,
    });
  }, [navigation]);

  const [rating, setRating] = useState(0);

  return (
    <View>
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
            blurType="dark"
            style={{
              height: 35,
              width: 35,
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 16, height: 16, tintColor: "white" }}
              source={require("./../../../../assets/icons/love.png")}
            />
          </BlurView>
        </TouchableOpacity>
        <TouchableOpacity>
          <BlurView
            blurType="dark"
            style={{
              height: 35,
              width: 35,
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{"+"}</Text>
          </BlurView>
        </TouchableOpacity>
      </View>
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
              rating={rating}
              fillColor="#fff"
              baseColor="#fff"
              //  onChange={handleChange}
            />
          </BlurView>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            margin: 20,
          }}
        >
          {data.artist.genres.map((genre) => {
            return (
              <View
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
