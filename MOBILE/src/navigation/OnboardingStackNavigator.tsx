import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@screens/Onboarding/SplashScreen';
import SignInScreen from '@screens/Onboarding/SignInScreen';
import NicknameScreen from '@screens/Onboarding/NicknameScreen';

export type OnboardingStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  Nickname: undefined;
};

const OnboardingStackNavigator = () => {
  const Stack = createNativeStackNavigator<OnboardingStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Nickname"
        component={NicknameScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStackNavigator;
