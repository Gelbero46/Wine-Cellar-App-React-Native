import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, Image, Pressable, TextInput, SafeAreaView,  Modal} from 'react-native'
import { navigationRef } from '../RootNavigation'

import Header from '../Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonDouble from '../ButtonDouble';
import { useFocusEffect } from '@react-navigation/native';
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

const arrowDown = <MaterialIcons name="arrow-drop-down" size={25} color="#000" />;
const arrowUp = <MaterialIcons name="arrow-drop-up" size={25} color="#000" />;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const UpdateWineContent3 = ({route}) => {
    const [ wineInfo, SetwineInfo ] = useState({})
    const [ wineName, SetwineName ] = useState('') 
    const [ origin, Setorigin ] = useState('')
    const [ cost, Setcost ] = useState('')
    const [ btlSize, SetbtlSize ] = useState('')

    // Add to arrow State
    const [ addToCellarArrow, SetaddToCellarArrow ] = useState(false)

    const [ year, Setyear ] = useState('')


    const [ sizePerBtlArrow,  SetsizePerBtlArrow ] = useState(false) 
    const [ sizePerBtl, SetsizePerBtl ] = useState(750)
    const [ sizePerBtlOptions, SetsizePerBtleOptions ] = useState( [750 , 500, 350] )
    
    const [ btlOrCaseArrow,  SetbtlOrCaseArrow ] = useState(false) 


    const [ bottleOrCase, SetbottleOrCase ] = useState('Btl')
    const [ btlCount, SetbtlCount ] = useState(1)
    const [ caseCount, SetcaseCount ] = useState(1)
    const [ addOrMinusCount, SetaddOrMinusCount ] = useState(1)


        // Number of bottles per case
        const [ btlPerCase, SetbtlPerCase ] = useState(4)
        const [ btlPerCaseOptions, SetbtlPerCaseOptions ] = useState( [4 , 6, 12] )
        const [ btlPerCaseArrow, SetbtlPerCaseArrow ] = useState(false)

    const { _image, _method } = route.params
    console.log(_method, "*******8")


    // Modals
    const [ displaySuccessfullyAddedModal, SetdisplaySuccessfullyAddedModal ] = useState(false)

    useFocusEffect(
      React.useCallback(() => {
        // Do something when the screen is focused
        async function fetchData() {
          const result = await Promise.resolve(
            {
              'id' : 1,
              'image' : _image ? _image : 'https://images.unsplash.com/photo-1592845148519-b0d41df97ac2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
              'recognized' : false
            },
    
          );

        if (result) {
            SetwineInfo(result);
        }
      }
  
      fetchData()
  
  
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
          SetwineName('')
          Setyear('')
          Setorigin('')
          SetbtlSize('')
          Setcost('')
          SetsizePerBtl()
          SetbtlPerCase()          
        };
      }, [])
    );
  

    console.log(wineInfo, '###')
    const confirmChanges = () => {
      console.log('method', _method)
      if ( _method.toLowerCase() == 'add' ) {
        console.log(wineName && origin && year && btlSize && cost && sizePerBtl)
        console.log(wineName, origin, year , btlSize, cost , sizePerBtl)
          if ( wineName && origin && year && btlSize && cost && sizePerBtl ) {
            SetdisplaySuccessfullyAddedModal(true)
          }
      }
      else {
        navigationRef.navigate('Notification')
      }
    
    }

  return (
    
    <SafeAreaView style={{
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
        {/* Successfull Added Modal */}
            <Modal
          visible={displaySuccessfullyAddedModal}
          transparent
          onRequestClose = {() => {
            SetdisplaySuccessfullyAddedModal(false)
            navigationRef.navigate('ScanImage')
          } }
          > 
            <View style={{flex: 1, 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          backgroundColor: '#00000099'
                          }}>
              <View 
                  style={[styles.form,
                          {width: '90%', backgroundColor: '#eee', borderRadius : 50}]}>

                  <Text style={{fontSize: fontLarge, color: iconColorOne, fontWeight : 'bold', letterSpacing: .75}}>Successfully Added!</Text>
                  <Text style={{padding: 10,marginTop: 15, letterSpacing: .5}}>
                        {wineName} {year}
                  </Text>
                  <Text style={{marginTop : 30}}>
                      {btlCount} btl has been added to "Home 2"
                  </Text>
                
                <View style={{marginBottom : 15, marginTop : 40}} >
                  <ButtonDouble
                    leftText = 'Scan another Wine'
                    rightText = 'My Cellar'
                    
                    leftTextonPress = { () => {
                      SetdisplaySuccessfullyAddedModal(false)
                      navigationRef.navigate('ScanImage')
                    }  }
                    rightTextonPress = {() => {
                      SetdisplaySuccessfullyAddedModal(false)
                      navigationRef.navigate('Home')
                    }  }
                    
                    colorPressed = {primaryColor}
                    colorNotPressed = {secondaryColor} 
                    textColor = '#fff'
                    paddingVertical = {10}
                    paddingHorizontal = {35}
                  />
                </View>
                
                  
              </View>

              
            </View>
              

          </Modal>
          
         <ScrollView
        style={{flex : 1,
                width : '100%',}}
          >           

            <View style={{width: '100%', marginVertical : 10, marginBottom : 20}}>
              
              <View style={{width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                <View style={{borderWidth : 1}}>
                  <Image
                  source={{ 'uri' : wineInfo.image}}
                  resizeMode = 'cover'
                  style={{
                    height : height * .3,
                    width : width* .5,
                    maxWidth : 400,

                  }}>
                    </Image>
                </View>
              </View>
              
              {
                _method && _method.toLowerCase() == 'add' ?
                <View style={{marginTop : 30, paddingHorizontal : 10}}>

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                      <Text style={{fontWeight : 'bold', width : 70}}>Wine Name</Text>
                        <TextInput
                          value={wineName}
                          onChangeText={SetwineName}
                          style={{flex : 1,  borderWidth : 1, borderColor : iconColorOne, marginTop : 3, borderRadius : 5, padding : 5}}>
                        </TextInput>
                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                      <Text style={{fontWeight : 'bold', width : 70}}>Region</Text>
                        <TextInput
                          value={origin}
                          onChangeText={Setorigin}
                          style={{flex : 1,  borderWidth : 1, borderColor : iconColorOne, marginTop : 3, borderRadius : 5, padding : 5}}>
                        </TextInput>
                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                      <Text style={{fontWeight : 'bold', width : 70}}>Year</Text>
                        <TextInput
                          value={year}
                          onChangeText={Setyear}
                          style={{flex : 1,  borderWidth : 1, borderColor : iconColorOne, marginTop : 3, borderRadius : 5, padding : 5}}>
                        </TextInput>

                        <Text style={{fontWeight : 'bold', width : 70, marginLeft : 20}}>Btl Size</Text>
                        <TextInput
                          value={btlSize}
                          onChangeText={SetbtlSize}
                          style={{flex : 1,  borderWidth : 1, borderColor : iconColorOne, marginTop : 3, borderRadius : 5, padding : 5}}>
                        </TextInput>
                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                      <Text style={{fontWeight : 'bold', flex : 1}}>My Cost</Text>
                        <TextInput
                          value={cost}
                          onChangeText={Setcost}
                          style={{flex : 3/2,  borderWidth : 1, borderColor : iconColorOne, marginTop : 3, borderRadius : 5, padding : 5}}>
                        </TextInput>

                        <Text style={{fontWeight : 'bold', flex : 1, textAlign : 'center'}}>HKD</Text>
                        
                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10, zIndex : 25}}>
                            <Text style={{fontWeight : 'bold', flex : 1}}>Size per btl</Text>

                            <View style={{flex : 3/2, alignItems : 'center', }}>
                              <Pressable style={{width : '100%', borderWidth : 1, borderRadius : 5, height : 30, paddingVertical : 2, maxWidth : 200, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                  hitSlop={20}
                                  onPress={ () => {
                                      SetsizePerBtlArrow(!sizePerBtlArrow)                                        }}>
                                      <Text style={{color : iconColorOne, fontWeight : 'bold'}}>{sizePerBtl}</Text>
                                      <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{sizePerBtlArrow ? arrowUp : arrowDown}</View>
                              </Pressable>
                              {
                                    sizePerBtlArrow && 
                                    <View style={{position : 'absolute', top : 30, width : '100%', alignItems : 'center', backgroundColor : iconColorTwo, borderRadius : 5,}}>
                                        {
                                            sizePerBtlOptions.map( (item) => {
                                                return (
                                                    <Pressable 
                                                    onPress={ () => {
                                                        SetsizePerBtl(item)
                                                        SetsizePerBtlArrow(!sizePerBtlArrow)
                                                        } }
                                                        style={ ({pressed}) => [
                                                            { alignItems : 'center',
                                                            width : '100%', paddingVertical : 2,
                                                            backgroundColor : pressed ? iconColorTwo : '#eee', borderRadius : 5

                                                          }
                                                        ] }
                                                        key={item}>
                                                        <Text style={{}}>{item}</Text>
                                                    </Pressable>
                                                )
                                            })
                                            }
                                    
                                    
                                    </View> 
                                    
                                }

                            </View>
                           

                            <Text style={{fontWeight : 'bold', flex : 1, textAlign : 'center'}}>ml</Text>                       
                    </View>

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 30, zIndex : 20,}}>
                        <Text style={{fontWeight : 'bold', flex : 1  }}>Add</Text>

                        <View style={{flex : 3/2, flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', height : 25, maxHeight : 50}}>   
                            <Pressable
                                onPress={ () => {
                                    SetaddOrMinusCount(addOrMinusCount + 1)
                                }}
                                style={ ({pressed}) => [
                                    {backgroundColor : pressed ? primaryColor: secondaryColor, borderRadius : 3, padding : 4}
                                ] }
                                
                                hitSlop={10}>
                                    {<FontAwesome5 name="plus" size={12} color='#fff' />}      

                            </Pressable>

                            <View style={{borderWidth : 1, borderRadius : 5, paddingVertical : 2, flex : 1, height : 30, marginHorizontal : 10, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}>
                                
                                    <Text style={{color : iconColorOne, fontWeight : 'bold'}}>
                                    {addOrMinusCount}
                                    </Text>
                    
                            </View>

                            <Pressable
                                onPress={ () => {
                                
                                    SetaddOrMinusCount(addOrMinusCount > 1 ? addOrMinusCount - 1 : addOrMinusCount)
                                }}
                                style={ ({pressed}) => [
                                    {backgroundColor : pressed ? primaryColor: secondaryColor, borderRadius : 3, padding : 4}
                                ] }
                                
                                hitSlop={10}>
                                    {<FontAwesome5 name="minus" size={12} color='#fff' />}      
                                    
                            </Pressable>
                        </View>
                        
                        <View style={{flex : 1, alignItems : 'center', height : 30, }}>
                            <View style={{flex : 1}}>
                                <Pressable style={{flexDirection : 'row', borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .18, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                    onPress={ () => {
                                        console.log('clicked')
                                        SetbtlOrCaseArrow(!btlOrCaseArrow)                                        
                                        }}>
                                        <Text style={{color : iconColorOne, fontWeight : 'bold', paddingLeft : 5}}>{bottleOrCase}</Text>
                                        <View style={{}}>{btlOrCaseArrow ? arrowUp : arrowDown}</View>
                                    
                                    
                                </Pressable>
                                {
                                    btlOrCaseArrow &&  
                                    <Pressable style={ ( { pressed } ) => [ {position : 'absolute', bottom : -25, paddingLeft : 5, height : 25, justifyContent : 'center', maxWidth : 150,  backgroundColor : pressed ? iconColorTwo : '#eee', borderRadius : 5, width : 'auto'}]}
                                    hitSlop={10}
                                    onPress={ () => {
                                        console.log('clicked.....')
                                    SetbottleOrCase(bottleOrCase.toLowerCase() == 'btl' ? 'Case' : 'Btl')
                                    SetbtlOrCaseArrow(!btlOrCaseArrow)
                                    } }>
                                        <Text style={{width : width * .17, maxWidth : 150}}>{bottleOrCase.toLowerCase() == 'btl' ? 'Case' : 'Btl'}</Text>
                                    </Pressable>
                                }
                            </View>
                        
                        </View>
                
                    </View>
                    
                    {
                        bottleOrCase.toLowerCase() == 'case' && 
                        <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10, zIndex : 15,}}>
                            <Text style={{fontWeight : 'bold', flex : 1,}}>Each case has</Text>

                            <View style={{flex : 3/2, alignItems : 'center', }}>
                                <Pressable style={{width : '100%', borderWidth : 1, borderRadius : 5, height : 30, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                    onPress={ () => {
                                        console.log("ooo")
                                        SetbtlPerCaseArrow(!btlPerCaseArrow)                                        }}>
                                        <Text style={{color : iconColorOne, fontWeight : 'bold'}}>{btlPerCase}</Text>
                                        <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{btlPerCaseArrow ? arrowUp : arrowDown}</View>
                                </Pressable>
                                {
                                    btlPerCaseArrow && 
                                    <View style={{position : 'absolute', top : 30, width : '100%', alignItems : 'center', backgroundColor : iconColorTwo, borderRadius : 5,}}>
                                        {
                                            btlPerCaseOptions.map( (item) => {
                                                return (
                                                    <Pressable 
                                                    onPress={ () => {
                                                        SetbtlPerCase(item)
                                                        SetbtlPerCaseArrow(!btlPerCaseArrow)
                                                        } }
                                                        style={ ({pressed}) => [
                                                            { alignItems : 'center',
                                                            width : '100%', paddingVertical : 2,
                                                            backgroundColor : pressed ? iconColorTwo : '#eee', borderRadius : 5

                                                          }
                                                        ] }
                                                        key={item}>
                                                        <Text style={{}}>{item}</Text>
                                                    </Pressable>
                                                )
                                            })
                                            }
                                    
                                    
                                    </View> 
                                    
                                }
                            </View>

                            <View style={{flex : 1, alignItems : 'center'}}>
                                <Text style={{fontWeight : 'bold'}}>Btl</Text>
                            </View>
                        
                    </View>
                        
                    }
                          

                    <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                        <Text style={{fontWeight : 'bold', flex : 1,}}>Add to</Text>

                            <Pressable style={{flex : 3/2, borderWidth : 1, borderRadius : 5, paddingVertical : 2, maxWidth : 200, borderColor : iconColorOne, alignItems : 'center', height : 35, justifyContent : 'center'}}
                                onPress={ () => {
                                    SetaddToCellarArrow(!addToCellarArrow)                                        }}>
                                    <Text style={{color : iconColorOne, fontWeight : 'bold'}}>Home 2</Text>
                                    <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{addToCellarArrow ? arrowUp : arrowDown}</View>
                            </Pressable>

                        <View style={{flex : 1, alignItems : 'center'}}>
                            <Text style={{fontWeight : 'bold'}}>Cellar</Text>
                        </View>
                        
                    </View>

                </View>
                :
                <View style={{marginTop : 30, paddingHorizontal : 7}}>
                    <View>
                        <Text>Wine Name</Text>
                        <TextInput
                          value={wineName}
                          onChangeText={SetwineName}
                          style={{width : '100%', borderWidth : 1, borderColor : iconColorOne, marginTop : 3, padding : 5}}>
                        </TextInput>
                    </View>
                    <View style={{marginTop : 20}}>
                        <Text>Origin</Text>
                        <TextInput
                          value={origin}
                          onChangeText={Setorigin}
                          style={{width : '100%', borderWidth : 1, borderColor : iconColorOne, marginTop : 3, padding : 5}}>
                        </TextInput>
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
                        <Text style={{marginLeft : 10}}>{wineInfo.shelf}</Text>
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
              }
            
            </View>
  
              
            
        </ScrollView>
        <View style={{alignwineInfos : 'center', marginVertical : 20, alignItems : 'center',}}>
                <Pressable style={ ({pressed}) => [
                  {backgroundColor : pressed ? primaryColor : secondaryColor, width : '70%', alignItems : 'center', padding : 7, borderRadius : 5, maxWidth : 300 }
                ]}
                onPress={confirmChanges}>
                    <Text style={{color : '#fff',}}>Confirm Change</Text>
                </Pressable>
          
          </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  form: {
    width: '95%',
    // alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 80,
    justifyContent: 'center',
    marginHorizontal: 15,
    paddingVertical: 30,
    paddingHorizontal: 15,
  }
})
export default UpdateWineContent3
