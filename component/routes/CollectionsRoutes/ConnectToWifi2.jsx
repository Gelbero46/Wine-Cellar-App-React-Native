import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Button } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';


import Status from './Status'
import HeaderWifi from './HeaderWifi'
import ButtonSingle from './ButtonSingle';
import { navigationRef } from '../../RootNavigation';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';

const spinner = <FontAwesome5 name="spinner" size={150} color='#000' />;

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

const ConnectToWifi2 = ( { navigation, route } ) => {

  const { method, ssid, password } = route.params
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
  
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
  
      return () => {
        setScanned(false)
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        
        
      };
    }, [])
  );

  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(type)
    console.log(data)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!112')
    if ( type && method == 'add' ) {
      navigationRef.navigate('ConnectToWifi3', { method : method , data : [
        {
          'username' : '9876123',
          'avatar' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1-L_WXyGghQhTr67ypImTQLlrdL5R77MB4g&usqp=CAU',
          'model' : 'SmartCellarVoo1',
          'serialnumber' : 'SC07659754-LX',
          'wifiname' : 'TP-Link076543',
        }
      ]})
    }
    else if ( type && method == 'update') {
      navigationRef.navigate('Home')
    }
    else {
      navigationRef.navigate('ConnectToWifi4', { method : method })
    }
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }




  console.log('@@@@@@@@@@@@@@1')
  console.log(method, ssid, password)

  return (
    <View style={{flex: 1,padding: 20, backgroundColor: iconColorTwo}}>
        <HeaderWifi title = { method.toLowerCase() == 'add' ? `${scanned ? 'Connecting' : 'Connect'} with AI Cellar` : 'Update Wifi settings for AI Cellar'} />
        <View style={{marginBottom: 20}}>
          <Status point = {2}/>
        </View>
    
        
            {
            scanned ?
            <View style={{alignItems : 'center', marginTop : 50 }}>
              {spinner}
              <Text style={{marginTop : 30}}>Please wait...</Text>
            </View>
              
            :
            <View style={styles.container}>
              <BarCodeScanner
                barCodeTypes={[ BarCodeScanner.Constants.BarCodeType.qr ]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}

                />
           </View>
          }
          
          {/* {
            scanned && 
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          } */}
   
        
        
        {
          !scanned &&
          <View style={{marginVertical : 50}}>
          < ButtonSingle
            name='Back' 
            fontSize = {fontSmall} 
            fontColor='#fff' 
            backgroundColor = {secondaryColor} 
            backgroundColorPressed = {primaryColor} 
            borderRadius = {5} 
            paddingVertical = {6} 
            paddingHorizontal= {60}
            func = { navigation.goBack }
          />
        </View>
        }
      
       
       
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export default ConnectToWifi2
