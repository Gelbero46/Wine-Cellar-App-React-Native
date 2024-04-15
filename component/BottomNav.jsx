import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import {BottomNavigation, Colors} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Collection from './routes/Collection';
import Search from './routes/Search';
import Discover from './routes/Discover';
import Profile from './routes/Profile';
import Scan from './routes/Scan';

import Logo from "../assets/Logo.png"
import ScanLogo from "../assets/Scan_icon.png"
const BottomNav = () => {

  // const [index, setIndex] = React.useState(0); { key: 'music', title: 'Music', icon:(props)=> <MaterialCommunityIcons {...props} name='queue-music' size={30}/> },

  const middle = ( { name, size, color} ) => {
    return (
      <MaterialCommunityIcons name={name} size={size} color= {color} />
    )
    
  }
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'collection', title: 'Collection', icon: Logo},
    { key: 'search', title: 'Search', icon: 'magnify' },
    { key: 'scan', title: 'Scan', icon: () => <MaterialCommunityIcons name= 'qrcode-scan' size={20}/>  },
    { key: 'discover', title: 'Discover', icon: 'near-me' },
    { key: 'profile', title: 'Profile', icon: 'history' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
        collection: Collection,
        search: Search,
        scan: Scan,
        discover: Discover,
        profile: Profile
  });

  // const renderIcon = 
  return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting={false}
        labeled={true}
        barStyle={{ backgroundColor: '#F9FAFC' }}
      />
  );
};

const styles = StyleSheet.create({
        title:{
          margin: 10,
          fontSize: 15,
          textAlign:'center',
          fontSize: 35
        }
});

export default BottomNav;