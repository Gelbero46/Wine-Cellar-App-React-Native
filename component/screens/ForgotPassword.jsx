import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { navigationRef } from '../RootNavigation'  
import PolicyFooter from '../PolicyFooter'

import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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


const arrowDown = <MaterialIcons name="keyboard-arrow-down" size={30} color="#000" />;
const arrowUp = <MaterialIcons name="keyboard-arrow-up" size={30} color="#000" />;
const cancel = <MaterialIcons name="cancel" size={10} color={primaryColor} />;
const checkmark = <Ionicons name="checkmark-circle" size={10} color= {tetiaryColor} />;

var width = Dimensions.get('window').width * 0.45; //full width
var height = Dimensions.get('window').height; //full height

const ForgotPassword = () => {
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

    const [ regionToggle, SetregionToggle ] = useState(false)
    
    const [ livingRegion, SetlivingRegion] = useState('')
    const [ mobile, Setmobile ] = useState('')
    const [ mobileVerify, SetmobileVerify ] = useState('')
    const [ mobileVerifyCode, SetmobileVerifyCode ] = useState('send code')
    const [ password, Setpassword ] = useState('')
    const [ reEnterPassword, SetreEnterPassword ] = useState('')



    const loginDetails = {
        emailverifycode : 123,
        mobileverifycode : 456,
        // smsVerify : 1001
    }

    const Send = (type) => {
        if (mobile && type == 'mobile') {
            console.log('started')
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

        // else if (email && type == 'email') {
        //     console.log('started')
        //     let counts=setInterval(updated, 1000); 

        //     let text = 0; 

        //     function updated(){

        //         text += 1
        //         SetemailVerifyCode(text)
        //         console.log('text',text)

        //         if(text >= 60) 
        //         { 

        //             clearInterval(counts); 
        //             SetemailVerifyCode('resend')

        //         } 

        //     } 
        // }
        else {
            console.log('error')
        }
        
                 
    }

    const toProfile = () => {
        // console.log(loginChoice)
        console.log(mobile)
        console.log( "password", password)
        console.log('mobileverify', mobileVerify)
        console.log()
        if (!mobile || (!password || !mobileVerify)) {
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
        else if(mobileVerify == loginDetails.mobileverifycode && password == reEnterPassword && mobile) {
            navigationRef.navigate('Home')
        }
       else {
            console.log('error')
       }
        Setpassword('')
        SetreEnterPassword('')
        SetmobileVerify('')
    }
    
  return (
    <SafeAreaView style={{
                flex : 1,
        }}>
        <View style={{
                backgroundColor : secondaryColor,
                height : 30,
                width : '100%',
            }}>

        </View>
        <ScrollView style={{
        flexDirection : 'column',
        flex : 1,
        }}>
        
        <View style={{ 
            alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor : secondaryColor,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        paddingVertical : 10,
                        paddingBottom : 15,
                        flex : 1
                        }}>
            
            <View style={{flexDirection: 'row',
                        alignItems: 'center',

                        width: '90%',
                        justifyContent: 'space-between',
                        }}>

                <Text style={{color: '#fff', fontWeight: '500', fontSize: fontLarge}}>Forgot Password</Text>
                <Text style={{color: '#fff', fontWeight: '500', backgroundColor: tetiaryColor}}>Eng</Text>
            </View>
            <View style={{
                marginVertical: 15
            }}>
                <Image 
                source={CompanyLogo}
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
        
            
        </View>

        <View style={{
            // flex: 2,
            width : '86%',
            alignSelf: 'center',
            justifyContent : 'center',
            // backgroundColor : '#bbb',
            minWidth: 200,
            maxWidth : 500,
            marginTop: 30,
        }}>



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
                        hitSlop={15}
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
                    New Password
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
                    Change Password
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
                    navigationRef.navigate('Login')
                }}>
                    <Text style={{color : tetiaryColor}} >
                        Had an account?
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

export default ForgotPassword
