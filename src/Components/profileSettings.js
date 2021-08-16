import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
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
import Dialog from "react-native-dialog";



const profileSetting = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState('');
    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const updateAvatar = () => {
        const user = auth.currentUser;
        user.updateProfile({
            photoURL: avatar ? avatar : "http://recursov.com/images/icons/avatar.jpg"
        }).then(() => {
            console.log('Đổi ok')
        }).catch((error) => {
            console.log(error.code);
        });
        setVisible(false);
        setTimeout(() => {
            navigation.replace('HomeChat');
        }, 500);
    }

    const Avatarchange = () => (
        <Dialog.Container visible={visible}>
            <Dialog.Title>Nhập link Avatar</Dialog.Title>
            <Dialog.Input label='link' onChangeText={(text) => setAvatar(text)}></Dialog.Input>
            <Dialog.Button label="Huỷ" onPress={handleCancel} />
            <Dialog.Button label="Đồng ý" onPress={updateAvatar} />
        </Dialog.Container>
    )
    return (
        <View>
            <Button title='Đổi avatar' onPress={showDialog}></Button>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Nhập link Avatar</Dialog.Title>
                <Dialog.Input label='link' onChangeText={(text) => setAvatar(text)}></Dialog.Input>
                <Dialog.Button label="Huỷ" onPress={handleCancel} />
                <Dialog.Button label="Đồng ý" onPress={updateAvatar} />
            </Dialog.Container>
        </View>
    )
}

export default profileSetting;