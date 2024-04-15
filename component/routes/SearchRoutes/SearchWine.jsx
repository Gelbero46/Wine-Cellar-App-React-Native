import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, ImageBackground, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import Rating from '../../screens/Rating';



const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#fbc700'
const tetiaryColor3 = '#DAB545'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'


const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

import backGround from '../../../assets/background.jpg'
import wineBottle from '../../../assets/winebot.png'
import wineImage from '../../../assets/wineCellar.jpg'

import Ionicons from 'react-native-vector-icons/Ionicons';
const search = <Ionicons name="search-outline" size={20} color= '#888' />;
const searchSmall = <Ionicons name="search-outline" size={15} color= '#888' />;
const reload = <Ionicons name="reload-outline" size={15} color= '#888' />;
const starFull = <Ionicons name="md-star-sharp" size={12} color= {primaryColor} />;
const starHalf = <Ionicons name="md-star-half-sharp" size={12} color= {primaryColor} />;

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const bottleIcon = <FontAwesome5 name="wine-bottle" size={20} color="#900" />;
const briefcase = <FontAwesome5 name="briefcase" size={17} color={primaryColor} />;

import Octicons from 'react-native-vector-icons/Octicons';
import SearchHistory from './SearchHistory';
import WineAds from './WineAds';
import { navigationRef } from '../../RootNavigation';
const dot = <Octicons name="dot-fill" size={35} color= {primaryColor} />;

var width = Dimensions.get('window').width * 0.45; //full width
var height = Dimensions.get('window').height; //full height

