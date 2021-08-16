import Login from './Login';
import Splash from './Splash';
import Register from './Register';
import HomeChat from './HomeChat';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { auth } from './firebaseConfig';
import profileSetting from './profileSettings';

const Stack = createStackNavigator();
const AppNavigation = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Splash' component={Splash} options={{
          headerShown: false,
        }}></Stack.Screen>
        <Stack.Screen name='Đăng Nhập' component={Login} options={{
          headerShown: false,
        }}></Stack.Screen>
        <Stack.Screen name='Đăng Ký' component={Register} options={{
          headerShown: false,
        }}></Stack.Screen>
        <Stack.Screen name='HomeChat' component={HomeChat} options={{
          headerTitle: 'Chat',
          headerTitleAlign: 'left'
        }}></Stack.Screen>
         <Stack.Screen name='profile' component={profileSetting} options={{
          headerShown: false,
        }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;