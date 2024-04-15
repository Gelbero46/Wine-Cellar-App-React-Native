import React from 'react'
import { Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

const Rating = ({color, size, rate, gap}) => {
    const evl = (rate) => {
        if (rate / 2) {
            if (rate <= 5) {
                var _rate = Math.trunc(rate)
                // console.log(_rate)
                var times = []
                for (var i = 0; i < _rate ; i++) {
                    times.push('full')
                }
                if (!Number.isInteger(rate)) {
                    times.push('half')
                }
                // console.log(times)
                var empty = 5 - times.length
                for (var i = 0; i < empty ; i++) {
                    times.push('empty')
                }
                // console.log(times)
               
                return (
                    <Text style={{flexDirection : 'row', alignItems : 'center' }}>
                        {
                            times.map( (item, index) => {
                                // console.log(item)
                            return (
                                <View style={{paddingHorizontal : gap ? gap : 0}} key={index}>
                                    {
                                         item =='full' &&
                                         <Ionicons name="md-star-sharp" size={size ? size : 12} color= {color ? color : '#000'} />
                                    }
                                    {
                                           item =='half' &&
                                           <Ionicons name="md-star-half-sharp" size={size ? size : 12} color= {color ? color : '#000'} />
                                    }
                                    {   
                                            item =='empty' &&
                                            <Ionicons name="star-outline" size={size  ? size - size / 10 : 11} color= {color ? color : '#000'} />

                                    }
                                </View>
                               
                            )
                        })
                        }
                        
                    </Text>
                 
                )
               
            }

        }
    }
    return (
        <View>
            {evl(rate)}
        </View>
        // <Text style={{flexDirection : 'row'}}>
        //   <Ionicons name="md-star-sharp" size={12} color= {color} />
        //   <Ionicons name="md-star-sharp" size={12} color= {color} />
        //   <Ionicons name="md-star-sharp" size={12} color= {color} />
        //   <Ionicons name="md-star-sharp" size={12} color= {color} />
        //   <Ionicons name="md-star-half-sharp" size={12} color= {color} />
        // </Text>
      )
}

export default Rating