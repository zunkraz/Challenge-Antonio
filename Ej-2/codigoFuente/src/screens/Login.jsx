import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TextInput,
  Alert
} from 'react-native'
import React, {useState} from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
//axios
import clientAxios from '../../axios';
import { user_auth_redux } from '../reducer/actionReducer';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();
  //nagivation
  const navigation = useNavigation();
  //submit data for auth
  const [user,setDataUser] = useState({
    username:'',
    password:''
  });
const {username,password} = user;
  const handleSubmit = async () => {
    //username
    if(username.trim() === ''){
       Alert.alert(
        'El usuario no puede estar vacío',
        "",
          [
            { text: "OK", onPress: () => console.log('400')} 
        ]
      )
      return;
    };
    //password
    if(password.trim() === ''){
      Alert.alert(
       'La contraseña no puede estar vacía',
       "",
         [
           { text: "OK", onPress: () => console.log('400')} 
       ]
     )
     return;
   }
   //send Data to api
   try {
     const response = await clientAxios.post('/auth', user);
    dispatch(() => dispatch(user_auth_redux(response.data.access_token)))
     navigation.navigate('Menu')
   } catch (error) {
    console.log(error.response.data.msg);
    Alert.alert(
      'Usuario o contraseña inválida',
      "",
        [
          { text: "OK", onPress: () => console.log('400')} 
      ]
    )
   }
   setDataUser({
    username:'',
    password:''
   })
  }
  const handleChange = (str,e) => {
    if(str === 'password'){
      setDataUser({...user,password:e})
     }else if(str === 'username'){
      setDataUser({...user,username:e})
     }
  }
  return (
    <>
    <StatusBar
      backgroundColor="white"
      barStyle='dark-content'
    />
      <KeyboardAwareScrollView  
         keyboardShouldPersistTaps={'always'}
         style={{flex:1, backgroundColor:"#FFF"}}
         showsVerticalScrollIndicator={false}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Iniciar sesión
          </Text>
          <View style={styles.field}>
            <Text>Usuario</Text>
          <TextInput
            style={styles.input}
            name="username"
            onChangeText={e => handleChange('username',e)}
            value={username}
            maxLength={16}
          />
          <Text>Contraseña</Text>
          <TextInput
            style={styles.input}
            name="password"
            onChangeText={e => handleChange('password',e)}
            value={password}
            maxLength={16}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Ingresar</Text>
          </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
       </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:700,
    backgroundColor:"#FFF",
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    color:"#ea523a",
    fontWeight:'bold',
    fontSize:30
  },
  btn:{
    backgroundColor:"#ea523a",
    borderRadius:13,
    padding:15,
    marginTop:15,
    alignItems:'center'
  },
  btnText:{
    color:"#FFF",
    fontSize:20,
  },
  field:{
    width:'80%',
  },
  input:{
    borderWidth:1,
    borderColor:"#ea523a",
    padding:10,
    marginVertical:10,
    borderRadius:10,
  }
})