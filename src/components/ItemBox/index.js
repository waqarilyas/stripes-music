// Module imports

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Dimensions,View,Text}  from 'react-native'; 
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Local imports
//import styles from './styles'


const ItemBox = ({onPress,text}) => {
    const navigation=useNavigation();
    return (
        <View style={styles.maincontainer}>
            <TouchableOpacity onPress={onPress} style={styles.TouchView}>
                <Text style={styles.Textstyle}>{text}</Text>
            </TouchableOpacity>
            <View style={styles.seperator}></View>   
        </View>

    );
}

const styles = StyleSheet.create({
    maincontainer: {
        alignItems:'center',
        width:wp('75%'),
        flex:5,
        backgroundColor:'transparent',
    },
    TouchView :{
        height:'100%',
        width:wp('75%'),
        justifyContent:'center'
    },
    Textstyle :{
        color:'#c4c4c4',
        fontSize:14,
        fontWeight:'bold',
    },
    seperator :{
        height:1,
        backgroundColor:'#c4c4c4',
        width:wp('75%'),
        opacity:0.2
    },
})

export default ItemBox;