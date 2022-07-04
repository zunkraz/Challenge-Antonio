import React from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import Login from '../screens/Login';
import Pedido from '../screens/CreateOrder';
import Carrito from '../screens/Cart';

import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Menu = () => {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <InternalMenu {...props} />}
    >
      <Drawer.Screen name="Pedido" component={Pedido} />
      <Drawer.Screen name="Carrito" component={Carrito} />
    </Drawer.Navigator>
  )
}

export default Menu

const InternalMenu = ({navigation} : DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.containerDrawer}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Pedido')}
        style={styles.btn}        
        >
          <Text style={styles.btnText}>Preparar pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('Carrito')}
        style={styles.btn}
        >
          <Text style={styles.btnText}>Carrito</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={styles.btn}        
        >
          <Text style={styles.btnText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  )
}
const styles = StyleSheet.create({
  containerDrawer:{
    
  },
  btn:{
    marginLeft:20,
    paddingVertical:15
  },
  btnText:{
    fontSize:25,
    fontWeight:'bold'
  }
})