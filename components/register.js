import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import axios from 'axios';

function Register() { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleRegister =async() =>{
    try{
        const response=await axios.post('http://192.168.55.105:5000/register',{username,password});
        if(response.status===201){
            console.log("Insertion Success");
            alert('Go to Login using the same credentials');
        }
        else{
            alert('Invalid Entry');
        }
    }
    catch{
      console.log('Error during Login', error);
      alert('An error occurred. Please try again later');
    }

  }
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ebecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.png')} style={styles.headerImg} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Create an account to gain access to the app</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Username:</Text>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setUsername(text)} />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password:</Text>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity >
              <View style={styles.btn}>
                <Text style={styles.btnText} onPress={handleRegister}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
    );

    
};

export default Register;

const styles=StyleSheet.create({
    container: {
        padding: 24,
        flex: 1
      },
      header: {
        marginVertical: 36,
      },
      headerImg: {
        width: 80,
        height: 80,
        position: 'relative',
        left: 140,
        bottom: 20,
      },
      title: {
        fontSize: 27,
        fontWeight: '700',
        color: 'black',
        marginBottom: 6,
        textAlign: 'center',
        
      },
      subtitle: {
        textAlign: 'center',
        color: 'gray',
      },
      input: {
        marginBottom: 16,
      },
      inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        marginBottom: 8,
      },
      inputText: {
        backgroundColor: '#fff',
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
      },
      btn: {
        backgroundColor: 'darkcyan',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
      },
      form: {
        marginBottom: 24,
        flex: 1,
      },
      formAction: {
        marginVertical: 24,
      },
      btnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
      },
});

