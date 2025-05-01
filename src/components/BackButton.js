import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const BackButton = () => {
    const navigaton = useNavigation();

    return (
        <Animatable.View animation='fadeInLeft' duration={600} style={styles.button}>
            <TouchableOpacity onPress={() => navigaton.goBack()}>
                <Ionicons name='arrow-back' size={28} color='#00c897' />
            </TouchableOpacity>
        </Animatable.View>
    );
};


const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 16,
        left: 16,
        zIndex: 99,
        backgroundColor: 'transparent',
    },
});

export default BackButton;