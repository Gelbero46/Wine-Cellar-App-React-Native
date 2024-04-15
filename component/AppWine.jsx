import * as React from 'react';
import { Text, StyleSheet, View, Button, Alert, Pressable, Image } from 'react-native';
import { Card, Appbar ,Title,Paragraph, Badge } from 'react-native-paper';
import { NavigationContainer, useNavigationContainerRef  } from '@react-navigation/native'
// import {createBottomNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


import Collection from './routes/Collection';
import Search from './routes/Search';
import Discover from './routes/Discover';
import Profile from './routes/Profile';
import Scan from './routes/Scan';

import ScanImage from './screens/ScanImage';


// import BottomNav from './AppComponents/BottomNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIconscon from 'react-native-vector-icons/MaterialCommunityIcons';

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const iconColorOne = '#808080'

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

const bell = <FontAwesome name="bell" size={25} color= '#FFD64A' />;

import { navigationRef } from './RootNavigation'
import * as RootNavigation from './RootNavigation'

const AppWine = () => {
  const onPressFunction = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )
  }
  // const navigationRef = useNavigationContainerRef()
  const [primarycolor, setPrimaryColor] = React.useState('#DA0063')
  const myButton = (
    <MaterialCommunityIconscon.Button
      name="qrcode-scan"
      color= '#eee'
      borderRadius={40}
      paddingLeft= {20}
      paddingRight = {10}
      paddingVertical = {20}
      backgroundColor= {primarycolor}
      size = {30}
      onPress = {() => {
        RootNavigation.navigate('ScanImage')
      }}
      // onPress = {onPressFunction}
    >
    </MaterialCommunityIconscon.Button>
  );
  return (
    <>


      {/* <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon={Icon}
          // <Pressable></Pressable>
          // onPress={() => navigation.openDrawer()}

          size={23}
        />
        <Appbar.Content title="My Cellar" />
        <Appbar.Action
          icon= 'bell'
          
          // onPress={() => navigation.openDrawer()}
          size={25}
          color= '#FFD64A'
        />
      </Appbar.Header> */}

      {/* <NavigationContainer ref={ navigationRef }> */}
          <Tab.Navigator
            initialRouteName='Collections'
            barStyle = {{'backgroundColor': '#F9FAFC'}} 
            backBehavior='history'
            inactiveColor='#999'
            activeColor = "#DA0063"
            shifting={false}
            labeled={true}
            screenOptions={({route}) => ({
              tabBarIcon: ({ focused, size, color}) => {
                let iconName;
                if (route.name === 'Collection') {
                  iconName = 'ios-briefcase';
                  size = focused ? 25 : 20;
                }
                else if (route.name === 'Search') {
                  iconName = 'search-outline';
                  size = focused ? 25 : 20;
                }
                else if (route.name === 'Scan') {
                  iconName = '';
                }
                else if (route.name === 'Discover') {
                  iconName = 'navigate';
                  size = focused ? 25 : 20;
                }
                else if (route.name === 'Profile') {
                  iconName = 'ios-person';
                  size = focused ? 25 : 20;
                }

                return (
                  <Ionicons 
                      name = {iconName} 
                      // size={focused ? 25: 20} 
                      size={size}
                      color= {color} />
                )
              }
            })}>
              <Tab.Screen 
                name = "Collection"
                component={Collection}
                initialParams={{ _myWineList: [], _current : 'my cellar' }}
                // options={{
                //   tabBarLabel: 'Updates',
                //   tabBarIcon: ({ color }) => (
                //     <Ionicons name="arrow-forward" color= 'blue' size={26} />
                //   ),
                // }}
                />


              <Tab.Screen 
                name = "Search"
                
                component={Search}
                />

              
              <Tab.Screen 
                name = "Scan"
                // options = {}
                component={Scan}
                />
              
              <Tab.Screen 
                name = "Discover"
                // options = {}
                component={Discover}/>

              <Tab.Screen 
                name = "Profile"
                options = {{
                  headerShown: false
                }}
                component={Profile}/>


          </Tab.Navigator>
          <Pressable style={{position: 'absolute', left: 0, right: 0, bottom: 20, alignItems: 'center'}}
            >
            {myButton}
          </Pressable>

      {/* </NavigationContainer> */}

      {/* <BottomNav /> */}
    </>
  );
};
const styles = StyleSheet.create({
  title:{
    margin: 10,
    fontSize: 15,
    textAlign:'center',
    fontSize: 35
  },
  notification: {
    color: '#FFD64A'
  },
});
export default AppWine;