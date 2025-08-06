import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '@screens/Onboarding/SplashScreen/index';
import SignInScreen from '@screens/Onboarding/SignInScreen/index';
import NicknameScreen from '@screens/Onboarding/NicknameScreen/index';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Nickname" component={NicknameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;