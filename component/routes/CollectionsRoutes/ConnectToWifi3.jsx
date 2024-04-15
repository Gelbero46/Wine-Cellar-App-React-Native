import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import HeaderWifi from './HeaderWifi'
import Status from './Status'
import { navigationRef } from '../../RootNavigation';
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

const ConnectToWifi3 = ( { navigation, route } ) => {
    // const [ data, Setdata ] = useState(null)
    // const [ method, Setmethod ] = useState('')
    const { method, data } = route.params
    // const load = async () => {
    //   const { method, data } = await route.params
    //   Setmethod(method)
    //   Setdata(data)
    // }
    
    // load()
    
    console.log(data)
    console.log(method, '88888888888888888888=======')
  return (

    // data &&
    <View style={{flex: 1,padding: 20, backgroundColor: iconColorTwo}} >        
        <HeaderWifi title = { method.toLowerCase() == 'add' ? 'Successfully Connected' : 'Update AI Cellar'} />
        <View style={{marginBottom: 20}}>
          <Status point = {3}/>
        </View>

        <ScrollView style={{flex : 1}}>
              <View style={{flex : 1, alignItems : 'center'}}>
                    <Text style={{marginVertical : 10,}}>Connected with the AI Cellar below</Text>
                    <Image
                    source={ { uri : data[0].avatar} }
                    style={{
                      width : '100%',
                      height : 200,
                    }}
                    >
                    </Image>
                 
                      <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', paddingVertical : 7}}>
                          <Text style={{flex : 1}} >Model</Text>
                          <Text style={{flex : 1}} >: {data[0].model}</Text>
                      </View>
                      <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', paddingVertical : 7}}>
                          <Text style={{flex : 1}} >Serial Number</Text>
                          <Text style={{flex : 1}} >: {data[0].serialnumber}</Text>
                      </View>
                      <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', paddingVertical : 7}}>
                          <Text style={{flex : 1}} >Connected Wi-fi</Text>
                          <Text style={{flex : 1}} >: {data[0].wifiname}</Text>
                      </View>
                      <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', paddingVertical : 7}}>
                          <Text style={{flex : 1}} >User Name</Text>
                          <Text style={{flex : 1}} >: {data[0].username}</Text>
                      </View>

                  

                    < ButtonSingle
                      name='Done' 
                      fontSize = {fontSmall} 
                      fontColor='#fff' 
                      backgroundColor = {secondaryColor} 
                      backgroundColorPressed = {primaryColor} 
                      borderRadius = {5} 
                      paddingVertical = {6} 
                      paddingHorizontal= {60}
                      func = { navigationRef.navigate }
                      funcDes = 'Home'
                    />
              </View>
        </ScrollView>
    </View>
  )
}

export default ConnectToWifi3