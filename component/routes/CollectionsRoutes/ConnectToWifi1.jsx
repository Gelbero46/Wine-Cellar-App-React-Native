import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { navigationRef } from '../../RootNavigation'

import  Status  from './Status';
import AlertMsg from '../../AlertMsg';
import ButtonSingle from './ButtonSingle';

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


const ConnectToWifi1 = ( { navigation, route} ) => {
  const { title, method, data } = route.params;

  const [ wifiSSID, SetwiiSSID ] = useState('')
  const [ wifiPass, SetwifiPass ] = useState('')



  useFocusEffect(
    
    React.useCallback(() => {
      navigation.setOptions({ title: title })
      console.log(title, '********************')
      console.log(method, '****************')
      // Do something when the screen is focused
  
      // navigation.setOptions({ title: title })
  
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        
        
      };
    }, [])
  );
  

  
  const checkCredentials = () => {
    console.log('checking...')
    if (wifiPass && wifiSSID) {
      navigationRef.navigate('ConnectToWifi2', { method : method, ssid : wifiSSID, password : wifiPass})
    }
    else {
      AlertMsg ({ title : 'Fill Credentials',  message : " Please ensure all input field are filled" })
    }
  }
  

  return (
    <View style={{flex: 1,padding: 20, backgroundColor: '#fff'}}>
        
        <View style={{marginBottom: 20}}>
          <Status point = {1}/>
        </View>
        

        <View style={styles.info}>
            <Text>User Name : </Text>
            <Text style={{paddingLeft: 10}}>Mr XXX XXX</Text>
        </View>
        <View style={styles.info}>
            <Text>Email : </Text>
            <Text style={{paddingLeft: 10}}>yyy@gmail.com</Text>
        </View>

        <View style={styles.filInput}>
          <Text>Wi-fi SSID</Text>
          <TextInput
              onChangeText={SetwiiSSID}
              value={wifiSSID}
              borderColor= '#999'
              borderRadius= {4}
              style={styles.textInput}
            />
        </View>

        <View style={styles.filInput}>
          <Text>Wi-fi Password</Text>
          <TextInput
              onChangeText={SetwifiPass}
              value={wifiPass}
              borderColor= '#999'
              borderRadius= {4}
              style={styles.textInput}
            />
        </View>

        < ButtonSingle

          name='Confirm' 
          fontSize = {fontSmall} 
          fontColor='#fff' 
          backgroundColor = {secondaryColor} 
          backgroundColorPressed = {primaryColor} 
          borderRadius = {5} 
          paddingVertical = {6} 
          paddingHorizontal= {60}
          func = {checkCredentials}
        />

        {/* <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: 100}}>
          <Pressable
                onPress={ () => {
                  checkCredentials()
                  // navigationRef.navigate('ConnectToWifi2', { method : method})
                }}
                style = {({pressed}) => [
                  { 
                    borderRadius: 5, 
                    // borderColor: '#414BB2',
                    paddingVertical: 6,
                    paddingHorizontal: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: pressed ? primaryColor : secondaryColor,
                  }
                ]}
                >
                <Text style={{color: '#fff', fontSize: fontSmall,}}>Confirm</Text>
          </Pressable>
        </View> */}
    </View>
  )
}


const styles = StyleSheet.create ({
  info: {
    flexDirection: 'row',
    marginTop: 10,
    
  },

  filInput: {
    marginTop: 30
  },

  textInput: {
    height: 40,
    marginTop: 2,
    // width: 300,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
  }
})
export default ConnectToWifi1
