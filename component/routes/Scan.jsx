// import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { navigationRef } from '../RootNavigation';

const Scan = () => {

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     navigationRef.navigate('ScanImage', {redirect : true})

  //     return () => {
  //       // Do something when the screen is unfocused
        
  //     };
  //   }, [])
  // );

  return (
        <View
        style={{backgroundColor : '#eee'}}>

        </View>
  )
}

export default Scan
