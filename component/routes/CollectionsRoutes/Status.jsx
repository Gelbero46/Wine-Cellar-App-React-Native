import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const arrowRight = <MaterialIcons name="arrow-right-alt" size={30} color="#000" />;

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

const Status = ( { point, error } ) => {
  const [ color, Setcolor ] = useState( tetiaryColor1)
    // const point = point
  // if (error) {
  //   Setcolor(secondaryColor)
  // }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.spacing}>
            <Text style={{paddingVertical: 2, 
                        paddingHorizontal: 7, 
                        fontSize: fontSmallest,
                        backgroundColor: point >= 1 ? color : '#fff',
                        borderRadius: 10,
                        borderWidth: point >= 1 ? 0 : .5 
                        }}>1</Text>
        </View>
        <View style={styles.spacing}>
            {arrowRight}
        </View>
        <View style={styles.spacing} >
            <Text style={{paddingVertical: 2,
                        paddingHorizontal: 7, 
                        fontSize: fontSmallest,
                        backgroundColor: point >= 2 ? `${ error ? secondaryColor : color}` : '#fff',
                        borderRadius: 10,
                        borderWidth: point >= 2 ? 0 : .5
                        }}>2</Text>
        </View>
        <View style={styles.spacing}>
            {arrowRight}
        </View>
        <View style={styles.spacing}>
            <Text style={{paddingVertical: 2, 
                            paddingHorizontal: 7, 
                            fontSize: fontSmallest,
                            backgroundColor: point >= 3 ? color : '#fff',
                            borderRadius: 10,
                            borderWidth: point >= 3 ? 0 : .5
                              }}>3</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    spacing: {
        paddingRight: 4,
        alignItems: 'center',
        justifyContent: 'center'
      },
})

export default Status
