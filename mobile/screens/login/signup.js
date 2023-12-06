import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { baseURL } from "../../config/axios";

export default Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const handleSignup = () => {
    if (password == repeatedPassword)
      fetch(baseURL + "/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
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
          navigation.goBack();
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
              {"Sign up"}
            </Text>
            <Text
              style={{
                color: "#7e7e7e",
                fontSize: 16,
                marginTop: 5,
                textAlign: "center",
              }}
            >
              Sign Up using your own information
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
              required
              placeholder="Enter username"
              value={username}
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
              required
              placeholder="Enter email address"
              value={email}
              onChangeText={(text) => {
                setEmail(text.toLowerCase());
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
              required
              placeholder="Re-Enter password"
              placeholderTextColor={"#9ba3af"}
              textContentType="password"
              value={repeatedPassword}
              onChangeText={(text) => {
                setRepeatedPassword(text);
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
            onPress={() => handleSignup()}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontSize: 12, color: "#7e7e7e" }}>
              {"Already have an account? "}
              <Text style={{ textDecorationLine: "underline" }}>Login.</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
