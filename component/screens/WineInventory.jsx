import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, ActivityIndicator, Image, ImageBackground, Linking, Modal, Pressable, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { useSelector, useDispatch } from 'react-redux'
import { setWineInventory, updateRating, setIsloading } from '../../redux/wineInventorySlice'

import ButtonDouble from '../ButtonDouble'
import backGround from '../../assets/background.jpg'
import wineCellar from "../../assets/wineCellar.jpg"
import Rating from './Rating'
import { navigationRef } from '../RootNavigation'

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#fbc700'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddTastingNote from './AddTastingNote'

const dot = <Octicons name="dot-fill" size={35} color= {primaryColor} />;
const dotSmall = <Octicons name="dot-fill" size={20} color= {iconColorTwo} />;


const addBox = <MaterialIcons name="add-box" size={30} color= {tetiaryColor} />;
const arrowDown = <MaterialIcons name="arrow-drop-down" size={25} color="#000" />;
const arrowUp = <MaterialIcons name="arrow-drop-up" size={25} color="#000" />;

const wineBottle = <MaterialCommunityIcons name="bottle-wine" size={25} color= '#E0C393' />;
const tag = <MaterialCommunityIcons name="tag" size={20} color= '#E0C393' />;
const grapeVine = <MaterialCommunityIcons name="fruit-grapes-outline" size={30} color= {iconColorOne} />;
const palette = <MaterialCommunityIcons name="palette" size={30} color= {iconColorOne} />;
const building = <MaterialCommunityIcons name="office-building" size={30} color= {iconColorOne} />;
const region = <MaterialCommunityIcons name="diving-scuba-flag" size={30} color= {iconColorOne} />;
const heart = <MaterialCommunityIcons name="heart-outline" size={30} color= {primaryColor} />;

const emailLetter = <MaterialCommunityIcons name="email-newsletter" size={16} color= {secondaryColor} />;
const plusBox = <MaterialCommunityIcons name="plus-box" size={25} color= {secondaryColor} />;
const minusBox = <MaterialCommunityIcons name="minus-box" size={25} color= {secondaryColor} />;
const close = <MaterialCommunityIcons name="close" size={25} color= {secondaryColor} />;





const wineGlass = <FontAwesome5 name="wine-glass-alt" size={20} color={secondaryColor} />;
const plus = <FontAwesome5 name="plus" size={20} color={secondaryColor} />;
const minus = <FontAwesome5 name="minus" size={20} color={secondaryColor} />;
const briefcase = <FontAwesome5 name="briefcase" size={25} color={primaryColor} />;
const coins = <FontAwesome5 name="coins" size={16} color="gold" />;
const shelf = <FontAwesome5 name="database" size={25} color={primaryColor} />;
const bottle = <FontAwesome5 name="wine-bottle" size={25} color={primaryColor}/>

const ellipse = <MaterialCommunityIcons name="circle" size={12} color= {iconColorOne} />
const ellipse_o = <MaterialCommunityIcons name="circle-outline" size={12} color= {iconColorOne} />



// const spinner = <EvilIcons name="spinner" size={50} color= '#000' />;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height





