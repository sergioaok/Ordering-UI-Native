import React from 'react'
import { View, Platform, PlatformIOSStatic, StyleSheet } from 'react-native'
import { useOrder } from 'ordering-components/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

import { OText } from '../components/shared'
import BusinessList from '../pages/BusinessesListing'
import MyOrders from '../pages/MyOrders'
import CartList from '../pages/CartList'
import Profile from '../pages/Profile'
import { useTheme } from 'styled-components/native'

const CartsLenght = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${(props: any) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
`

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useTheme()
  const [{ carts }] = useOrder()
  const cartsList = (carts && Object.values(carts).filter((cart: any) => cart.products.length > 0)) || []
  const isIos = Platform.OS === 'ios'
  const platformIOS = Platform as PlatformIOSStatic
  const androidStyles = isIos
    ? platformIOS.isPad
      ? { paddingBottom: 30 }
      : {}
    : {height: 40, position: 'relative', bottom: 15}
  return (
    <Tab.Navigator
      initialRouteName='BusinessList'
      activeColor={theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.white, ...androidStyles }}
      labeled={false}
      inactiveColor={theme.colors.disabled}
    >
      <Tab.Screen
        name="BusinessList"
        component={BusinessList}
        options={{
          tabBarIcon:
            ({ color }) => (
              <View style={{ ...styles.tabStyle, justifyContent: !isIos ? 'flex-start' : 'space-evenly', position: 'relative', bottom: !isIos ? 10 : 0  }}>
                <MaterialCommunityIcon name='home' size={36} color={color} />
                <OText color={color}>
                  {t('HOME', 'Home')}
                </OText>
              </View>
            )
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrders}
        options={
          {
            tabBarIcon:
              ({ color }) => (
                <View style={{ ...styles.tabStyle, justifyContent: !isIos ? 'flex-start' : 'space-evenly', position: 'relative', bottom: !isIos ? 10 : 0 }}>
                  <MaterialIcon name='format-list-bulleted' size={36} color={color} />
                  <OText color={color}>
                    {t('ORDERS', 'Orders')}
                  </OText>
                </View>
              ),
          }}
      />
      <Tab.Screen
        name="Cart"
        component={CartList}
        options={{
          tabBarIcon:
            ({ color }) => (
              <View style={{
                  width: 50,
                  height: 50,
                  justifyContent: !isIos ? 'flex-start' : 'space-evenly',
                  position: 'relative',
                  bottom: !isIos ? 10 : 0
                }}
              >
                <MaterialIcon name='shopping-basket' size={36} color={color} />
                {cartsList.length > 0 && (
                  <CartsLenght style={{ borderRadius: 100 / 2 }}>
                    <OText
                      size={12}
                      color={theme.colors.white}
                    >
                      {cartsList.length}
                    </OText>
                  </CartsLenght>
                )}
                <OText color={color}>
                  {t('Carts', 'Carts')}
                </OText>
              </View>
            )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon:
            ({ color }) => (
              <View style={{ ...styles.tabStyle, justifyContent: !isIos ? 'flex-start' : 'space-evenly', position: 'relative', bottom: !isIos ? 10 : 0  }}>
                <MaterialIcon name='person' size={36} color={color} />
                <OText color={color}>{t('MOBILE_PROFILE', 'Profile')}</OText>
              </View>
            )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 50,
    height: 50,
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default BottomNavigator
