import React from 'react'
import { Text, View } from 'react-native'
import HeaderWifi from './HeaderWifi'
import Status from './Status'

import ButtonSingle from './ButtonSingle'
import { navigationRef } from '../../RootNavigation';

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

const ConnectToWifi4 = ( { navigation, route } ) => {
    const { method } = route.params
  return (
    <View style={{flex : 1, }}>
    
        <HeaderWifi title = { method.toLowerCase() == 'add' ? 'Connect with AI Cellar' : 'Update AI Cellar'} />
        <View style={{marginBottom : 5}}>
          <Status point = {2} error= {true} />
        </View>
   
      

        <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
            <Text style={{fontSize : fontLarge, color : primaryColor}} >Ai Cellar Connection Failure</Text>
            <Text style={{fontSize : fontLarge, color : primaryColor}} >or</Text>
            <Text style={{fontSize : fontLarge, color : primaryColor}} >Ai Cellar Wi-Fi Config Failure</Text>
        </View>

      <View style={{marginBottom : 30}}>
        < ButtonSingle 
          name = 'Retry' 
          fontSize = {fontSmall} 
          fontColor = '#fff'
          backgroundColor = {secondaryColor}
          backgroundColorPressed = {primaryColor} 
          borderRadius = {5} 
          paddingVertical = {5} 
          paddingHorizontal = {50}
          func = { () => navigation.goBack()}
          funcDes
          />
      </View>
     
    </View>
  )
}

export default ConnectToWifi4