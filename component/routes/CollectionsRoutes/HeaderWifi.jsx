import React from 'react'
import { View, Text } from 'react-native'


const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

const HeaderWifi = ( { title } ) => {
  return (
    <View style={{alignItems : 'center',  marginTop : 30, marginBottom : 10,  }}>
        {/* <View style={{height : 20, width : '100%', }}></View> */}
        <Text style={{fontSize : fontLarge}}>{title}</Text>
    </View>
  )
}

export default HeaderWifi