import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../screens/LoginPage';
import IntroPage from '../screens/IntroPage';
import BusinessPage from '../screens/BusinessPage';
import DeliveryTypePage from '../screens/DeliveryTypePage';
import CategoryPage from '../screens/CategoryPage';
import CustomerNamePage from "../screens/CustomerNamePage";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Intro"
        component={IntroPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Business"
        component={BusinessPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryType"
        component={DeliveryTypePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerName"
        component={CustomerNamePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;