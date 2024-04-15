import React, { useEffect, useState, } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';




import { navigationRef } from '../RootNavigation'

import Ionicons from 'react-native-vector-icons/Ionicons';
import CompanyLogo from '../../assets/logo4.png'   
import { setProfile } from '../../redux/profileSlice';

// const primaryColor = '#DA0063';
// const secondaryColor = '#A41154'
// const tetiaryColor = '#0CA789'
// const tetiaryColor1 = '#8fd14f'
// const tetiaryColor2 = 'red'
// const iconColorOne = '#808080'

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#F24726'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

const pencilIcon = <Ionicons name="pencil" size={20} color= {secondaryColor} />;
const heart = <Ionicons name="heart" size={20} color= {tetiaryColor2} />;
const calendar = <Ionicons name="calendar" size={20} color= {tetiaryColor1} />;

var width = Dimensions.get('window').width * 0.35; 
var height = Dimensions.get('window').height; 


const Profile = () => {
  const { Profile } = useSelector( (store) => store.profile );
  const dispatch = useDispatch();

  // const [state, setState] = useState('');
  const [ language, Setlanguage] = useState('eng')

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     let isMounted = true;

  //     async function fetchData() {
  //       const result = await Promise.resolve({
  //         'userName' : 'User 01',
  //         'mobileNo' : '1234 5678',
  //         'email' : 'User01@yahoo.com',
  //         'password' : '',
  //         'sex' : 'Male',
  //         'birthDay' : '1970-01-01',
  //         'timeZone' : 'GMT -8',
  //         'Language': 'Eng'
  //       });

  //       // 👇️ only update state if component is mounted
  //       if (isMounted) {
  //           dispatch( setProfile(result) )
  //           // setState(result);
  //       }
  //     }
      
  //     fetchData();

  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       // navigationRef.setParams({})
  //       isMounted = false;
  //     };
  //   }, [])
  // );

  useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;

      async function fetchData() {
        const result = await Promise.resolve({
          'userName' : 'User 01',
          'mobileNo' : '1234 5678',
          'email' : 'User01@yahoo.com',
          'password' : '',
          'sex' : 'Male',
          'birthDay' : '1970-01-01',
          'timeZone' : 'GMT -8',
          'Language': 'Eng'
        });

        // 👇️ only update state if component is mounted
        if (isMounted) {
          dispatch( setProfile(result) )
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
  
      const result = await ImagePicker.launchImageLibraryAsync( {
        allowsEditing : true,
        aspect : [4, 3],
        quality : 1,
      });
  
      // Explore the result
      // console.log(result);
  
      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        // console.log(result.uri);
      }
    }

    // No USE *********************************
    const myWineList = () => {
      return (
        [
          {
            id: 1,
            avatar : "https://images.unsplash.com/photo-1598112972608-341f65a9063c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2luZSUyMGNlbGxhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            type: "myWineFavorite",
            name : "My First Wine List",
            location : "Belarus",
            phone : "+852 xxxxxx",
            collected_wine : 4,
            cost : '9,010',
            market_value : '6,450',
            case : 3,
            bottle : 40,
            note : 'What da fu****K!!!'
        },
        {
          id: 2,
          avatar : "https://images.unsplash.com/photo-1598112972608-341f65a9063c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2luZSUyMGNlbGxhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          type: "myWineFavorite2",
          name : "My Second Wine List",
          location : "Spain",
          phone : "+852 xxxxxx",
          collected_wine : 4,
          cost : '9,010',
          market_value : '6,450',
          case : 3,
          bottle : 40,
          note : 'What da fu****K!!!'
      }
      ]
      )
    }
    
  return (
    <View style={{
      flex: 1,
      backgroundColor : '#fff'
    }}>
       <View style={{
                backgroundColor : secondaryColor,
                height : 30,
                width : '100%',
            }}></View>

        {/* <StatusBar
        animated={true}
        backgroundColor={secondaryColor}
        barStyle='default'
        showHideTransition='slide'
        hidden={false} /> */}
        <View style={{ alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor : secondaryColor,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      paddingVertical : 20,
                      }}>
              <Text style={{color: '#fff', fontWeight: '500', fontSize: fontXLarge}}>My Profile</Text>
      </View>
      <ScrollView style={{
        flexDirection : 'column',
        flex : 1
        }}>

        <View style={{
            flex: 3,
            width : '100%',
            justifyContent : 'center',
            alignItems : 'center'
        }}>
            <View style={{
            
              width : '90%',
              alignItems: 'center',
              justifyContent : 'center',
              // backgroundColor : '#bbb',
              borderBottomWidth : 3,
              borderColor : '#ddd',
              minWidth: 200,
              maxWidth : 500,
              marginTop: 30,
          }}>
              <View style={{
                // backgroundColor : 'red',
                width: width,
                height : width,
                maxWidth : 150,
                maxHeight : 150,
                marginBottom : 30
              }}>
                <Image 
                    source={pickedImagePath ? { uri: pickedImagePath } : CompanyLogo}
              
                    style={{
                        width : width,
                        height : width,
                        maxWidth : 150,
                        maxHeight : 150,
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

            <View style={{
              width: '100%',
              maxWidth : 500
            }}>
              <View style={{
                width: '100%',
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'center',
                paddingVertical : 7
              }}>
                <Pressable
                onPress={ () => {
                  // console.log('My Favorite')
                  navigationRef.navigate('Home', {
                    screen: 'Collection',
                    params: { _current : 'my favorite' },
                  })
                }} 
                hitSlop= {20} style={{flexDirection : 'row', alignItems : 'center'}}>
                  {heart}
                  <Text style={{fontSize : fontSmall, color : tetiaryColor2, fontWeight : 'bold'}}> My Favorite</Text>
                </Pressable>

                <Pressable
                onPress={ () => {
                  // console.log('My Wine List')
                  navigationRef.navigate('Home', {
                    screen: 'Collection',
                    // params: { _myWineList: myWineList(), _current : 'my wine list' },
                    params: { _current : 'my wine list' },
                  })
                }}
                hitSlop ={20}
                 style={{flexDirection : 'row', alignItems : 'center'}}>
                  {calendar}
                  <Text style={{fontSize : fontSmall, color : tetiaryColor1, fontWeight : 'bold'}}> My Wine List</Text>
                </Pressable>
              </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                }}>
                  <Text style={{flex : 2}}>User Name</Text>
                  <Text style={{flex : 3, fontSize : fontSmall}}>{Profile.userName}</Text>
                  <Text style={{flex : 1, fontSize : fontSmall}}></Text>
                </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                  }}>
                  <Text style={{flex : 2}}>Mobile No.</Text>
                  <Text style={{flex : 3, fontSize : fontSmall}}>{Profile.mobileNo}</Text>
                  <Pressable style={{flex : 1}}>
                    <Text style={{fontSize : fontSmall, color: secondaryColor, textDecorationLine : 'underline'}}>Edit</Text>
                  </Pressable>
                </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                  }}>
                  <Text style={{flex : 2}}>Email</Text>
                  <Text style={{flex : 3, fontSize : fontSmall}}>{Profile.email}</Text>
                  <Pressable style={{flex : 1}}>
                    <Text style={{fontSize : fontSmall, color: secondaryColor, textDecorationLine : 'underline'}}>Edit</Text>
                  </Pressable>
                </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                  }}>
                  <Text style={{flex : 2}}>Password</Text>
                  <Pressable style={{flex : 3}}>
                    <Text style={{fontSize : fontSmall, color: secondaryColor, textDecorationLine : 'underline'}}>Edit Password</Text>
                  </Pressable>
                  <Text style={{flex : 1, fontSize : fontSmall}}></Text>
                </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                  }}>
                  <Text style={{flex : 2}}>Sex</Text>
                  <Text style={{flex : 3, fontSize : fontSmall}}>{Profile.sex}</Text>
                  <Pressable style={{flex : 1}}>
                    <Text style={{fontSize : fontSmall, color: secondaryColor, textDecorationLine : 'underline'}}>Edit</Text>
                  </Pressable>
                </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                  }}>
                  <Text style={{flex : 2}}>Birth Date</Text>
                  <Text style={{flex : 3, fontSize : fontSmall}}>{Profile.birthDay}</Text>
                  <Pressable style={{flex : 1}}>
                    <Text style={{fontSize : fontSmall, color: secondaryColor, textDecorationLine : 'underline'}}>Edit</Text>
                  </Pressable>
                </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                  }}>
                  <Text style={{flex : 2}}>Time-Zone</Text>
                  <Text style={{flex : 3, fontSize : fontSmall}}>{Profile.timeZone}</Text>
                  <Pressable style={{flex : 1}}>
                    <Text style={{fontSize : fontSmall, color: secondaryColor, textDecorationLine : 'underline'}}>Edit</Text>
                  </Pressable>
                </View>

                <View style={{
                  flex: 1,
                  width : '100%',
                  flexDirection : 'row',
                  borderTopWidth : 3,
                  borderColor : '#ddd',
                  paddingVertical : 7
                  }}>
                    
                  <Text style={{flex : 2}}>Language</Text>
                  <Pressable
                    onPress={
                      ()=> {
                        Setlanguage('cn')
                      }
                    }
                    style={{flex : 1.5}}>
                    <Text style={{fontSize : fontSmall, width : fontSmall, fontWeight : 'bold', backgroundColor : `${language == 'cn' ? tetiaryColor1 : '#fff'}`}}>#</Text>
                  </Pressable>
                  <Pressable
                   onPress={
                    ()=> {
                      Setlanguage('jn')
                    }
                  }
                   style={{flex : 1.5}}>
                    <Text style={{fontSize : fontSmall, width : fontSmall, fontWeight : 'bold', backgroundColor : `${language == 'jn' ? tetiaryColor1 : '#fff'}`}}>#</Text>
                  </Pressable>
                  <Pressable
                  onPress={
                    ()=> {
                      Setlanguage('eng')
                    }
                  }
                  style={{flex : 1}}
                  >
                    <Text style={{fontSize : fontSmall, width : 25, fontWeight : 'bold', backgroundColor : `${language == 'eng' ? tetiaryColor1 : '#fff'}`}}>Eng</Text>
                  </Pressable>
                  
                  
                </View>
            </View>
          </View>
        </View>


    </ScrollView>
    </View>
  
  )
}

export default Profile
