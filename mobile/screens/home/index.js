import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './search';
import {BlurView} from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

export default Home = () => {
  // const context = React.useContext(AuthContext);
  return (
    <Tab.Navigator
      initialRouteName="Search"
      backBehavior="none"
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Main"
        component={Search}
        initialParams={{
          icon: require('./../../assets/icons/home.png'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{
          icon: require('./../../assets/icons/search.png'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Search}
        initialParams={{
          icon: require('./../../assets/icons/profile.png'),
        }}
      />
    </Tab.Navigator>
  );
};

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  console.log(state);
  console.log(descriptors);
  console.log(navigation);

  return (
    <SafeAreaView
      style={
        {
          // backgroundColor: '#feffe3',
          // backgroundColor: '#000d',
        }
      }>
      <BlurView
        blurType="light"
        blurAmount={40}
        style={{
          position: 'absolute',
          height: 90,
          bottom: 0,
          right: 0,
          left: 0,

          flexDirection: 'row',
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: '#e7e8cc',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center'}}>
              <Image
                style={{height: 30, width: 30}}
                source={route.params.icon}
              />
              {/* <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text> */}
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </SafeAreaView>
  );
}
