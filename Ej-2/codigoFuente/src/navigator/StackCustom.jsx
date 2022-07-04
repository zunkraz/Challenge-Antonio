import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Login from "../screens/Login";
import Menu from './Menu'
const StackCustom = () => {

    return ( 
    <Stack.Navigator initialRouteName="Login"> 
      {/* screens */}
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="Menu" 
        component={Menu}
        options={{
          headerShown: false,
        }} 
      />
    
    </Stack.Navigator> 
     );
}
 

export default  StackCustom;