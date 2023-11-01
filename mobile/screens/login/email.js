import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default Email = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{
          height: '100%',
        }}>
        <View
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            padding: 20,
            marginBottom: 20,
          }}>
          <View style={{padding: 35}}>
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 21}}>
              {'Enter your credentials'}
            </Text>
            <Text
              style={{
                color: '#7e7e7e',
                fontSize: 16,
                marginTop: 5,
                textAlign: 'center',
              }}>
              Login using your email and password in order to verify your
              account
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#f3f3f3',
              borderRadius: 16,
              padding: 16,
              paddingLeft: 20,
              paddingRight: 20,
              width: '100%',
              marginTop: 20,
            }}>
            <TextInput
              required
              placeholder="Enter email address"
              placeholderTextColor={'#9ba3af'}
              style={{
                width: '100%',
                fontSize: 17,
                fontWeight: 'bold',
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#f3f3f3',
              borderRadius: 16,
              padding: 16,
              paddingLeft: 20,
              paddingRight: 20,
              width: '100%',
              marginTop: 10,
            }}>
            <TextInput
              required
              placeholder="Enter password"
              placeholderTextColor={'#9ba3af'}
              textContentType="password"
              secureTextEntry
              keyboardShouldPersistTaps="always"
              style={{
                width: '100%',
                fontSize: 17,
                fontWeight: 'bold',
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#f3f3f3',
              borderRadius: 9999,
              padding: 16,
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: 30,
              backgroundColor: 'black',
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 17}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
