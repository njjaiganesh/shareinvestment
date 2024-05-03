import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login, Signup, LandingPage, UserLaunch } from "./screens";


const Stack = createNativeStackNavigator();

export default function AppNew() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
      >        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
          
        />
         <Stack.Screen
          name="UserLaunch"
          component={UserLaunch}
          options={{
            headerShown: false
          }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}