import React, { useEffect, useState,} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { unBindCellar, deleteCellar, setCellar, editCellarSettings } from '../../redux/wineSlice';
import { setMywineList } from '../../redux/myWineList';

import { ActivityIndicator, Dimensions, Keyboard, Alert, Button, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, View, Pressable, ScrollView, RefreshControl, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


// import { useBackHandler } from '@react-native-community/hooks'
//Redux 
// import { useSelector, useDispatch } from 'react-redux'
// import { setCellar } from '../redux/actions';

import AlertModal from '../AlertModal';
import { navigationRef } from '../RootNavigation'

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#F24726'
const tetiaryColor3 = '#fbc700'
// '#FFD64A'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'


const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMidLg = 18
const fontMedium = 15
const fontSmall = 12;
const fontSmallest = 10



import ButtonDouble from '../ButtonDouble';
import Header from '../Header'
import Rating from '../screens/Rating';

// ???????? Don't know the usefulness of these yet ??????
import CellarsDetails from '../../Api_Calls_AICellarDetails';
import ScanLogo from "../../assets/Add_icon.png"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();






import FontAwesome from 'react-native-vector-icons/FontAwesome';
const heart = <FontAwesome name="heart" size={25} color= {tetiaryColor2} />;
const heartO = <FontAwesome name="heart-o" size={25} color= {tetiaryColor2} />;
const bell = <FontAwesome name="bell" size={25} color= {tetiaryColor3} />;


import Octicons from 'react-native-vector-icons/Octicons';
const dot = <Octicons name="dot-fill" size={35} color= {primaryColor} />;


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const arrowDown = <MaterialIcons name="keyboard-arrow-down" size={30} color="#000" />;
const arrowUp = <MaterialIcons name="keyboard-arrow-up" size={30} color="#000" />;
const arrowDownSmall = <MaterialIcons name="keyboard-arrow-down" size={20} color="#000" />;
const arrowUpSmall = <MaterialIcons name="keyboard-arrow-up" size={20} color="#000" />;


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const bottleWine = <MaterialCommunityIcons name="bottle-wine" size={20} color={primaryColor} />;


import Feather from 'react-native-vector-icons/Feather';
const boxIcon = <Feather name="box" size={21} color="#900" />;


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const bottleIcon = <FontAwesome5 name="wine-bottle" size={20} color="#900" />;
const bottleSmall = <FontAwesome5 name="wine-bottle" size={16} color={primaryColor} />;
// const filter = <FontAwesome5 name="filter" size={25} color="#808080" />;
// const question = <FontAwesome5 name="question-circle" size={25} color="#808080" />;
// const column = <FontAwesome5 name="columns" size={25} color="#808080" />;
// const list = <FontAwesome5 name="list" size={25} color="#808080" />;
// const heart = <FontAwesome5 name="heart" size={25} color="orange" />;
// const heartO = <FontAwesome5 name="heart-o" size={25} color="orange" />;
const briefcase = <FontAwesome5 name="briefcase" size={17} color={primaryColor} />;
const coins = <FontAwesome5 name="coins" size={16} color="gold" />;
// const shelf = <FontAwesome5 name="database" size={17} color={primaryColor} />;
const search = <FontAwesome5 name="search" size={20} color= '#000' />;
const arrowBack = <FontAwesome5 name="arrow-left" size={30} color= '#eee' />;
const clipboardIcon = <FontAwesome5 name="clipboard-list" size={30} color= '#fff' />;
const trash = <FontAwesome5 name="trash-alt" size={20} color= '#fff' />;

const shelf = <FontAwesome5 name="layer-group" size={17} color= {primaryColor} />;



import Ionicon from 'react-native-vector-icons/Ionicons';
const settingsIcon = <Ionicon name="settings-sharp" size={30} color="#ccc" />;
const pencilIcon = <Ionicon name="pencil" size={18} color= {primaryColor} />;

const locationIcon = <Ionicon name="location-sharp" size={30} color= {iconColorOne} />;
const locationSmall = <Ionicon name="location-sharp" size={17} color= {primaryColor} />;
const callIcon = <Ionicon name="call-sharp" size={30} color= {iconColorOne} />;
const wineIcon = <Ionicon name="wine" size={30} color= {iconColorOne} />;
const serverIcon = <Ionicon name="server-sharp" size={30} color= {iconColorOne} />;

const clipboard = <Ionicon name="clipboard" size={30} color= {iconColorOne} />;
const addCellarIcon = <Ionicon name="md-add-sharp" size={30} color={primaryColor}/>;


//  **************************************************************************

import Icon from "../../assets/Logo.png"
import placeholder from "../../assets/placeholder-image.png"
import AlertMsg from '../AlertMsg';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

// Main Func
const Collection = ( { navigation, route } ) => {

  // const { _current, _myWineList } = route.params
  const { _current } = route.params

  const [ current, Setcurrent ] = useState(_current)
  // const [ myWineList, SetmyWineList ] = useState(_myWineList)
  
  // Cellar Details Filter ***
  const [ typeOfWine, SettypeOfWine ] = useState('Red/White')
  const [ origin, Setorigin ] = useState('All')
  const [ bottleSize, SetbottleSize ] = useState('All')
  const [ collectionType, SetcollectionType ] = useState('All')
  const FilterItems = [
    {
      'id' : 1,
      'name' : 'Type of Wine',
      'value' : typeOfWine,
      'changeValue' : SettypeOfWine
    },
    {
      'id' : 2,
      'name' : 'Origin',
      'value' : origin,
      'changeValue' : Setorigin
    },
    {
      'id' : 3,
      'name' : 'Bottle Size',
      'value' : bottleSize,
      'changeValue' : SetbottleSize
    },
    {
      'id' : 4,
      'name' : 'Collection Type',
      'value' : collectionType,
      'changeValue' : SetcollectionType
    }
    
  ] // Cellar Details Filter End ***

  const { Cellar } = useSelector( (store) => store.cellar );
  const { myWineList } = useSelector( (store) => store.wineList );

  const dispatch = useDispatch();

  // const [ Cellar, setCellar ] = useState([])
  // const { Cellar } = useSelector( state=> state.userReducer )
  // const dispatch = useDispatch();


  const [ cellarID, SetcellarID ] = useState()
  const [ showCellarInfo, SetshowCellarInfo ] = useState(true)
  const [ cellarDetailsSearch, SetcellarDetailsSearch ] = useState('')
  const [ cellarDetails, SetcellarDetails ] = useState([])
  // const [ shelfToggle, SetshelfToggle ] = useState(false)

  const [ refreshing, Setrefreshing ] = useState(false)
  // const [ addIcon, SetaddIcon ] = useState(true)

  // Add Cellar
  const [location, Setlocation] = useState("");
  const [address, Setaddress] = useState('');

  // Add Wine List
  const [wineListName, SetwineListName] = useState('');
  const [description, Setdescription] = useState('');

  // ********* Page Modals *********
  const [ addCellarModal, SetaddCellarModal ] = useState(false);
  const [ cellarSettingsModal, SetcellarSettingsModal ] = useState(false);
  const [ confirmUnbindModal, SetconfirmUnbindModal ] = useState(false)
  const [ deleteCellarModal, SetdeleteCellarModal ] = useState(false)
  const [ filterCellarDetailsModal, SetfilterCellarDetailsModal ] = useState(false)
  const [ quitAppModal, SetquitAppModal ] = useState(false)
  // quitAppModal

  // Edit cellar TextInput states
  const [ nameSettingsModal, SetnameSettingsModal ] = useState('');
  const [ locationSettingsModal, SetlocationSettingsModal ] = useState('');
  const [ telSettingsModal, SettelSettingsModal ] = useState('');
  // Edit cellar, My wine List
        const [ noteSettingsModal, SetnoteSettingsModal ] = useState('');
        // Check if settings is edited
        const [ edited, Setedited ] = useState('')



  // const [ aicellarChoice, SetaicellarChoice] = useState(true)
  // const [ virtualCellarChoice, SetvirtualCellarChoice] = useState(false)
  const [ cellarChoice, SetcellarChoice] = useState('Ai')

  const [ bottomMargin, SetbottomMargin ] = useState(100)
  const [browsedImage, SetbrowsedImage] = useState('../../assets/logo4.png')

  // favourite
  
  // const [ myWineList, SetmyWineList ] = useState(route.params.myWineList)
  // const { myWineList } = route.params
   // Expo Image Picker
      // Add Cellar or Add WIne List Image
      const [ pickedImagePath, setPickedImagePath ] = useState('')
      // Edit Cellar or Wine List Image
      const [ editCellarImage, SeteditCellarImage ] = useState('')
   const [fallback, Setfallback] = useState('')
  
   // Edit Cellar Modal ID
  //  const [ editCellarID, SeteditCellarID ] = useState()

    // display 'Edit' or 'Save'
     const [ edit, Setedit ] = useState(false)

    //  const GetCellar = async () => {
    //   // var Cellars = await require('../../API_Calls');
    //   // console.log(Cellars)

    //   dispatch(setCellar(
    //   //   [
    //   //     {
    //   //         "id": 1,
    //   //         "avatar": "https://images.unsplash.com/photo-1562601579-599dec564e06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2luZSUyMGNlbGxhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    //   //         "type": "AI Cellar",
    //   //         "name": "Home",
    //   //         "location": "xxx Hong Kong",
    //   //         "phone": "+852 xxxxxx",
    //   //         "collected_wine": 4,
    //   //         "cost": "5010",
    //   //         "market_value": "6450",
    //   //         "case": 3,
    //   //         "bottle": 40,
    //   //         'binded' : true
    //   //     },
    //   //     {
    //   //         "id": 2,
    //   //         "avatar": "https://images.unsplash.com/photo-1566467021572-37fbefe8fcb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdpbmUlMjBjZWxsYXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    //   //         "type": "Virtual Cellar",
    //   //         "name": "Happy Valley Club House",
    //   //         "location": "xxx Hong Kong",
    //   //         "phone": "+852 xxxxxx",
    //   //         "collected_wine": 162,
    //   //         "cost": "80010",
    //   //         "market_value": "126450",
    //   //         "case": 1,
    //   //         "bottle": 150,
    //   //         'binded' : false
    //   //     },
    //   //     {
    //   //         "id": 3,
    //   //         "avatar": "https://images.unsplash.com/photo-1562601579-599dec564e06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2luZSUyMGNlbGxhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    //   //         "type": "AI Cellar",
    //   //         "name": "School",
    //   //         "location": "xxx Hong Kong",
    //   //         "phone": "+852 xxxxxx",
    //   //         "collected_wine": 7,
    //   //         "cost": "5010",
    //   //         "market_value": "6730",
    //   //         "case": 3,
    //   //         "bottle": 40,
    //   //         'binded' : true
    //   //     },
    //   // ]
      
    //   ))
    //   // setCellar(Cellars)
      
    // }
  const [ isLoading, SetisLoading ] = useState( true )
  const [ load, Setload] = useState(false);

  useEffect(() => {

    const GetCellar = async () => {
      var Cellars = require('../../API_Calls');
      console.log("My Cellar ********* Loading**********")
      console.log("myWineList Length", myWineList.length)
      console.log("Cellar Length", Cellar.length)

      dispatch(setCellar(Cellars))
      SetisLoading( false )
      // setCellar(Cellars)
      
    }

    if ( current.toLowerCase() == "my cellar" ) {
      SetisLoading(true)
      GetCellar()
    }


    // Specify how to clean up after this effect:
     return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // navigation.setParams( { current : 'my cellar' } )

        setPickedImagePath('')
        SetcellarID()

        // console.log('[]', route.params)
        
      };
  }, 
  // [isLoading]
  [load, _current]
   );


  // Set params to their states
  useEffect(() => {
    // SetisLoading(true)

    const GetWineList = async () => {
      var Cellars = await require('../../Api_Call_MyWineList');

      // SetmyWineList(_myWineList)
      if (Cellars && Cellars.length != 0) {
        dispatch(setMywineList(Cellars))
      }
      
      // SetisLoading( false )
      
    }

    if ( _current.toLowerCase() == "my wine list" ) {
      console.log("Loaded MyWineList")
      Setcurrent(_current)
      GetWineList()
    }
    
    

    // Specify how to clean up after this effect:
     return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // navigation.setParams( { current : 'my cellar' } )  
      };
  }, 
  // [_current, _myWineList, isLoading]
  [_current, load]
  );
  

  useEffect(() => {
    // Setcurrent(_current)
    // SetmyWineList(_myWineList)
    console.log("_current************", _current)
    Setcurrent(_current)
     return () => {

     }
  }, [_current, load]);



  useFocusEffect(
    React.useCallback(() => {
      
      const onBackPress = () => {
        console.log('Back pressed', current)
        console.log(cellarID)
        if ( cellarID ) {
          console.log('Id Zero')
          SetcellarID()
          // return true;
        }

        else if ( current && current.toLowerCase() != 'my cellar' ) {
          // console.log('myWineList')
          // navigation.setParams( { current : 'my cellar' } )
          SetcellarID()
          navigation.setParams({_current : 'my cellar'})
          Setcurrent('my cellar')

          // return true;
        }

         else {
          // console.log('alrt')
          SetquitAppModal(true)
        }
        return true
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [cellarID, current])
  );



  // const alrt = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   }

  // useBackHandler(() => {
  //   console.log(current, 'current')
  //   if ( current && current.toLowerCase() == 'my cellar' && cellarID ) {
  //     SetcellarID()
  //     navigation.setParams( { current : 'my cellar' } )
  //     // handle it
  //     return true
  //   }

  //   return false
  // })



  // Display the Edit Cellar Modal for AI Cellar and WIne List
  const FuncCellarSettingsModal = ( {cellarName, cellarLocation, cellarTel, cellarNote, id} ) => {
    // console.log("Entered")
      if ( current.toLowerCase() == 'my cellar') {
        cellarName && SetnameSettingsModal(cellarName)
        cellarLocation && SetlocationSettingsModal(cellarLocation)
        cellarTel && SettelSettingsModal(cellarTel)
      }
      else if (current.toLowerCase() == 'my wine list') {
        cellarName && SetnameSettingsModal(cellarName)
        cellarNote && SetnoteSettingsModal(cellarNote)
      }
      SetcellarID(id)
      SetcellarSettingsModal(true)
  }

  

  // Image picker to select images from gallery
  const showImagePicker = async (imageLocation) => {
      // Ask the user for the permission to access the media library 
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync();
  
      // Explore the result
      // console.log(result);
  
      if (!result.cancelled) {
        imageLocation ? 
        imageLocation(result.uri)  
        : Setfallback(result.uri)
        // setPickedImagePath(result.uri);
        // console.log(result.uri);
        // console
      }
    }


  // This is to toggle between Virtual and AI cellar within the Add Cellar Modal
  const toggleCellarChoice = ( cellarName ) => {
      SetcellarChoice(cellarName)
      // console.log(cellarName)
  }

  // Set AddCellar Modal True
  const addCellar = () => {
    // console.log('addCellar')
    SetaddCellarModal(true)
  }
  
  // Add or Update AI Cellar... Routes to Connect to Wifi
  const EditCellarConfirmToRoute = async ( { _title, _method, _data} ) => {
    await navigation.navigate('ConnectToWifi1', { title : _title, method : _method, data :  _data
    //   [
    //   {
    //     'image' : pickedImagePath,
    //     'location' : location,
    //     'address' : address,
    //     'type' : cellarChoice,
    //   }
   
    // ]
    })
    SetcellarID()
    SetcellarSettingsModal(false)
  }

  // Add Virtual Cellar
  const AddVirtualCellar = () => {
    console.log('Virtual Cellar Added')
  }

  // Add Wine List
  const AddWineListConfirm = () => {
    var AddWineListData = [
      {
        'image' : pickedImagePath,
        'wineName' : wineListName,
        'description' : description
      }
    ]
    
  }

 
    const unbindCellar = () => {
      // SetcellarSettingsModal(false)
      SetconfirmUnbindModal(true)
    }

    // Unbind AI cellar by setting the 'binded' key to false
    const ConfirmUnbindCellar = () => {
      SetconfirmUnbindModal(false)
      // setCellar (
      //   Cellar.map( (cellar) => cellar.id === cellarID ? { ...cellar, binded : false} : cellar
      // )
      // )
      dispatch(unBindCellar(cellarID))
      // console.log(cellarID)
      // console.log(Cellar)
    }


    const ConfirmDeleteCellar = () => {
      SetdeleteCellarModal(false)
      SetcellarSettingsModal(false)
      SetcellarID()
      current.toLowerCase() == 'my cellar' ?
      // setCellar (
      //   Cellar.filter( ( cellar ) => cellar.id !== cellarID )
      // )
      dispatch(deleteCellar(cellarID))
      :
      navigation.setParams( { myWineList :  myWineList.filter( ( cellar ) => cellar.id !== cellarID ) } )
      // console.log(Cellar)
    }

    // Event Listener , _button function, function to get AICellar Details and Virtual Cellar details
    // const keyboardShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   () => {

    //       SetbottomMargin(0)
          
    //   }
    // );
    // const keyboardHideListener = Keyboard.addListener(
    //     'keyboardDidHide',
    //     () => {
    //       SetbottomMargin(100)
    //     }
    // );


    // const _button = ({
    //                 rightText,
    //                 leftText,
    //                 colorPressed,
    //                 colorNotPressed,
    //                 textColor,
    //                 rightTextonPress,
    //                 leftTextonPress,
    //                 paddingVertical,
    //                 paddingHorizontal,
    //                 fontSize
    //               }
    //                 ) => {
    //   return (
    //     <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                     
    //                   <Pressable
    //                     onPress={leftTextonPress ? leftTextonPress : onPressFunction}
    //                     style={({pressed}) => [
    //                       { backgroundColor: pressed ? `${colorPressed ? colorPressed : secondaryColor }` : `${colorNotPressed ? colorNotPressed : primaryColor}`,
    //                         borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2', justifyContent: 'center'},
                          
    //                     ]}>
    //                       <Text style={{paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical, fontSize: fontSize ? fontSize : fontSmallest, color: textColor ? textColor : '#eee'}}>{leftText ? leftText : Confirm}</Text>
    //                   </Pressable>

    //                    <Pressable
    //                     onPress={rightTextonPress ? rightTextonPress :  onPressFunction}
    //                     style={({pressed}) => [
    //                       { backgroundColor: pressed ? `${colorPressed ? colorPressed : secondaryColor }` : `${colorNotPressed ? colorNotPressed : primaryColor}`, 
    //                       borderWidth: pressed ? 4 : 0, 
    //                       borderRadius: 5, 
    //                       borderColor: '#414BB2',
    //                       justifyContent: 'center'},
                          
    //                     ]}>
    //                       <Text style={{paddingHorizontal: paddingHorizontal ? paddingHorizontal : 35, 
    //                                     paddingVertical: paddingVertical ? paddingVertical : 15, fontSize: fontSize ? fontSize : fontSmallest, color: textColor ? textColor : '#eee'}}>{rightText ? rightText :  Cancel}</Text>
    //                   </Pressable>
    //       </View>
    //   )
    // }


    // Function to get Cellar Details from database

    // const getAIDetails = async () => {
    //   try {
    //     var details   = await require('../../Api_Calls_AICellarDetails');
    //     SetcellarDetails(details[0].shelf)
    //   }
    //   catch (err) {
    //     console.log(error)
    //   }
    // }

    // const getVirDetails = async () => {
    //   try {
    //     var details   = await require('../../Api_Calls_VirtualCellarDetails');
    //     SetcellarDetails(details[0].wines)
    //   }
    //   catch (err) {
    //     console.log(error)
    //   }
    // }


 
  
   
    const [ unidentified, Setunidentified ] = useState(false)
    // True to show details in List and false to show in Column
    const [ shelfViewList, SetshelfViewList ] = useState(true)

    const filter = <FontAwesome5 name="filter" size={25} color="#808080" />;
    const question = <FontAwesome5 name="question-circle" size={25} color={unidentified ? primaryColor : '#808080'} />;
    const column = <FontAwesome5 name="columns" size={25} color={shelfViewList ? '#808080' : primaryColor} />;
    const list = <FontAwesome5 name="list" size={25} color={shelfViewList ? primaryColor : '#808080'} />;
    const plus = <FontAwesome5 name="plus" size={25} color= {iconColorOne} />;

  // Function to Display Cellars or myWineList
    const ShowCellar = ({cellarArray}) => {
      // console.log('Start')
      // console.log(myWineList)
      // console.log('finished')
      // console.log(current)
      return (
        <>
              {cellarArray.filter((item) => {
                // console.log(item.id)
                // console.log('true or not', cellarID && item.id == cellarID)
                // console.log(item, '888888')
                if (!cellarID) {
                  return item
                }
                return cellarID && item.id == cellarID
              })
              .map(( item ) => {
                // console.log(item, '999')
                return  (
                  <Pressable style={styles.AiContainer} key={item.id}
                  onPress={() => {
                    if (cellarID != item.id) {
                      SetcellarID(item.id)
                      // console.log('cellarID', cellarID)
                      // console.log('item.id', item.id)
                    }
                    // console.log('item.id', item.id)
                    
          
                  }}
                  
                  >
                    <View style={styles.AiHeader}>
                      <Pressable style={{
                            display: cellarID ? 'flex' : 'none',
                            position: 'absolute',
                            right: 0
                          }}
                          onPress={ () => {
                            SetshowCellarInfo( !showCellarInfo )
                          }}>
                              {showCellarInfo ? arrowDown : arrowUp}
                      </Pressable>
                      <View style={styles.imageContainer}>
                          <Image 
                            source={{uri: item.avatar ? item.avatar : placeholder}}
                            style={styles.image}
                            resizeMode="cover"
                          />
                      </View>
                      <View>
                          <Text>{item.name}</Text>
                          <Text>{item.type}</Text>
                      </View>
                    </View>
          
                    
                    <View style={{
                      display: showCellarInfo ? 'flex': 'none'
                    }}>
                     
                      <View style={[styles.AiMain, styles.AiMid]}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                          <Text>{item.collected_wine}</Text>
                          <Text style={{fontSize: 10}}>Collected Wine</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                          <Text>{item.cost}</Text>
                          <Text style={{fontSize: 10}}>My Cost</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                          <Text>{item.market_value}</Text>
                          <Text style={{fontSize: 10}}>Market Value (HKD)</Text>
                        </View>
                      </View>
          
                      <View style={styles.AiMain}>
                          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            {boxIcon}
                            <Text style= {{paddingLeft: 6}}>{item.case} Case</Text>
                          </View>
                          <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center'}}>
                            {bottleIcon}
                            <Text style= {{paddingLeft: 6}}>{item.bottle} Btl</Text>
                          </View>
                          
                          <View style={{flex: 1,flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Pressable
                                onPress={() => {
                                  // SetcellarSettingsModal(true)
                                  // myWineList.length == 0 
                                  current.toLowerCase() == 'my cellar'
                                  ? FuncCellarSettingsModal({cellarName : item.name, cellarLocation : item.location, cellarTel : item.phone, id : item.id})
                                  : FuncCellarSettingsModal({cellarName : item.name, cellarNote : item.note, id : item.id})
                                  // FuncCellarSettingsModal(item.name, item.location, item.phone, item.id)
                                  

                                } }
                                style={({pressed}) => [
                                  { backgroundColor : pressed ? '#eee' : '#fff', borderRadius : 30 },
                                  
                                ]}
                                hitSlop={20}>
                                  {settingsIcon}
                            </Pressable>
                          </View>
                         
                      </View>
                    </View>
                  
                  </Pressable>
                )

              })}
        </>
      
   
      )
    }


    
    const getAiVirDetails = async () => {
      if (current.toLowerCase() == 'my cellar') {
        
        const details_ = async () => {
          try {
            var details   = await require('../../Api_Call_AiVir');
            SetcellarDetails(details)
          }
          catch (err) {
            console.log(err)
          }
        }
        details_()

      }
      else if ( current.toLowerCase() == 'my wine list' ) {

        const details__ = async () => {
          try {
            var details   = await require('../../Api_Call_MyWineListDetails');
            SetcellarDetails(details)
          }
          catch (err) {
            console.log(err)
          }
        }
        details__()
       
      }

      else if ( current.toLowerCase() == 'my favorite' ) {
        // SetcellarID(1)

        const details___ = async () => {
          try {
            var details   = await require('../../Api_Call_MyFavorite');
            SetcellarDetails(details)
            SetcellarID(details[0].id)
            // console.log('*************************************', cellarID)
          }
          catch (err) {
            console.log(err)
          }
        }
        details___()
      }

      else {
        SetcellarDetails([])
      }

    
    }

    // Function to Display Cellar Details
    const ShowCellarDetails = () =>  {

      // Get CEllar Details
     
      // if (cellarID == 1 ) {
      //   getAIDetails()
      // }
      // else {
      //   getVirDetails()
      // }
      getAiVirDetails() // **************************************************************************attention
      // console.log(SetcellarDetails)
      // console.log(cellarID)

      
      return (
        <View style={{width: '100%', backgroundColor: '#fff', alignItems: 'center'}}>
            <View style={{width: '95%',
                          alignItems: 'center'}}>

              <View style={{ width : '100%',
                          maxWidth: 450, justifyContent : 'center' }}>
                <TextInput
                  onChangeText={ () => {
                    // console.log(cellarDetailsSearch)
                    // console.log('a')
                    SetcellarDetailsSearch()
                  }}
                  value={cellarDetailsSearch}
                  borderRadius= {4}
                  fontSize = {fontSmall}
                  placeholder= 'Search'
                  style={{
                          padding: 5, paddingLeft : 30, fontSize: fontSmall, borderWidth: 1, borderColor: '#aaa'}}
                />
                <View style={{position : 'absolute', left : 7}}>
                  {search}
                </View>
                
              </View>
              
            
              <View style={
                {flexDirection: 'row', 
                width: '100%',
                paddingVertical: 5,
                justifyContent: 'space-between',
                alignItems: 'center'}}>

                <Pressable onPress={ () => {
                  SetfilterCellarDetailsModal(!filterCellarDetailsModal)
                } }>
                  {filter}
                </Pressable>
                {   
                  current.toLowerCase() == 'my cellar' &&
                   <Pressable onPress={ () => {
                    Setunidentified(!unidentified)
                  } }>
                    {question}
                  </Pressable>

                }
                {   
                  current.toLowerCase() == 'my wine list' &&
                   <Pressable onPress={ () => {
                    // Setunidentified(!unidentified)
                    // console.log('Add Wine from My Wine List Cellar Details')
                  } }>
                    {plus}
                  </Pressable>

                }
               
                <Pressable
                  onPress={() => (
                    shelfViewList && SetshelfViewList(!shelfViewList)
                  )}>
                  {column}
                </Pressable>
                <Pressable
                  onPress={() => (
                    !shelfViewList && SetshelfViewList(!shelfViewList)
                  )}>
                  {list}
                </Pressable>
                
                
                
                

                <Pressable style={{
                  width : width * 0.5,
                  maxWidth : 200,
                  borderWidth: 1,
                  justifyContent : 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5
                  
                }}>
                    <Text style={{fontSize: fontSmallest, marginRight: 20}}>Most Valued Wine</Text>
                   
                    {arrowDownSmall}
                    
                    
                </Pressable>
                {/* <TextInput
                // onChangeText={SetcellarDetailsSearch}
                // value={cellarDetailsSearch}
                borderRadius= {4}
                fontSize = {fontSmall}
                style={{
                        width : 180,
                        alignSelf: 'flex-end',
                        // maxWidth: 450, 
                        padding: 5, 
                        fontSize: fontSmall, 
                        borderWidth: 1, 
                        borderColor: '#ddd'}}
              /> */}
              </View>

            </View>


                {/* {console.log(cellarDetails)} */}
                {
                  cellarDetails.filter( (item) => {
                    return cellarID == item.id && item
                  } )
                  .map( (_item) => {
                    return (
                        _item.type.toLowerCase() == 'ai cellar' ?
                        <View style={{width : '100%'}} key={_item.id}>
                          { shelfViewList ? _item.shelf.map((item, index) => {
                            let [ shelfToggle, SetshelfToggle ] = useState(false)
                            return (
                              <View key={item.id} style={{width : '100%',
                              alignItems: 'center'}}>
                                <Pressable style={{
                                  width : '100%',
                                  borderTopWidth: 3,
                                  borderColor: '#eee',
                                  // borderBottomWidth: 1,
                                  // backgroundColor: 'red',
                                  paddingHorizontal: 2,
                                  paddingVertical: 3,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                                onPress={() => {
                                  SetshelfToggle(!shelfToggle)
                                }}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                    <Text>Shelf </Text><Text style={{color: secondaryColor, fontWeight: '500'}}>{index + 1}</Text>
                                    </View>
                                    
                                    <Text style={{
                                      fontSize: fontSmallest
                                    }}>Updated: {item.update_on}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                      <Text style={{color: secondaryColor, fontWeight: '500'}}>{item.bottle}</Text>
                                      <Text> Btl</Text>
                                    </View>
        
                                    <Pressable
                                      onPress={() => {
                                        SetshelfToggle(!shelfToggle)
                                      }}>
                                        <View style={{backgroundColor: '#ddd', borderRadius: 15,
                                      // padding: 2
                                      }}>
                                          {shelfToggle ? arrowDown : arrowUp}
                                        </View>
                                        
                                    </Pressable>
                                </Pressable>
        
        
                                {/* {console.log('item.wines', item.wines)}                      */}
                                {item.wines && item.wines.map((wineItem, WineIndex) => {
                                  return(
                                    // <Text>{wineItem.cost}</Text>
                                    <View style={{width: '100%',
                                                  paddingHorizontal: 7
                                  
                                    // backgroundColor:'blue',
                                    }}
                                    key={wineItem.id}>
                                      {shelfToggle && 
                                      <Pressable
                                      onPress={ () =>{
                                        // console.log(cellarID)
                                        // AI Cellar ********************************
                                        navigationRef.navigate('WineInventory', { id : _item.id, type: _item.type, })
                                      } }>
                                        <View style={{flexDirection: 'row',
                                                  alignItems: 'center',
                                                  justifyContent: 'space-between',
                                                  borderTopWidth: 3,
                                                  borderColor: '#eee',}}>
                                        <View>
                                            <Text>{wineItem.name}</Text>
                                            <Text>{wineItem.year}</Text>
                                        </View>
                                        {wineItem.favorite ? heart : heartO}
                                    </View>
                                    <View style={{flexDirection: 'row',
                                      paddingVertical: 7,
                                      // backgroundColor: 'red'
                                      }}>
                                      <Image
                                            source={{uri: wineItem.avatar ? wineItem.avatar : placeholder}}
                                            style={{width: 60, height: 100, borderRadius: 20, backgroundColor: 'blue'}}>
                                      </Image>
                                      <View style={{paddingLeft: 12,
                                                    flex: 1}}>
        
                                          <View style={{flexDirection: 'row',
                                                        // paddingRight: 20
                                                        }}>
        
                                              <View  style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 1}}>
                                                {dot}
                                                <Text style={{paddingLeft: 3, fontSize: fontSmall}}>{wineItem.capacity}ml</Text>
                                              </View>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 2}}>
                                                {locationSmall}
                                                  <Text style={{paddingLeft: 3}}>{wineItem.production_place}</Text>
                                              </View>
                                          </View>
        
                                          <View style={{flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingRight: 20}}>
        
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 3}}>
                                                {briefcase}
                                                <Text style={{paddingLeft: 3}}>{wineItem.case} Case</Text>
                                              </View>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 2}}>
                                                  {bottleSmall}
                                                  <Text style={{paddingLeft: 3}}>{wineItem.bottle} Btl</Text>
                                              </View>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 3}}>
                                                  {bottleWine}
                                                  <Text style={{paddingLeft: 0}}>14 Btl Total</Text>
                                              </View>
                                          </View>
                                          <View style={{flexDirection: 'row', paddingTop: 6}}>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 8}}>
                                                {coins}
                                                  <Text style={{paddingLeft: 3}}>HKD {wineItem.cost}</Text>
                                              </View>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 15
                                                            }}>
                                                  {shelf}
                                                  <Text style={{paddingLeft: 3}}>Shelf {item.id}</Text>
                                              </View>
                                          </View>
                                      </View>
                                    </View>
                                      </Pressable>}
        
                                  </View>
                                  )
                                }) }
        
                              </View>
                            )
                          }) : 
                          _item.shelf.map((shelfItem, index) => {
                            if (shelfItem.wines) {
                              return (
                                  <View key={shelfItem.id} style={{
                                    width: '100%', maxWidth : 500,  flexDirection: 'row', justifyContent: 'space-between'
                                  }}>
                                    {
                                          shelfItem.wines.map( (wine) => {
                                          return (
                                              <Pressable style={{
                                                borderWidth: 3,
                                                borderColor: '#eee',
                                                borderRadius: 30,
                                                padding: 10,
                                                flex: 1,
                                                marginHorizontal: 7,
                                                alignItems : 'center',
                                                marginVertical: 7,
                                                minWidth: 150,
                                                maxWidth : 170,
                                              }}
                                              onPress={ () =>{
                                                // console.log(cellarID, 'ggg')
                                                // AI Cellar ************************************************
                                                navigationRef.navigate('WineInventory', {  id : _item.id, type: _item.type, })
                                              } }
                                              key={wine.id}>
                                                  <View style={{
                                                    width : '100%'
                                                  }}>
                                                    <Text>{wine.name}</Text>
                                                    <Text>{wine.year}</Text>
                                                  </View>
                
                                                  <View>
                                                      <Image source={{uri: wine.avatar ? wine.avatar : placeholder}}
                                                              style={{
                                                                width : 50,
                                                                height : 100,
                                                                // backgroundColor : 'red'
                                                              
                                                              }}
                                                              resizeMode = 'stretch'
                                                                ></Image>
                                                  </View>
                
                                                  <View style={{flexDirection: 'row',
                                                  width: '100%',
                                                  justifyContent: 'space-between',
                                                  marginTop : 5}}
                                                        >
                                                      <View style={{flexDirection: 'row'}}>
                                                          {briefcase}
                                                          <Text>  {wine.case} Case</Text>
                                                      </View>
                                                      <View style={{flexDirection: 'row'}}>
                                                          { bottleSmall}
                                                          <Text>  {wine.bottle} Btl</Text>
                                                      </View>
                                                  </View>
                
                                                  <View style={{
                                                    width: '100%',
                                                    marginTop : 5
                                                  }}>
                                                      <View style={{flexDirection: 'row'}}>
                                                          {shelf}
                                                          <Text>  Shelf {shelfItem.id}</Text>
                                                      </View>
                                                  </View>
                
                                              </Pressable>
                                          )
                                        } )
                                    }
                                  </View>
            
                              )
                            }
                          })}
                        </View> 
                        :
                        <View style={{width : '100%'}} key={_item.id}>
                          {shelfViewList ? 
                            _item.wines.map((wineItem,) => {
                              return(
                                // <Text>{wineItem.cost}</Text>
                                <Pressable style={{width: '100%',
                                              paddingHorizontal: 7
                              
                                // backgroundColor:'blue',
                                }}
                                onPress={ () => {
                                  // console.log(cellarID)
                                  // Virtual, My WineList, My Favorite ****************************
                                  navigationRef.navigate('WineInventory', {  id : _item.id, type : _item.type})
                                } }
                                key={wineItem.id}>
                                  {true && <>
                                    <View style={{flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'space-between',
                                              borderTopWidth: 3,
                                              borderColor: '#eee',}}>
                                    <View>
                                        <Text>{wineItem.name}</Text>
                                        <Text>{wineItem.year}</Text>
                                    </View>
                                    {wineItem.favorite  ? heart : heartO}
                                </View>
                                <View style={{flexDirection: 'row',
                                  paddingVertical: 7,
                                  // backgroundColor: 'red'
                                  }}>
                                  <Image
                                        source={{uri: wineItem.avatar ? wineItem.avatar : placeholder}}
                                        style={{width: 60, height: 100, borderRadius: 20, backgroundColor: 'blue'}}>
                                  </Image>

                                  <View style={{paddingLeft: 12,
                                                flex: 1}}>
                                    {
                                      // myWineList.length == 0 
                                      current.toLowerCase() == 'my cellar'
                                      ?
                                        <>
                                          <View style={{flexDirection: 'row',
                                                        // paddingRight: 20
                                                        }}>
          
                                              <View  style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 1}}>
                                                {dot}
                                                <Text style={{paddingLeft: 3, fontSize: fontSmall}}>{wineItem.capacity}ml</Text>
                                              </View>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 2}}>
                                                {locationSmall}
                                                  <Text style={{paddingLeft: 3}}>{wineItem.production_place}</Text>
                                              </View>
                                          </View>
          
                                          <View style={{flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingRight: 20}}>
          
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 3}}>
                                                {briefcase}
                                                <Text style={{paddingLeft: 3}}>{wineItem.case} Case</Text>
                                              </View>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 2}}>
                                                  {bottleSmall}
                                                  <Text style={{paddingLeft: 3}}>{wineItem.bottle} Btl</Text>
                                              </View>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 3}}>
                                                  {bottleWine}
                                                  <Text style={{paddingLeft: 0}}>14 Btl Total</Text>
                                              </View>
                                          </View>
                                          <View style={{flexDirection: 'row', paddingTop: 6}}>
                                              <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 8}}>
                                                {coins}
                                                  <Text style={{paddingLeft: 3}}>HKD {wineItem.cost}</Text>
                                              </View>
                                              {/* <View style={{flexDirection: 'row',
                                                              alignItems: 'center',
                                                              flex: 15
                                                            }}>
                                                  {shelf}
                                                  <Text style={{paddingLeft: 3}}>Shelf {item.id}</Text>
                                              </View> */}
                                          </View>
                                        </>
                                        :
                                        <>
                                          {/* <Text style={{width : 'auto'}}>{item.name}</Text> */}
                                          <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                            {<Ionicon name="location-sharp" size={25} color= {primaryColor} />}
                                            <Text style={{fontSize : fontSmall}}> {wineItem.production_place}</Text>
                                          </View>
                                          <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                                            <Text style={{fontSize : fontSmallest, marginRight : 12}}>Average</Text>
                                            <View>
                                                {
                                                  <Rating color={secondaryColor} size ={fontSmall} rate= {wineItem.rating} gap={1} />
                                                }
                                            </View>
                                            <Text style={{fontSize : fontSmallest, marginLeft : 7}}>{wineItem.rating}</Text>
                                          </View>
                                        </>
                                          // <View style={{paddingLeft : 15, flex : 1}}>
                                        
                                              
                                          // </View>
                                    }
                                     
                                     
                                  </View>
                                </View>
                                  </>}
      
                              </Pressable>
                              )
                            }) 
                          :
                            <Pressable 
                            style={{
                              // 'backgroundColor' : '#ddd',
                              'flex' : 1,
                              'flexDirection' : 'row',
                              'flexWrap' : 'wrap'
                            }}
                            onPress={ () => {
                              // console.log(cellarID)
                              // Virtual, My WineList, My Favorite ****************************
                              navigationRef.navigate('WineInventory', { id : _item.id, type : _item.type})
                            } }
                            >
                            {
                            _item.wines.map( (wine, index) => {
                              return (
                                  <View style={{
                                    borderWidth: 3,
                                    borderColor: '#eee',
                                    borderRadius: 30,
                                    padding: 10,
                                    flex: 1,
                                    minWidth: 150,
                                    maxWidth : 170,
      
                                    marginHorizontal: 7,
                                    alignItems : 'center',
                                    marginVertical: 7,
                                  }}
                                  key={index}>
                                      <View style={{
                                        width : '100%'
                                      }}>
                                        <Text>{wine.name}</Text>
                                        <Text>{wine.year}</Text>
                                      </View>
      
                                      <View>
                                          <Image source={{uri: wine.avatar ? wine.avatar : placeholder}}
                                                  style={{
                                                    width : 50,
                                                    height : 100,
                                                    // backgroundColor : 'red'
                                                  
                                                  }}
                                                  resizeMode = 'stretch'
                                                    ></Image>
                                      </View>
      
                                      <View style={{flexDirection: 'row',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                    marginTop : 10}}
                                            >
                                              {
                                                // myWineList.length == 0 
                                                current.toLowerCase() == 'my cellar'
                                                ?
                                                <>
                                                    <View style={{flexDirection: 'row'}}>
                                                        {briefcase}
                                                        <Text> {wine.case} Case</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        { bottleSmall}
                                                        <Text> {wine.bottle} Btl</Text>
                                                    </View>
                                                </>
                                                :
                                                <>
                                                {/* <Text></Text> */}
                                                  <Text style={{fontSize : fontSmallest, marginRight : 12}}>Average</Text>
                                                  <View>
                                                      {
                                                        <Rating color={secondaryColor} size ={fontSmall} rate= {wine.rating} gap={1} />
                                                      }
                                                  </View>
                                                  <Text style={{fontSize : fontSmallest, marginLeft : 7}}>{wine.rating}</Text>

                                                </>
                                               

                                              }
                                        
                                      </View>
      
                                  
                                  </View>
                              )
                            } )
                          }
                            </Pressable>
                        }
                      </View>
                    )
                  })
                }


                {
                //   cellarID == 1 ? 
                //   <>
                //   { shelfViewList ? cellarDetails.map((item, index) => {
                //     let [ shelfToggle, SetshelfToggle ] = useState(false)
                //     return (
                //       <View key={item.id} style={{width : '100%',
                //       alignItems: 'center'}}>
                //         <Pressable style={{
                //           width : '100%',
                //           borderTopWidth: 3,
                //           borderColor: '#eee',
                //           // borderBottomWidth: 1,
                //           // backgroundColor: 'red',
                //           paddingHorizontal: 2,
                //           paddingVertical: 3,
                //           flexDirection: 'row',
                //           alignItems: 'center',
                //           justifyContent: 'space-between'
                //         }}
                //         onPress={() => {
                //           SetshelfToggle(!shelfToggle)
                //         }}
                //         >
                //             <View style={{flexDirection: 'row'}}>
                //             <Text>Shelf </Text><Text style={{color: secondaryColor, fontWeight: '500'}}>{index + 1}</Text>
                //             </View>
                            
                //             <Text style={{
                //               fontSize: fontSmallest
                //             }}>Updated: {item.update_on}</Text>
                //             <View style={{flexDirection: 'row'}}>
                //               <Text style={{color: secondaryColor, fontWeight: '500'}}>{item.bottle}</Text>
                //               <Text> Btl</Text>
                //             </View>

                //             <Pressable
                //               onPress={() => {
                //                 SetshelfToggle(!shelfToggle)
                //               }}>
                //                 <View style={{backgroundColor: '#ddd', borderRadius: 15,
                //               // padding: 2
                //               }}>
                //                   {shelfToggle ? arrowDown : arrowUp}
                //                 </View>
                                
                //             </Pressable>
                //         </Pressable>


                //         {console.log('item.wines', item.wines)}                     
                //         {item.wines && item.wines.map((wineItem, WineIndex) => {
                //           return(
                //             // <Text>{wineItem.cost}</Text>
                //             <View style={{width: '100%',
                //                           paddingHorizontal: 7
                          
                //             // backgroundColor:'blue',
                //             }}
                //             key={wineItem.id}>
                //               {shelfToggle && 
                //               <Pressable
                //               onPress={ () =>{
                //                 console.log(cellarID)
                //                 navigationRef.navigate('WineInventory', { type: cellarID, })
                //               } }>
                //                 <View style={{flexDirection: 'row',
                //                           alignItems: 'center',
                //                           justifyContent: 'space-between',
                //                           borderTopWidth: 3,
                //                           borderColor: '#eee',}}>
                //                 <View>
                //                     <Text>{wineItem.name}</Text>
                //                     <Text>{wineItem.year}</Text>
                //                 </View>
                //                 {heart}
                //             </View>
                //             <View style={{flexDirection: 'row',
                //               paddingVertical: 7,
                //               // backgroundColor: 'red'
                //               }}>
                //               <Image
                //                     source={require("../../assets/wineCellar.jpg")}
                //                     style={{width: 60, height: 100, borderRadius: 20, backgroundColor: 'blue'}}>
                //               </Image>
                //               <View style={{paddingLeft: 12,
                //                             flex: 1}}>

                //                   <View style={{flexDirection: 'row',
                //                                 // paddingRight: 20
                //                                 }}>

                //                       <View  style={{flexDirection: 'row',
                //                                       alignItems: 'center',
                //                                       flex: 1}}>
                //                         {dot}
                //                         <Text style={{paddingLeft: 3, fontSize: fontSmall}}>{wineItem.capacity}ml</Text>
                //                       </View>
                //                       <View style={{flexDirection: 'row',
                //                                       alignItems: 'center',
                //                                       flex: 2}}>
                //                         {locationSmall}
                //                           <Text style={{paddingLeft: 3}}>{wineItem.production_place}</Text>
                //                       </View>
                //                   </View>

                //                   <View style={{flexDirection: 'row',
                //                 justifyContent: 'space-between',
                //                 paddingRight: 20}}>

                //                       <View style={{flexDirection: 'row',
                //                                       alignItems: 'center',
                //                                       flex: 3}}>
                //                         {briefcase}
                //                         <Text style={{paddingLeft: 3}}>{wineItem.case} Case</Text>
                //                       </View>
                //                       <View style={{flexDirection: 'row',
                //                                       alignItems: 'center',
                //                                       flex: 2}}>
                //                           {bottleSmall}
                //                           <Text style={{paddingLeft: 3}}>{wineItem.bottle} Btl</Text>
                //                       </View>
                //                       <View style={{flexDirection: 'row',
                //                                       alignItems: 'center',
                //                                       flex: 3}}>
                //                           {bottleWine}
                //                           <Text style={{paddingLeft: 0}}>14 Btl Total</Text>
                //                       </View>
                //                   </View>
                //                   <View style={{flexDirection: 'row', paddingTop: 6}}>
                //                       <View style={{flexDirection: 'row',
                //                                       alignItems: 'center',
                //                                       flex: 8}}>
                //                         {coins}
                //                           <Text style={{paddingLeft: 3}}>HKD {wineItem.cost}</Text>
                //                       </View>
                //                       <View style={{flexDirection: 'row',
                //                                       alignItems: 'center',
                //                                       flex: 15
                //                                     }}>
                //                           {shelf}
                //                           <Text style={{paddingLeft: 3}}>Shelf {item.id}</Text>
                //                       </View>
                //                   </View>
                //               </View>
                //             </View>
                //               </Pressable>}

                //           </View>
                //           )
                //         }) }

                //       </View>
                //     )
                //   }) : 
                //   cellarDetails.map((shelfItem, index) => {
                //     if (shelfItem.wines) {
                //       return (
                //           <View key={shelfItem.id} style={{
                //             width: '100%', maxWidth : 500,  flexDirection: 'row', justifyContent: 'space-between'
                //           }}>
                //             {
                //                   shelfItem.wines.map( (wine) => {
                //                   return (
                //                       <Pressable style={{
                //                         borderWidth: 3,
                //                         borderColor: '#eee',
                //                         borderRadius: 30,
                //                         padding: 10,
                //                         flex: 1,
                //                         marginHorizontal: 7,
                //                         alignItems : 'center',
                //                         marginVertical: 7,
                //                       }}
                //                       onPress={ () =>{
                //                         console.log(cellarID, 'ggg')
                //                         navigationRef.navigate('WineInventory', { type: cellarID, })
                //                       } }
                //                       key={wine.id}>
                //                           <View style={{
                //                             width : '100%'
                //                           }}>
                //                             <Text>{wine.name}</Text>
                //                             <Text>{wine.year}</Text>
                //                           </View>
        
                //                           <View>
                //                               <Image source={require("../../assets/wineBottle.png")}
                //                                       style={{
                //                                         width : 50,
                //                                         height : 100,
                //                                         // backgroundColor : 'red'
                                                      
                //                                       }}
                //                                       resizeMode = 'stretch'
                //                                         ></Image>
                //                           </View>
        
                //                           <View style={{flexDirection: 'row',
                //                           width: '100%',
                //                           justifyContent: 'space-between'}}
                //                                 >
                //                               <View style={{flexDirection: 'row'}}>
                //                                   {briefcase}
                //                                   <Text> {wine.case} Case</Text>
                //                               </View>
                //                               <View style={{flexDirection: 'row'}}>
                //                                   { bottleSmall}
                //                                   <Text> {wine.bottle} Btl</Text>
                //                               </View>
                //                           </View>
        
                //                           <View style={{
                //                             width: '100%'
                //                           }}>
                //                               <View style={{flexDirection: 'row'}}>
                //                                   {shelf}
                //                                   <Text>Shelf {shelfItem.id}</Text>
                //                               </View>
                //                           </View>
        
                //                       </Pressable>
                //                   )
                //                 } )
                //             }
                //           </View>
    
                //       )
                //     }
                //     // return (
                //     //       {shelfItem.wines.map( () => {
                //     //         return (

                //     //         )
                //     //       } )}
                //     //       // item.shelf.map( () => {
                //     //       //   return (
                //     //       //     <Text>{item.bottle}</Text>
                //     //       //   )
                //     //       // })
                          
                //     // )
                //   })}
                // </> 
                // : 
                  
                // <>
                //     {shelfViewList ? 
                //        cellarDetails.map((wineItem, WineIndex) => {
                //         return(
                //           // <Text>{wineItem.cost}</Text>
                //           <Pressable style={{width: '100%',
                //                         paddingHorizontal: 7
                        
                //           // backgroundColor:'blue',
                //           }}
                //           onPress={ () => {
                //             console.log(cellarID)
                //             navigationRef.navigate('WineInventory', {type : cellarID})
                //           } }
                //           key={wineItem.id}>
                //             {true && <>
                //               <View style={{flexDirection: 'row',
                //                         alignItems: 'center',
                //                         justifyContent: 'space-between',
                //                         borderTopWidth: 3,
                //                         borderColor: '#eee',}}>
                //               <View>
                //                   <Text>{wineItem.name}</Text>
                //                   <Text>{wineItem.year}</Text>
                //               </View>
                //               {heart}
                //           </View>
                //           <View style={{flexDirection: 'row',
                //             paddingVertical: 7,
                //             // backgroundColor: 'red'
                //             }}>
                //             <Image
                //                   source={require("../../assets/wineCellar.jpg")}
                //                   style={{width: 60, height: 100, borderRadius: 20, backgroundColor: 'blue'}}>
                //             </Image>
                //             <View style={{paddingLeft: 12,
                //                           flex: 1}}>

                //                 <View style={{flexDirection: 'row',
                //                               // paddingRight: 20
                //                               }}>

                //                     <View  style={{flexDirection: 'row',
                //                                     alignItems: 'center',
                //                                     flex: 1}}>
                //                       {dot}
                //                       <Text style={{paddingLeft: 3, fontSize: fontSmall}}>{wineItem.capacity}ml</Text>
                //                     </View>
                //                     <View style={{flexDirection: 'row',
                //                                     alignItems: 'center',
                //                                     flex: 2}}>
                //                       {locationSmall}
                //                         <Text style={{paddingLeft: 3}}>{wineItem.production_place}</Text>
                //                     </View>
                //                 </View>

                //                 <View style={{flexDirection: 'row',
                //               justifyContent: 'space-between',
                //               paddingRight: 20}}>

                //                     <View style={{flexDirection: 'row',
                //                                     alignItems: 'center',
                //                                     flex: 3}}>
                //                       {briefcase}
                //                       <Text style={{paddingLeft: 3}}>{wineItem.case} Case</Text>
                //                     </View>
                //                     <View style={{flexDirection: 'row',
                //                                     alignItems: 'center',
                //                                     flex: 2}}>
                //                         {bottleSmall}
                //                         <Text style={{paddingLeft: 3}}>{wineItem.bottle} Btl</Text>
                //                     </View>
                //                     <View style={{flexDirection: 'row',
                //                                     alignItems: 'center',
                //                                     flex: 3}}>
                //                         {bottleWine}
                //                         <Text style={{paddingLeft: 0}}>14 Btl Total</Text>
                //                     </View>
                //                 </View>
                //                 <View style={{flexDirection: 'row', paddingTop: 6}}>
                //                     <View style={{flexDirection: 'row',
                //                                     alignItems: 'center',
                //                                     flex: 8}}>
                //                       {coins}
                //                         <Text style={{paddingLeft: 3}}>HKD {wineItem.cost}</Text>
                //                     </View>
                //                     {/* <View style={{flexDirection: 'row',
                //                                     alignItems: 'center',
                //                                     flex: 15
                //                                   }}>
                //                         {shelf}
                //                         <Text style={{paddingLeft: 3}}>Shelf {item.id}</Text>
                //                     </View> */}
                //                 </View>
                //             </View>
                //           </View>
                //             </>}

                //         </Pressable>
                //         )
                //       }) 
                //     :
                //       <Pressable 
                //       style={{
                //         // 'backgroundColor' : '#ddd',
                //         'flex' : 1,
                //         'flexDirection' : 'row',
                //         'flexWrap' : 'wrap'
                //       }}
                //       onPress={ () => {
                //         console.log(cellarID)
                //         navigationRef.navigate('WineInventory', {type : cellarID})
                //       } }
                //       >
                //       {
                //       cellarDetails.map( (wine, index) => {
                //         return (
                //             <View style={{
                //               borderWidth: 3,
                //               borderColor: '#eee',
                //               borderRadius: 30,
                //               padding: 10,
                //               flex: 1,
                //               minWidth: 150,
                //               maxWidth : 170,

                //               marginHorizontal: 7,
                //               alignItems : 'center',
                //               marginVertical: 7,
                //             }}
                //             key={index}>
                //                 <View style={{
                //                   width : '100%'
                //                 }}>
                //                   <Text>{wine.name}</Text>
                //                   <Text>{wine.year}</Text>
                //                 </View>

                //                 <View>
                //                     <Image source={require("../../assets/wineBottle.png")}
                //                             style={{
                //                               width : 50,
                //                               height : 100,
                //                               // backgroundColor : 'red'
                                            
                //                             }}
                //                             resizeMode = 'stretch'
                //                               ></Image>
                //                 </View>

                //                 <View style={{flexDirection: 'row',
                //                 width: '100%',
                //                 justifyContent: 'space-between'}}
                //                       >
                //                     <View style={{flexDirection: 'row'}}>
                //                         {briefcase}
                //                         <Text> {wine.case} Case</Text>
                //                     </View>
                //                     <View style={{flexDirection: 'row'}}>
                //                         { bottleSmall}
                //                         <Text> {wine.bottle} Btl</Text>
                //                     </View>
                //                 </View>

                //                 {/* <View style={{
                //                   width: '100%'
                //                 }}>
                //                     <View style={{flexDirection: 'row'}}>
                //                         {shelf}
                //                         <Text>Shelf {shelfItem.id}</Text>
                //                     </View>
                //                 </View> */}

                //             </View>
                //         )
                //       } )
                //     }
                //       </Pressable>
                //   }
                // </>
                }
                
            
            
        </View>
      )

    }
    
    const editSettings = () => {

      console.log(edit , current)
      if (edit) {
        if (current.toLowerCase() == "my cellar") {
          console.log(Cellar[0].name, Cellar[0].location, Cellar[0].phone)
          console.log(nameSettingsModal, locationSettingsModal, telSettingsModal)
          if ( current.toLowerCase() == "my cellar" && 
          (Cellar[0].name.toLowerCase() != nameSettingsModal.trim().toLowerCase() ||
          Cellar[0].location.toLowerCase() != locationSettingsModal.trim().toLowerCase() ||
          Cellar[0].phone.toLowerCase() != telSettingsModal.trim().toLowerCase()) )
          {
            console.log("Editing..........................")
            dispatch(editCellarSettings({
              id : cellarID,
              current : current,
              item : {
                name : nameSettingsModal.trim(),
                location : locationSettingsModal.trim(),
                phone : telSettingsModal.trim(),
              }
    
            }))
  
          }
          else {
            console.log("No change made..........")
          }
          
  
        }
        else {
          console.log("Not my Cellar........")
        }
      }

      Setedit(!edit)
    } 

    const showMyFavorite = () => {
      SetcellarID(1)

      return ShowCellarDetails()

    }

    const headerCheck = () => {
      if ( current.toLowerCase() == 'my cellar' ) {
        return 'My Cellar'
      }
      else if ( current.toLowerCase() == 'my wine list') {
        return 'My Wine List'
      }
      else if ( current.toLowerCase() == 'my favorite') {
        return 'My Favorite'
      }
      else return 'Unknown'
    }

    const checkCellarForIconDisplay = () => {
         if ( current.toLowerCase() == 'my cellar' ) {
          return (
              <Image
                source={Icon}
                style={{
                  width: 20,
                  height : 20,
                }}
                resizeMode='stretch'>
            </Image>
          )
        }
        else if ( current.toLowerCase() == 'my wine list') {
          return clipboardIcon
        }
        else if ( current.toLowerCase() == 'my favorite') {
          return <FontAwesome name="heart" size={25} color= '#fff' />
        }
        else return 'Unknown'
    }

    
    const bellWithBadge = () => {
      return (
        <View>
          {bell}
          <View>
              <Text></Text>
          </View>
        </View>
      )
    }

  

   // Display a Loading Icon if Data is not Loaded
   if (isLoading) {
    return (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    )
  }

  // ***********************************Main ******************************************
  return (
        <SafeAreaView style={{
          backgroundColor : '#fff',
          flex : 1
        }}>
  
           <Header 
            title= {
              // str.charAt(0).toUpperCase() + str.slice(1);
               headerCheck()
              // myWineList != 0 ? 'My Wine List' : 'My Cellar'
            }
            icon =  {
              checkCellarForIconDisplay()
            //   myWineList != 0  ? clipboardIcon : <Image
            //   source={Icon}
            //   style={{
            //     width: 20,
            //     height : 20,
            //   }}
            //   resizeMode='stretch'>
            // </Image>
            }

            subtitle = {bell}
            subtitleFontSize={fontSmall}
            color = '#fff' 
            backgroundColor = {primaryColor} 
            titleFontSize = {fontLarge} 
            subtitleFunc = { () => {
              navigationRef.navigate('Notification')
            } }
            // borderR = {Cellar.length != 0 ? 0 : 10}
            borderR = {(current.toLowerCase() == 'my cellar' && Cellar.length != 0) || (current.toLowerCase() == 'my wine list' && myWineList.length != 0) ?
                        0 : 10 }
            // borderR = { checkCellarListLength() }

            />
          
            {/* <View style={{
                backgroundColor : primaryColor,
                height : 30,
                width : '100%',
            }}>

            </View>
            <View style={{ alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor : primaryColor,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            paddingVertical : 10,
                            paddingBottom : 15,
                            }}>
                
                <View style={{flexDirection: 'row',
                            alignItems: 'center',
                            width: '90%',
                            justifyContent: 'space-between',
                            }}>
                    
                    <Image
                      source={Icon}
                      style={{
                        width: 20,
                        height : 20,
                        marginRight : 20
                      }}
                      resizeMode='stretch'>
                    </Image>

                    <Text style={{color: '#fff', fontWeight: '500', fontSize: fontLarge}}>My Cellar</Text>
                    <Pressable style={{
                      marginLeft : 'auto'
                    }}
                    hitSlop={20}
                    onPress={() => {
                      navigationRef.navigate('Notification')
                    }}>
                        
                        <View>{bell}</View>
                    </Pressable>
                </View> 
            </View> */}
            <ScrollView 
          style={{
            backgroundColor: '#fff',
            paddingBottom : 30,
            flex : 1
          }}
                      refreshControl={
                        <RefreshControl 
                            refreshing = {refreshing}
                            onRefresh= {() => {
                              
                              Setrefreshing(true)
                              // SetcellarID()
                              // SetisLoading(true)
                              Setrefreshing(false)
                            }}/>
                      }
                      >

            {/* Edit Cellar */}
            <Modal
            visible = {cellarSettingsModal}
            backgroundColor ='#000'
            transparent
            onRequestClose = {() => {
              SetcellarID()
              SetcellarSettingsModal(false)
            }}
            animationType= 'slide'>
                  <ScrollView
                  >
                    <View style={[styles.formContainer, 
                                        {
                                          backgroundColor: primaryColor, 
                                                            marginTop: 50,
                                                            paddingTop: 15, 
                                                            flex : 1,
                                                            marginBottom: 50, 
                                                            borderRadius: 70,
                                                          borderTopLeftRadius: 0,
                                                        borderTopRightRadius: 0,
                                                        alignItems: 'center', justifyContent: 'center'}]}
                                // contentContainerStyle={{}}
                                >
                                     {
                                              // myWineList.length == 0 
                                              current.toLowerCase() == 'my cellar'
                                              ?
                                              Cellar.filter( (item) => {
                                                return item.id == cellarID && item
                                              })
                                              .map( (_item) => {
                                                return (
                                                  <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}} key={_item.id}>
                                                    <View style={[styles.form, {flex: 1}]} key={_item.id}>
                                                      <View style={{flexDirection: 'row', alignItems: 'center',
                                                                    // backgroundColor: 'blue'
                                                                    marginBottom: 30
                                                                    }}>

                                                        <View style={{flexDirection: 'row', 
                                                                      // backgroundColor: '#ddd',
                                                                      alignItems: 'baseline',
                                                                      position: 'absolute',
                                                                      left: 0, 
                                                                      right: 0, 
                                                                      bottom: 0, 
                                                                      top: 0, 
                                                                      justifyContent: 'center',
                                                                      alignItems: 'center'}}>
                                                            
                                                            <View>
                                                          
                                                              <Image
                                                                    // source={require("../../assets/wineCellar.jpg")}
                                                                    source={{uri : editCellarImage ? editCellarImage : _item.avatar}}
                                                                    style={{width: 70, height: 70, borderRadius: 50, backgroundColor: 'blue'}}>
                                                              </Image>
                                                              <Pressable style={{ 
                                                                                position: 'absolute',
                                                                                bottom: 1,
                                                                                right: -10}}
                                                                        hitSlop={20}
                                                                        onPress={ () => {
                                                                          showImagePicker(SeteditCellarImage)
                                                                        }}>
                                                                    {pencilIcon}
                                                              </Pressable>
                                                            </View> 

                                                        </View>
                                                        <View style={{flex: 1, 
                                                                      flexDirection: 'row',
                                                                      justifyContent: 'flex-end',
                                                                      paddingRight: 30}}>
                                                            <Pressable onPress={ () => {
                                                                
                                                                editSettings()
                                                                
                                                            }}

                                                            style={ ({pressed}) => [
                                                              {backgroundColor : pressed ? iconColorTwo : '#fff', padding : 5, borderRadius : 10}
                                                            ]}>
                                                              {
                                                                !edit ? 
                                                                <>
                                                                  <Text style={{color: primaryColor,
                                                                            fontSize: 18,
                                                                            fontWeight: '500'}}>Edit</Text>
                                                                  <View style={{ 
                                                                                  position: 'absolute',
                                                                                  bottom: 1,
                                                                                  right: -15}}>
                                                                      {pencilIcon}
                                                                  </View>
                                                                </>
                                                                :
                                                                <Text style={{color: tetiaryColor,
                                                                fontSize: 18,
                                                                fontWeight: '500'}}>Save</Text>

                                                              }
                                                             
                                                            </Pressable>
                                                            
                                                        </View>
                                                      </View>

                                                      <View>
                                                        <View style={{width: 300, marginTop: 10}}>
                                                          <TextInput
                                                                // onChangeText={ (e) => {
                                                                //   SetnameSettingsModal(e.target.value)
                                                                // }}
                                                                onChangeText={SetnameSettingsModal}
                                                                value={nameSettingsModal}
                                                                borderRadius= {4}
                                                                fontSize = {fontSmall}
                                                                editable= { edit }
                                                                
                                                                style={{padding: 5, fontSize: fontSmall, borderWidth: 1, borderColor: '#ddd'}}
                                                              />
                                                            <Text>- {_item.type}</Text>
                                                        </View>
                                                      </View>

                                                      <View style={{marginTop: 15, width: 300, flexDirection: 'row', alignItems: 'center'}}>
                                                        <View style={{paddingRight: 10}}>
                                                          {locationIcon}
                                                        </View>

                                                        <View
                                                          style={{borderWidth: 1, borderColor: '#ddd', flex: 1}}>
                                                          <TextInput 
                                                            multiline
                                                            numberOfLines={4}
                                                            onChangeText={SetlocationSettingsModal}
                                                            value = {locationSettingsModal}
                                                            textAlignVertical= 'top'
                                                            editable= { edit }
                                                            style={{padding: 5, fontSize: fontSmall}}
                                                          />
                                                        </View>
                                                      </View>

                                                      <View style={{marginTop: 15, width: 300, flexDirection: 'row', alignItems: 'center'}}>
                                                        <View style={{paddingRight: 10}}>
                                                          {callIcon}
                                                        </View>

                                                        <View
                                                          style={{borderWidth: 1, borderColor: '#ddd', flex: 1}}>
                                                          <TextInput 
                                                            onChangeText={text => SettelSettingsModal(text)}
                                                            value = {telSettingsModal}
                                                            editable= { edit }
                                                            style={{padding: 5, fontSize: fontSmall}}
                                                          />
                                                        </View>                                
                                                      </View>

                                                      <View style={{marginTop: 15, width: 300, flexDirection: 'row', alignItems: 'center'}}>
                                                        <View style={{paddingRight: 10}}>
                                                          {wineIcon}
                                                        </View>

                                                        <View>
                                                          <Text>{_item.case} Case + {_item.bottle} Bottle</Text>
                                                          
                                                        </View>                                
                                                      </View>

                                                      <View style={{marginTop: 15, width: 300, flexDirection: 'row', alignItems: 'center'}}>
                                                        <View style={{paddingRight: 10}}>
                                                          {serverIcon}
                                                        </View>

                                                        <View>
                                                          <Text>HKD ${_item.market_value}</Text>
                                                        </View>                                
                                                      </View>
                                                      
                                                      <View style={{ marginTop : 30}}>
                                                        {
                                                          _item.type.toLowerCase() == 'ai cellar'  && _item.binded ?
                                                          <ButtonDouble 
                                                            leftText = 'Unbind Cellar'
                                                            rightText = 'Update Wifi'
                                                            
                                                            colorPressed = {primaryColor}
                                                            colorNotPressed = {secondaryColor}
                                                            textColor = '#fff'
                                                            leftTextonPress= { unbindCellar }
                                                            rightTextonPress = { async () => 
                                                              {
                                                                EditCellarConfirmToRoute({ _title : 'Update Wi-Fi setting for AI Cellar', _method : 'update', _data : []})}
                                                              }
                                                            
                                                            paddingVertical = {10} 
                                                            paddingHorizontal = {20}
                                                            fontSize = {fontSmall}
                                                            />
                                                            :
                                                            <Pressable  style={({pressed}) => [
                                                                      { backgroundColor: pressed ? primaryColor : secondaryColor,
                                                                        borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2', justifyContent: 'center'},
                                                                      
                                                                    ]}
                                                                    onPress={ () => SetdeleteCellarModal(true)}>
                                                                  <Text style={{color : '#fff', paddingHorizontal : 20, paddingVertical : 10, fontSize : fontSmall}}>Delete</Text>
                                                            </Pressable>
                                                            
                                                        }
                                                      </View>
                                                    
                                                      {/* <View style={{flexDirection: 'row', width: '100%', flex: 1, justifyContent: 'space-evenly', paddingTop: 20}}>
                                                          <Pressable
                                                            onPress={unbindCellar}
                                                            style={({pressed}) => [
                                                              { backgroundColor: pressed ? primaryColor : secondaryColor, borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2'},
                                                              
                                                            ]}>
                                                              <Text style={{color: '#eee', paddingHorizontal: 20, paddingVertical: 10, fontSize: fontSmall}}>Unbind Cellar</Text>
                                                          </Pressable>
                                                          <Pressable
                                                            onPress={() => {
                                                              SetaddCellarModal(false)
                                                            }}
                                                            style={({pressed}) => [
                                                              { backgroundColor: pressed ? primaryColor : secondaryColor, borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2'},
                                                              
                                                            ]}>
                                                              <Text style={{color: '#eee', paddingHorizontal: 20, paddingVertical: 10, fontSize: fontSmall}}>Update WiFi</Text>
                                                          </Pressable>
                                                      </View> */}

                                                    </View>
                                                      <Pressable
                                                      hitSlop={20}
                                                        onPress={() => {
                                                          SetcellarID()
                                                          SetcellarSettingsModal(false)
                                                        }}
                                                        style={{flexDirection: 'row', alignItems : 'center', paddingVertical: 8, marginVertical : 20}}
                                                        >
                                                          {arrowBack}
                                                        <Text style={{fontSize: fontLarge, color: '#eee', marginLeft : 5 }}>Return</Text>
                                                      </Pressable>
                                                  </View>
                                                )
                                              })
                                              :
                                              myWineList.filter ( (item) => {
                                                return item.id == cellarID && item
                                              })
                                              .map( (_item) => {
                                                return (
                                                  
                                                  <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}} key={_item.id} >
                                                  <View style={[styles.form, {flex: 1}]}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center',
                                                                  // backgroundColor: 'blue'
                                                                  marginBottom: 30
                                                                  }}>

                                                      <View style={{flexDirection: 'row', 
                                                                    // backgroundColor: '#ddd',
                                                                    alignItems: 'baseline',
                                                                    position: 'absolute',
                                                                    left: 0, 
                                                                    right: 0, 
                                                                    bottom: 0, 
                                                                    top: 0, 
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'}}>
                                                          
                                                          <View>
                                                        
                                                            <Image
                                                                  // source={require("../../assets/wineCellar.jpg")}
                                                                  source={{uri : editCellarImage ? editCellarImage : _item.avatar}}
                                                                  style={{width: 70, height: 70, borderRadius: 50, backgroundColor: 'blue'}}>
                                                            </Image>
                                                            <Pressable style={{ 
                                                                              position: 'absolute',
                                                                              bottom: 1,
                                                                              right: -10}}
                                                                      hitSlop={20}
                                                                      onPress={ () => {
                                                                        showImagePicker(SeteditCellarImage)
                                                                      }}>
                                                                  {pencilIcon}
                                                            </Pressable>
                                                          </View> 

                                                      </View>
                                                      <View style={{flex: 1, 
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-end',
                                                                    paddingRight: 30}}>
                                                          <Pressable onPress={ () => {

                                                              Setedit(!edit)

                                                          }}
                                                          style={ ({pressed}) => [
                                                            {backgroundColor : pressed ? iconColorTwo : '#fff', padding : 5, borderRadius : 10}
                                                          ]}>
                                                            {
                                                              !edit ? 
                                                              <>
                                                                <Text style={{color: primaryColor,
                                                                          fontSize: 18,
                                                                          fontWeight: '500'}}>Edit</Text>
                                                                <View style={{ 
                                                                                position: 'absolute',
                                                                                bottom: 1,
                                                                                right: -15}}>
                                                                    {pencilIcon}
                                                                </View>
                                                              </>
                                                              :
                                                              <Text style={{color: tetiaryColor,
                                                              fontSize: 18,
                                                              fontWeight: '500'}}>Save</Text>

                                                            }
                                                           
                                                          </Pressable>
                                                          
                                                      </View>
                                                    </View>

                                                    <View>
                                                      <View style={{width: 300, marginTop: 10}}>
                                                        <TextInput
                                                              onChangeText={ (e) => {
                                                                SetnameSettingsModal(e.target)
                                                              }}
                                                              value={nameSettingsModal}
                                                              borderRadius= {4}
                                                              fontSize = {fontSmall}
                                                              editable= { edit }
                                                              
                                                              style={{padding: 5, fontSize: fontSmall, borderWidth: 1, borderColor: '#ddd'}}
                                                            />
                                                          {/* <Text>- {_item.type}</Text> */}
                                                      </View>
                                                    </View>

                                                    <View style={{marginTop: 15, width: 300, flexDirection: 'row', alignItems: 'center'}}>
                                                      <View style={{paddingRight: 10}}>
                                                        {clipboard}
                                                      </View>

                                                      <View
                                                        style={{borderWidth: 1, borderColor: '#ddd', flex: 1}}>
                                                        <TextInput 
                                                          multiline
                                                          numberOfLines={4}
                                                          onChangeText={SetnoteSettingsModal}
                                                          value = {noteSettingsModal}
                                                          textAlignVertical= 'top'
                                                          editable= { edit }
                                                          style={{padding: 5, fontSize: fontSmall}}
                                                        />
                                                      </View>
                                                    </View>

                                                  

                                                    <View style={{marginTop: 15, width: 300, flexDirection: 'row', alignItems: 'center'}}>
                                                      <View style={{paddingRight: 10}}>
                                                        {wineIcon}
                                                      </View>

                                                      <View>
                                                        <Text>{_item.bottle} Bottle in Wine List</Text>
                                                        
                                                      </View>                                
                                                    </View>

                                                  <Pressable  style={({pressed}) => [
                                                              { backgroundColor: pressed ? primaryColor : secondaryColor,
                                                                borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2', justifyContent: 'center',
                                                              flexDirection : 'row', alignItems : 'center', justifyContent : 'center',
                                                            width : 150, paddingVertical : 7, marginTop : 30},
                                                              
                                                            ]}
                                                            onPress={ () => SetdeleteCellarModal(true)}>
                                                              <View style={{position : 'absolute', left : 5}}>
                                                                {trash}
                                                              </View>
                                                            
                                                          <Text style={{color : '#fff', fontSize : fontMidLg}}>Delete</Text>
                                                  </Pressable>
           

                                                  </View>
                                                    <Pressable
                                                    hitSlop={20}
                                                      onPress={() => {
                                                        SetcellarID()
                                                        SetcellarSettingsModal(false)
                                                      }}
                                                      style={{flexDirection: 'row', alignItems : 'center', paddingVertical: 8, marginVertical : 20}}
                                                      >
                                                        {arrowBack}
                                                      <Text style={{fontSize: fontLarge, color: '#eee', marginLeft : 5 }}>Return</Text>
                                                    </Pressable>
                                                  </View>
                                                  
                                                )
                                              })
                                            }
                    </View>
                  </ScrollView>
                  

            </Modal>

            {/* Add cellar */}
            <Modal
            visible = {addCellarModal}
            onRequestClose = {() => SetaddCellarModal(false)}
            transparent
            backgroundColor = 'red'
            animationType = 'fade'
            >
              <ScrollView style={styles.formContainer}
                          contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                  <View style={[styles.form, {flex: 1}]}>
                    <Text style={{fontWeight: '400' , fontSize: 20}}>{
                    // myWineList !=0 
                    current.toLowerCase() == 'my wine list'
                    ? 
                    'Add Wine List' : 'Add Cellar'}</Text>
                    <Text style={{height: 1,
                                  backgroundColor: 'red', 
                                  borderWidth: 1,
                                  marginVertical: 7, 
                                  width: '100%',     
                                  borderColor: '#EDEDED',
                                  }}></Text>
                    <View style={styles.browse}>
                      <Text style={{fontSize: fontLarge, fontWeight: '300'}}>{
                          // myWineList !=0 
                          current.toLowerCase() == 'my wine list'
                          ? 'Wine List Icon' : 'Cellar Icon'}</Text>
                      
                      <Pressable
                      onPress={ () => showImagePicker(setPickedImagePath)}
                      hitSlop= {10}
                      style={({pressed}) => [
                        { backgroundColor: pressed ? 'skyblue' : '#C0E1FA', borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2'},
                        
                      ]}>
                        <Text style={{paddingHorizontal: 35, paddingVertical: 8, fontSize: fontSmallest}}>Browse</Text>
                      </Pressable>
      
                  </View>
                  <View>
                      <Image 
                        source={pickedImagePath ? { uri: pickedImagePath } : placeholder}
                  
                        style={{width: 300, height: 150}}>
                      </Image>
      
                  </View>
                  
                  <View style={{width: 300, marginTop: 15}}>
                    <Text>{ 
                    // myWineList !=0 
                    current.toLowerCase() == 'my wine list'
                    ? 
                    'Wine List Name' : 'Location' }</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={current.toLowerCase() == 'my wine list'? SetwineListName : Setlocation}
                        value={ current.toLowerCase() == 'my wine list' ? wineListName : location}
                        borderColor= '#999'
                        borderRadius= {4}
                      />
                  </View>
                  <View style={{width: 300, marginTop: 15}}>
                    <Text>{ current.toLowerCase() == 'my wine list' ? 'Description' : 'Address' }</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={current.toLowerCase() == 'my wine list'? Setdescription : Setaddress}
                        value={ current.toLowerCase() == 'my wine list' ? description : address}
                        borderColor= '#999'
                        borderRadius= {4}
                      />
                  </View>
                  
                  {
                    // myWineList == 0 
                    current.toLowerCase() == 'my cellar'
                    &&
                      <View style={{paddingHorizontal: 5, width: 300, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', marginTop : 15}}>
                      <View style={{alignItems: 'center'}}>
                        <Pressable
                              onPress={() => {
                                toggleCellarChoice('Ai')
                              }}
                              style = {{ borderWidth: cellarChoice == 'Ai'  ? 4 : 0,  borderColor: '#8FD14F'}}
                              >
                          <Image 
                                source={require("../../assets/placeholder-image.png")}
                                style={{width: 120, height: 60}}
                              />
                        </Pressable>
                        <Text>AI Cellar</Text>
                      </View>
                      
                      <View style={{alignItems: 'center'}}>
                        <Pressable
                              onPress={() => {
                                toggleCellarChoice('Virtual')
                              }}
                              style = {{ borderWidth: cellarChoice == 'Virtual' ? 4 : 0, borderColor: '#8FD14F'}}
                              >
                          <Image 
                                source={require("../../assets/placeholder-image.png")}
                                style={{width: 120, height: 60}}
                              />
                        </Pressable>
                        <Text>Virtual Cellar</Text>
                      </View>
                      
                  </View>
                  }

                  <View style={{marginTop : 25}}>
                    <ButtonDouble
                      leftText = 'Confirm'
                      rightText = 'Cancel'
                      
                      leftTextonPress = {() => {
                        SetaddCellarModal(false)
                        if ( current.toLowerCase() == 'my wine list') {
                          AddWineListConfirm()
                        }
                        else if ( current.toLowerCase() == 'my cellar') {
                          if ( cellarChoice.toLowerCase() == 'ai' ) {
                            EditCellarConfirmToRoute( {_title : 'Enable AI Cellar to connect to WI-FI', _method : 'add', _data : []} ) 
                          }
                          else if ( cellarChoice.toLowerCase() == 'virtual' ) {
                            AddVirtualCellar()
                          }
                          else {
                            // console.log('Error in Adding', cellarChoice )
                          }
                        }
                        else {
                          // console.log('Neither AI or Virtual, Which is kinda messed up')
                        }
                        // myWineList !=0 
                        // current.toLowerCase() == 'my wine list'
                        // ? AddWineListConfirm() : EditCellarConfirmToRoute( {_title : 'Enable AI Cellar to connect to WI-FI', _method : 'add', _data : []} )
                      }}
                      rightTextonPress = {() => SetaddCellarModal(false)}
                      
                      colorPressed = {'#C0E1FA'}
                      colorNotPressed = {'skyblue'} 
                      textColor = '#000'
                      paddingVertical = {10}
                      paddingHorizontal = {35}
                    />
                  </View>
                  

                  {/* Bottons Cancel and Confirm *****001 */}

                  </View>
              </ScrollView>
            
            </Modal>

            {/* Confirm Unbind AI Cellar */}
            <Modal
            visible={confirmUnbindModal}
            transparent
            onRequestClose = {() => SetconfirmUnbindModal(false)}
            > 
              <View style={{flex: 1, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: '#00000099'
                            }}>
                <View 
                    style={[styles.form,
                            {width: '90%', backgroundColor: '#eee', borderRadius : 50}]}>
                    <Text style={{fontSize: fontLarge, color: primaryColor, letterSpacing: .75}}>Do you confirm to unbind this AI cellar?</Text>
                    <Text style={{padding: 10,marginTop: 15, marginBottom: 40, letterSpacing: .5}}>Once you unbind the cellar, you may not reconnet the AI cellar with this cellar list.
                          You have to add another cellar in binding with a new AI cellar.
                    </Text>
                  
                  <ButtonDouble
                   leftText = 'Confirm'
                    rightText = 'Cancel'
                   
                    leftTextonPress = {ConfirmUnbindCellar}
                    rightTextonPress = {() => SetconfirmUnbindModal(false)}
                    
                    colorPressed = {primaryColor}
                    colorNotPressed = {secondaryColor} 
                    textColor = '#fff'
                    paddingVertical = {10}
                    paddingHorizontal = {35}
                  />
                    
                </View>

                
              </View>
                

            </Modal>

            {/* Confirm delete Cellar  */}
            <Modal
            visible={deleteCellarModal}
            transparent
            onRequestClose = {() => SetdeleteCellarModal(false)}
            > 
              <View style={{flex: 1, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: '#00000099'
                            }}>
                <View 
                    style={[styles.form,
                            {width: '90%', backgroundColor: '#eee', borderRadius : 50}]}>
                    <Text style={{fontSize: fontLarge, color: primaryColor, letterSpacing: .75}}>Do you confirm to delete this Cellar?</Text>
                    <Text style={{padding: 10,marginTop: 15, marginBottom: 40, letterSpacing: .5}}>Once deleted, your AI cellar will automatically unbind.
                          You have to add another cellar list in binding with a new AI cellar.
                    </Text>
                  
                  <ButtonDouble
                   leftText = 'Confirm'
                    rightText = 'Cancel'
                   
                    leftTextonPress = {ConfirmDeleteCellar}
                    rightTextonPress = {() => SetdeleteCellarModal(false)}
                    
                    colorPressed = {primaryColor}
                    colorNotPressed = {secondaryColor} 
                    textColor = '#fff'
                    paddingVertical = {10}
                    paddingHorizontal = {35}
                  />
                    
                </View>

                
              </View>
                

            </Modal>

            {/* filter Cellar details */}
            <Modal
            visible = {filterCellarDetailsModal}
            onRequestClose = {() => SetfilterCellarDetailsModal(false)}
            transparent
            backgroundColor = 'red'
            animationType = 'fade'
            >
              <ScrollView style={styles.formContainer}
                          contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                  <View style={[styles.form, {flex: 1, paddingTop : 10 }]}>
                    <Text style={{fontWeight: '500' , fontSize: fontXXLarge, color : '#888',}}>Filter</Text>
                    <Text style={{height: 1,
                                  // backgroundColor: 'red', 
                                  borderWidth: 2,
                                  marginVertical: 7, 
                                  width: '107%',     
                                  borderColor: '#EDEDED',
                                  marginBottom : 20
                                  }}></Text>
                   
                  {
                    FilterItems.map( (item) => {
                      // let [ show, Setshow ] = useState(false)
                        return (
                          <View key={item.id} style={{width: 300, marginBottom: 20}}>
                            <Text style={{marginBottom: 5}}>{item.name}</Text>
     

                            <Pressable style={{
                              width : '100%',
                              borderWidth : 1,
                              alignItems : 'center',
                              flexDirection : 'row',
                              padding: 5,
                            }}
                            onPress = { () => {
                              // console.log(show)
                              // Setshow(!show)
                            } }>
                                <Text style={{
                                  // backgroundColor : 'red',
                                  marginRight : 'auto'
                                }}>{item.value}</Text>

                                <View style={{
                                  // backgroundColor : 'red'
                                  }}>
                                  {/* {show ? arrowUp : arrowDown} */}
                                </View>
                            </Pressable>


                            {/* <TextInput
                                style={styles.input}
                                onChangeText={item.changeValue}
                                value={item.value}
                                borderColor= '#999'
                                borderRadius= {4}
                                onFocus = { () => {
                                  Setshow(true)
                                } }
                                // onBlur
                              />
                              <View style={{
                                // backgroundColor : 'red',
                                position: 'absolute',
                                bottom : 5,
                                right : 5
                              }}>
                              {show ? arrowUp : arrowDown}
                              </View> */}
                            
                        </View>
                        )
                    } )
                  }
                  <View>
                  {/* <View style={{width: 300, marginTop: 20}}>
                    <Text style={{marginBottom: 5}}>Type of Wine</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={Setlocation}
                        value={location}
                        borderColor= '#999'
                        borderRadius= {4}
                      />
                  </View> */}
                  {/* <View style={{width: 300, marginTop: 20}}>
                    <Text style={{marginBottom: 5}}>Origin</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={Setaddress}
                        value={address}
                        borderColor= '#999'
                        borderRadius= {4}
                      />
                  </View>
                  <View style={{width: 300, marginTop: 20, backgroundColor: '#eee'}}>
                    <Text style={{marginBottom: 5}}>Bottle Size</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={Setaddress}
                        value={address}
                        borderColor= '#999'
                        borderRadius= {4}
                      />
                      <View style={{
                        // backgroundColor : 'red',
                        position: 'absolute',
                        bottom : 5,
                        right : 5
                      }}>
                      {arrowDown}
                      </View>
                      
                  </View>
                  <View style={{width: 300, marginTop: 20}}>
                    <Text style={{marginBottom: 5}}>Collection Type</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={Setaddress}
                        value={address}
                        borderColor= '#999'
                        borderRadius= {4}
                      />
                  </View> */}
                  </View>

                  <ButtonDouble
                    rightText = 'Confirm'
                    leftText = 'Reset'
                    leftTextonPress = {() => {
                      SetfilterCellarDetailsModal(false)
                      // navigation.navigate('connectToWifi')
                    }}
                    rightTextonPress = {() => SetfilterCellarDetailsModal(false)}
                    
                    colorPressed = {'#C0E1FA'}
                    colorNotPressed = {'skyblue'} 
                    textColor = '#000'
                    paddingVertical = {10}
                    paddingHorizontal = {30}
                    fontSize = {fontSmall}
                  />

                  {/* Bottons Cancel and Confirm *****001 */}

                  </View>
              </ScrollView>
            
            </Modal>

            {/* Quit Modal */}
            <Modal
            visible={quitAppModal}
            transparent
            onRequestClose = {() => SetquitAppModal(false)}
            > 
              <View style={{flex: 1, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: '#00000099'
                            }}>
                <View 
                    style={[styles.form,
                            {width: '90%', backgroundColor: '#eee', borderRadius : 50}]}>
                    <Text style={{fontSize: fontLarge, color: primaryColor, letterSpacing: .75, marginBottom : 70}}>Do you wish to exit?</Text>
                    <Text style={{padding: 10,marginTop: 15, marginBottom: 40, letterSpacing: .5}}> Do you wish to exit?
                    </Text>
                  
                  <ButtonDouble
                   leftText = 'Confirm'
                    rightText = 'Cancel'
                   
                    leftTextonPress = { async() => {
                      SetquitAppModal(false)
                      BackHandler.exitApp()
                    } }
                    rightTextonPress = {() => SetquitAppModal(false)}
                    
                    colorPressed = {primaryColor}
                    colorNotPressed = {secondaryColor} 
                    textColor = '#fff'
                    paddingVertical = {10}
                    paddingHorizontal = {35}
                  />
                    
                </View>

                
              </View>
                

            </Modal>
            
            {/* <AlertModal
              title = 'Do you wish to quit' 
              // text
              // leftButtonText 
              // rightButtonText
              leftTextonPress = {
                async() => {
                  await SetquitAppModal(false)
                  BackHandler.exitApp()
                }
              }
              rightTextonPress = {
                () => SetquitAppModal(false)
              }
              // colorPressed
              // colorNotPressed
              // textColor
              // paddingVertical
              // paddingHorizontal
              modalState = {quitAppModal}
              SetmodalState = {SetquitAppModal}
            /> */}
          
           
            <View style={{width: '100%', marginBottom : 30}}>
             
              {/* {console.log('Heloooo', Cellar.length)} */}
              {
                (current.toLowerCase() == 'my cellar' && Cellar.length !== 0 ) &&
                <View style={{position : 'absolute', width : '100%', backgroundColor : primaryColor,  borderBottomLeftRadius : 15,
                borderBottomRightRadius : 15}}>
                  <View style={
                      {
                        alignItems: 'center',
                      justifyContent: 'center',
                    // position : 'absolute',
                    // backgroundColor : primaryColor,
                    // width : '100%',
                    // flex : 1
                    height : 100,
                    marginHorizontal : 10,
                  
                  }}>

                  </View>
                </View>
              }

              {
                ( current.toLowerCase() == 'my wine list' && myWineList.length !== 0
                  // current.toLowerCase() == 'my wine list'
                  // myWineList.length !== 0
                  ) &&
                <View style={{position : 'absolute', width : '100%', backgroundColor : primaryColor,  borderBottomLeftRadius : 15,
                borderBottomRightRadius : 15}}>
                  <View style={
                      {
                        alignItems: 'center',
                      justifyContent: 'center',
                    // position : 'absolute',
                    // backgroundColor : primaryColor,
                    // width : '100%',
                    // flex : 1
                    height : 100,
                    marginHorizontal : 10,
                  
                  }}>

                  </View>
                </View>
              }
            
              <View 
                style={[styles.body,
                  {
                    alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor : '#fff',
                  backgroundColor : 'transparent'
              }]}
                >
        
                  {/* < ShowCellar cellarArray={ 
                    // myWineList.length != 0 
                    current.toLowerCase() == 'my wine list'
                    ? myWineList : Cellar} /> */}

                  { current.toLowerCase() == 'my cellar' && < ShowCellar cellarArray={  Cellar } /> }
                  { current.toLowerCase() == 'my wine list' && < ShowCellar cellarArray={  myWineList } /> }
                 
                
                <Pressable style={[styles.addCellarIcon,
                          {display: cellarID ? 'none': 'flex'}
                                                    ]}
                          onPress={addCellar}>
                {addCellarIcon}
                </Pressable>
              </View>

              {cellarID && !cellarSettingsModal && current.toLowerCase() != 'my favorite' && <ShowCellarDetails /> }

              {/* { current.toLowerCase() == 'my favorite' && showMyFavorite() } */}
              { current.toLowerCase() == 'my favorite' && <ShowCellarDetails /> }
            </View> 
          
           
            
            

          </ScrollView>
        </SafeAreaView>
    



        // <>
        //   <Tab.Navigator
        //   shifting={false}
        //   barStyle={{display: 'none'}}>
        //     <Tab.Screen name="Feed" component={() => <Text>Feed</Text>} />
        //     <Tab.Screen name="Messages" component={() => <Text>Message</Text>} />
            
        //   </Tab.Navigator>
        //     <Pressable
        //     onPress={() => {
        //       navigation.navigate('Messages')
        //     }}>
        //     <Text>Press Me</Text>
        //   </Pressable>
        // </>
  )
}



const styles = StyleSheet.create ({
  body: {
    margin: 15,
  },

  tinyLogo: {
    width: 100,
    margin: 50
  },
  formContainer: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingTop: 50
    // justifyContent: 'center'
  },
  form: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 80,
    justifyContent: 'center',
    marginHorizontal: 15,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  browse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5
  },
  input: {
    height: 40,
    // width: 300,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  AiContainer: {
    width: '100%',
    padding: 10,
    paddingTop: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E6E6E6',
    backgroundColor : '#fff',
    marginBottom : 10
  },
  AiHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  AiMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AiMid: {
    borderBottomColor: '#999', 
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  imageContainer: {
    backgroundColor: '#ddd',
    borderRadius: 100,
    marginRight: 15,
  },
  image: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius : 50
  },
  addCellarIcon: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 25,
    elevation: 5

  }
})

export default Collection
