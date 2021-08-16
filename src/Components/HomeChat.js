import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react';
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
import { auth, db } from './firebaseConfig';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const HomeChat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    /* useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])*/
    /*useLayoutEffect(() => {
        const unsubscribe = firestore().collection('chats').orderBy('createAt', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
               
            }))
        ))
        console.log('ahah');
        return unsubscribe;
    }, [])*/
    useLayoutEffect(() => {
        const subscriber = firestore()
            .collection('chats')
            .orderBy('createdAt','desc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))));

        // Stop listening for updates when no longer required
        return subscriber;
    }, []);


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.
            append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        firestore().collection('chats').add({
            _id,
            createdAt,
            text,
            user
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity  style={{ marginLeft: 10 }} onPress={()=>navigation.navigate('profile')}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 25 }} onPress={signOut}>
                    <MaterialIcons name="logout"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
        })
    }, [])
    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace('Đăng Nhập');
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <GiftedChat
            showAvatarForEveryMessage={true}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL,
            }}
        />
    )
}
export default HomeChat;