import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useOrder, useSession } from 'ordering-components/native';

import LoginPage from '../screens/LoginPage';
import IntroPage from '../screens/IntroPage';
import BusinessPage from '../screens/BusinessPage';
import DeliveryTypePage from '../screens/DeliveryTypePage';

const Stack = createStackNavigator();

const RootNavigator = () => {
  /* const [{ auth, loading }] = useSession();
  const [orderStatus] = useOrder(); */
  const [loaded, setLoaded] = useState(false);

  /* useEffect(() => {
    if (!loaded && !orderStatus.loading) {
      setLoaded(true);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (!loading) {
      setLoaded(!auth);
    }
  }, [loading]); */

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
    </Stack.Navigator>
  );
};

export default RootNavigator;
