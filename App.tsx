import React from 'react';
import "./global.css"
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './android/app/src/Screens/SignIn';
import SignUp from './android/app/src/Screens/SignUp';
import OTP from './android/app/src/Screens/OTP';
import UserDashoard from './android/app/src/Screens/UserDashoard';
import MyToast from './android/app/src/Components/MyToast';


// import Toast from 'react-native-toast-message';
// import axios from 'axios';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.toast}>
        <MyToast />
      </View>
      <NavigationContainer>
        <Stack.Navigator  
        initialRouteName="signIn"
        
        >
          <Stack.Screen
            name="signIn"
            component={SignIn}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="signUp"
            component={SignUp}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{headerShown: false}}
          />

<Stack.Screen
            name="userDashboard"
            component={UserDashoard}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set background color to white
  },
  toast: {
    zIndex: 100,
  },
});

export default App;
