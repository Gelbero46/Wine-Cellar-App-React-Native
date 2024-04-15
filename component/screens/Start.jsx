import React, { useEffect, useRef, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import PolicyFooter from '../PolicyFooter'
import { navigationRef } from '../RootNavigation'

import CompanyLogo from '../../assets/logo4.png'    

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

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width * 0.8; //full width
var height = Dimensions.get('window').height; //full height
console.log(width, height)

const Start = () => {
  const [state, setState] = useState('');

  useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;

      async function fetchData() {
      const result = await Promise.resolve(['hello', 'world']);

      // 👇️ only update state if component is mounted
      if (isMounted) {
          setState(result);
      }
      }

      fetchData();

      return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false;
      };
  }, []);
  
  return (

    <View style={{
        flexDirection : 'column',
        flex : 1
        }}>

        <View style={{ alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor : secondaryColor,
                        borderBottomLeftRadius: 70,
                        borderBottomRightRadius: 70,
                        paddingVertical : 70,
                        flex : 1}}>
            <Image source={CompanyLogo}
                style={{
                    width : width,
                    height : width,
                    maxWidth : 350,
                    maxHeight : 350,
                    backgroundColor: '#eee',
                    borderRadius : width
                }}>
                </Image>
        </View>
        <View style={{flex: 2/3,
                    // backgroundColor : '#eed',
                    alignItems: 'center',
                    justifyContent: 'center'}}>

                <Pressable 
                onPress={ () => {
                    navigationRef.navigate('Login')
                } }
                style={({pressed}) => [
                    {backgroundColor: pressed ?'green' : tetiaryColor, 
                    paddingVertical: 7, width: '80%',
                    alignItems: 'center',
                    borderRadius: 7,
                    marginTop: 30},   
                  ]}>
                    <Text style={{color: '#fff'}}>Login</Text>
                </Pressable>

                <Pressable 
                onPress={ () => {
                    navigationRef.navigate('Register')
                } }
                style={({pressed}) => [
                    {backgroundColor: pressed ?'green' : tetiaryColor, 
                    paddingVertical: 7, width: '80%',
                    alignItems: 'center',
                    borderRadius: 7,
                    marginTop: 30},
                    
                  ]}>

                    <Text style={{color: '#fff'}}>Register</Text>
                </Pressable>
        </View>
        <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
            <PolicyFooter />
        </View>
        
    </View>
  
  )
}

export default Start
