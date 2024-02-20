import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Modal, FlatList, TextInput, Button } from 'react-native';

export default function Login ({  }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        
          <View style={styles.container}>
                <Image
                    source={require('../logov2.png')} 
                    style={{ width: '100%', height: 90, resizeMode: 'contain', alignItems: 'center', marginLeft: -3, marginTop:0 , marginBottom: -10 }}
                /> 
                <View style={styles.containerLogin}>
                    <Text style={{fontSize: 45, fontWeight: 'bold', textAlign: 'center', marginTop: -50}}>Welcome</Text>
                    <Image
                    source={require('../login.jpg')} 
                    style={{ width: '100%', height: 90, resizeMode: 'contain', alignItems: 'center', marginLeft: -3, marginTop:0 , marginBottom: -10 }}
                /> 
                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder={"Username"}
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize={"none"}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder={"Password"}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor='white'
                    />
                    <Text style={styles.forgotPasswordText} >
                        Forgot Password?
                    </Text>

                <View style={{ backgroundColor: '#FF9100', padding: 15, height:60, width: 350,borderRadius: 5,  marginBottom: -60 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Login</Text>
                </View>
                </View>
                    <Button title={"Sign Up"} onPress={() => {}} />
           </View> 

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF'
  },
  containerLogin: {
    flex: 0.75,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor: 'black',
    backgroundColor: '#FFFFFF',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.90,
    shadowRadius: 3.85,
    marginBottom: 10,
    marginTop: 20
 },
  
 welcome: {
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  forgotPasswordText: {
    color: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
    textDecorationLine: 'underline',
    marginTop: 10, // Adjust spacing as needed
    marginBottom: 10,
  },
});
