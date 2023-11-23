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
  StyleSheet,
  SectionList,
  FlatList,
  ImageBlurShadow,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

export default Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("./../../../assets/icons/pp3.png")}
            resizeMode="contain"
            style={{
              height: 115,
              width: 115,
              borderRadius: 999,
              borderWidth: 2,
              marginTop: 30,
              marginLeft: 20,
            }}
          />
          <View
            style={{
              marginTop: 30,
              alignItems: "center",
            }}
          >
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
          </View>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 60 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.horizontal ? (
                  <FlatList
                    style={{
                      display: "flex",
                      gap: 5,
                      width: "100%",
                      padding: 10,
                    }}
                    //   showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SECTIONS = [
  {
    title: "Favorite Songs",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
  {
    title: "Favorite Albums",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1011/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1012/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1013/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1015/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1016/200",
      },
    ],
  },
  {
    title: "Favorite Artists",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1020/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1024/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1027/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1035/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1038/200",
      },
    ],
  },
];
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
    fontWeight: "bold",
    fontSize: 16,
  },
});
