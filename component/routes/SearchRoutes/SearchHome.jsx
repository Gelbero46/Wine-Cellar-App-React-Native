import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, ImageBackground, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import WineAds from './WineAds';
import SearchHistory from './SearchHistory';

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const iconColorOne = '#808080'

import { navigationRef } from '../../RootNavigation'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

import backGround from '../../../assets/background.jpg'
import wineBottle from '../../../assets/winebot.png'

import Ionicons from 'react-native-vector-icons/Ionicons';
const search = <Ionicons name="search-outline" size={20} color= '#888' />;
const searchSmall = <Ionicons name="search-outline" size={15} color= '#888' />;
const reload = <Ionicons name="reload-outline" size={15} color= '#888' />;


var width = Dimensions.get('window').width * 0.45; //full width
var height = Dimensions.get('window').height; //full height

const SearchHome = () => {
  const [ recentSearch, SetrecentSearch ] = useState([])
  const [ resultPopular, SetresultPopular ] = useState([])
  const [ currentSearch, SetcurrentSearch ] = useState('PS')
  const [ ads, setads ] = useState([]);

  useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;
    currentSearch
      async function fetchData() {
      const resultRecent = await Promise.resolve(['Lafite', 'Almaviva', 'Sassicsia']);
      const resultpopular = await Promise.resolve(['Vodka', 'Best', 'Moment']);
      const resultsAds = await Promise.resolve([
          {
            'id' : 1,
            'name' : 'Wine name',
            'backgroundimage' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7or-dxg3YbgAEpetZBdHQwMR9httOl9KWqA&usqp=CAU',
          'wineimage' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6JRbCuJtzjg_9Kk-lYT4cgGtpF4V8d2Xxw&usqp=CAU'
          },
          {
            'id' : 2,
            'name' : 'Wine name',
          'backgroundimage' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7or-dxg3YbgAEpetZBdHQwMR9httOl9KWqA&usqp=CAU',
          'wineimage' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTma6qNotsxB0SYl75qPlO6tUCHtg6hjFfQaA&usqp=CAU'
          },
          {
            'id' : 3,
            'name' : 'Wine name',
          'backgroundimage' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7or-dxg3YbgAEpetZBdHQwMR9httOl9KWqA&usqp=CAU',
          'wineimage' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTma6qNotsxB0SYl75qPlO6tUCHtg6hjFfQaA&usqp=CAU'
          },
          {
            'id' : 4,
            'name' : 'Wine name',
          'backgroundimage' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7or-dxg3YbgAEpetZBdHQwMR9httOl9KWqA&usqp=CAU',
          }

      ]);
      // 👇️ only update state if component is mounted
      if (isMounted) {
          SetrecentSearch(resultRecent)
          SetresultPopular (resultpopular)
          setads(resultsAds);
      }
      }

      fetchData();

      return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false;
      };
  }, []);

  
  const onPressFunction = () => {
    Alert.alert(
      "Reloading...",
      "My Alert Msg",
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
  return (
      <ScrollView style={{
        flex : 1
      }}>
           {/* <View style={{
                backgroundColor : primaryColor,
                height : 30,
                width : '100%',
            }}>

            </View> */}
            <ImageBackground
              //   source={{
              //     uri: 
              //   'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3.png',
              //   }
              // }
              source={backGround}
                resizeMode="cover"
                style={{ alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor : primaryColor,
                            paddingVertical : 35,
                            paddingBottom : 35,
                            marginBottom : 30
                            }}>

                <View style={{flexDirection: 'row',
                            alignItems: 'center',
                            width: '90%',
                            justifyContent: 'space-between',
                            }}>
                    
                    
                    <Text style={{color: '#fff', fontWeight: '700', fontSize: fontLarge}}>Search</Text>
 
                    
                </View> 

                  <Pressable style={{
                    borderRadius : 5,
                    backgroundColor : '#fff',
                    borderWidth : 3,
                    borderColor : '#888',
                    width : '80%',
                    maxWidth : 300,
                    padding  : 5,
                    position : 'absolute',
                    bottom : -15
                  }}
                  onPress={ () => {
                    navigationRef.navigate('SearchWine', )
                    // console.log(ads)
                  } }>
                        <View>{search}</View>
                  </Pressable>
            </ImageBackground>


            <ScrollView style={{
              // backgroundColor : 'red',
              paddingVertical : 30,
              flex : 1
            
              
            }}
            contentContainerStyle={{
              alignItems : 'center'
            }}>
                    <View style={{
                      // backgroundColor : 'pink',
                      width : '95%',
                      maxWidth : 500,
                      flex : 1,
                      height : '100%',
                      paddingBottom : 50
                      
                    }}>
                      <SearchHistory reload={reload} icon={ searchSmall } recentSearch = {recentSearch} resultPopular={resultPopular} />
                      < WineAds ads={ads} />
                    </View>
            </ScrollView>
            
      </ScrollView>
  )
}

export default SearchHome

