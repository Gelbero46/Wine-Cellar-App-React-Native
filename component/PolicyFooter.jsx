import React from 'react'
import { Pressable, View, Text, Linking } from 'react-native'


const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const iconColorOne = '#808080'

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

const PolicyFooter = () => {

  return (
    <View style={{
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center',
        fontSize : fontSmall
    }}>
        <Text style={{fontSize : fontSmall}}>
            By logging in/registering, you agreed to the
        </Text>
        <Pressable 
        onPress={
            () => {
                Linking.openURL('https://youtube.com')
            }
        }>
            <Text style={{color: primaryColor, fontSize : fontSmall}}> Privacy Policy</Text>
        </Pressable>
        <Text style={{fontSize : fontSmall}}> and </Text>
        <Pressable 
        onPress={
            () => {
                Linking.openURL('https://youtube.com')
            }
        }>
            <Text style={{color: primaryColor, fontSize : fontSmall}}>User Agreement</Text>
        </Pressable>
    </View>
  )
}

export default PolicyFooter
