import React, { useEffect, useState } from 'react'
import { SafeAreaView, Alert, ScrollView, TextInput, View, Text, StyleSheet } from 'react-native'
import Header from '../Header'
import ButtonSingle from "../routes/CollectionsRoutes/ButtonSingle"
import AlertMsg from '../AlertMsg'
import { navigationRef } from '../RootNavigation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useDispatch } from 'react-redux'
import { addNote } from '../../redux/wineInventorySlice'

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



const AddTastingNote = ( { navigation, route } ) => {
  const dispatch = useDispatch();
  const { id, note } = route.params
  const [ wineId, SetwineId ] = useState(id)

  const [ title, Settitle ] = useState('')
  const [ text, Settext ] = useState('')

  useEffect(() => {
    SetwineId(id)
    console.log( "AddTastingNote******",id)

    // Specify how to clean up after this effect:
    return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions 
        // navigation.setParams( { current : 'my cellar' } )  
    };
  }, [ id ]);

  const log = () => {
    console.log(note, "Okayy", id, "Add Note **********************************")
    var currentDate = new Date()
    if ( title && text ) {
      
      const newNote= [{
        'id' : currentDate.getDate() + note.length,
        'date' : `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
        'title' : title,
        'text' : text
      }]

      dispatch(addNote(newNote))
      console.log('Saved')
      console.log(newNote, "NEWnOTE******")

      navigation.goBack()
      return 0
    }
    else {
      AlertMsg( { title : 'Invalid Entry', message: 'Please enter a Valid Input' } )
      return 1
    }

    
   

  }


  
  return (
    <SafeAreaView style={{flex : 1}}>
   
      <Header 
      title= 'Add a Tasting Note' 
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
      
      <View
        style={{flex : 1, width : '100%', marginVertical : 20}}
      >
      
        <View style={{flex : 1, padding : 5, paddingVertical : 20, borderTopWidth : 3, borderBottomWidth : 3, borderColor : iconColorTwo}}>

            <TextInput 
                    onChangeText={Settitle}
                    value={title}
                    borderRadius= {4}
                    fontSize = {fontSmall}
                    style={ styles.textInput }
                    placeholder='Title'
            />
            <TextInput 
                    onChangeText={Settext}
                    value={text}
                    borderRadius= {4}
                    fontSize = {fontSmall}
                    multiline={true}
                    textAlignVertical='top'
                    style={[ styles.textInput, {flex : 1, marginTop : 20, padding : 7} ]}
                    placeholder='Note'
            />
            
        </View>
        <View style={{marginTop : 40}}>
          < ButtonSingle
              name = 'Save' 
              fontSize={fontMedium}
              fontColor='#fff'
              backgroundColor = {secondaryColor} 
              backgroundColorPressed = {primaryColor}
              borderRadius = {5} 
              paddingVertical = {5} 
              paddingHorizontal = {50}
              func = { () => {
                // AlertMsg( { title : 'Save', message : 'Do you want to Save', func : log  } )
                log()
              } }

          />
        </View>
      
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  textInput: {
    paddingLeft: 10, height : 40, fontSize: fontSmall, borderRadius : 5, borderColor : '#777', borderWidth: 1
  },
})
export default AddTastingNote