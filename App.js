import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer, useNavigationContainerRef  } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import { Provider } from 'react-redux'
// import { Store } from './component/redux/Store';
import { store } from './redux/store';

const Stack = createStackNavigator();
import { navigationRef } from './component/RootNavigation'

import ConnectToWifi1 from "./component/routes/CollectionsRoutes/ConnectToWifi1"
import ConnectToWifi2 from './component/routes/CollectionsRoutes/ConnectToWifi2.jsx';
import ConnectToWifi3 from './component/routes/CollectionsRoutes/ConnectToWifi3';
import ConnectToWifi4 from './component/routes/CollectionsRoutes/ConnectToWifi4';
import AppWine from "./component/AppWine"

import Start from './component/screens/Start';
import Login from './component/screens/Login';
import Register from './component/screens/Register'
import ForgotPassword from './component/screens/ForgotPassword';
import Notification from './component/screens/Notification';
import Notification2 from './component/screens/Notification2';
import WineInventory from './component/screens/WineInventory';
import UpdateWineContent1 from './component/screens/UpdateWineContent1';
import UpdateWineContent2 from './component/screens/UpdateWineContent2';
import UpdateWineContent3 from './component/screens/UpdateWineContent3';
import ScanImage from './component/screens/ScanImage';

import ViewAllTastingNote from './component/screens/ViewAllTastingNote';
import AddTastingNote from './component/screens/AddTastingNote';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// const settingsIcon = <MaterialIcons name="arrow-back-ios" size={25} color="#000" />;

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#DA0063',
//     accent: '#A41154',
//     background: '#eee',
//     text: '#000'
//   },
// };


export default function App() {
  return (
    // <PaperProvider theme={theme}>
    <Provider store={store}>
      <NavigationContainer ref={ navigationRef }>
        <Stack.Navigator
          initialRouteName='Home'>

            <Stack.Screen 
            name='Start'
            component={Start}
            options = {{
              headerShown: false
            }}
            />

            <Stack.Screen 
            name='WineInventory'
            component={WineInventory}
            options = {{
              headerShown: false
            }}
            />

            <Stack.Screen 
            name='Login'
            component={Login}
            options = {{
              headerShown: false
            }}
            />

            <Stack.Screen 
            name='Register'
            component={Register}
            options = {{
              headerShown: false
            }}
            />

            <Stack.Screen 
            name='ForgotPassword'
            component={ForgotPassword}
            options = {{
              headerShown: false
            }}
            />
            <Stack.Screen 
            name='Notification'
            component={Notification}
            options = {{
              headerShown: false
            }}
            />
            <Stack.Screen 
            name='Notification2'
            component={Notification2}
            options = {{
              headerShown: false
            }}
            />
             <Stack.Screen 
            name='UpdateWineContent1'
            component={UpdateWineContent1}
            initialParams={{ _image: '' , _method : ''}}
            options = {{
              headerShown: false
            }}
            />
              <Stack.Screen 
            name='UpdateWineContent2'
            component={UpdateWineContent2}
            initialParams={{ _image: '' , _method : ''}}
            options = {{
              headerShown: false
            }}
            />
              <Stack.Screen 
            name='UpdateWineContent3'
            component={UpdateWineContent3}
            initialParams={{ _image: '' , _method : ''}}
            options = {{
              headerShown: false
            }}
            />


            <Stack.Screen 
            name='Home'
            component={AppWine}
            options = {{
              headerShown: false
            }}
            />

            <Stack.Screen 
            name='ScanImage'
            component={ScanImage}
            options = {{
              headerShown: false
            }}
            />
            
            <Stack.Screen 
              name='ConnectToWifi1'
              component={ConnectToWifi1}
              initialParams={{ title: '', method : '', data : []}}
              options = {{
                // headerShown: false
                title: 'Enable AI Cellar to connect to WI-FI',
                
                headerTitleStyle: {
                  fontSize: fontMedium,
                },
                headerStyle: {
                  backgroundColor: '#fff',
              
                },
    
              }}
            />

            < Stack.Screen
              name ='ConnectToWifi2'
              component={ConnectToWifi2}
              initialParams={{ title: '', method : '', data : []}}
              options = {{
                headerShown : false
              }}
            />

            < Stack.Screen
              name ='ConnectToWifi3'
              component={ConnectToWifi3}
              initialParams={{ title: '', method : '', data : []}}
              options = {{
                headerShown : false
              }}
            />

            < Stack.Screen
              name ='ConnectToWifi4'
              component={ConnectToWifi4}
              initialParams={{ title: '', method : '', data : []}}
              options = {{
                headerShown : false
              }}
            />

            <Stack.Screen 
              name='ViewAllTastingNote'
              component={ViewAllTastingNote}
              initialParams={{ id : null, note: [] }}
              options = {{
                headerShown: false
              }}
            />

            <Stack.Screen 
              name='AddTastingNote'
              component={AddTastingNote}
              initialParams={{ id: null, note : [] }}
              options = {{
                headerShown: false
              }}
            />

 

        </Stack.Navigator>
        {/* <AppWine /> */}
      </NavigationContainer>
    </Provider>
    // </PaperProvider>
  );
}


