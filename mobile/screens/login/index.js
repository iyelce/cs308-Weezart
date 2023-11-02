import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Authenticate from "./authenticate";
import Email from "./email";
import Signup from "./signup";

const Stack = createNativeStackNavigator();

export default Login = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="Authenticate" component={Authenticate} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
