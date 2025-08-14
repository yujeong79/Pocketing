import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingStackNavigator from './OnboardingStackNavigator';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <OnboardingStackNavigator />
    </NavigationContainer>
  );
}

export default RootNavigator;