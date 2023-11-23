import React from "react";
import { View } from "react-native";
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

export default Main = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{
          height: "100%",
          // alignItems: "center",
        }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <Text
          style={{
            fontWeight: "800",
            fontSize: 20,
            color: "black",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 10,
          }}
        >
          Welcome to the WeezartApp, Raman!
        </Text>
        <View>
          <Text style={styles.itemText}>Recommendations</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, paddingLeft: 10, paddingRight: 20 }}
          >
            <View style={{ width: 150 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#102331",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>
                {"And in the Darkness, Hearts Aglow"}
              </Text>
            </View>
            <View style={{ width: 150, marginLeft: 15 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#27422e",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>{"Titanic Rising"}</Text>
            </View>
            <View style={{ width: 150, marginLeft: 15 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#414227",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>{"Front Row Seat to Earth"}</Text>
            </View>
          </ScrollView>
        </View>
        <View>
          <Text style={styles.itemText}>Your Friends' Favorites</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, paddingLeft: 10, paddingRight: 20 }}
          >
            <View style={{ width: 150 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#102331",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>
                {"And in the Darkness, Hearts Aglow"}
              </Text>
            </View>
            <View style={{ width: 150, marginLeft: 15 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#27422e",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>{"Titanic Rising"}</Text>
            </View>
            <View style={{ width: 150, marginLeft: 15 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#414227",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>{"Front Row Seat to Earth"}</Text>
            </View>
          </ScrollView>
        </View>
        <View>
          <Text style={styles.itemText}>Songs You Might Like</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, paddingLeft: 10, paddingRight: 20 }}
          >
            <View style={{ width: 150 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#102331",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>
                {"And in the Darkness, Hearts Aglow"}
              </Text>
            </View>
            <View style={{ width: 150, marginLeft: 15 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#27422e",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>{"Titanic Rising"}</Text>
            </View>
            <View style={{ width: 150, marginLeft: 15 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#414227",
                  borderRadius: 5,
                }}
              ></View>
              <Text style={{ marginTop: 8 }}>{"Front Row Seat to Earth"}</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const sampleData = [
  {
    image: [require("./../../../assets/temp/cover/boniver.jpg")],
    name: "For Emma, Forever Ago",
    artists: ["Bon Iver"],
    type: "album",
    trackAmount: 9,
    releaseDate: "2008",
    tracks: [
      { name: "Flume", duration: "3:39", explicit: false, popularity: 0.5 },
      { name: "Lump Sum", duration: "3:21", explicit: false, popularity: 0.5 },
      {
        name: "Skinny Love",
        duration: "3:59",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "The Wolves (Act I and II)",
        duration: "5:22",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Blindsided",
        duration: "5:29",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Creature Fear",
        duration: "3:06",
        explicit: false,
        popularity: 0.5,
      },
      { name: "Team", duration: "1:57", explicit: false, popularity: 0.5 },
      { name: "For Emma", duration: "3:41", explicit: false, popularity: 0.5 },
      {
        name: "Re: Stacks",
        duration: "6:41",
        explicit: false,
        popularity: 0.5,
      },
    ],
  },
  {
    image: [require("./../../../assets/temp/cover/weyesblood.jpg")],
    name: "Titanic Rising",
    artists: ["Weyes Blood"],
    type: "album",
    trackAmount: 10,
    releaseDate: "2019",
    tracks: [
      {
        name: "A Lot's Gonna Change",
        duration: "4:22",
        explicit: false,
        popularity: 0.5,
      },
      { name: "Andromeda", duration: "4:40", explicit: false, popularity: 0.5 },
      {
        name: "Everyday",
        duration: "5:07",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Something To Believe",
        duration: "4:46",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Titanic Rising",
        duration: "1:36",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Movies",
        duration: "5:54",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Mirror Forever",
        duration: "5:06",
        explicit: false,
        popularity: 0.5,
      },
      { name: "Wild Time", duration: "6:09", explicit: false, popularity: 0.5 },
      {
        name: "Picture Me Better",
        duration: "3:42",
        explicit: false,
        popularity: 0.5,
      },
      {
        name: "Nearer To Thee",
        duration: "1:06",
        explicit: false,
        popularity: 0.5,
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 20,
    color: "black",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    borderRadius: 30,
    marginVertical: 20,
  },
  itemText: {
    color: "black",
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});
