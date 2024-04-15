import React, { useState } from 'react'
import { Modal, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-web'
import ButtonDouble from './ButtonDouble'

import { navigationRef } from './RootNavigation'

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
const AlertModal = ( { title, 
                        text, 
                        leftButtonText, 
                        rightButtonText,
                        leftTextonPress,
                        rightTextonPress,
                        colorPressed,
                        colorNotPressed,
                        textColor,
                        paddingVertical,
                        paddingHorizontal,
                        modalState, 
                        SetmodalState
                       } ) => {
                        
                        
    const [ alertModal, SetalertModal ] = useState(modalState)

  return (
    <Modal
    visible={true}
    transparent
    onRequestClose = {() => SetmodalState(false)}
    > 
      <View style={{flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#00000099'
                    }}>
        <View 
            style={[styles.form,
                    {width: '90%', backgroundColor: '#eee', borderRadius : 50}]}>
            <Text style={{fontSize: fontLarge, color: primaryColor, letterSpacing: .75, marginBottom : 70}}>{title}</Text>
            
            {
                text && 
                <Text style={{padding: 10,marginTop: 15, marginBottom: 40, letterSpacing: .5}}>Once you unbind the cellar, you may not reconnet the AI cellar with this cellar list.
                    {text}
                </Text>
            }
          <ButtonDouble
           leftText = { leftButtonText ? leftButtonText :'Confirm' }
            rightText = { rightButtonText ? rightButtonText : 'Cancel' }
           
            leftTextonPress = { leftTextonPress && leftTextonPress 
            //     async() => {
            //   await SetalertModal(false)
            //   BackHandler.exitApp()
            // } 
        }
            rightTextonPress = { rightTextonPress && rightTextonPress
                // () => SetalertModal(false)
            }
            
            colorPressed = { colorPressed ? colorPressed : primaryColor}
            colorNotPressed = { colorNotPressed ? colorNotPressed : secondaryColor} 
            textColor = { textColor ? textColor : '#fff'}
            paddingVertical = { paddingVertical ? paddingVertical : 10}
            paddingHorizontal = { paddingHorizontal ? paddingHorizontal : 35}
          />
            
        </View>

        
      </View>
        

    </Modal>
  )
}


const styles = StyleSheet.create ({
    form: {
      width: '95%',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 80,
      justifyContent: 'center',
      marginHorizontal: 15,
      paddingVertical: 30,
      paddingHorizontal: 15,
    }
});
export default AlertModal