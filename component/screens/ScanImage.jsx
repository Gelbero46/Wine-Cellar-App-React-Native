import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks'
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType, } from 'expo-camera';
import { Alert, BackHandler, Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertMsg from '../AlertMsg'

import { navigationRef } from '../RootNavigation'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



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



const camera = <Ionicons name="camera" size={40} color={secondaryColor} />;
const picturePlaceholder = <FontAwesome name="picture-o" size={30} color='#fff' />;
const refresh = <FontAwesome name="refresh" size={40} color={secondaryColor} />;

const ScanImage = ({route}) => {
  // const { redirect } = route.params

  const [type, setType] = useState(CameraType.back);
  const [CameraRef, setCameraRef] = useState();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [ pictureUri, SetpictureUri ] = useState('')

  const [ cameraReady, SetcameraReady ] = useState(false)
  // const [ _redirect, Set_redirect ] = useState(false)
  // expo-image-picker image ** No use**
  // const [pickedImagePath, setPickedImagePath] = useState('')
  
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // if ( redirect ) {
      //     Set_redirect(redirect)
      // }
      // console.log('redirect', redirect)
      // console.log(_redirect)

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setCameraRef()
        SetpictureUri('')

        
      };
    }, [])
  );
  

  // const alertMsg = ({ title, message} ) => {
  //   Alert.alert(
  //     title,
  //     message,
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ]
  //   )
  // }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }
  


  const takePicture = async () => {
    console.log(cameraReady)
    console.log('*********************')
    if (cameraReady && CameraRef) {
      const pictureObject = await CameraRef.takePictureAsync()
      if (pictureObject) {
        SetpictureUri(pictureObject.uri)
      }
      console.log(pictureObject)
    }
  }



  const showImagePicker = async () => {
      // Ask the user for the permission to access the media library 
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        AlertMsg( { title : 'Permissions',  message : "You've refused to allow this app to access your photos!" });
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync( {
        allowsEditing : true,
        aspect : [5, 3],
        quality : 1,
      });
  
      // Explore the result
      console.log(result);
  
      if (!result.cancelled) {
        SetpictureUri(result.uri);
        console.log(result.uri);
      }
    }


  const analyseImage = async () => {
    if (!pictureUri) {
      AlertMsg( {title : 'Error', message : 'No Image to analyze'} )
    }
    const result = await Promise.resolve( [ 
      {
        id : 1,
        type : 'Ai cellar'
      }
    ] )
    if (!result) {
      navigationRef.navigate('WineInventory', { id : result.id, _type : 'ai cellar'})
    }
    else {
      navigationRef.navigate('UpdateWineContent1', { _image : pictureUri, _method : 'add' })
    }

  } 

  return (
    <View style={styles.container}>
      <View style={{flex : 1, padding : 10, paddingVertical : 50, backgroundColor: iconColorOne}}>
        <View style={{flex : 1, borderRadius : 20, borderWidth: 10, borderColor : 'transparent'}}>
          {
            pictureUri ?
            <Image
            resizeMode='contain'
            source={{uri : pictureUri}}
            style={{flex : 1}}>

          </Image>
          :
          <Camera 
              onCameraReady={ () => SetcameraReady(true) } 
              ref={ref => {setCameraRef(ref)}} 
              ratio='5:3' 
              style={{flex : 1, borderRadius : 30, borderWidth : 20, borderColor : '#fff'}} 
              type={type}>
          </Camera>

          }
        
   
        </View>
        
      </View>
     
      <View style= {{ flexDirection : 'row',  alignItems : 'center', justifyContent: 'space-between' ,padding : 25, backgroundColor : secondaryColor}}>
          <Pressable
          onPress={ () => SetpictureUri('')}
          >
              <Text style={{fontSize : fontLarge, color : '#fff'}}>Cancel</Text>
                
          </Pressable>
          <Pressable 
            onPress={takePicture}
          style={{padding : 10, paddingHorizontal : 12, borderRadius : 100, backgroundColor : '#fff'}}>
            {
              pictureUri ?
              refresh
              :
              camera

            }
                    {/* {camera} */}
          </Pressable>

           {
              pictureUri ?
              <Pressable
              onPress={analyseImage}>
                  <Text style={{fontSize : fontLarge, color : '#fff'}}>Analyze</Text>       
              </Pressable>
              :
              <Pressable
              onPress={showImagePicker}>
                  {picturePlaceholder}
                        
              </Pressable>

           }

          {/* <Pressable
          onPress={showImagePicker}>
              {picturePlaceholder}
                    
          </Pressable> */}
      </View>
    </View>
  );

     

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ScanImage