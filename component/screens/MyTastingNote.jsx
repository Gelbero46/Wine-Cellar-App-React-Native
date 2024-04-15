import React from 'react'
import { SafeAreaView, View } from 'react-native'

import Header from '../Header'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const arrowBack = <FontAwesome5 name="arrow-left" size={25} color= '#eee' />;
const MyTastingNote = ( { navigation } ) => {
  return (
    <SafeAreaView>
        <View style={{backgroundColor : '#fff', flex : 1}}>
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
        </View>
    </SafeAreaView>
  )
}

export default MyTastingNote