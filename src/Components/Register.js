import React, { Component, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
}
    from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { auth } from './firebaseConfig';

const Register = () => {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [ImageUrl, setImageUrl] = useState('');

    const checkRegister = () => {
        let a = password;
        let d = a.length;
        if (d < 6) {
            alert('Mật khẩu tối thiểu 6 ký tự');
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                alert('Đăng ký thành công');
                var user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    photoURL: ImageUrl ? ImageUrl : "http://recursov.com/images/icons/avatar.jpg"
                }).then(() => {
                    // Update successful
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                // ...
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Email đã được đăng ký');
                }
                if (error.code === 'auth/invalid-email') {
                    alert('Email bạn nhập không đúng định dạng');
                }
            });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <Image style={styles.logo} source={require('../Image/logo.png')}></Image>
                        <Text style={styles.title}>Messenger</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                placeholder="Nhập Email"
                                placeholderTextColor="gray"
                                keyboardType="email-address"
                                returnKeyType="next"
                                autoCorrect={false}
                                onChangeText={(text) => setMail(text)}
                                value={email}
                            ></TextInput>

                            <TextInput style={styles.input}
                                placeholder="Tên người dùng"
                                placeholderTextColor="gray"
                                keyboardType="default"
                                returnKeyType="next"
                                onChangeText={(text) => setName(text)}
                                ref={(input) => input}
                            ></TextInput>

                            <TextInput style={styles.input}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="gray"
                                returnKeyType="next"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            ></TextInput>

                            <TextInput style={styles.input}
                                placeholder="Nhập lại mật khẩu"
                                placeholderTextColor="gray"
                                returnKeyType="go"
                                secureTextEntry={true}
                                autoCorrect={false}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.6}
                            onPress={checkRegister} >
                            <LinearGradient colors={['#0088ff', '#ac4cff', '#FF5C87']} style={styles.linearGradient}>
                                <Text style={styles.textBtn}> Đăng Ký</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export default Register;
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
    },
    inner: {
        flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: height / 12,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
    },
    logo: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 20,
        color: "rgba(0, 0, 0, 1)",
        textAlign: 'center',
        opacity: 0.5,
    },
    inputContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        //height: 210,
        width: width,
        padding: 15,
        paddingHorizontal: 40,
        //  borderWidth:2,
        paddingBottom: 5
    },
    input: {
        height: 40,
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
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        paddingHorizontal: 40,
        top: 0,
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