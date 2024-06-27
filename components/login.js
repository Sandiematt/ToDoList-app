import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { KeyboardAvoidingView ,Platform} from 'react-native';
import axios from 'axios';


function Login({navigation})  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.55.105:5000/login', { username, password });

      if (response.status === 200) {
        navigation.navigate('TodoList');
       
      } else {
        alert('Incorrect Username or Password');
      }
    } catch (error) {
      console.log('Error during Login', error);
      alert('An error occurred. Please try again later');
    }
  };

  const gotoRegister =() =>{
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ebecf4' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.png')} style={styles.headerImg} />
          <Text style={styles.title}>Sign IN to To-Do-List</Text>
          <Text style={styles.subtitle}>Get access to portfolio and more</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email Address:</Text>
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
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign IN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.RegBtn}>
          <Text>Don't have an account?</Text>
          <Text style={styles.RegText} onPress={gotoRegister}>Sign Up</Text>
          
        </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
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
    backgroundColor: '#075eec',
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
  RegBtn:{
    alignItems:'center',
  },
  RegText:{
    fontSize:20,
    textDecorationLine:'underline',
    fontWeight:'bold',
  }
});
