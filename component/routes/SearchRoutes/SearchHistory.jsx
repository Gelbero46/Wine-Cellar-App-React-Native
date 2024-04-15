import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { navigationRef } from '../../RootNavigation'

const SearchHistory = ( { reload, icon,  recentSearch, resultPopular, func } ) => {

    const [ currentSearch, SetcurrentSearch ] = useState('PS')
  return (
    <>
        <View style={{
            flexDirection : 'row',
            alignItems : 'center'
        }}>
            <Pressable
            onPress={() => SetcurrentSearch('PS')}>
                <Text
                style={{color  : `${currentSearch == 'PS' ? '#000' : '#555'}`}}
                >Popular Search </Text>
            </Pressable>
            
            <Text style={{
                marginHorizontal : 4
            }}>|</Text>
            
            <Pressable hitSlop={20} style={{flexDirection : 'row', alignItems : 'center'}}
                onPress={() => SetcurrentSearch('RS')}
                >
                <Text style={{marginRight : 2,
                color  : `${currentSearch == 'RS' ? '#000' : '#555'}`}}>Recent Search</Text>
                {reload}
            </Pressable>

        </View>

        <View>
            { currentSearch == 'RS' ?
                recentSearch.map( (item, index) => {
                return (
                    <Pressable 
                    key={index} 
                    hitSlop={5}
                    onPress= { () => (
                        func ? func(item) :
                         navigationRef.navigate('SearchWine', { searchText : item } )
                 ) }
                    style={{flexDirection : 'row',
                    alignItems : 'center',
                    marginTop : 6
                    }}>
                        {icon}
                    
                    
                        <Text style={{marginLeft : 3}}>{item}</Text>
                    </Pressable>
                )
                } ) : 
                resultPopular.map( (item, index) => {
                return (
                    <Pressable 
                    key={index}
                    hitSlop={5}
                    onPress= { () => (
                        func ? func(item) :
                         navigationRef.navigate('SearchWine', { searchText : item } )
                 ) }
                        style={{flexDirection : 'row',
                    alignItems : 'center',
                    marginTop : 6
                    }}>
                        {icon}
                    
                    
                        <Text style={{marginLeft : 3}}>{item}</Text>
                    </Pressable>
                )
                } )
            }
        </View>
    </>
  )
}

export default SearchHistory