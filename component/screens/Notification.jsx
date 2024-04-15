import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { navigationRef } from '../RootNavigation'

import Header from '../Header';


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
const tertiaryColor3 = '#F24726'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';


const shelf = <FontAwesome5 name="database" size={17} color={primaryColor} />;
const plus = <FontAwesome5 name="plus" size={17} color='#000' />;
const minus = <FontAwesome5 name="minus" size={17} color='#000' />;
const question = <FontAwesome5 name="question" size={15} color='#fff' />;
const arrowBack = <FontAwesome5 name="arrow-left" size={25} color= '#eee' />;

const Notification = () => {
    const [ notifications, Setnotifications ] = useState([])
    useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;

      async function fetchData() {
      const result = await Promise.resolve([ 
        {
          'id' : 1,
          'image' : 'https://upload.wikimedia.org/wikipedia/commons/b/bb/White-lion.jpg',
          'name' : 'Home',
          'datetime' : '2022-04-30 14:40',
          'shelf' : 2,
          'added' : 2,
          'removed' : 1,
          'recognized' : false,
          'unrecognizedBtl' : 2,
        },
        {
          'id' : 2,
          'image' : 'https://upload.wikimedia.org/wikipedia/commons/b/bb/White-lion.jpg',
          'name' : 'Home',
          'datetime' : '2022-04-30 14:30',
          'shelf' : 3,
          'added' : 2,
          'removed' : 1,
          'recognized' : true
        }
      ]);

      // 👇️ only update state if component is mounted
      if (isMounted) {
          Setnotifications(result);
      }
      }

      fetchData();

      return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false;
      };
    }, []);

  return (
    <View style={{
        backgroundColor : '#fff',
        flex : 1
      
    }}>
        <Header 
        title= 'Notification' 
        icon =  {arrowBack}
        iconFunc = { () => {
          navigationRef.goBack()
      } }
        // subtitle = 'Hello'
        color = '#fff' 
        backgroundColor = {primaryColor} 
        titleFontSize = {fontLarge} 
        subtitleFunc = { () => {
            console.log('fucker')
        } }
        />
        <ScrollView
          style={{flex : 1,
                  width : '100%'}}
            >
            <View
              style={{width : '100%', marginTop : 10, borderBottomWidth : 2, borderTopWidth : 2, borderColor : iconColorTwo}}>
               {
                  notifications &&
                  notifications.map( (item) => {
                    return (
                      <View key={item.id}
                        style={{paddingHorizontal : 10, borderBottomWidth : 3,
                                paddingVertical : 10,
                                borderTopWidth : 3,
                                borderColor : !item.recognized ? tertiaryColor3 : iconColorTwo,
                                borderLeftWidth : !item.recognized ? 3 : 0,
                                borderRightWidth : !item.recognized ? 3 : 0,
                                }}>
                          <View style={{flexDirection: 'row', alignItems : 'center', width : '100%'}}>
                            <Image
                                source={{ 'uri' : item.image }}
                                style={{width : 50, height : 50, borderRadius : 50}}>

                            </Image>
                            <Text style={{marginLeft : 10, fontSize : fontMedium}}>{item.name}</Text>
                            <View style={{flex : 1, alignItems : 'flex-end'}}>
                                <Text>{item.datetime}</Text>
                            </View>
                          </View>
                          <View style={{marginTop : 10, flexDirection : 'row', alignItems : 'center'}}>
                              {shelf}
                              <View style={{flexDirection : 'row', marginLeft : 5, alignItems : 'center'}}>
                                <Text>Shelf </Text>
                                <Text style={{color : primaryColor}}>{item.shelf}</Text>
                              </View>
                          </View>

                          <View style={{marginLeft : 20,}}>
                            <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 5}}>
                                {
                                item.added &&
                                <View style={{flexDirection : 'row', 'alignItems' : 'center'}}>
                                    {plus}
                                    <Text style={{marginLeft : 5, fontWeight : 'bold',}}>{item.added} Bottle</Text>
                                </View>
                                }

                                {
                                  !item.recognized &&
                                  <>
                                  <View style={{flexDirection : 'row', alignItems : 'center', marginLeft : 'auto'}}>
                                      <Pressable
                                      style={ ({pressed}) =>
                                          [
                                            {backgroundColor : pressed ? secondaryColor : tertiaryColor3, padding: 2, paddingHorizontal: 4.5, borderRadius : 10}
                                          ]
                                      }>
                                          {question}
                                      </Pressable>
                                      <Text style={{color : primaryColor}}> Not recognized</Text>
                                  </View>
                                
                                <Text style={{fontWeight : 'bold', marginLeft : 10}}>{item.unrecognizedBtl} Btl</Text>
                                </>
                              }
                            </View>
                            {
                                  item.removed &&
                                  <View style={{flexDirection : 'row', 'alignItems' : 'center', marginTop : 5, }}>
                                      {minus}
                                      <Text style={{marginLeft : 5, fontWeight : 'bold'}}>{item.removed} Bottle</Text>
                                  </View>
                            }
                          </View>
                          <Pressable
                          onPress={ () => {
                            navigationRef.navigate('Notification2', {title : `${item.name} - Shelf ${item.shelf}`,
                                                                      datetime : item.datetime})
                          }}
                          style={ ({pressed}) => [
                            {backgroundColor : pressed ? secondaryColor : '#fff',
                              borderWidth : pressed ? 0 : 1,
                              borderColor : tertiaryColor3,
                            paddingVertical: 5,
                          alignItems : 'center'}
                          ] }>
                              <Text style={{color : tertiaryColor3}}>View Changes</Text>
                          </Pressable>
                       
                      </View>
                    )
                  })
               }
            </View>
        </ScrollView>
    </View>
  )
}

export default Notification
