import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '@screens/Onboarding/SplashScreen';
import SignInScreen from '@screens/Onboarding/SignInScreen';
import NicknameScreen from '@screens/Onboarding/NicknameScreen';
import { GrayColors } from '@constants/colors';

export type OnboardingStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  Nickname: undefined;
};

const OnboardingStackNavigator = () => {
  const Stack = createNativeStackNavigator<OnboardingStackParamList>();

  return (
    <Stack.Navigator 
      initialRouteName="Splash" 
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GrayColors.white,
        }
    }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        name="Nickname"
        component={NicknameScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStackNavigator;