const SearchWine = ( { route } ) => {
  const { searchText } = route.params;
  const [ recentSearch, SetrecentSearch ] = useState([])
  const [ resultPopular, SetresultPopular ] = useState([])
  const [ currentSearch, SetcurrentSearch ] = useState('PS')
  const [ ads, setads ] = useState([]);
  const [ search, Setsearch ] = useState(searchText ? searchText : '')
  const [  maxWidth, SetmaxWidth ] = useState(500)

  const [ searchChoice, SetsearchChoice ] = useState('AW')

  const [ allWine, SetallWine] = useState([
        {
            'id' : 1,
            'name' : 'Calla Lily Ultimate Red Cabernet Sauvignon, 2019',
            'address' : 'Napa Valley, United States',
            'rating' : 4.2
        },
        {
            'id' : 2,
            'name' : 'Calla Lily Audax',
            'address' : 'Napa Valley, United States',
            'rating' : 4.2
        },
        {
            'id' : 3,
            'name' : 'Calla Lily Premium Selection Chardonnay',
            'address' : 'Napa Valley, United States',
            'rating' : 4.2
        }
    ])

    const [ myWine, SetmyWine ] = useState([
      {
        'id' : 1,
        'name' : 'Home',
        'type' : 'Ai Cellar',
        'avatar' : 'https://www.heritagevine.com/assets/imager/uploads/heros/19683/Schwartzer_04_web_1e12ca70d2ce7291ce1baaaf0f18e316.webp',
        'wines' : [
            {
              'id' : 1,
              'name' : 'Calla Lily Ultimate Red Cabernet Sauvignon',
              'vintage' : '1996',
              'avatar' : "https://s3.amazonaws.com/lastbottle/products/LB3J5RAC-995159.jpg",
              'address' : 'United States',
              'case' : 1,
              'bottle' : 2,
              'myrating' : 4.2,
              'average' : 3.5
          },
          {
              'id' : 2,
              'name' : 'Chateau Lynch-Moussas seme Cru',
              'vintage' : '2016',
              'avatar' : "https://s3.amazonaws.com/lastbottle/products/LB3J5RAC-995159.jpg",
              'address' : ' Saint-Estephe, France',
              'case' : 2,
              'bottle' : 1,
              'myrating' : 4.2,
              'average' : 3.5

          },
          {
              'id' : 3,
              'name' : 'Calla Lily',
              'vintage' : '2014',
              'avatar' : "https://s3.amazonaws.com/lastbottle/products/LB3J5RAC-995159.jpg",
              'address' : 'United States',
              'case' : 1,
              'bottle' : 2,
              'myrating' : 4.2,
              'average' : 3.5
          }
        ]

      },
      {
        'id' : 2,
        'name' : 'Happy Valley Club House',
        'type' : 'Virtual Cellar',
        'avatar' : 'https://www.heritagevine.com/assets/imager/uploads/heros/19683/Schwartzer_04_web_1e12ca70d2ce7291ce1baaaf0f18e316.webp',
        'wines' : [
            {
              'id' : 1,
              'name' : 'Calla Lily Ultimate Red Cabernet Sauvignon',
              'vintage' : '1996',
              'avatar' : "https://uploads-ssl.webflow.com/5e86c7170f1ab21474c3f2a4/5ee31283397991860b2f08c5_Wine%20bottle%20tute_7.JPG",
              'address' : 'United States',
              'case' : 1,
              'bottle' : 2,
              'myrating' : 4.2,
              'average' : 3.5
          },
          {
              'id' : 2,
              'name' : 'Chateau Lynch-Moussas seme Cru',
              'vintage' : '2016',
              'avatar' : "https://uploads-ssl.webflow.com/5e86c7170f1ab21474c3f2a4/5ee31283397991860b2f08c5_Wine%20bottle%20tute_7.JPG",
              'address' : ' Saint-Estephe, France',
              'case' : 2,
              'bottle' : 1,
              'myrating' : 4.2,
              'average' : 3.5

          },
          {
              'id' : 3,
              'name' : 'Calla Lily',
              'vintage' : '2014',
              'avatar' : "https://uploads-ssl.webflow.com/5e86c7170f1ab21474c3f2a4/5ee31283397991860b2f08c5_Wine%20bottle%20tute_7.JPG",
              'address' : 'United States',
              'case' : 1,
              'bottle' : 2,
              'myrating' : 4.2,
              'average' : 3.5
          }
        ]

      },
       
    ])
    
  useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;

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
          setads(resultsAds);
          SetresultPopular(resultpopular)
      }
      }

      fetchData();

      return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false;
      };
  }, []);

  const rating = (color) => {

    return (
      <Text style={{flexDirection : 'row'}}>
        <Ionicons name="md-star-sharp" size={12} color= {color} />
        <Ionicons name="md-star-sharp" size={12} color= {color} />
        <Ionicons name="md-star-sharp" size={12} color= {color} />
        <Ionicons name="md-star-sharp" size={12} color= {color} />
        <Ionicons name="md-star-half-sharp" size={12} color= {color} />
      </Text>
    )
  }
  // const onPressFunction = () => {
  //   Alert.alert(
  //     "Reloading...",
  //     "My Alert Msg",
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
  return (
      <ScrollView style={{
        flex : 1
      }}>
            <ImageBackground
                resizeMode="cover"
                style={{ alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor : primaryColor,
                            borderBottomLeftRadius : 10,
                            borderBottomRightRadius : 7,
                            paddingVertical : 35,
                            paddingBottom : 35,
                            marginBottom : 30
                            }}>

                <View style={{flexDirection: 'row',
                            alignItems: 'center',
                            width: '90%',
                            justifyContent: 'space-between',
                            }}>
                    
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
                    bottom : -15,
                    height : 35
                  }}
                >
                        <TextInput 
                        value={search}
                        onChangeText={Setsearch}
                        style={{
                            fontSize : fontSmall
                        }}/>

                        
                  </Pressable>
            </ImageBackground>
            
             <View style={{flexDirection: 'row',
                        borderBottomWidth: .5,
                        marginBottom : 5,
                        width : '100%',
                        paddingLeft : 15
                        }}>

                            <Pressable style={{
                                    borderBottomWidth : searchChoice === 'AW' ? 5 : 0,
                                    borderColor : secondaryColor,
                                    paddingVertical: 3,
                                    marginRight : 30,
                                    // backgroundColor : 'red',
                                    width : 80,
                                    alignItems : 'center',

                                }}
                                onPress={ () => SetsearchChoice('AW')}
                                hitSlop={20}>
                                <Text >All Wine</Text>
                            </Pressable>
                            
                            <Pressable style={{
                                    borderBottomWidth : searchChoice === 'MW' ? 4 : 0,
                                    borderColor : secondaryColor,
                                    paddingVertical: 3,
                                    // backgroundColor : 'red',
                                    width : 80,
                                    alignItems : 'center',

                                }}
                                onPress={ () => {
                                    // Setpassword('')
                                    // SetphoneNumber('')
                                    // SetMWverify('')
                                    SetsearchChoice('MW')
                                }}
                                hitSlop={20}>
                                <Text>MyWine</Text>
                            </Pressable>
            </View>
            <ScrollView style={{
              // backgroundColor : 'red',
              // paddingVertical : 30,
              flex : 1
            
              
            }}
            contentContainerStyle={{
              alignItems : 'center',
              // backgroundColor : 'red'
            }}>
                    {
                        searchChoice == 'AW' ?
                        <View style={{
                        width : '95%'}}>
                            {
                                search ?
                                    <>
                                        {
                                             allWine.filter( (item) => {
                                              if (search) {
                                                  return (
                                                    item.name.toLowerCase().startsWith(search.toLowerCase()) && item
                                                )
                                              }
                                              return item
                                              
                                            } )
                                            .map( (item) =>  {
                                                return(
                                                  <Pressable
                                                  key={item.id} style={{
                                                     alignItems : 'center'}}>
                                                    <View style={{
                                                    width : '100%',
                                                    flexDirection : 'row',
                                                    alignItems : 'center',
                                                    // justifyContent : 'space-between',
                                                    paddingVertical : 12,
                                                   
                                                    }}>
                                                        <Image 
                                                        source={wineImage}
                                                        style={{width : 60,
                                                                height : 100,
                                                                borderRadius : 5}}
                                                        resizeMode='stretch'
                                                        />
                                                        <View style={{paddingLeft : 15, flex : 1}}>
                                                            <Text style={{width : 'auto'}}>{item.name}</Text>
                                                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                                              {dot}
                                                              <Text style={{fontSize : fontSmall}}> {item.address}</Text>
                                                            </View>
                                                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                                              <Text style={{fontSize : fontSmallest, marginRight : 12}}>Average</Text>
                                                              <View>
                                                                  {
                                                                    rating(secondaryColor)
                                                                  }
                                                              </View>
                                                              <Text style={{fontSize : fontSmallest, marginLeft : 7}}>{item.rating}</Text>
                                                            </View>
                                                            
                                                        </View>
                                                    </View>
                                                    <View style={{height : 4, width : '120%',backgroundColor : iconColorTwo}}>
                                                    </View>
                                                  </Pressable>
                                                )
                                            } )
                                        }
                                    </>
                                    :
                                    <View style={{
                                      // backgroundColor : 'pink',
                                      maxWidth : 500,
                                      flex : 1,
                                      height : '100%',
                                      paddingBottom : 50,                            
                                    }}>
                                      <SearchHistory reload={reload} icon={ searchSmall } recentSearch = {recentSearch} resultPopular={resultPopular} func={Setsearch}/>
                                      < WineAds ads={ads} />

                                    </View>

                            }
                        </View>
                        :
                              <View style={{width : '100%',
                              alignItems : 'center',
                            }}>
                              {
                                myWine.map( (_item) => {
                                  return (
                                    <View
                                    style={{width : '100%', alignItems : 'center'}}
                                    key={_item.id}
                                    >
                                      <View style={{ width : '100%', flexDirection : 'row', marginBottom : 10, alignItems: 'center', backgroundColor : tetiaryColor3, paddingVertical : 7, paddingHorizontal : 20 }}>
                                          <Image
                                          source={ { uri : _item.avatar } }
                                          style={{height : 30, width : 30, borderRadius : 30}}
                                          resizeMode='cover'>

                                          </Image>
                                          <Text style={{color : '#fff', marginLeft : 10, fontSize : fontLarge}}>{_item.name} </Text>
                                      </View>

                                      {
                                          _item.wines.filter( (item) => {
                                            if (search) {
                                                return (
                                                  item.name.toLowerCase().startsWith(search.toLowerCase()) && item
                                              )
                                            }
                                            return item
                                            
                                          } )
                                          .map( (item) =>  {
                                              return(
                                                <Pressable style={{
                                                // backgroundColor : 'red',
                                                width : '95%',
                                                alignItems : 'center'
                                              }}
                                              onPress={ () => {
                                                navigationRef.navigate('WineInventory', { id : _item.id, type: _item.type, })
                                              } }
                                                key={item.id}
                                                  >
                                                  <View style={{width : '100%'}}>
                                                    <Text>{item.name} {item.vintage}</Text>
                                                  </View>
                                                  <View
                                                  style={{
                                                  width : '100%',
                                                  flexDirection : 'row',
                                                  alignItems : 'center',
                                                  paddingVertical : 12,                                           
                                                  }}>
                                                      
                                                      <Image 
                                                      source={ { uri : item.avatar } }
                                                      style={{width : 60,
                                                              height : 100,
                                                              borderRadius : 5}}
                                                      resizeMode='cover'
                                                      />
                                                    
                                                      <View style={{paddingLeft : 15, flex : 1}}>
                                            
                                                          <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                                            <Text style={{fontSize : fontSmall}}> {item.address}</Text>
                                                          </View>

                                                          <View style={{flexDirection : 'row', alignItems : 'center', marginVertical: 5}}>
                                                              <View style={{flexDirection : 'row', alignItems : 'center', flex : 1}}>
                                                                  {briefcase}
                                                                  <Text>  {item.case}</Text>
                                                              </View>
                                                              <View style={{flexDirection : 'row', alignItems : 'center', flex : 2}}>
                                                                  {bottleIcon}
                                                                  <Text>  {item.bottle}</Text>
                                                              </View>
                                                          </View>
                                                          <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                                            <Text style={{fontSize : fontSmallest, marginRight : 20}}>Average</Text>
                                                            <View>
                                                                {/* {
                                                                  rating(secondaryColor)
                                                                } */}
                                                                <Rating color={secondaryColor} size={fontSmallest} rate={item.average} gap={2} />
                                                            </View>
                                                            <Text style={{fontSize : fontSmallest, marginLeft : 7}}>{item.average}</Text>
                                                          </View>
                                                          <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 2}}>
                                                            <Text style={{fontSize : fontSmallest, marginRight : 13}}>My rating</Text>
                                                            <View>
                                                                {/* { 
                                                                  rating(tetiaryColor2)
                                                                } */}
                                                                <Rating color={tetiaryColor2} size={fontSmallest} rate={item.myrating} gap={2} />
                                                                
                                                            </View>
                                                            <Text style={{fontSize : fontSmallest, marginLeft : 7}}>{item.myrating}</Text>
                                                          </View>
                                                          
                                                      </View>
                                                  </View>
                                                
                                                  <View style={{height : 4, width : '120%', backgroundColor : iconColorTwo }}></View>
                                              </Pressable>
                                              )
                                          } )
                                          }
                                    </View>
                                  )
                                } )
                              }
   
                              </View>
            
                    }
                    
            </ScrollView>
      </ScrollView>
  )
}

export default SearchWine
