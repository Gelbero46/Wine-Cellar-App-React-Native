import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, Dimensions, Pressable, StyleSheet, TextInput, Alert } from 'react-native'

// import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

import { navigationRef } from '../RootNavigation'
import CompanyLogo from '../../assets/logo4.png'   
import PolicyFooter from '../PolicyFooter'


import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const arrowDown = <MaterialIcons name="keyboard-arrow-down" size={30} color="#000" />;
const arrowUp = <MaterialIcons name="keyboard-arrow-up" size={30} color="#000" />;
const arrowDownSmall = <MaterialIcons name="keyboard-arrow-down" size={20} color="#000" />;
const arrowUpSmall = <MaterialIcons name="keyboard-arrow-up" size={20} color="#000" />;




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

const cancel = <MaterialIcons name="cancel" size={10} color={primaryColor} />;
const checkmark = <Ionicons name="checkmark-circle" size={10} color= {tetiaryColor} />;
const pencilIcon = <Ionicons name="pencil" size={20} color= {tetiaryColor} />;

var width = Dimensions.get('window').width * 0.45; //full width
var height = Dimensions.get('window').height; //full height


const Register = () => {
    const [ regionToggle, SetregionToggle ] = useState(false)  
    const [ userName, SetuserName ] = useState('')
    const [ email, Setemail ] = useState('')
    const [ emailVerifyCode, SetemailVerifyCode ] = useState('send code')
    const [ emailVerify, SetemailVerify ] = useState('')
    const [ livingRegion, SetlivingRegion] = useState('')
    const [ mobile, Setmobile ] = useState('')
    const [ mobileVerify, SetmobileVerify ] = useState('')
    const [ mobileVerifyCode, SetmobileVerifyCode ] = useState('send code')
    const [ password, Setpassword ] = useState('')
    const [ reEnterPassword, SetreEnterPassword ] = useState('')


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

    const [pickedImagePath, setPickedImagePath] = useState('')

    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your photos!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync();
    
        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
          setPickedImagePath(result.uri);
          console.log(result.uri);
        }
      }




    // credentials
    const loginDetails = {
        emailverifycode : 123,
        mobileverifycode : 456,
        // smsVerify : 1001
    }

    const toProfile = () => {

        console.log( "password", password)
        console.log('SMSverify', mobileVerify)
        console.log()
        if ( !userName  || !email || !emailVerify || !mobile || !mobileVerify || !password || !reEnterPassword ) {
            Alert.alert(
                "No Input",
                "Please enter valid details",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
        }
        else if (emailVerify == loginDetails.emailverifycode && (mobileVerify == loginDetails.mobileverifycode && password == reEnterPassword)) {
            // navigationRef.navigate('Profile')
            navigationRef.navigate('Home', { screen: 'Profile' });
        }
       else {
           console.log('error')
        
       }
        Setpassword('')
        Setmobile('')
        SetmobileVerify('')
    }

    const Send = (type) => {
        console.log('type', type)
        if (mobile && type == 'mobile') {
            console.log('started')
            console.log(type)
            let counts=setInterval(updated, 1000); 
    
            let text = 0; 
    
            function updated(){
    
                text += 1
                SetmobileVerifyCode(`${text}s`)
                console.log('text',text)
    
                if(text >= 60) 
                { 
    
                    clearInterval(counts); 
                    SetmobileVerifyCode('resend')
    
                } 
    
            } 
        }

        else if (email && type == 'email') {
            console.log(type)
            console.log('started')
            let counts=setInterval(updated, 1000); 

            let text = 0; 

            function updated(){

                text += 1
                SetemailVerifyCode(`${text}s`)
                console.log('text',text)

                if(text >= 60) 
                { 

                    clearInterval(counts); 
                    SetemailVerifyCode('resend')

                } 

            } 
        }
        else {
            console.log('error')
        }
        
                 
    }


  return (
    <View style={{
              flex : 1,
    }}>
         <View style={{
                backgroundColor : secondaryColor,
                height : 30,
                width : '100%',
            }}></View>
    <ScrollView style={{
      flexDirection : 'column',
      }}>
        
       <View style={{ alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor : secondaryColor,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                      paddingVertical : 10,
                      paddingBottom : 15,
                      flex : 1}}>
           
          <View style={{flexDirection: 'row',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                      width: '90%',
                      justifyContent: 'space-between',
                      // marginBottom: 10,
                      }}>
              <Text style={{color: '#fff', fontWeight: '500', fontSize: fontLarge}}>Register</Text>
              <Text style={{color: '#fff', fontWeight: '500', backgroundColor: tetiaryColor}}>Eng</Text>
          </View>
          <View>
            <Image 
            // source={pickedImagePath ? pickedImagePath : CompanyLogo}
            // source={pickedImagePath ? pickedImagePath : CompanyLogo}
            // source={CompanyLogo}
            // source={require(pickedImagePath)}
            source={pickedImagePath ? { uri: pickedImagePath } : CompanyLogo}
            // source={{ uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FwineCellar-03b4670b-3e41-4a1f-9abe-fed65c2379f7/ImagePicker/4edddc10-e284-437a-afa1-ca5ce9407aed.jpg" }}

                style={{
                    width : width,
                    height : width,
                    maxWidth : 100,
                    maxHeight : 100,
                    backgroundColor: '#eee',
                    borderRadius : width
                }}>
            </Image>
                 
            <Pressable style={{
                position: 'absolute',
                bottom : 0,
                right : 0

            }}
            onPress={ () => {
                showImagePicker()
            }}
                hitSlop= {20}>
                {pencilIcon}
            </Pressable>
          </View>
        
          
      </View>

      <View style={{
          flex: 4,
          width : '86%',
          alignSelf: 'center',
          justifyContent : 'center',
          // backgroundColor : '#bbb',
          minWidth: 200,
          maxWidth : 500,
          marginTop: 30,
      }}>



          <View style={styles.formContainer}>
              <Text style={{flex : 3, fontWeight : '500'}}>
                  User Name
              </Text>
              <View style={{
                  // backgroundColor: 'red',
                  flex: 5,
                  borderRadius : 5,
                  marginLeft: -6, 
              }}>
                  <TextInput 
                  onChangeText={SetuserName}
                  value={userName}
                  borderRadius= {4}
                  fontSize = {fontSmall}
                  style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                  />
              </View>
              
          </View>

          <View style={styles.formContainer}>
                <Text style={{flex : 3, fontWeight : '500'}}>
                    Email
                </Text>
                <View style={{
                    // backgroundColor: 'red',
                    flex: 5,
                    borderRadius : 5,
                    marginLeft: -6, 
                }}>
                    <TextInput 
                    onChangeText={Setemail}
                    value={email}
                    borderRadius= {4}
                    fontSize = {fontSmall}
                    style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                    />
                    <Pressable style={ ({pressed}) => [
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        ]}
                        onPress={() => {
                            console.log('send')
                            if (emailVerifyCode == 'send code' || emailVerifyCode == 'resend') {
                                console.log('ok')
                                Send('email')
                            }
                        }}>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{emailVerifyCode}</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[styles.formContainer,
                        {flexDirection: 'column',
                        alignItems : 'flex-start' }]}>
              <Text style={{flex : 3, fontWeight : '500'}}>
                  Email Verification Code
              </Text>
              <View style={{
                  flex: 5,
                  borderRadius : 5,
                  width : '100%'
              }}>
                  <TextInput 
                  onChangeText={SetemailVerify}
                  value={emailVerify}
                  borderRadius= {4}
                  fontSize = {fontSmall}
                  style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                  />
                    {emailVerify != '' && emailVerify == loginDetails.emailverifycode && <View style={
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        }>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{checkmark}</Text>
                    </View>}
                    {emailVerify != '' && emailVerify != loginDetails.emailverifycode && <View style={
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        }>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{cancel}</Text>
                    </View>}
              </View>
              
          </View>

          <View style={styles.formContainer}>
              <Text style={{flex: 3, fontWeight : '500'}}>Living Region</Text>
              <Pressable style={{flexDirection: 'row', 
                          alignItems : 'center',
                          borderWidth : 3,
                          borderColor : '#777',
                          paddingLeft: 5,
                          borderRadius : 5,
                          flex : 5}}
                          onPress={() => {
                              SetregionToggle(!regionToggle)
                          } }>
                  <Text style={{marginRight: 'auto'}}>Hong Kong</Text>
                  <Text style={{marginRight: 7}}>+852</Text>
                  {regionToggle ? arrowUp : arrowDown}
              </Pressable>
          </View>

          <View style={styles.formContainer}>
                <Text style={{flex : 3, fontWeight : '500'}}>
                    Mobile No.
                </Text>
                <View style={{
                    // backgroundColor: 'red',
                    flex: 5,
                    borderRadius : 5,
                    marginLeft: -6, 
                }}>
                    <TextInput 
                    onChangeText={Setmobile}
                    value={mobile}
                    borderRadius= {4}
                    fontSize = {fontSmall}
                    style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                    />
                    <Pressable style={ ({pressed}) => [
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        ]}
                        onPress={() => {
                            console.log('send')
                            if (mobileVerifyCode == 'send code' || mobileVerifyCode == 'resend') {
                                console.log('ok')
                                Send('mobile')
                            }
                        }}>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{mobileVerifyCode}</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[styles.formContainer,
                        {flexDirection: 'column',
                        alignItems : 'flex-start' }]}>
              <Text style={{flex : 3, fontWeight : '500'}}>
                  Mobile Verification Code
              </Text>
              <View style={{
                  flex: 5,
                  borderRadius : 5,
                  width : '100%'
              }}>
                  <TextInput 
                  onChangeText={SetmobileVerify}
                  value={mobileVerify}
                  borderRadius= {4}
                  fontSize = {fontSmall}
                  style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                  />
              </View>
              {mobileVerify != '' && mobileVerify == loginDetails.mobileverifycode && <View style={
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        }>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{checkmark}</Text>
            </View>}
            {mobileVerify != '' && mobileVerify != loginDetails.mobileverifycode && <View style={
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        }>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{cancel}</Text>
            </View>}
          </View>
          <View style={styles.formContainer}>
              <Text style={{flex : 3, fontWeight : '500'}}>
                  Password
              </Text>
              <View style={{
                  // backgroundColor: 'red',
                  flex: 5,
                  borderRadius : 5,
              }}>
                  <TextInput 
                  onChangeText={Setpassword}
                  value={password}
                  borderRadius= {4}
                  fontSize = {fontSmall}
                  style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                  />
              </View>
          </View>
          <View style={styles.formContainer}>
              <Text style={{flex : 3, fontWeight : '500'}}>
                  Re-enter Password
              </Text>
              <View style={{
                  // backgroundColor: 'red',
                  flex: 5,
                  borderRadius : 5,
              }}>
                  <TextInput 
                  onChangeText={SetreEnterPassword}
                  value={reEnterPassword}
                  borderRadius= {4}
                  fontSize = {fontSmall}
                  style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                  />

                { password != '' && password == reEnterPassword && <View style={
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        }>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{checkmark}</Text>
                </View>}
                {password != '' && password != reEnterPassword && <View style={
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        }>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{cancel}</Text>
                </View>}
              </View>
             
              
          </View>


          
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
                  toProfile()
              }}>
              <Text style={{color : '#eee'}}>
                  Register
              </Text>
          </Pressable>

          <View style={{flexDirection : 'row', justifyContent: 'space-between', marginTop : 10}}>
              <Pressable
              onPress={() => {
                  navigationRef.navigate('Login')
              }}>
                  <Text style={{color : tetiaryColor}}>
                      Had an account?
                  </Text>
              </Pressable>
              <Pressable 
              onPress={() => {
                  console.log('forgot Password')
                  navigationRef.navigate('ForgotPassword')
              }}>
                  <Text style={{color : tetiaryColor}} >
                      Forgot Password?
                  </Text>
              </Pressable>
          </View>
      </View>


      
      <View style={{paddingVertical: 10, paddingHorizontal: 5, alignSelf: 'flex-end', marginTop: height * 0.04}}>
          <PolicyFooter />
      </View>

    </ScrollView>

    </View>


  )
}
const styles = StyleSheet.create ({
  formContainer : {
      flexDirection: 'row', 
      alignItems : 'center', 
      marginTop : 10
  }
})


export default Register
