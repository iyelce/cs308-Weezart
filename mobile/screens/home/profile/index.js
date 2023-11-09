import React, { Profiler } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  TabView,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
        }}
      >
        <Image
          source={require("./../../../assets/icons/wallpaper.png")}
          resizeMode="cover"
          style={{
            height: 200,
            width: "100%",
            opacity: 0.5,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("./../../../assets/icons/pp3.png")}
          resizeMode="contain"
          style={{
            height: 115,
            width: 115,
            borderRadius: 999,
            borderWidth: 2,
            marginTop: -90,
          }}
        />
        <Text
          style={{
            color: "black",
            marginVertical: 8,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Raman Afravi
        </Text>
        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              385
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
              }}
            >
              Following
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              1,7K
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
              }}
            >
              Followers
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 999,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Liked Songs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 999,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Liked Albums
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 999,
              marginHorizontal: 1,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Liked Artists
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
