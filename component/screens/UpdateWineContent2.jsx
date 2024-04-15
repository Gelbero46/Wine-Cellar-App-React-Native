import React, { useState, useEffect } from 'react'
import {View, Text, Dimensions, StyleSheet, ScrollView, Image, Pressable, TextInput} from 'react-native'
import { navigationRef } from '../RootNavigation'

import Header from '../Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

const arrowBack = <FontAwesome5 name="arrow-left" size={25} color= '#eee' />;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const UpdateWineContent2 = ({route}) => {
    const [ wineInfo, SetwineInfo ] = useState([])
    const [ searched, Setsearched ] = useState('')
    const [ year, Setyear ] = useState('')
    const [ btlSize, SetbtlSize ] = useState('')
    const [ cost, Setcost ] = useState('')


    useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;

      async function fetchData() {
      const result = await Promise.resolve([ 
        {
          'id' : 1,
          'image' : 'https://images.unsplash.com/photo-1592845148519-b0d41df97ac2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
          'wineName' : 'Chateau Lynch-Moussas 5eme Cru Classe, Pauillac',
          'vintage' : '1996',
          'origin' : 'Bordeaux Saint-Emillion, France',
          'btlSize' : '750',
          'shelf' : '3',
          'myCost' : '9,462'
        },

      ]);

      // 👇️ only update state if component is mounted
      if (isMounted) {
          SetwineInfo(result);
          Setyear(result[0].vintage)
          SetbtlSize(result[0].btlSize)
          Setcost(result[0].myCost)
      }
      }

      fetchData();

      return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false;
      };
    }, []);

    const confirmChanges = () => {
      navigationRef.navigate('Notification')
    }
  return (
    
    <View style={{
        backgroundColor : '#fff',
        flex : 1
    }}>
        <Header 
        title= 'Update Wine Content'
        icon =  {arrowBack}
        iconFunc = { () => {
          navigationRef.goBack()
        } }
        color = '#fff' 
        backgroundColor = {primaryColor} 
        titleFontSize = {fontLarge} 
        />
           <ScrollView
          style={{flex : 1,
                  width : '100%',}}
            >           
                {
                  wineInfo &&
                  wineInfo.map( (item) => {
                   
                    return (
                      <View key={item.id} style={{width: '100%', paddingHorizontal : 7, marginVertical : 10}}>
                        
                        <View style={{width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                          <View style={{borderWidth : 1}}>
                            <Image
                            source={{ 'uri' : item.image}}
                            resizeMode = 'contain'
                            style={{
                              height : height * .3,
                              width : width* .5,
                              maxWidth : 400,
                              borderWidth : 1,

                            }}>
                              </Image>
                          </View>
                          <Text style={{width : '50%', marginTop : 10, textAlign : 'center', fontSize : fontMedium}}>{item.wineName}</Text>
                        </View>

                        <View style={{marginTop : 30}}>
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <Text>Origin</Text>
                                <Text>{item.origin}</Text>
                            </View>
                            <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 20}}>
                                <Text>Year</Text>
                                <View style={{borderWidth : 1, borderColor : iconColorTwo,  marginLeft : 10, paddingRight : 20}}>         
                                    <TextInput 
                                      style={{padding : 7}}
                                      onChangeText={
                                        (value) => {
                                          Setyear(value)
                                        }
                                      }
                                      value={year}
                                    ></TextInput>
                                </View>

                                <Text style={{marginLeft : 'auto'}}>Btl Size</Text>
                                <View style={{borderWidth : 1, borderColor : iconColorTwo, marginLeft : 10,}}>         
                                    <TextInput 
                                      style={{padding : 7, paddingRight : 20, width : 70}}
                                      onChangeText={
                                        (value) => {
                                          SetbtlSize(value)
                                        }
                                      }
                                      value={`${btlSize} ml`}
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 20}}>
                                <Text>Shelf</Text>
                                <Text style={{marginLeft : 10}}>{item.shelf}</Text>
                                <Text style={{marginLeft : 'auto'}}>Btl Size</Text>
                                <View style={{borderWidth : 1, borderColor : iconColorTwo, marginLeft : 10,}}>         
                                    <TextInput 
                                      style={{padding : 7, paddingRight : 20, width : 70}}
                                      onChangeText={
                                        (value) => {
                                          Setcost(value)
                                        }
                                      }
                                      value={cost}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                      </View>
                    )
                  } )
                }
                
              
          </ScrollView>
          <View style={{alignItems : 'center', marginVertical : 20,}}>
                  <Pressable style={ ({pressed}) => [
                    {backgroundColor : pressed ? primaryColor : secondaryColor, width : '70%', alignItems : 'center', padding : 7, borderRadius : 5, maxWidth : 300 }
                  ]}
                  onPress={confirmChanges}>
                      <Text style={{color : '#fff'}}>Confirm Change</Text>
                  </Pressable>
            
            </View>
    </View>
  )
}

export default UpdateWineContent2
