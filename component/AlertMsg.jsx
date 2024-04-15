import React from 'react'
import { View, Alert, } from 'react-native'

const AlertMsg = ({ title, message, func} ) => {
    return (
      Alert.alert(
        title,
        message,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => func ? func : console.log("OK Pressed") }
        ]
      )
    )
    
  }

export default AlertMsg