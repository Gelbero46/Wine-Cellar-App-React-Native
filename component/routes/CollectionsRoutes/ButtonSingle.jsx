import React from 'react'
import { Pressable, Text, View } from 'react-native'

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#fbc700'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'


const ButtonSingle = ( { name, 
                        fontSize, 
                        fontColor, 
                        backgroundColor, 
                        backgroundColorPressed, 
                        borderRadius, 
                        paddingVertical, 
                        paddingHorizontal,
                        func,
                        funcDes
                     } 
                     ) => {
  return (
    <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: 10}}>
        <Pressable
            onPress={ () => {
                func ? func( funcDes && funcDes ) : console.log('Hello')
                // checkCredentials()
            }}
            style = {({pressed}) => [
                { 
                borderRadius: borderRadius ? borderRadius : 5, 
                paddingVertical: paddingVertical ? paddingVertical : 6,
                paddingHorizontal: paddingHorizontal ? paddingHorizontal : 60,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: pressed ? `${backgroundColorPressed ? backgroundColorPressed : primaryColor}` : `${backgroundColor ? backgroundColor : secondaryColor}`,
                }
            ]}
            >
            <Text style={{color: fontColor ? fontColor : '#fff', fontSize : fontSize ? fontSize : fontSmall}}>{name ? name : 'Confirm'}</Text>
        </Pressable>
    </View>
  )
}

export default ButtonSingle