import React from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'



var width = Dimensions.get('window').width * 0.45; //full width
var height = Dimensions.get('window').height; //full height

const WineAds = ( { ads } ) => {
  return (
    <View style={{flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap'
        }}>
          {
            ads.map( (item) => {
              return (
                <ImageBackground
                key={item.id}
                  source={{ uri : item.backgroundimage}}
                  style={{height : 100,
                    marginTop : 60,
                          justifyContent : 'flex-start',
                        // paddingLeft : 5,
                        marginHorizontal : 5,
                        minWidth : 150,
                        maxWidth : width,
                        flexDirection : 'row',
                        padding : 5,
                        flex : 1
                    }}
                  resizeMode='cover'>
                    
                    
                    <Text style={{color : '#fff', alignSelf : 'flex-end',}}>{item.name}</Text>
                    <Image 
                    source={ { uri : item.wineimage ? item.wineimage : 'https://www.seekpng.com/png/detail/935-9350244_free-png-download-red-wine-bottle-png-images.png' } }
                    style={{
                      width : 50,
                      height : 120,
                      // backgroundColor : 'blue',
                      position : 'absolute',
                      right : 0,
                      bottom : -40
                    }}
                    resizeMode='contain'
                    />
                </ImageBackground>
              )
            } )
          }
        
        </View>
  )
}

export default WineAds