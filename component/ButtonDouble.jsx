import React, { useEffect, useState } from 'react'
import { Button,TextInput, View, Pressable, ScrollView, RefreshControl, Text } from 'react-native';

import AlertMsg from './AlertMsg';


const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#F24726'
const tetiaryColor3 = '#fbc700'
// '#FFD64A'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'


const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMidLg = 18
const fontMedium = 15
const fontSmall = 12;
const fontSmallest = 10






const ButtonDouble = ({
    rightText,
    leftText,
    colorPressed,
    colorNotPressed,
    textColor,
    rightTextonPress,
    leftTextonPress,
    paddingVertical,
    paddingHorizontal,
    fontSize,
    width
  }
    ) => {
  return (
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                        
        <Pressable
          onPress={leftTextonPress ? leftTextonPress : onPressFunction}
          style={({pressed}) => [
            { backgroundColor: pressed ? `${colorPressed ? colorPressed : secondaryColor }` : `${colorNotPressed ? colorNotPressed : primaryColor}`,
              borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2', justifyContent: 'center'},
            
          ]}>
            <Text style={{paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical, fontSize: fontSize ? fontSize : fontSmallest, color: textColor ? textColor : '#eee'}}>{leftText ? leftText : Confirm}</Text>
        </Pressable>

        <Pressable
          onPress={rightTextonPress ? rightTextonPress :  onPressFunction}
          style={({pressed}) => [
            { backgroundColor: pressed ? `${colorPressed ? colorPressed : secondaryColor }` : `${colorNotPressed ? colorNotPressed : primaryColor}`, 
            borderWidth: pressed ? 4 : 0, 
            borderRadius: 5, 
            borderColor: '#414BB2',
            justifyContent: 'center'},
            
          ]}>
            <Text style={{paddingHorizontal: paddingHorizontal ? paddingHorizontal : 35, 
                          paddingVertical: paddingVertical ? paddingVertical : 15, fontSize: fontSize ? fontSize : fontSmallest, color: textColor ? textColor : '#eee'}}>{rightText ? rightText :  Cancel}</Text>
        </Pressable>
    </View>
  )
}

export default ButtonDouble;

