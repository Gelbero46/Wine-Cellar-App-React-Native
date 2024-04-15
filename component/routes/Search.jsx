import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { navigationRef } from '../../component/RootNavigation'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10


import SearchHome from './SearchRoutes/SearchHome';
import SearchWine from './SearchRoutes/SearchWine';

export default function Search() {
  return (
        <Stack.Navigator
          initialRouteName='SearchHome'>

            <Stack.Screen 
            name='SearchHome'
            component={SearchHome}
            options = {{
              headerShown: false
            }}
            />

            <Stack.Screen 
            name='SearchWine'
            component={SearchWine}
            options = {{
              headerShown: false
            }}
            initialParams={{ searchText : ''}}

            />

        </Stack.Navigator>

  );
}


