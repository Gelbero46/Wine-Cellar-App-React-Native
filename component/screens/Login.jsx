import React, { useEffect, useState } from 'react'
import { Text,SafeAreaView, View, Dimensions, Image, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native'


import { TextInput as Textinput } from "react-native-paper";


import { navigationRef } from '../RootNavigation'

import CompanyLogo from '../../assets/logo4.png'    
import PolicyFooter from '../PolicyFooter'


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const arrowDown = <MaterialIcons name="keyboard-arrow-down" size={30} color="#000" />;
const arrowUp = <MaterialIcons name="keyboard-arrow-up" size={30} color="#000" />;
const arrowDownSmall = <MaterialIcons name="keyboard-arrow-down" size={20} color="#000" />;
const arrowUpSmall = <MaterialIcons name="keyboard-arrow-up" size={20} color="#000" />;

import Ionicons from 'react-native-vector-icons/Ionicons';



const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const iconColorOne = '#808080'

const checkmark = <Ionicons name="checkmark-circle" size={10} color= {tetiaryColor} />;

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10


var width = Dimensions.get('window').width * 0.45; //full width
var height = Dimensions.get('window').height; //full height

console.log(width, height)


const Login = () => {

  const [ phoneNumber, SetphoneNumber ] = useState('') 
  const [ password, Setpassword ] = useState('')
  const [ SMSverify, SetSMSverify] = useState('') 

  const [ loginChoice, SetloginChoice ] = useState('PW')
  const [ regionToggle, SetregionToggle ] = useState(false)

  const [ PWwarning, SetPWwarning ] = useState('')
  const [ SMSWarning, SetSMSWarning ] = useState('')

  const [ sendText, SetsendText ] = useState('send code')
//   SMSWarning
  const [state, setState] = useState([]);

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

    const loginDetails = {
        phoneNumber : 56789,
        password : 1234,
        smsVerify : 1001
    }

    const Send = () => {
        console.log('started')
        let counts=setInterval(updated, 1000); 

        let text = 0; 

        function updated(){

            text += 1
            SetsendText(`${text}s`)
            console.log('text',text)

            if(text >= 60) 
            { 

                clearInterval(counts); 
                SetsendText('resend')

            } 

        } 
                 
    }

    const toHome = () => {
        console.log(loginChoice)
        console.log(phoneNumber)
        console.log( "password", password)
        console.log('SMSverify', SMSverify)
        console.log()
        if (!phoneNumber && (!password || !SMSverify)) {
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
        else if (phoneNumber == loginDetails.phoneNumber && (password == loginDetails.password || SMSverify == loginDetails.smsVerify)) {
            navigationRef.navigate('Home')
        }
       else {
            loginChoice == 'PW' ? SetPWwarning('Phone No. or PW is incorrect') : SetSMSWarning('Verification code is incorrect')
        
       }
        Setpassword('')
        SetphoneNumber('')
        SetSMSverify('')
    }

  return (
    <SafeAreaView>
                <ScrollView style={{
        flexDirection : 'column',
        flex : 1
        }}>
         <View style={{ alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor : secondaryColor,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        paddingVertical : 50,
                        flex : 1}}>
            <View style={{flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: 'blue',
                        width: '90%',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        }}>
                <Text style={{color: '#fff', fontWeight: '500', fontSize: fontLarge}}>Login</Text>
                <Text style={{color: '#fff', fontWeight: '500', backgroundColor: tetiaryColor}}>Eng</Text>
            </View>
            <Image source={CompanyLogo}
                style={{
                    width : width,
                    height : width,
                    maxWidth : 200,
                    maxHeight : 200,
                    backgroundColor: '#eee',
                    borderRadius : width
                }}>
            </Image>
        </View>
        <View style={{
            flex: 3,
            width : '86%',
            alignSelf: 'center',
            justifyContent : 'center',
            // backgroundColor : '#bbb',
            minWidth: 200,
            maxWidth : 500,
            marginTop: 30,
        }}>
            <View style={{flexDirection: 'row',
                        borderBottomWidth: .5,
                        // backgroundColor : '#eee',
                        width : '100%',
                        // marginBottom : height * .07,
                        }}>

                <Pressable style={{
                        borderBottomWidth : loginChoice === 'PW' ? 4 : 0,
                        borderColor : secondaryColor,
                        paddingVertical: 3,
                        marginRight : 30,
                        // backgroundColor : 'red',
                        width : 80
                    }}
                    onPress={ () => SetloginChoice('PW')}>
                    <Text >PW Login</Text>
                </Pressable>
                
                <Pressable style={{
                        borderBottomWidth : loginChoice === 'SMS' ? 4 : 0,
                        borderColor : secondaryColor,
                        paddingVertical: 3,
                        // backgroundColor : 'red',
                        width : 80

                    }}
                    onPress={ () => {
                        Setpassword('')
                        SetphoneNumber('')
                        SetSMSverify('')
                        SetloginChoice('SMS')
                    }}>
                    <Text>SMS Login</Text>
                </Pressable>


                
            </View>

            <View style={{
                 height : height * .07,
                 alignItems: 'center',
                 justifyContent : 'center',
            }}>
                <Text style={{
                    fontWeight : '500',
                    color : secondaryColor
                }}> {loginChoice == 'PW' ? PWwarning : SMSWarning} </Text>
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
                    Phone No.
                </Text>
                <View style={{
                    // backgroundColor: 'red',
                    flex: 5,
                    borderRadius : 5,
                    marginLeft: -6, 
                }}>
                    <TextInput 
                    onChangeText={SetphoneNumber}
                    value={phoneNumber}
                    borderRadius= {4}
                    fontSize = {fontSmall}
                    style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                    />
                    {loginChoice == 'SMS' && <Pressable style={ ({pressed}) => [
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        ]}
                        onPress={() => {
                            console.log('send')
                            if (sendText == 'send code' || sendText == 'resend') {
                                console.log('ok')
                                Send()
                            }
                            // Send()
                        }}>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{sendText}</Text>
                    </Pressable>}
                </View>
                


            </View>

            <View style={styles.formContainer}>
                <Text style={{flex : 3, fontWeight : '500'}}>
                    {loginChoice== 'PW' ? 'Password' : 'Verification Code'}
                </Text>
            
                <View style={{
                    // backgroundColor: 'red',
                    flex: 5,
                    borderRadius : 5,
                    marginLeft: -6, 
                }}>
                    <TextInput 
                    onChangeText={ loginChoice== 'PW' ? Setpassword : SetSMSverify}
                    value={loginChoice== 'PW' ? password : SMSverify}
                    borderRadius= {4}
                    fontSize = {fontSmall}
                    borderColor = '#777'
                    style={{paddingLeft: 10, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 3}}
                    />
                    {loginChoice == 'SMS' && SMSverify== loginDetails.smsVerify  && <View style={
                            {
                            position : 'absolute',
                            alignSelf : 'flex-end',
                            paddingRight : 10,
                            bottom : 10
                            }
                        }>
                        <Text style={{fontSize : fontSmallest, color : tetiaryColor}}>{checkmark}</Text>
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
    </SafeAreaView>

  )
}

const styles = StyleSheet.create ({
    formContainer : {
        flexDirection: 'row', 
        alignItems : 'center', 
        marginTop : 10
    }
})

export default Login
