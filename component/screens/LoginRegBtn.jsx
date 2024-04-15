import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { navigationRef } from '../RootNavigation'





const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const iconColorOne = '#808080'

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

const LoginRegBtn = ( {} ) => {
  return (
    <>
         
         <Pressable style= { ({ pressed }) => [
                {width: '100%',
                backgroundColor : pressed ? secondaryColor : tetiaryColor,
                justifyContent: 'center',
                alignItems : 'center',
                paddingVertical : 7,
                marginTop : height * .05,
                borderRadius : 5,}
                
            ]}
                onPress={() => {
                    toHome()
                }}>
                <Text style={{color : '#eee'}}>
                    Login
                </Text>
            </Pressable>

            <View style={{flexDirection : 'row', justifyContent: 'space-between', marginTop : 10}}>
                <Pressable
                onPress={() => {
                    navigationRef.navigate('Register')
                }}>
                    <Text style={{color : tetiaryColor}}>
                        Register
                    </Text>
                </Pressable>
                <Pressable 
                onPress={() => {
                    console.log('forgot Password')
                }}>
                    <Text style={{color : tetiaryColor}} >
                        Forgot Password?
                    </Text>
                </Pressable>
            </View>
    </>
  )
}

export default LoginRegBtn
