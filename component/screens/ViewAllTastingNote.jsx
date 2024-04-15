import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { deleteNote } from '../../redux/wineInventorySlice'

import Header from '../Header'
import ButtonSingle from "../routes/CollectionsRoutes/ButtonSingle"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { navigationRef } from '../RootNavigation';


const arrowBack = <FontAwesome5 name="arrow-left" size={25} color= '#eee' />;

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#fbc700'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10


const ViewAllTastingNote = ( { navigation, route } ) => {

    const dispatch = useDispatch();
    const { id, note } = route.params

    const [ tastingNote, SettastingNote ] = useState(note)
    const [ wineId, SetwineId ] = useState(id)

    const [ load, Setload] = useState(false);
    
    useEffect(() => {
        SettastingNote(note)
        SetwineId(id)
        console.log("View Tasting Notes********************************************", id, note)

        // Specify how to clean up after this effect:
        // return () => {
        //     // Do something when the screen is unfocused
        //     // Useful for cleanup functions
        //     // navigation.setParams( { current : 'my cellar' } )  
        // };
    }, []);

    useEffect( () => {
        console.log("Hello")
    }, [false] )

    const DeleteNote = ( { id } ) => {
        console.log(id, "***********")
        if (tastingNote) {
            SettastingNote (
                tastingNote.filter( ( note ) => note.id !== id )
              )
              dispatch(deleteNote(id))

        } 
      
    }
  return (
    <SafeAreaView style={{flex : 1}}>
   
        <Header 
        title= 'My Tasting Notes' 
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
          style={{flex : 1}}
          contentContainerStyle={{flex : 1}}
        >

        <View style={{marginTop : 15}}>
            {
                tastingNote && tastingNote.length != 0 ?
                tastingNote.map( ( item ) => {
                    return (
                        <View key={item.id}  style={{
                            borderTopWidth : 2,
                            borderBottomWidth : 2,
                            borderColor : iconColorTwo,
                            padding : 10
                        }}>
                            <Text style={{fontWeight : 'bold', fontSize : fontLarge}} >{item.title}</Text>
                            <Text style={{marginTop : 7, fontSize : fontMedium}}>{item.text}</Text>
                            <View style={{marginTop : 7, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                                <Text>{item.date}</Text>
                               <Pressable
                               onPress={ () => DeleteNote( { id : item.id } ) }
                               style={ ({pressed}) => [
                                {
                                    backgroundColor : pressed ? primaryColor : secondaryColor,
                                    padding : 5,
                                    paddingHorizontal : 10,
                                    borderRadius : 5
                                }
                               ] }
                               >
                        

                                    <Text style={{color : '#fff', fontWeight : 'bold'}}>Delete</Text>
                               </Pressable>
                            </View>
                        </View>
                    )
                } )
                :
                <View style={{width : '100%', alignItems : 'center'}}>
                    <Text style = {{fontSize : fontLarge}}> No Notes </Text>
                </View>
                // <Pressable
                // onPress={ () => {
                //     navigationRef.navigate('AddTastingNote', { id : wineId ? wineId : null })
                // }}
                // sty>
                //     <Text> Add a Tasting Note </Text>
                // </Pressable>
            }

        </View>
        <View style={{width : '100%', flex : 1, alignItems : 'center', justifyContent : 'center'}}>
            <ButtonSingle
            name='Add Note'
            fontSize={fontMedium}
            backgroundColor = {secondaryColor}
            backgroundColorPressed = {primaryColor}
            borderRadius = {5}
            paddingVertical = {10}
            paddingHorizontal = {10}
            func = { () => {
                navigationRef.navigate('AddTastingNote', { id : wineId ? wineId : null , note : note})
            } }

            />
            {/* <Pressable
                    onPress={ () => {
                        navigationRef.navigate('AddTastingNote', { id : wineId ? wineId : null })
                    }}
                    style={ ({pressed}) => [
                        {backgroundColor : pressed ? primaryColor : secondaryColor}
                    ] }>
                        <Text> Add Note </Text>
            </Pressable> */}
        </View>
     

        </ScrollView>

</SafeAreaView>
  )
}

export default ViewAllTastingNote