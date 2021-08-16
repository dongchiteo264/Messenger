import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    AppRegistry,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';
const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            const unsubscribe = auth.onAuthStateChanged(
                function (user) {
                    if (user) {
                        navigation.replace('HomeChat');
                    }
                    else {
                        navigation.replace('Đăng Nhập');
                    }
                });
            return unsubscribe
        },2500);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../Image/logo.png')}></Image>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Splash;
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        marginTop: -height / 2,
    },
    logo: {
        width: 80,
        height: 80,
    }
})