import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { baseURL } from "./../../config/axios";
import { saveToken } from "../../helpers/Utils";

export default Email = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginClicked = () => {
    fetch(baseURL + "/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          throw new Error(`HTTP status ${res.status}`);
        }
      })
      .then((res) => {
        saveToken(res.token, res.userId.toString()).then(() => {
          navigation.navigate("Home");
        });
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{
          height: "100%",
        }}
      >
        <View
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            padding: 20,
            marginBottom: 20,
          }}
        >
          <View style={{ padding: 35 }}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 21 }}
            >
              {"Enter your credentials"}
            </Text>
            <Text
              style={{
                color: "#7e7e7e",
                fontSize: 16,
                marginTop: 5,
                textAlign: "center",
              }}
            >
              Login using your email and password in order to verify your
              account
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: 16,
              padding: 16,
              paddingLeft: 20,
              paddingRight: 20,
              width: "100%",
              marginTop: 20,
            }}
          >
            <TextInput
              // required
              value={username}
              placeholder="Enter username"
              onChangeText={(text) => {
                setUsername(text);
              }}
              placeholderTextColor={"#9ba3af"}
              style={{
                width: "100%",
                fontSize: 17,
                fontWeight: "bold",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: 16,
              padding: 16,
              paddingLeft: 20,
              paddingRight: 20,
              width: "100%",
              marginTop: 10,
            }}
          >
            <TextInput
              // required
              placeholder="Enter password"
              placeholderTextColor={"#9ba3af"}
              textContentType="password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry
              keyboardShouldPersistTaps="always"
              style={{
                width: "100%",
                fontSize: 17,
                fontWeight: "bold",
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: 9999,
              padding: 16,
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: 30,
              backgroundColor: "black",
            }}
            onPress={loginClicked}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ fontSize: 12, color: "#7e7e7e" }}>
              {"Don't have an account? "}
              <Text style={{ textDecorationLine: "underline" }}>Sign up.</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
