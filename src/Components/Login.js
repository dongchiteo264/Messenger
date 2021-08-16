import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    AppRegistry,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    Button,
    LogBox,
}
    from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { auth } from './firebaseConfig';
LogBox.ignoreAllLogs();
const Login = ({ navigation }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                if (errorCode == "auth/invalid-email") {
                    alert('Gmail không đúng');
                }
                if (errorCode == "auth/user-not-found") {
                    alert('Email hoặc mật khẩu không đúng');
                }
            });
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            function (user) {
                if (user) {
                    navigation.replace('HomeChat');
                }
            });
        return unsubscribe
    }, []);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../Image/logo.png')}></Image>
                    <Text style={styles.title}>Messenger</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder="Nhập tên tài khoản hoặc email"
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                            returnKeyType="next"
                            autoCorrect={false}
                            onChangeText={(text) => { setEmail(text) }}
                        //onSubmitEditing={() => this.refs.txtPassword.focus()}
                        ></TextInput>
                        <TextInput style={styles.input}
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor="gray"
                            returnKeyType="go"
                            secureTextEntry
                            onChangeText={(text) => { setPassword(text) }}
                            autoCorrect={false}
                            ref={(input) => input}
                        ></TextInput>
                        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.6}
                            onPress={() => signIn()}>
                            <LinearGradient colors={['#0088ff', '#ac4cff', '#FF5C87']} style={styles.linearGradient}>
                                <Text style={styles.textBtn}> Đăng Nhập</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Đăng Ký')}>
                            <Text style={styles.register}>Bạn chưa có tài khoản?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export default Login;
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 24,
        color: "rgba(0, 0, 0, 1)",
        textAlign: 'center',
        opacity: 0.5,
    },
    inputContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        height: height / 2.9,
        width: width,
        padding: 15,
        paddingHorizontal: 40,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, .20)',
        borderRadius: 4,
        paddingHorizontal: 15,
        marginBottom: 7,
        marginHorizontal: 5,
        // backgroundColor:'#1c1e21',
    },

    linearGradient: {
        paddingVertical: 10,
        borderRadius: 50,
        height: 40,
        marginTop: 0,
        marginHorizontal: 45,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {

    },
    textBtn: {
        textAlign: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        opacity: 0.9,
        // borderWidth: 2,
        height: 30,
    },
    register: {
        height: 50,
        textAlign: 'center',
        opacity: 0.7,
    },
    btnRegister: {
        marginTop: 5,
    }
})