const WineInventory = ({ navigation, route }) => {
    
    const { id, type} = route.params
    // const type = 'general page'
    // const [isLoading, setIsLoading] = useState(true);
    const isCarousel = useRef(null)
    const  [ currentImage, SetcurrentImage ] = useState(0)
    const [ favorite, Setfavorite ] = useState(false)

    const  [ viewAll, SetviewAll ] = useState(false)
    const  [ selectVirtualCellar, SetselectVirtualCellar ] = useState(false)

    // **Modal** to toggle the add, transfer, reduce or delete modal *****
    const [ wineMethodModal, SetwineMethodModal] = useState(false)

    const [ addTransRedState, SetaddTransRedState ] = useState('Add')
    const [ btlSize, SetbtlSize ] = useState(750)
    const [ btlSizeArrow,  SetbtlSizeArrow ] = useState(false) 
    const [ btlOrCaseArrow,  SetbtlOrCaseArrow ] = useState(false) 
    
    // bottle or case
    const [ bottleOrCase, SetbottleOrCase ] = useState('Btl')
    const [ btlCount, SetbtlCount ] = useState(1)
    const [ caseCount, SetcaseCount ] = useState(1)
    const [ deleteAddCount, SetdeleteAddCount ] = useState(1)
    // Number of bottles per case
    const [ btlPerCase, SetbtlPerCase ] = useState(4)
    const [ btlPerCaseOptions, SetbtlPerCaseOptions ] = useState( [4 , 6, 12] )
    const [ btlPerCaseArrow, SetbtlPerCaseArrow ] = useState(false)

    //Wine Reduce reason
    const [ reduceReason, SetreduceReason ] = useState('Enjoyed')

    // Transer to arrow State
    const [ transferToArrow, SettransferToArrow ] = useState(false)


    const [ myRating, SetmyRating ] = useState(2.5)

    // **Modal** to display rating box ******
    const [ myRatingModal, SetmyRatingModal ] = useState(false)
    // const [ star1 , Setstar1 ] = useState(true)
    // const [ star2, Setstar2 ] = useState(true)
    // const [ star3, Setstar3 ] = useState(true)
    // const [ star4, Setstar4 ] = useState(true)
    // const [ star5, Setstar5 ] = useState(true)

    // for Delete Method AI CELLAR
    const [ myCost, SetmyCost ] = useState()

    // **Modal** to Display Inventory Record
    const [ inventoryRecordModal, SetinventoryRecordModal ] = useState(false)
    const [ inventoryRecord, SetinventoryRecord ] = useState(
        [
            {
                'icon' : 'plus',
                'date' : '2020-06-27',
                'time' : '09:25',
                'type' : 'Bottle',
                'capacity' : 750,
                'number' : 1
            },
            {
                'icon' : 'minus',
                'date' : '2020-02-27',
                'time' : '13:25',
                'type' : 'Bottle',
                'capacity' : 750,
                'number' : 3
            },
            {
                'icon' : 'minus',
                'date' : '2020-01-27',
                'time' : '18:02',
                'type' : 'Case',
                'capacity' : 750,
                'number' : 6
            },
            {
                'icon' : 'minus',
                'date' : '2020-01-27',
                'time' : '18:02',
                'type' : 'Case',
                'capacity' : 750,
                'number' : 2
            }
        ]
    )
    const { wineInventory } = useSelector( (store) => store.wineInventory )
    const { isLoading } =  useSelector( (store) => store.wineInventory )
    const [ load, Setload] = useState(false);
    const dispatch = useDispatch();

    // useEffect( () => {
    //     if (myRating) {
    //         )
    //     }
    // }, [myRating] )

    useEffect(() => {
        // 👇️ set isMounted to true
        // let isMounted = true;
        dispatch(setIsloading(true))
        
        // console.log(isLoading, "***********")
        

        const fetchData = async () => {
        const result = await Promise.resolve([
            {
                'id' : 1,
                'name' : 'Chateau Canon Saint-Emilion Grand Cru (Premier Grand Cru Classe)',
                'avatars' : [
                    {
                        'id' : 1,
                        'avatar' : "https://uploads-ssl.webflow.com/5e86c7170f1ab21474c3f2a4/5ee31283397991860b2f08c5_Wine%20bottle%20tute_7.JPG",
      
                    },
                    {   'id' : 2,
                        'avatar' : "https://s3.amazonaws.com/lastbottle/products/LB3J5RAC-995159.jpg",
                    }
                ],
                'favorite' : false,
                'backgroundimage' : 'https://rozendal.co.za/wordpress2/wp-content/uploads/bfi_thumb/Featured-Image-wine-farms-n2uyq8iy5f2r9u0x7p4g0u9vov3nr6yp973irtk0x8-n2uyt2zcucz0fbw3lfes2mf4fv2o279fza7g2zc430.jpg',
                'vintage' : '1982',
                'volume' : '750',
                'location' : 'Bordeaux Saint-Emilion, France',
                'myrating' : 3.5,
                'average' : 4.2,
                'rp' : '-',
                'js' : '-',
                'ws' : '-',
                'bh' : '-',
                'we': '-',
                'texture' : 1,
                'fruity' : 5,
                'oak' : 4,
                'acidity': 6,
                'tannins' : 2,
                'sweetness' : 9,
                'aboutinfo' :     [
                    {
                        'name' : 'Winery',
                        'value' : 'Chateau Angelus',
                        'logo' : building
                    },
                    {
                        'name' : 'Grape Variety',
                        'value' : 'Merlot',
                        'logo' : grapeVine
                    },
                    {
                        'name' : 'Region',
                        'value' : 'Saint-Emilion Grand Cru',
                        'logo' : region
                    },
                    {
                        'name' : 'Color',
                        'value' : 'Red',
                        'logo' : palette
                    },

                ],
                // 'winery' : 'Chateau Angelus',
                // 'grapevariety' : 'Merlot',
                // 'region' : 'Saint-Emilion Grand Cru',
                // 'color' : 'Red',
                'hkd' : '83,462',
                // 'rate' : '9.4',
                // '_rate' : 'gain',
                'mycosthkd' : '79,462',
                'btlpercase' : 6,
                'case' : 5,
                'bottle' : 28,
                'history' : [
                    {
                        'id' : 1,
                        'method' : 'add',   
                        'date' : '2020-06-27',
                        'time' : '09:25',
                        'volume' : '750',
                        'type' : 'bottle',
                        'amount' : 1,
                    },
                  
                    {
                        'id' : 2,
                        'method' : 'delete',   
                        'date' : '2020-06-27',
                        'time' : '09:25',
                        'volume' : '750',
                        'type' : 'bottle',
                        'amount' : 3,
                    },
                    {
                        'id' : 3,
                        'method' : 'delete',   
                        'date' : '2020-06-27',
                        'time' : '09:25',
                        'volume' : '750',
                        'type' : 'case',
                        'amount' : 6,
                        'bottlepercase' : 12
                    },
                    {
                        'id' : 4,
                        'method' : 'delete',   
                        'date' : '2020-06-27',
                        'time' : '09:25',
                        'volume' : '750',
                        'type' : 'case',
                        'amount' : 6,
                        'bottlepercase' : 12
                    },
                    {
                        'id' : 5,
                        'method' : 'delete',   
                        'date' : '2020-06-27',
                        'time' : '09:25',
                        'volume' : '750',
                        'type' : 'case',
                        'amount' : 6,
                        'bottlepercase' : 12
                    }
                ],
                'note' : 
                // [],
                    [
                        {
                            'id' : 1,
                            'title' : 'Flavor of this wine',
                            'text' : 'This wine is having a good flavor',
                            'date' : '2022-05-05'
                        },
                        {
                            'id' : 2,
                            'title' : 'Quality of wine',
                            'text' : 'This wine is has a good quality',
                            'date' : '2022-05-05',
                        }
                    ],
                'placeswithwine' : [
                    {
                        'id'  : 1,
                        'name' : 'DWB Club',
                        'image' : 'https://cdnimg.webstaurantstore.com/uploads/blog/2021/3/bartender-pouring-whiskey-colored-liquor-from-jigger-into-stainless-steel-shaker.jpg',
                        'bottle' : 21
                    },
                    {
                        'id'  : 2,
                        'name' : 'BMW Club',
                        'image' : 'https://cdnimg.webstaurantstore.com/uploads/blog/2021/3/female-bartender-at-upscale-bar-pouring-white-wine-from-bottle-into-glass.jpg',
                        'bottle' : 40
                    },
                ]

            }
        ]);


            // 👇️ only update state if component is mounted
            if (result) {
                console.log(isLoading, "is it loading************")
                dispatch(setWineInventory(result))
        
                SetmyRating(result[0].myrating)
                Setfavorite(result[0].favorite)
                console.log("Load Data")
                console.log(isLoading, "***********")
            }
        }
        console.log(wineInventory.length, "checking...")
        if ( wineInventory.length == 0  || load ) {
            fetchData();
        }
        else{
            console.log('data existing...')
            dispatch(setIsloading(false))
        }
        

        return () => {
        // 👇️ when component unmounts, set isMounted to false
        // isMounted = false;
        };
    }, [load]);

    // const [ tastingNote, SetTastingNote ] = useState(
    //     {
    //         'note' : 'This wine has a good flavour',
    //         'date' : '2022-05-05'
    //     }
    // )
    // const [ tastingNote3, SetTastingNote3 ] = useState(
    //     {}
    // )

    // const rating = (color) => {

    //     return (
    //       <Text style={{flexDirection : 'row'}}>
    //         <Ionicons name="md-star-sharp" size={12} color= {color} />
    //         <Ionicons name="md-star-sharp" size={12} color= {color} />
    //         <Ionicons name="md-star-sharp" size={12} color= {color} />
    //         <Ionicons name="md-star-sharp" size={12} color= {color} />
    //         <Ionicons name="md-star-half-sharp" size={12} color= {color} />
    //       </Text>
    //     )
    //   }

    const increaseRating = () => {
        myRating < 5 &&
        SetmyRating(myRating + 0.5)
    }
    const decreaseRating = () => {
        myRating > 1 &&
        SetmyRating(myRating - 0.5)
    }

    const UpdateRating = () => {
        SetmyRatingModal(false)
        dispatch(updateRating(myRating))
        // Setdata (
        //   data.map( (item) => item.myrating != myRating ? { ...item, myrating : myRating} : cellar
        // )
        // )
      }

    const viewTastingNote = ( { id, note } ) => {
        navigationRef.navigate( "ViewAllTastingNote", { id : id,  note : note} )
    }

    const addTastingNote = ( { id, note } ) => {
        navigationRef.navigate("AddTastingNote", { id : id, note : note})
    }

    // Inventory Record Component
    const HistoryRecord = ({record, fontSize, viewAll}) => {
        // console.log('Historrrrrrrry')
        // console.log(record)
        return (
            record.filter( (item) => {
                if (!viewAll) {
                    return item.id <= 3 && item
                }
                return item
                
            } )
            .map( (item) => {
                return (
                    <View style={{flexDirection : 'row', alignItems : 'flex-start', borderWidth : 1, borderColor : iconColorTwo, padding : 5, paddingHorizontal: 7, borderRadius : 4, marginTop : 15}}
                    key={item.id}>
                        <View style={{flex : 1/2, paddingRight : 3}}>
                            {
                                record.method == 'add' ?
                                <FontAwesome5 name= 'plus' size={15} color={secondaryColor} />
                                :
                                <FontAwesome5 name='minus' size={15} color={secondaryColor} />
                            }
                           
                        </View>
                        <Text style={{ flex : 2, fontSize : fontSize, fontWeight : 'bold'}}>{item.date}</Text>
                        <Text style={{flex : 1, fontSize : fontSize,}}>{item.time}</Text>
                        <Text style={{flex : 1, fontSize : fontSize, fontWeight : 'bold'}}>{item.volume} ml</Text>
                        <View style={{flex : 2, alignItems : 'flex-end', }}>
                            <Text style={{fontSize : fontSize, fontWeight : 'bold'}}>{item.amount} {item.type}</Text>
                            {
                                item.type.toLowerCase() == 'case' && <Text style={{fontSize : fontSize, fontWeight : 'bold', marginTop : 5}}>12 bottle per Case</Text>
                            }
                        </View>
                        
                    </View>
                )
            } )
        )
       
    }

    // Top wine Images(Avatar) Carousel
    const CarouselCardItem = ({ item, index }) => {
        // SetcurrentImage(item.id)
        // console.log(currentImage, "****************************")
        return (
          <View key={index}>
             <Image
                source={ { uri : item.avatar } }
                style={{width : width * .3,
                        height : 150,
                        maxWidth : 120,
                        borderRadius : 5
                    
                    }}
            ></Image>
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
      
  return (
    wineInventory &&
    wineInventory.map( (item) => {
        return (
            <View style={{backgroundColor : '#fff', flex : 1,
                        }} 
                        key={item.id}
                        >
                <ImageBackground
                //   source={{
                //     uri: 
                //   'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3.png',
                //   }
                // }
                // source={backGround}
                source = { { uri : item.backgroundimage } }
                    resizeMode="cover"
                    style={{ 
                                alignItems: 'flex-start', 
                                // justifyContent: 'center',
                                backgroundColor : primaryColor,
                                // paddingVertical : 150,
                                height : 150,
                                paddingBottom : 20,
                                justifyContent : 'flex-end',
                                // marginBottom : 30
                                elevation: 10,
                                zIndex : 15
                                }}>
                    

                    <View style={{flexDirection: 'row',
                                alignItems: 'center',
                                width: '90%',
                                justifyContent: 'space-between',
                                }}>
                        
                        
                        <Text style={{color: '#fff', fontWeight: '700',
                                        maxWidth : width * .6, 
                                        paddingLeft : 7}}>
                                            {item.name} {item.vintage}
                                            {/* Chateau Canon Saint-Eilion Grand Cru (Premier-Grand Cru Classe) 1982 */}
                                            </Text>

                        
                    </View> 

                    <View style={{
                        padding : 10,
                        position : 'absolute',
                        backgroundColor : '#fff',
                        right : width * .04,
                        bottom : -120,
                        borderRadius : 15,
                

                    }}>
                        <Carousel
                            layout="tinder"
                            layoutCardOffset={9}
                            ref={isCarousel}
                            data={item.avatars}
                            renderItem={CarouselCardItem}
                            sliderWidth={width * .3}
                            itemWidth={width * .3}
                            inactiveSlideShift={0}
                            useScrollView={true}
                            onSnapToItem = { (slideIndex) => {
                                SetcurrentImage(slideIndex)
                            }  }
                        />

                        {/* <Image
                        source={ { uri : item.avatar } }
                        style={{width : width * .25,
                                height : 150,
                                maxWidth : 120,
                                borderRadius : 5
                            
                            }}
                        >
                        </Image> */}
                        <View style={{flexDirection : 'row', justifyContent : 'center'}}>
                            <View style={{marginRight : 5}}>
                                {<Octicons name="dot-fill" size={20} color= {currentImage == 0 ? iconColorOne : iconColorTwo} />}
                            </View>
                            <View>
                                {<Octicons name="dot-fill" size={20} color= {currentImage == 1 ? iconColorOne : iconColorTwo} />}
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', justifyContent: 'center'}}>
                            <Pressable
                            onPress={() => {
                                // console.log('oya')
                            }}
                            // style={{zIndex : 100}}
                            hitSlop={50}>{addBox}</Pressable>
                            <Pressable style={{marginLeft : 'auto'}}
                            onPress={ () => Setfavorite(!favorite)}
                            hitSlop={20}>
                                {
                                    favorite ?
                                    <MaterialCommunityIcons name="heart" size={30} color= {primaryColor} />
                                    :
                                    heart
                                }
                                {/* {heart} */}
                                </Pressable>
                        </View>
                    </View>

                </ImageBackground>
                <ScrollView style={{
                    flex : 1,
                    // backgroundColor : '#fee',
                    width : '95%',
                    alignSelf: 'center',
                    maxWidth : 500

                }}>
                        {/* My Rating Modal */}
                        <Modal
                            visible = {myRatingModal}
                            transparent
                            onRequestClose = {() => SetmyRatingModal(false)}
                            animationType= 'slide'>
                                <View style={{flex: 1, justifyContent : 'center', alignItems : 'center', backgroundColor : '#00000020'}}>
                                    <View style={{backgroundColor : '#fff',
                                                    width : '90%',
                                                    maxWidth : 400,
                                                    borderWidth : 3,
                                                    borderColor : '#666',
                                                    borderRadius : 40,
                                                    padding : 10,
                                                    paddingVertical : 15,
                                                    alignItems : 'center',
                                                    }}>
                                        <Text style={{fontSize : fontLarge, fontWeight : 'bold',}}>My rating</Text>
                                        
                                        <View style={{width : '100%', flexDirection : 'row', paddingHorizontal : 15 ,marginVertical : 25, alignItems : 'center', justifyContent : 'space-between'}}>
                                            <Pressable
                                                style={ ({pressed}) => [
                                                    {backgroundColor : pressed ? primaryColor: secondaryColor, borderRadius : 6, padding : 5, marginRight : 'auto' }
                                                ] }
                                                onPress={ () => {
                                                    decreaseRating()
                                                } }>
                                                    {<FontAwesome5 name="minus" size={15} color='#fff' />}                                  
                                            </Pressable>
                                            
                                            <Rating size={30} color={tetiaryColor2} rate={myRating} gap={3}/>
                                            {/* <Pressable style={{paddingHorizontal : 3}}>
                                                <Ionicons name="md-star-sharp" size={30} color= {tetiaryColor2} />
                                            </Pressable>
                                            <Pressable style={{paddingHorizontal : 3}}>
                                                <Ionicons name="md-star-sharp" size={30} color= {tetiaryColor2} />
                                            </Pressable>
                                            <Pressable style={{paddingHorizontal : 3}}>
                                                <Ionicons name="md-star-sharp" size={30} color= {tetiaryColor2} />
                                            </Pressable>
                                            <Pressable style={{paddingHorizontal : 3}}>
                                                <Ionicons name="md-star-sharp" size={30} color= {tetiaryColor2} />
                                            </Pressable>
                                            <Pressable style={{paddingHorizontal : 3}}>
                                                <Ionicons name="md-star-half-sharp" size={30} color= {tetiaryColor2} />
                                            </Pressable> */}

                                            <Pressable 
                                            style={ ({pressed}) => [
                                                {backgroundColor : pressed ? primaryColor : secondaryColor, borderRadius : 6, padding : 6, marginLeft : 'auto'}
                                            ] }
                                            onPress={ () => {
                                                increaseRating()
                                            } }>
                                                    {<FontAwesome5 name="plus" size={15} color='#fff' />}                                  
                                            </Pressable>
                                        </View>
                                        {/* style={{backgroundColor : primaryColor, paddingVertical : 2, width : width * .25, alignItems : 'center', borderRadius : 5 }} */}
                                            {/* <View style={{backgroundColor : 'red'}}> */}
                                            <ButtonDouble 
                                                rightText = 'Cancel'
                                                leftText = 'Confirm'
                                                colorPressed = {secondaryColor}
                                                colorNotPressed = {primaryColor}
                                                textColor = '#fff'
                                                rightTextonPress = { () => SetmyRatingModal(false) }
                                                leftTextonPress = { UpdateRating } 
                                                paddingVertical = {7}
                                                paddingHorizontal = {30}
                                                fontSize = {fontSmall}
                                                />
                                            {/* </View> */}
                                           
                                        
                                        {/* <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '80%'}}>
                                            <Pressable 
                                            style={ ({pressed}) => [
                                                {backgroundColor : pressed ? secondaryColor : primaryColor, paddingVertical : 3, width : width * .25, maxWidth : 120, alignItems : 'center', borderRadius : 5, }
                                            ] }
                                            onPress={() => {
                                                SetmyRatingModal(!myRatingModal)
                                            }}
                                            >
                                                <Text style={{color : '#fff'}}>Confirm</Text>
                                            </Pressable>
                                            <Pressable
                                            style={ ({pressed}) => [
                                                {backgroundColor : pressed ? secondaryColor : primaryColor, paddingVertical : 3, width : width * .25,  maxWidth : 120, alignItems : 'center', borderRadius : 5 }
                                            ] }
                                            onPress={() => {
                                                SetmyRatingModal(!myRatingModal)
                                            }}>
                                                <Text style={{color : '#fff'}}>Cancel</Text>
                                            </Pressable>
                                        </View> */}
                                    </View>
                                </View>
                                
                            
                        </Modal>
                        

                        <Modal
                            visible = {wineMethodModal}
                            transparent
                            onRequestClose = {() => SetwineMethodModal(false)}
                            animationType= 'slide'>
                                <View style={{flex: 1, justifyContent : 'flex-end', alignItems : 'center', backgroundColor : '#00000020'}}>
                                    <View
                                    style={{backgroundColor : '#fff',
                                    width : '105%',
                                    maxWidth : 500,
                                    borderWidth : 3,
                                    borderBottomWidth : 0,
                                    borderColor : '#666',
                                    padding : 10,
                                    paddingVertical : 15,
                                    alignItems : 'center',
                                    borderTopLeftRadius : 75,
                                    borderTopRightRadius : 75,
                                    //  height : 300
                                    }}>
                                        <View style={{height : 3, width : 70, backgroundColor : iconColorTwo}}></View>
                                        {
                                            type.toLowerCase() == 'ai cellar'  || type.toLowerCase() == 'general page'  ?
                                            <>
                                                <Text style={{fontWeight : 'bold', marginTop : 10}}>
                                                    {
                                                        type.toLowerCase() == 'ai cellar' ? 'Delete' : 'Add'
                                                    }
                                                </Text>
                                                <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30}}>
                                                        <Text style={{fontWeight : 'bold', flex : 1,}}>My Cost</Text>

                                                        <View style={{flex : 2, alignItems : 'center', height : 25, maxHeight : 50}}>
                                                
                                                            <TextInput
                                                            keyboardType='numeric'
                                                            onChangeText={SetmyCost}
                                                            value={myCost}
                                                            style={{borderWidth : 1, borderRadius : 5,width : width * .35, maxWidth : 150, 
                                                                    borderColor : iconColorOne, paddingHorizontal : 7, fontSize : fontSmall}}>

                                                            </TextInput>
                                                        </View>

                                                        <View style={{flex : 1, alignItems : 'center'}}>
                                                            <Text style={{fontWeight : 'bold'}}>HKD</Text>
                                                        </View>
                                                    
                                                </View>

                                                <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30}}>
                                                        <Text style={{fontWeight : 'bold', flex : 1,}}>Btl Size</Text>

                                                        <View style={{flex : 2, alignItems : 'center', height : 25, maxHeight : 50}}>
                                                            <Pressable style={{flex : 1, borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .35, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                                onPress={ () => {
                                                                    SetbtlSizeArrow(!btlSizeArrow)                                        }}>
                                                                    <Text style={{color : iconColorOne, fontWeight : 'bold'}}>750</Text>
                                                                    <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{btlSizeArrow ? arrowUp : arrowDown}</View>
                                                            </Pressable>
                                                        </View>

                                                        <View style={{flex : 1, alignItems : 'center'}}>
                                                            <Text style={{fontWeight : 'bold'}}>ml</Text>
                                                        </View>
                                                    
                                                </View>

                                                <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30}}>
                                                    <Text style={{fontWeight : 'bold', flex : 1}}>
                                                    {
                                                        type.toLowerCase() == 'ai cellar' ? 'Delete' : 'Add'
                                                    }
                                                    </Text>

                                                    <View style={{flex : 2, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center', height : 25, maxHeight : 50}}>   
                                                        <Pressable
                                                            onPress={ () => {
                                                                SetdeleteAddCount(deleteAddCount + 1)
                                                            }}
                                                            style={ ({pressed}) => [
                                                                {backgroundColor : pressed ? primaryColor: secondaryColor, borderRadius : 3, padding : 4}
                                                            ] }
                                                            
                                                            hitSlop={10}>
                                                                {<FontAwesome5 name="plus" size={12} color='#fff' />}      

                                                        </Pressable>

                                                        <View style={{borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width *  .20, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}>
                                                            
                                                                <Text style={{color : iconColorOne, fontWeight : 'bold'}}>
                                                                {deleteAddCount}
                                                                </Text>
                                                
                                                        </View>

                                                        <Pressable
                                                            onPress={ () => {
                                                            
                                                                SetdeleteAddCount(deleteAddCount > 1 ? deleteAddCount - 1 : deleteAddCount)
                                                            }}
                                                            style={ ({pressed}) => [
                                                                {backgroundColor : pressed ? primaryColor: secondaryColor, borderRadius : 3, padding : 4}
                                                            ] }
                                                            
                                                            hitSlop={10}>
                                                                {<FontAwesome5 name="minus" size={12} color='#fff' />}      
                                                                
                                                        </Pressable>
                                                    </View>
                                                    {
                                                            type.toLowerCase() == 'ai cellar' ?
                                                                <View style={{flex : 1, alignItems : 'center'}}>
                                                                    <Text style={{fontWeight : 'bold'}}>Btl</Text>
                                                                </View>
                                                            :
                                                            <View style={{flex : 1, alignItems : 'center', height : 30, maxHeight : 50}}>
                                                                    <View style={{flex : 1}}>
                                                                        <Pressable style={{flexDirection : 'row', borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .18, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                                            onPress={ () => {
                                                                                // console.log('clicked')
                                                                                SetbtlOrCaseArrow(!btlOrCaseArrow)                                        
                                                                                }}>
                                                                                <Text style={{color : iconColorOne, fontWeight : 'bold', paddingLeft : 5}}>{bottleOrCase}</Text>
                                                                                <View style={{}}>{btlOrCaseArrow ? arrowUp : arrowDown}</View>
                                                                            
                                                                            
                                                                        </Pressable>
                                                                        {
                                                                            btlOrCaseArrow &&  
                                                                            <Pressable style={{position : 'absolute', bottom : -28, paddingLeft : 5, paddingVertical : 2, width : width * .18, maxWidth : 150,  backgroundColor : '#eee', borderRadius : 5, width : 'auto'}}
                                                                            onPress={ () => {
                                                                                // console.log('clicked.....')
                                                                            SetbottleOrCase(bottleOrCase.toLowerCase() == 'btl' ? 'Case' : 'Btl')
                                                                            SetbtlOrCaseArrow(!btlOrCaseArrow)
                                                                            } }>
                                                                                <Text style={{width : width * .17, maxWidth : 150}}>{bottleOrCase.toLowerCase() == 'btl' ? 'Case' : 'Btl'}</Text>
                                                                            </Pressable>
                                                                        }
                                                                    </View>
                                                            
                                                        </View>
                                                    }
                                                    {/* Cellar */}
                                        
                                                </View>
                                                <>
                                                    {
                                                        bottleOrCase.toLowerCase() == 'case' && 
                                                        <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30, zIndex : 15,}}>
                                                            <Text style={{fontWeight : 'bold', flex : 1,}}>Total</Text>
                    
                                                            <View style={{flex : 2, alignItems : 'center', height : 25, maxHeight : 50}}>
                                                                <Pressable style={{flex : 1, borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .30, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                                    onPress={ () => {
                                                                        // console.log("ooo")
                                                                        SetbtlPerCaseArrow(!btlPerCaseArrow)                                        }}>
                                                                        <Text style={{color : iconColorOne, fontWeight : 'bold'}}>{btlPerCase}</Text>
                                                                        <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{btlPerCaseArrow ? arrowUp : arrowDown}</View>
                                                                </Pressable>
                                                                {
                                                                    btlPerCaseArrow && 
                                                                    <View style={{position : 'absolute', top : 25, alignItems : 'center', paddingLeft : 5, paddingVertical : 2, width : '85%' , backgroundColor : '#eee', borderRadius : 5,}}>
                                                                        {
                                                                            btlPerCaseOptions.map( (item,) => {
                                                                                return (
                                                                                    <Pressable 
                                                                                    onPress={ () => {
                                                                                        SetbtlPerCase(item)
                                                                                        SetbtlPerCaseArrow(!btlPerCaseArrow)
                                                                                        } }
                                                                                        style={ ({pressed}) => [
                                                                                            { alignItems : 'center',
                                                                                            width : width * .17, maxWidth : 150}
                                                                                        ] }
                                                                                        key={item}>
                                                                                        <Text style={{}}>{item}</Text>
                                                                                    </Pressable>
                                                                                )
                                                                            })
                                                                            }
                                                                    
                                                                    
                                                                    </View> 
                                                                    
                                                                }
                                                            </View>
                    
                                                            <View style={{flex : 3/2, alignItems : 'center'}}>
                                                                <Text style={{fontWeight : 'bold'}}>Btl per Case</Text>
                                                            </View>
                                                        
                                                    </View>
                                                        
                                                    }
                                                </>
                                                <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30}}>
                                                        {
                                                            type.toLowerCase() == 'ai cellar' &&
                                                            <Text style={{fontWeight : 'bold', flex : 1,}}>From</Text>
                                                        }
                                                        {
                                                            type.toLowerCase() == 'general page' &&
                                                            <Text style={{fontWeight : 'bold', flex : 1,}}>To</Text>
                                                        }
                                                

                                                    <View style={{flex : 3, alignItems : 'center', height : 25, maxHeight : 50}}>
                                                        <Pressable style={{flex : 1, borderWidth : 1, paddingRight : 10, borderRadius : 5, paddingVertical : 2, width : width * .4, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                            onPress={ () => {
                                                                SettransferToArrow(!transferToArrow)}}>
                                                                    {
                                                                        type.toLowerCase() == 'ai cellar' &&
                                                                        <Text style={{color : iconColorOne, fontWeight : 'bold'}}>Home</Text>
                                                                    }
                                                                    {
                                                                        type.toLowerCase() == 'general page' &&
                                                                        <Text style={{color : iconColorOne, fontWeight : 'bold'}}>Happy Valley Club</Text>
                                                                    }
                                                                
                                                                <View style={{position : 'absolute', right : 1, justifyContent : 'center', }}>{transferToArrow ? arrowUp : arrowDown}</View>
                                                        </Pressable>
                                                    </View>

                                                    <View style={{flex : 1, alignItems : 'center'}}>
                                                        <Text style={{fontWeight : 'bold'}}>Cellar</Text>
                                                    </View>
                                                    
                                                </View>
                                            </>
                                        
                                            :
                                            <>
                                            <View style={{marginVertical : 10, flexDirection : 'row',}}>
                                                {
                                                    [ 'Add', 'Transfer', 'Reduce' ].map( (item) => {
                                                        return (
                                                            <Pressable key={item} style ={{width : 80, alignItems : 'center'}}
                                                            hitSlop={10}
                                                            onPress={ () => {
                                                                SetaddTransRedState(item)
                                                            } }>
                                                                {addTransRedState == item ? <MaterialCommunityIcons name="circle" size={12} color= '#000' /> : <MaterialCommunityIcons name="circle-outline" size={12} color= {iconColorOne} />}
                                                                <Text style={{fontSize : fontSmall, fontWeight : 'bold', color : `${addTransRedState == item ? '#000' : iconColorOne}`}}>{item}</Text>
                                                            </Pressable>
                                                        )
                                                    })
                                                }
                                            

                                            </View>

                                        <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30}}>
                                                <Text style={{fontWeight : 'bold', flex : 1,}}>Btl Size</Text>

                                                <View style={{flex : 2, alignItems : 'center', height : 25, maxHeight : 50}}>
                                                    <Pressable style={{flex : 1, borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .35, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                        onPress={ () => {
                                                            SetbtlSizeArrow(!btlSizeArrow)                                        }}>
                                                            <Text style={{color : iconColorOne, fontWeight : 'bold'}}>750</Text>
                                                            <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{btlSizeArrow ? arrowUp : arrowDown}</View>
                                                    </Pressable>
                                                </View>

                                                <View style={{flex : 1, alignItems : 'center'}}>
                                                    <Text style={{fontWeight : 'bold'}}>ml</Text>
                                                </View>
                                            
                                        </View>
                                        {/* add and sub bottle or case */}
                                        <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30}}>
                                                <Text style={{fontWeight : 'bold', flex : 1}}>{addTransRedState}</Text>
                                                
                                                <View style={{flex : 2, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center', height : 25, maxHeight : 50}}>   
                                                    <Pressable
                                                        onPress={ () => {
                                                            {bottleOrCase.toLowerCase() == 'btl' ? SetbtlCount(btlCount + 1)
                                                            : SetcaseCount(caseCount + 1)}
                                                        }}
                                                        style={ ({pressed}) => [
                                                            {backgroundColor : pressed ? primaryColor: secondaryColor, borderRadius : 3, padding : 4}
                                                        ] }
                                                        
                                                        hitSlop={10}>
                                                            {<FontAwesome5 name="plus" size={12} color='#fff' />}      

                                                    </Pressable>

                                                    <View style={{borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width *  .20, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}>
                                                        
                                                            <Text style={{color : iconColorOne, fontWeight : 'bold'}}>
                                                                {bottleOrCase.toLowerCase() == 'btl' ? btlCount
                                                                : caseCount}
                                                            </Text>
                                            
                                                    </View>

                                                    <Pressable
                                                        onPress={ () => {
                                                            {bottleOrCase.toLowerCase() == 'btl' ? SetbtlCount(btlCount > 1 ? btlCount -1 : btlCount)
                                                            : SetcaseCount(caseCount > 1 ? caseCount - 1 : caseCount)}
                                                        }}
                                                        style={ ({pressed}) => [
                                                            {backgroundColor : pressed ? primaryColor: secondaryColor, borderRadius : 3, padding : 4}
                                                        ] }
                                                        
                                                        hitSlop={10}>
                                                            {<FontAwesome5 name="minus" size={12} color='#fff' />}      
                                                            
                                                    </Pressable>
                                                </View>

                                                <View style={{flex : 1, alignItems : 'center', height : 30, maxHeight : 50}}>
                                                    <View style={{flex : 1}}>
                                                        <Pressable style={{flexDirection : 'row', borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .18, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                            onPress={ () => {
                                                                // console.log('clicked')
                                                                SetbtlOrCaseArrow(!btlOrCaseArrow)                                        
                                                                }}>
                                                                <Text style={{color : iconColorOne, fontWeight : 'bold', paddingLeft : 5}}>{bottleOrCase}</Text>
                                                                <View style={{}}>{btlOrCaseArrow ? arrowUp : arrowDown}</View>
                                                            
                                                            
                                                        </Pressable>
                                                        {
                                                            btlOrCaseArrow &&  
                                                            <Pressable style={{position : 'absolute', bottom : -28, paddingLeft : 5, paddingVertical : 2, width : width * .18, maxWidth : 150,  backgroundColor : '#eee', borderRadius : 5, width : 'auto'}}
                                                            onPress={ () => {
                                                                // console.log('clicked.....')
                                                            SetbottleOrCase(bottleOrCase.toLowerCase() == 'btl' ? 'Case' : 'Btl')
                                                            SetbtlOrCaseArrow(!btlOrCaseArrow)
                                                            } }>
                                                                <Text style={{width : width * .17, maxWidth : 150}}>{bottleOrCase.toLowerCase() == 'btl' ? 'Case' : 'Btl'}</Text>
                                                            </Pressable>
                                                        }
                                                    </View>
                                                    
                                                </View>

                                                {/* <View style={{flex : 1/2, alignItems : 'center'}}>
                                                    <Text style={{fontWeight : 'bold'}}>ml</Text>
                                                </View> */}
                                            
                                        </View>
                                            <>
                                                {
                                                    bottleOrCase.toLowerCase() == 'case' && 
                                                    <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30, zIndex : 15,}}>
                                                        <Text style={{fontWeight : 'bold', flex : 1,}}>Total</Text>

                                                        <View style={{flex : 2, alignItems : 'center', height : 25, maxHeight : 50}}>
                                                            <Pressable style={{flex : 1, borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .30, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                                onPress={ () => {
                                                                    // console.log("ooo")
                                                                    
                                                                    SetbtlPerCaseArrow(!btlPerCaseArrow)                                        }}>
                                                                    <Text style={{color : iconColorOne, fontWeight : 'bold'}}>{btlPerCase}</Text>
                                                                    <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{btlPerCaseArrow ? arrowUp : arrowDown}</View>
                                                            </Pressable>
                                                            {
                                                                btlPerCaseArrow && 
                                                                <View style={{position : 'absolute', top : 25, alignItems : 'center', paddingLeft : 5, paddingVertical : 2, width : '85%' , backgroundColor : '#eee', borderRadius : 5,}}>
                                                                    {
                                                                        btlPerCaseOptions.map( (item) => {
                                                                            return (
                                                                                <Pressable 
                                                                                onPress={ () => {
                                                                                    SetbtlPerCase(item)
                                                                                    SetbtlPerCaseArrow(!btlPerCaseArrow)
                                                                                    } }
                                                                                    style={ ({pressed}) => [
                                                                                        { alignItems : 'center',
                                                                                        width : width * .17, maxWidth : 150}
                                                                                    ] }
                                                                                    key={item}>
                                                                                    <Text style={{}}>{item}</Text>
                                                                                </Pressable>
                                                                            )
                                                                        })
                                                                        }
                                                                
                                                                
                                                                </View> 
                                                                
                                                            }
                                                        </View>

                                                        <View style={{flex : 3/2, alignItems : 'center'}}>
                                                            <Text style={{fontWeight : 'bold'}}>Btl per Case</Text>
                                                        </View>
                                                    
                                                </View>
                                                    
                                                }
                                            </>
                                            {
                                                addTransRedState.toLowerCase() == 'reduce' &&
                                                <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30, alignItems : 'center', justifyContent : 'space-between'}}>
                                                    {
                                                        ['Enjoyed', 'Gift', 'Sold', 'Damaged'].map( (item) => {
                                                            return (
                                                                <Pressable  
                                                                    key={item}
                                                                    style={ ({pressed}) => [
                                                                        {   
                                                                            backgroundColor : pressed ? primaryColor : `${reduceReason.toLowerCase() == item.toLowerCase() ? secondaryColor : '#fff'}`,
                                                                            borderWidth : 1,
                                                                            borderColor : secondaryColor,
                                                                        
                                                                            padding : 10,
                                                                            paddingHorizontal : width * .04
                                                                        }
                                                                    
                                                                        ] }
                                                                        onPress={() => {
                                                                            SetreduceReason(item)
                                                                        }}>
                                                                    <Text style={{fontSize : fontSmall,
                                                                                    color : reduceReason.toLowerCase() == item.toLowerCase() ? '#fff' : secondaryColor ,}}>{item}</Text>
                                                                </Pressable>
                                                            )
                                                        })
                                                    }
                                                
                                                </View>
                                            }

                                            {
                                                addTransRedState.toLowerCase() == 'transfer' &&
                                                <View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 15, marginTop : 30}}>
                                                    <Text style={{fontWeight : 'bold', flex : 1,}}>To</Text>

                                                    <View style={{flex : 2, alignItems : 'center', height : 25, maxHeight : 50}}>
                                                        <Pressable style={{flex : 1, borderWidth : 1, borderRadius : 5, paddingVertical : 2, width : width * .35, maxWidth : 150, borderColor : iconColorOne, alignItems : 'center', justifyContent : 'center'}}
                                                            onPress={ () => {
                                                                SettransferToArrow(!transferToArrow)                                        }}>
                                                                <Text style={{color : iconColorOne, fontWeight : 'bold'}}>Home 2</Text>
                                                                <View style={{position : 'absolute', right : 1, justifyContent : 'center'}}>{transferToArrow ? arrowUp : arrowDown}</View>
                                                        </Pressable>
                                                    </View>

                                                    <View style={{flex : 1, alignItems : 'center'}}>
                                                        <Text style={{fontWeight : 'bold'}}>Cellar</Text>
                                                    </View>
                                                    
                                                </View>
                                            }
                                        <View style={{flexDirection : 'row',width : '100%', paddingHorizontal : 15, marginTop : 30, justifyContent : 'space-between'}}>
                                                <Text style={{fontWeight : 'bold'}}>Cost per Wine</Text>
                                                <Text style={{fontWeight : 'bold'}}>2,350</Text>
                                                <Text style={{fontWeight : 'bold'}}>HKD</Text>
                                        </View>
                                            </>
                                        }
                                    <View style={{width : '85%', marginTop : 70, alignItems : 'center'}}>
                                            <Pressable 
                                                onPress={() => {
                                                    SetwineMethodModal(false)
                                                    type.toLowerCase() == 'ai cellar' || type.toLowerCase() == 'general page' ? navigationRef.navigate('Home') :
                                                    
                                                    SetinventoryRecordModal(true)
                                                }}
                                                style={ ({pressed}) => [
                                                {backgroundColor : pressed ? primaryColor : secondaryColor,
                                                width : width * .6, maxWidth : 300, paddingVertical : 5,
                                                borderRadius : 5, alignItems : 'center', justifyContent : 'center'}
                                            ] }>
                                                    <Text style={{color : '#fff'}}>Confirm</Text>
                                            </Pressable>
                                    </View>
                                    </View>
                                </View>

                        </Modal>

                        <Modal
                            visible = {inventoryRecordModal}
                            transparent
                            onRequestClose = {() => SetinventoryRecordModal(false)}
                            animationType= 'slide'>
                                <View style={{
                                    flex : 1,
                                    alignItems : 'center', 
                                    backgroundColor : '#00000020',
                                    justifyContent : 'flex-end',
                                

                                }}>
                                    <View
                                    style={{backgroundColor : '#fff',
                                    // height : 400,
                                    width : '105%',
                                    borderWidth : 3,
                                    borderBottomWidth : 0,
                                    borderColor : iconColorOne,
                                    borderTopLeftRadius : 80,
                                    borderTopRightRadius : 80,
                                    alignItems : 'center',
                                    paddingVertical : 15,
                                    paddingHorizontal : 20,
                                    }}>
                                        <View style={{height : 3, width : 70, backgroundColor : iconColorTwo}}></View>
                                        <View style={{width : '100%',
                                                        marginTop : 20,
                                                        // backgroundColor : 'pink'
                                                        }}>
                                            <Text style={{fontSize : fontLarge, fontWeight : 'bold'}}>Inventory Record</Text>
                                            <Text style={{fontSize : 16, marginTop : 30}}>Chateau Canon Saint-Emillion Grand Cru (Premier Grand Cru Classe) 1982</Text>
                                            <Pressable
                                            onPress={ () => {
                                                Linking.openURL('https://reactnative.dev/docs/components-and-apis')
                                            }}
                                                style={{marginTop : 20, marginBottom : 5, flexDirection : 'row', alignItems : 'center'}}>
                                                {emailLetter}
                                                <Text style={{fontSize : fontSmall, color : secondaryColor}}> Send a record to my email</Text>
                                            </Pressable>

                                            {/* Function to map record objects to UI display */}
                                            <View >
                                                <HistoryRecord record={inventoryRecord} fontSize={fontSmallest} />
                                            </View>

                                        </View>
                                        <Pressable 
                                        onPress={() => {
                                            SetinventoryRecordModal(false)
                                        }}
                                        style={ ({pressed}) => [
                                            {marginVertical : 30,
                                            padding : 15,
                                            elevation : 7,
                                            borderRadius : 27,
                                            backgroundColor : pressed ? iconColorTwo : '#fff'}
                                        ] }>
                                            {close}
                                        </Pressable>
                                        <Pressable 
                                            style={ ({pressed}) => [
                                                {backgroundColor : pressed ? iconColorTwo : iconColorOne,
                                                borderRadius : 5,
                                                paddingVertical : 7,
                                                width : '100%',
                                                alignItems : 'center',
                                                marginVertical : height * .1 < 60 ? height * .1 : 60,
                                                maxWidth : 500 }
                                            ] }
                                        >
                                            <Text style={{fontSize : fontSmall, color : '#fff' }}>Remove all Inventory Record of this wine</Text>
                                        </Pressable>
                                    </View>
                                </View>

                        </Modal>

                        <View style={{
                            maxWidth : width * .55,
                            // flex : 1,
                            // backgroundColor : '#efe'
                        }}>
                            <View style={{flexDirection : 'row',
                                            alignItems : 'center'
                                            }}>
                                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                    <View>{dot}</View>
                                    <Text> {item.volume} ml</Text>
                                </View>
                                <View style={{marginLeft : 'auto', flexDirection : 'row'}}>
                                    <Text style={{fontWeight : '500'}}>Vintage</Text>
                                    <Text>{item.vintage}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <View>{dot}</View>
                                <Text> {item.location}</Text>
                            </View>

                            <View style={{marginTop : 15, flexDirection : 'row', alignItems : 'center'}}>
                                <Text style={{fontSize : fontSmallest, marginRight : 13}}>My rating</Text>
                                <Pressable
                                    onPress={ () => {
                                        SetmyRatingModal(true)
                                    }}
                                    hitSlop={20}>
                                    { 
                                        // rating(tetiaryColor2)
                                    }
                                    <Rating color={tetiaryColor2} rate={item.myrating} gap={1} />

                                </Pressable>
                                <Text style={{fontSize : fontSmallest, marginLeft : 7}}>{item.myrating}</Text>
                            </View>
                            <View style={{flexDirection : 'row', alignItems : 'center', marginTop : 7}}>
                                <Text style={{fontSize : fontSmallest, marginRight : 20}}>Average</Text>
                                <View>
                                {/* <Rating color={secondaryColor} rate={myRating}/> */}
                                <Rating color={secondaryColor} rate={item.average} gap={1} />
                                    {/* {
                                        rating(secondaryColor)
                                    } */}
                                </View>
                                <Text style={{fontSize : fontSmallest, marginLeft : 7}}>{item.average}</Text>
                            </View>

                            <View style= {{marginTop : 20}}>
                                <Text style={{fontWeight : 'bold', fontSize : fontLarge}}>About</Text>
                                <View>
                                    <View style={{
                                        flexDirection : 'row',
                                        // backgroundColor : 'red',
                                        width : 200,
                                        borderLeftWidth: 1,
                                        marginTop : 5
                                    }}>
                                        {
                                            ['RP','JS','WS','BH','WE'].map( (item_) => {
                                                return (
                                                         <View style={{borderTopWidth : 1, borderRightWidth : 1,  flex : 1, padding : 2, alignItems : 'center'}}
                                                    key={item_}>
                                                        <Text style={{fontWeight : '700', color : '#888'}}>{item_}</Text>
                                                    </View>
                                                )
                                            } )
                                        }
                                
                                    </View>
                                    <View style={{
                                        flexDirection : 'row',
                                        // backgroundColor : 'red',
                                        width : 200,
                                        borderBottomWidth : 1,
                                        borderLeftWidth: 1,
                                        // borderRightWidth : 1
                                    }}>
                                        {
                                            ['rp','js','ws','bh','we'].map( (item_) => {
                                                return (
                                                    <View style={{borderTopWidth : 1, borderRightWidth : 1, flex : 1, padding : 2, alignItems : 'center'}}
                                                    key={item_}>
                                                        <Text style={{fontWeight : '700', color : '#888'}}>{item[item_]}</Text>
                                                    </View>
                                                )
                                            } )
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* point */}
                        <View>

                            <View>
                                <View style={{
                                    flexDirection : 'row',
                                    // backgroundColor : 'red',
                                    width : '100%',
                                    borderLeftWidth: 1,
                                    marginTop : 20
                                }}>
                                    {
                                        ['Texture','Fruity','Oak','Acidity','Tannins','Sweetness'].map( (item) => {
                                            return (
                                                <View style={{borderTopWidth : 1, borderRightWidth : 1,  flex : 1, padding : 1, alignItems : 'center'}}
                                                key={item}>
                                                    <Text style={{fontWeight : '700', color : '#888'}}>{item}</Text>
                                                </View>
                                            )
                                        } )
                                    }
                                
                                </View>
                                <View style={{
                                    flexDirection : 'row',
                                    // backgroundColor : 'red',
                                    width : '100%',
                                    borderBottomWidth : 1,
                                    borderLeftWidth: 1,
                                    // borderRightWidth : 1
                                }}>
                                    {
                                        ['texture','fruity','oak','acidity','tannins','sweetness'].map( (item_) => {
                                            return (
                                                <View 
                                                key={item_}
                                                style={{borderTopWidth : 1, borderRightWidth : 1, flex : 1, padding : 1, alignItems : 'center'}}
                                                >
                                                    <Text style={{fontWeight : '700', color : '#888'}}>{item[item_]}</Text>
                                                </View>
                                            )
                                        } )
                                    }
                                </View>
                            </View>
                                    
                            <View style={{marginTop : 20}}>
                                {
                                       item.aboutinfo.map( (_item_) => {
                                        return (
                                            <View 
                                            key={_item_.name}
                                                style={{
                                                    borderBottomWidth : 2,
                                                    borderColor : '#ddd',
                                                    paddingVertical : 3,
                                                    // backgroundColor : 'purple'
                                                    flexDirection : 'row',
                                                    alignItems : 'center'
                                                }}> 
                                                <View style={{flex : 1, flexDirection : 'row', alignItems : 'center'}} >
                                                    <View>{_item_.logo}</View>
                                                    <Text style={{fontWeight : '700', color : '#888'}}>{_item_.name}</Text>
                                                </View>
                                                <View style={{flex : 1}}>
                                                    <Text style={{fontWeight : '700', color : '#888'}}>{_item_.value}</Text>
                                                </View>
                                            </View>
                                        )
                                    } )
                                }
                                
                            </View>
                                    
                        </View>
                        
                        {
                                type.toLowerCase() != 'general page' &&
                                <>
                        
                                <View 
                                style={{flexDirection : 'row', alignItems : 'center', marginTop : 20}}>
                                    <Image
                                        source={wineCellar}
                                        style={{width : 50, height : 50, borderRadius : 50}}>

                                    </Image>
                                    <Pressable 
                                    onPress={ () => {
                                        SetselectVirtualCellar(!selectVirtualCellar)
                                    } }
                                    hitSlop = {10}
                                        style={{ marginLeft : 7,  borderWidth : 1, height : 30, flexDirection : 'row', 
                                                alignItems : 'center', paddingHorizontal : 5,
                                                width : width * .55,
                                                maxWidth : 300}}>
                                        <Text style={{fontSize : fontSmall}}> Happy Valley Club House</Text>
                                        <View style={{marginLeft : 'auto'}}>
                                            {
                                                selectVirtualCellar ? arrowUp : arrowDown
                                            }
                                        </View>
                                    </Pressable>
                                    <View style={{marginLeft : 'auto', flexDirection: 'row', alignItems : 'center'}}>
                                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                            <View style ={{marginLeft: -25}}>
                                            {
                                                    <MaterialCommunityIcons name="bottle-wine" size={35} color= {primaryColor} />
                                                }
                                            </View>
                                            <View style ={{marginLeft: -25}}>
                                            
                                            {
                                                    <MaterialCommunityIcons name="bottle-wine" size={35} color= {primaryColor} />
                                                }
                                            </View>
                                            <View style ={{marginLeft: -25}}>
                                            {
                                                    <MaterialCommunityIcons name="bottle-wine" size={35} color= {primaryColor} />
                                                }
                                            </View>
                                        </View>
                                        <Text style ={{marginLeft: -7, fontSize : fontLarge}}>58</Text>
                                    </View>
                                </View>
                                <View  style={{flexDirection : 'row', alignItems : 'center', marginTop : 15}}>
                                    <View style={{flexDirection : 'row', alignItems : 'center', flexWrap : 'wrap'}}>
                                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                            <View>
                                            {
                                                    <MaterialCommunityIcons name="tag" size={20} color='#aaa' />
                                                }
                                            </View>
                                            <View style ={{marginLeft: -10}}>
                                            {
                                                    <MaterialCommunityIcons name="bottle-wine" size={25} color= '#aaa' />
                                                }
                                            </View>
                                        </View>
                                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                            <View>{tag}</View>
                                            <View style ={{marginLeft: -10}}>
                                                {wineBottle}
                                            </View>
                                            <View style ={{marginLeft: -15}}>
                                            
                                                {wineBottle}
                                            </View>
                                            <View style ={{marginLeft: -15}}>
                                                {wineBottle}
                                            </View>
                                            {/* {tag}{wineBottle}{wineBottle}{wineBottle} */}
                                        </View>
                                        <Text>HKD 83,462 </Text>
                                        <Text style={{color : tetiaryColor}}> 9.4%</Text>
                                        <View>
                                        {
                                                    <MaterialIcons name="arrow-drop-up" size={35} color= {tetiaryColor} />
                                                }
                                        </View>
                                        <Text style={{marginLeft : 'auto', color : iconColorOne, fontSize : fontSmall}}>
                                            My Cost HKD {item.hkd}
                                            {/* 79,462 */}
                                        </Text>
                                    </View>
                                    
                                </View>

                                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between',  marginTop : 10}}>
                                    {/* <Pressable>
                                        <Text>{type}</Text>
                                    </Pressable> */}

                                    <View style={{ flex : 2, flexDirection : 'row', alignItems : 'center', }}>
                                        <View style={{width : 30}}>{briefcase}</View>
                                        <Text style={{ flex : 5, fontSize : fontMedium, fontWeight : 'bold', color : primaryColor}}>Btl per case</Text>
                                        <Pressable style={{
                                                            flex : 2,
                                                            borderWidth : 1, 
                                                            flexDirection : 'row', 
                                                            alignItems : 'center', 
                                                            padding : 4, 
                                                            borderRadius : 3, 
                                                            width : 50,
                                                            justifyContent : 'space-between'
                                                            }}>
                                            <Text style={{fontSize : fontSmall, paddingLeft : 4}}>6</Text>
                                            {arrowDown}
                                        </Pressable>
                                    </View>
                                    <View style={{flex : 1, alignItems : 'flex-end',}}>
                                        <Text style={{fontWeight : 'bold', fontSize : fontMedium, }}>{item.case} Case</Text>
                                    </View>
                                    
                                </View>

                                
                                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', marginTop : 10}}>
                                    {/* <Pressable>
                                        <Text>{type}</Text>
                                    </Pressable> */}

                                    <View style={{ flex : 2, flexDirection : 'row', alignItems : 'center'}}>
                                        <View style={{width : 30}}>{bottle}</View>
                                        <Text style={{ flex : 5, fontSize : fontMedium, fontWeight : 'bold', color : primaryColor}}>Btl of wine</Text>
                                        
                                    </View>
                                    <View style={{flex : 1, alignItems : 'flex-end',}}>
                                        <Text style={{fontWeight : 'bold', fontSize : fontMedium }}>{item.bottle} Bottle</Text>
                                    </View> 
                                </View>
                            </>
                        }
                    
                            <View style={{marginTop : 20}}>

                                {
                                    type.toLowerCase() == 'ai cellar' &&
                                    <Pressable 
                                    style={({pressed}) => [
                                        {backgroundColor : pressed ? secondaryColor : primaryColor, flex: 1, alignItems : 'center', borderRadius : 4, paddingVertical : 4, marginHorizontal : 4}
                                    ]}
                                    onPress={ () => {
                                        SetwineMethodModal(!wineMethodModal)
                                    }}>
                                        <Text style={{color : '#fff'}}>Delete Wine</Text>
                                    </Pressable>
                                }

                                {
                                    type.toLowerCase() == 'virtual cellar' &&
                                        <View style={{flexDirection : 'row'}}>
                                            {
                                                ['Add', 'Transfer', 'Reduce'].map( (item, index) => {
                                                    return (
                                                        <Pressable 
                                                        style={({pressed}) => [
                                                            {backgroundColor : pressed ? secondaryColor : primaryColor, flex: 1, alignItems : 'center', borderRadius : 4, paddingVertical : 4, marginHorizontal : 4}
                                                        ]}
                                                        onPress={ () => {
                                                            SetwineMethodModal(!wineMethodModal)
                                                        }}
                                                        key={index}>
                                                            <Text style={{color : '#fff'}}>{item}</Text>
                                                        </Pressable>
                                                    )
                                                } )
                                            }

                                        </View>
                                    }

                                    {
                                        type.toLowerCase() == 'general page' &&
                                        <Pressable 
                                        style={({pressed}) => [
                                            {backgroundColor : pressed ? primaryColor :  secondaryColor, flex: 1, alignItems : 'center', borderRadius : 4, paddingVertical : 7, marginHorizontal : 4}
                                        ]}
                                        onPress={ () => {
                                            SetwineMethodModal(!wineMethodModal)
                                        }}>
                                            <Text style={{color : '#fff', fontSize : fontSmall, fontWeight : 'bold'}}>Add this wine to my cellar</Text>
                                        </Pressable>

                                    }
                                
                                
                            
                            </View>

                            <View style={{ height : 5, marginVertical : 15, backgroundColor : iconColorTwo, width : '120%',}}>
                            </View>
                            
                            {
                                type.toLowerCase() != 'general page' &&
                                <>
                                    <View>
                                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                                            <Text style={{fontWeight : 'bold'}}>Recent History Record</Text>
                                            <Pressable
                                            onPress={ () => {
                                                SetviewAll(!viewAll)
                                            } }>
                                                <Text style={{color : secondaryColor, fontSize : fontSmall, fontWeight : 'bold'}}>View All</Text>
                                            </Pressable>
                                        </View>
                                            <View style={{marginTop : 20}}>
                                                <HistoryRecord record={item.history} fontSize={fontSmallest} viewAll={viewAll} />
                                            </View>
                                    </View>
                                    <Text style={{alignSelf : 'center', marginVertical : 30, fontSize : fontSmall, color : iconColorOne, fontWeight : 'bold'}}>Total {item.history.length} Inventory Record</Text>
                                </>
                            }
                            
                        
                        
                        
                        <View style={{alignItems : 'center', width : '100%', marginTop : 15}}>
                            <View style={{borderWidth : 1.5, padding : 7, width : '85%'}}>
                                <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                                    {wineGlass}
                                    <Pressable
                                    hitSlop={30}
                                    onPress={ () => {
                                        addTastingNote( { id : item.note, note : item.note } )
                                    } }>
                                        {plus}         
                                    </Pressable>
                                    
                                </View>
                                <Pressable 
                                onPress={ () => {
                                    viewTastingNote( {id : item.id, note : item.note })
                                } }>
                                    {
                                        item.note && item.note.length != 0 ?
                                        item.note.filter( (item, index) => {
                                            // console.log("index***",index)
                                            return index == 0 && item
                                            // return item.id == 1 && item
                                        } )
                                        .map( (_item) =>  {
                                            console.log("******Item Note*****", item.note)
                                            return (
                                                <View key={item.id}>
                                                    <Text style={{fontSize : fontLarge, marginTop : 7}}>{_item.title}</Text>
                                                    <Text style={{fontSize : fontMedium, color : iconColorOne, width : '70%', marginTop : 3}}>{_item.text}</Text>
                                                    <Text style={{fontSize : fontMedium, color : iconColorOne, alignSelf : 'flex-end', marginTop : 30}}>{_item.date}</Text>
                                                </View>
                                            )
                                        } )
                                        :
                                        <View style = {{paddingVertical : 15, paddingBottom : 35}}>
                                            <Text style={{fontSize : fontXLarge, color : iconColorOne}}>No notes</Text>
                                            <Text style={{fontSize : fontXLarge, color : iconColorOne}}>Click to edit</Text>
                                        </View>

                                    }
                                </Pressable>
                              
                               
                                {/* {
                                    type.toLowerCase() == 'general page' &&
                                    <View style = {{paddingVertical : 15, paddingBottom : 35}}>
                                        <Text style={{fontSize : fontXLarge, color : iconColorOne}}>No notes</Text>
                                        <Text style={{fontSize : fontXLarge, color : iconColorOne}}>Click to edit</Text>
                                    </View>
                                    
                                
                                }
                                {
                                    type.toLowerCase() != 'general page'  &&
                                    <>
                                        <Text style={{fontSize : fontLarge, marginTop : 7}}>Flavor of this wine</Text>
                                        <Text style={{fontSize : fontMedium, color : iconColorOne, width : '70%', marginTop : 3}}>This wine has a good flavor</Text>
                                        <Text style={{fontSize : fontMedium, color : iconColorOne, alignSelf : 'flex-end', marginTop : 30}}>2022-05-05</Text>
                                    </>
                                
                                } */}
                                
                            </View>
                            <Text style={{position : 'absolute', top : -12,
                                            backgroundColor : '#fff', paddingHorizontal : 7,
                                            color : iconColorOne, fontWeight : 'bold'}}>My Tasting Note</Text>
                        </View>
                        {
                            type != "general page" &&
                            <View style={{marginHorizontal : 10, marginTop : 30, marginBottom : 35}}>
                                <Text style={{fontSize : fontMedium}}>Places which has this wine</Text>
                                {
                                    item.placeswithwine.map( (item) => {
                                        return (
                                            <View key={item.id} style={{flexDirection : 'row', alignItems : 'center', marginTop : 10}}>
                                                <Image
                                                source={ { uri : item.image } }
                                                style={{
                                                    width : 40,
                                                    height : 40,
                                                    borderRadius : 40,
                                                }}>
                    
                                                </Image>
                                                <Text style={{fontSize : fontMedium, fontWeight : 'bold', marginHorizontal : 7}}>{item.name}</Text>
                                                <View style={{flexDirection : 'row', alignItems : 'center', marginLeft : 'auto'}}>
                                                    {
                                                        [1,2,3].map( (item) => {
                                                            return (
                                                                <View key={item} style ={{marginLeft: -15}}>
                                                                    { <MaterialCommunityIcons name="bottle-wine" size={25} color= {secondaryColor} /> }
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                                <Text style={{fontSize : fontMedium, fontWeight : 'bold'}}>{item.btl}</Text>
                                            </View>
                                        )
                                    } )
                                }
                            </View>
                        }

                        {
                            type.toLowerCase() == "general page " &&
                            <View style={{ height : 5, marginVertical : 15, backgroundColor : iconColorTwo, width : '120%',}}></View>
                        }

                    <Pressable style={ ( { pressed } ) => [{backgroundColor : pressed ? primaryColor : secondaryColor, alignItems : 'center', paddingVertical : 10, borderRadius : 5, }]}>
                            <Text style={{fontSize : fontSmallest, color : '#fff'}}>Explore this Wine in STOCKVINS Exchange</Text>
                    </Pressable>
                        <View style={{height : 20}}>
                        </View>
                </ScrollView>
                </View>
        )
    } )
 
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });

export default WineInventory
