import React, { useState } from 'react'
import { Text, View, Pressable, ImageBackground, StatusBar } from 'react-native';

import { navigationRef } from './RootNavigation'



const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10
const regular = 15

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#fbc700'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'

const Header = ({title, icon, subtitle, color, backgroundColor, titleFontSize, subtitleFontSize, iconFunc, subtitleFunc, paddingV, borderR}) => {
    const [hidden, setHidden] = useState(false);
    // const changeStatusBarVisibility = () => setHidden(!hidden);
    // console.log('borderR', borderR)
    return (
    <>
        {/* <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle='default'
        translucent = {true}
        showHideTransition='slide'
        hidden={hidden} /> */}
        <View style={{
            backgroundColor : primaryColor,
            height : 30,
            width : '100%',
        }}></View>

        <Pressable
        onPress={ () => {
            // setHidden(!hidden)
        }}
         style={{ alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor : backgroundColor ? backgroundColor : primaryColor ,
        borderBottomLeftRadius: borderR ? borderR : 10,
        borderBottomRightRadius: borderR ? borderR : 10,
        borderBottomLeftRadius: borderR == 0 ? borderR : 10,
        borderBottomRightRadius: borderR == 0 ? borderR : 10,

        paddingVertical : paddingV ? paddingV : 15,
        paddingBottom : 15,
        }}>


            <View style={{flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal : 10,
                // flexWrap : 'wrap'
                }}>

                {
                    
                    icon && 
                    <Pressable
                    hitSlop={25}
                    onPress={ () => {
                        console.log('back')
                        iconFunc && iconFunc()
                    }}
                    style={{marginRight : 20}}
                    >
                        {icon}
                    </Pressable>
                    
                }
            

                <Text style={{color: color ? color : '#fff', fontWeight: '500', fontSize: titleFontSize ? titleFontSize : fontLarge, marginLeft : 10}}>{title}</Text>



                {
                    subtitle &&
                    <View style={{flex : 1, alignItems: 'flex-end', justifyContent : 'center', marginLeft : 10,}}>
                        <Pressable style={ ({pressed}) => [{
                        marginLeft : 'auto',
                        backgroundColor : pressed ? secondaryColor : backgroundColor
                        }]}
                        onPress={() => {
                        console.log('Hello')
                        subtitleFunc()
                        }}
                        hitSlop={20}>
                            <Text style={{fontSize: subtitleFontSize ? subtitleFontSize : fontSmall, color: color ? color : '#fff'}}>{subtitle}</Text>
                        </Pressable>
                    </View>
                    

                }
                
                
            </View> 
        </Pressable>
    </>
  )
}

export default Header