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
