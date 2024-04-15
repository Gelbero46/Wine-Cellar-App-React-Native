import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, Image, Pressable, TextInput, Modal, StatusBar, SafeAreaView} from 'react-native'
import { navigationRef } from '../RootNavigation'

// import Button_ from '../Button.Jsx';

import Header from '../Header';
import Rating from './Rating';
import ButtonDouble from '../ButtonDouble'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const fontXXLarge = 30;
const fontXLarge = 25;
const fontLarge = 20
const fontMedium = 18
const fontSmall = 12;
const fontSmallest = 10

const primaryColor = '#DA0063';
const secondaryColor = '#A41154'
const tetiaryColor = '#0CA789'
const tetiaryColor1 = '#8fd14f'
const tetiaryColor2 = '#fbc700'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'

const search = <FontAwesome5 name="search" size={17} color= '#000' />;
const arrowBack = <FontAwesome5 name="arrow-left" size={25} color= '#eee' />;
const arrowDown = <MaterialIcons name="keyboard-arrow-down" size={30} color="#000" />;
const arrowUp = <MaterialIcons name="keyboard-arrow-up" size={30} color="#000" />;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const UpdateWineContent1 = ({route}) => {
    const [ wines, Setwines ] = useState([])
    const [ searched, Setsearched ] = useState('')
    const [ filterCellarDetailsModal, SetfilterCellarDetailsModal ] = useState(false)

    const [ shelfViewList, SetshelfViewList ] = useState(false)
    const [ typeOfWine, SettypeOfWine ] = useState('Red/White')
    const [ origin, Setorigin ] = useState('All')
    const [ bottleSize, SetbottleSize ] = useState('All')
    const [ collectionType, SetcollectionType ] = useState('All')

    const { _image, _method } = route.params

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
      
    ]

    const filter = <FontAwesome5 name="filter" size={25} color="#808080" />;
    const column = <FontAwesome5 name="columns" size={25} color={shelfViewList ? '#808080' : primaryColor} />;
    const list = <FontAwesome5 name="list" size={25} color={shelfViewList ? primaryColor : '#808080'} />;
    useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;

      async function fetchData() {
      const result = await Promise.resolve([ 
        {
          'id' : 1,
          'image' : 'https://media.istockphoto.com/photos/red-wine-with-property-release-picture-id157405246?k=20&m=157405246&s=612x612&w=0&h=6ZpdTaBPuDJajqXvYAyFDzu588NW7sP-ev8kI1p9p6Q=',
          'wineImage' : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRISFRUYERUSGBISEhgSEhgRGBIYGBgZGRgVGBgcIS4lHB4rIRkYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrJSw0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NP/AABEIAQoAvgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EAD0QAAIBAgQDBQUGBAUFAAAAAAECAAMRBBIhMQVBURMiYXGBBhQykbFScqHB0fAVQqKyIzNigvElNESS4f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACURAAICAgMAAgICAwAAAAAAAAABAhEDEiExQRNRIjIEoUJxgf/aAAwDAQACEQMRAD8A+NqpO2sYYYaTS8B4XTFMO1rnU3i3ieTtCE2HSYfKpScUjb49UpMT4sQKH4wQCbRM2enp609GSenpJVubDnGtLgVRlzWtJlKMe2Uot9CiellakVJU6ESKrcyr9FR1FuYaAFE7TQKLwSvVuZH7MqtURrVLmeo7yuWUd5VcCTthwGkErwwbQSqL6DWRHsuXQPPSxqTDUgiVzSzItSpaWb7SqnSY7AnyntVNiLecTrwpP7OvLQDacBBlqPaJMGvoGNE3hVPD2HnI1Ks62I0Gto0waO/xOoFyBrDaXYTXUxcFLHQXjPCIRodIqS6HbbKMZKcBQzuqnYw+rhHf4ReBPSeiwJFiNor4aT5CubNv/A6a0zttMJi6YV2A2BNofX49VZcl7DaR4VwpqxvymGNSxpymzSTUqUUC4GwdC2159CXjFFaepUWEx/F+EGiuaJNTHLHHNUrEpPHxQXxCuKlRmUaE6eU7RQDWRpUbayutU5CbVxSJv1nsRWvoIPPT0pKiG7PSyjvK5ZR3gwXYdyhnB6aFzmgg2g1RypuDYzJx2TRqpatM2XFKFLJpbaYeqACbbSdTFu2hYmU3jxY3HthkyKXSNt7O06WQXttFXtIiA920R0cU6/CxEi9Usbk3MlYWp7WN5U460QBl6VLweemzRinRe4lMtp1eRkynMRdDq+jV+z3DkyBjYk7yriqIHsvTW0RJxCrSBQG1tIThHLak3JmccctnJs0lONJJGt4KKYS5teZ/2sxKMwVLab25QHF4h1BCsQPCLsJTzuATe51vzk/FUnNsHk/HVIpyk62mi9n+MLSXK2kf0eBIE2G0w3EKIR2UbAwUo5k4hrLH+Q24/wAbFayqNOsU0afORoUuZl7HkJcYqK1iS5N8s7UewsJBcIW1ldZCJfg8SFWxB8JpFJESbYDVplTYy7BYY1KlOmN6jKgsCfiIGw1O85jKmZrw/wBmcT2WKw1W2bJUQgXtck2Avy3g+gRpuJexlGjU7PPUYAC7EBdba6FQR6w7F+wlFcOK6NWBAa5srIbX5205Rt7WCu1dmPZDPrZC5tfxIH0jGucWuBFO9Eqc2YZXzc+d7Tg+SeztnbrHVUj5I6WJG9tIBiIxxHxMDuDaLsROyBzTB5NUJ2F5xBcgdSJu+E8OplOW0MmTRWLHj2dGDInI649h1Vu7EplRlsrJlHV0N+D8L7XUwji3BOzFxpaCcK4oaXiJfxLjZqC0xayb8dGqcNOexJJByJEmenQYheLftHZlG50jDBIRoRaMuAcPTLmOphHF6aKVy7zJTW2po4OrEeJos5sovAzQekQxFrTV8FCa3tfxkPad0CWFrnpIeV760NQWtipvaZ8mUCxta94pQFjmOpJvIU6dzLnbKJpGKj+qIcm+y10sJHh25vvKlqkzh012mi4IfIbxFxZev5ReXkGuxllOlB8guCtBcjxj3huB79I9Hpn5ODEzrYgjlYx3gceM9IWN89Mf1CPimJ3fB9Q9tUyYh7HYIR4d0ERmxzcOViTmZmBN99Gi727INckc1Qf0ARhRH/TlHRmnmP8Ad/8AT0P8InxPGizuOhIi6vGfExarU+9+UXtTLGwF53Q6RzT7BYfQ4rUVcoOkqq4FlFyILK/Ga+zP8oltbEMxuxuZTJIhJAG5jReBvlzQcox7Goyl0KZ6W1qJU2M5RpliAOcq1Vk07ornppqfs5dc0RYvDFGKzOOWMnSLljklbGNPiDpoPSSSsznMxvF1d9RDsK2kpRSdi2tHMRXZNVNouZ2c3Yk+cNxkCpsAY6ViL1IWdalm1lVTvQqlUAGsaolsDIy7whKGYSmqMxJhVCsFGsaoTBKi5b6Q/CUQy5uusEq98ky+jiMi2te20E0DTB8SMrES7hferUB1qUh83WA1qhYljzl3Dxd0X7TIvzYCJqx3R9m9sXAcag6Dn4RpQI9wY3HdLHcc58k9ucalTEHIpUUlWhrbUpmBItyi3BMuSvmA7tNWUbXPaoPWwYmcS/j3y2dC/k3Fcf2XcW/zXPWx0+X5SfBXQOc0V0dvn9ZByQbjQzo1/HUjbnY1/GKtPJpbaYura5tOvVZtyTIWMMePT0Mk9vC7B1QrhjtNmvGKfZ202mGymesY8mNT7CGRx6CuIYgOxI2lFCrlYMOUhkM9kMpJJUQ227NTT9pAEy+G0zuLxJdiZTkM5kMmOOMXaKeSTVMveiSbw3DJaXlR0nLzQgqxCXgfu0PJnCYhgyUp56fSEM0hmgBUlO086X2lpMiTACtEtPPr4SRacJgMo7KWYcZXVuhB+Ws6TKqr2tzv/wAQDgI4mR2lQMy1CWYlkbOpJ1up5jWeNJQqtmXvZsoDXYZTazAfDflfeLpMPrew6QoVl9LS48TLCsrD3F/Im2+mgI/SSBiGjuQTuQTlzPXMQHconrCRJnrwCztp60jmns0KCzs5OXnrwCx5STQyqtT2hYptOGmZdkAApzrU9IeKMl7vE2OhWaRnOxMa+7Tvu0VlCkUDPHDmOBhZ04aFiYl93njh44OFkThpRImTDFnVALkkC3Uk2VfUz3HeHmjWejnSqaeUM1MkpmKgsoJGuUkrfqDGVfhlVEfEFG7LOKYexK5wuYi/L4gPSKaz5rsTdmJLE6kk7kmQ7TKVNAS0yfpG2F4ZSbDVKrVctVWKrTAQ6BQRmBYN3iSAVBAym/gAjKvPe/jL0qAMDYEdDt6iDbBJEEoEa2OXZiAba6anaU0msbH9/v8ASMqzVHQuVdqakAsqMKaFtVUkDKCbj5xVW3BH7tH6F8DMURvPGiJfg1zID++v5yxqcnkrgAalIGnD2pyBpRiAuznOzhvZT3ZQAD7Oc7OHCjJdjADQtTHSQKCGOkrKR2Sog2USSgSOJ0gKVje0Ww6GaoJYKIg9B7wxDHYmiIoiSFAS1TLAIxA3YCRbDiGWniIwFGC9pcQmDx2E7rU6jYhWLC7LmCDT0VvVr8pkMW5JvoN9AAoA3sLR3h0vTx5+w7n55h+USV/yb+0xvwleglQWtOL+R+knX3kEG/kYijc8a4zVrJxINlyvUoFiAwYsGRVOrWHdVRtymKq7CaOqf8HG+LYdvmwmcq7D1/OVkVNCg+GPuGuBSW/Q/Uwg1FiRGbIlvsn+9p41WmdFjkusiXWJu2ac7YwoY5zrOZ1ijtWnO2MKEOQ4kwwiPtzLUxBifAI3jpKWSMXsIFUrAGDQ0wPEIbRZk70cVMUIIaq3k0UTw6wsQZcUok/e1lCYShlua0FXFLa8WcR4mF2MaJY5bEqJ5cUpmLq8Sc7SFHiThtTHQrNRw7Br2PEdT3mqA+FidR8/wmOxP6/S02eAfuY8f66h+sxeJOs0l0jKD5ZTU1kqFME2110kkpM3wqWtvYaDwJ2E7RUq9iLEWvITXRrRpq+GXJXFz3xSJ23XUcplqyzV1n7lT7izJ1pc/CIjnhdAMi+Fx/Uf1hNTACCcMxGREvzzf3GGfxASDRC/E4LLIUcLeG4nFKRKaOKAiGT90sNpR7tcy+piwRKkrag3gAPiMNaU0xCsXXvpB6QkyBH0iprAK2HvzhD1JQ9WU6JSYuxOGsN5ncczqTZo/wAfiLAzNYmrmMEDKTin+1I+9v8AakHEgu8YhthHducKHDi2p1lfDKg0j6i4mbbNFFNCZuEyK8GuZoLiXUmWNOwcRdw5+7jfEv8AQxPj6KocmUFzlsDp8K5Rc9WILcrjzEbcEqhXxDN8IcM3PQXJ056RJi8e7rmOW5PfGUCzNfvDzvr5dJeS3VGOOk2AV6zEgNrl0y7KvgANp6m5Zrnw2FgANAAOkvxFMgDOL2sE17zdQOZXnc+m8nhqq3v2Gcg31LW0v8Wmo0N+tjJT+kaNDl27lT7iTMVjNvj8YvZ1B7qlFmRUBNzlsbmwYfFYpr687TEVZbdkRGNHDlqVMjlm/uMg+EaOeA070V83/uMObDCZylTNYxtGVai0rNJppnwo6SlsKJO5epncjTusfHCCRbBiG4tRCwMIooYyODEkMPaS5WNRo0mKcLF7YkGC8VxehIMVYPEHcmaNkJUM8YtxM9iUsY+fEC28UYwgxRYSQDeRYSREjNDMLwb2Mf4apoJlUexjXAYrlM5o0g/B+HlNTEFTIo4InMQoImcXyayjwC8Of/ufH8w0Q1zHGBa3b+n0aJqxnVLpHGv2ZH8JZQc33PzP75n5yrlJYc6ySx+XJRrknuLub/vb8Ihq7x1n7jfcER1DrKZKNZ7Mn/Bt0ZvrGxES+y5/w2+9+sdzlnKpM64RuKKnSVFIQZW7gc5ntZetFRSQKSutjFEBrcQvtKUWxNpBjsBOIt4lq4ljCcPjCB1la0TsmCYjEXW0CSpaXpQ6zzURNLSMqb5B3xLGRLkwhqInaeELR2hJMDLSaoTCzw4gxvguHaawckg0bM52RllGmwN5on4cBynPdwJPyIr42KhimWdPEJPHUwNooMIpPkTk1wNsDVt2jWB+A2YXB33EofGJaxoUydrguv2td/Ec+QnsMe5U8qcBa3P8Ju+kYrtjLNSJQ5KYW4uvauDYhiQTa4Go11+Hxnu0orltTR76f5rtawW5IsN+9+xqB2R8fl4XPPprJJTtrry5W3Fxz8/lILHwxyBSRQp/Cps2dwbFdDrtofHvHWZ2qdSdrknTb0jT+U2+z+cUvLZCNL7NVQqNfmQR+MbVcao5xBg8KyKhY5e0GdRe/dOoJ8wRIYp+hnLKFyZ1xlUUNa2P8Yur4pjzgJc9ZEsZUYJEym2XM99zI5pWJ1RLIPMZwMZN2E8igxNhRx8T0kBWMkcIesj7ow8Y+A/I7nl+HxIXeUdk3SUOh6H5QpME2hm/EFheE4iJnDCKLgROKoam7NLVxwMArYyLmqeMrJvIWMp5C+tVzQJ0lt5YlK4vNEqM27O0T3H+6n1gNrm0Jc2BA5qLf+xghM0b4Rmlyy4UW6f1D9ZKjRYmwG3iBzI5+sHkqe8Qxoh7p+7+cV1NzCUxBsw8CB84Ix1jYkPsbi0dMOqEk06arU0IAYKBlF99t/GAEynDtpLTM32aeHiZG88Zy8AJqZbmAg9568GgTotcSCmRJnLwoGxktTwne1EqSqJJnEmirLg6yWVT0gDYnoLyBrnpJ1K2GD0V52i/EFBoo9ZB6t9NpAnlKiqJk7OKJK8jPFpRJ6dzSN5yAHSMxsOS6+hvKGheG0Z/uH8oI0vxEekZKnvIzwgBPmf3zkTGFXhjhVcWYMnamx+Ec/pF5EbTXYk7CaYso8byZMiG7q+o+ktpYV31VSR1mbNP9FRMiTGNPg9Q2vZQfWMMPw9F0K5z1baS5pFKEmKaWGzWABY87S0YI31Qx3hUVRsBvreW9uoG4mbmzRQRnvcHb4VI85H+HuN9I/fHpoFNzz8JSA7EkrcctY95C0iZ3MOQkTeODwtG7yFgo3zafWDnCKLfzDTnr8hK+SJPxyF95EtGb8PGpBCWtoSb/Iy3DcHz3sS9t8trekN4hpIU5pwxynAw17MFI3DG+vTSC4nhFRNxfl3Tf5xqUWJxaAAJ4zt/n0MjKJOGevOkicgBPDt3mud1IP4Qdpa76hlBFhY85ReUuifT08RPXncv6wA01GoOxIv/AOK3zudJmSYSK5sBe/dK2F9ukHUXlyd0TFVYZgy4tlUuCdgpMbPxCpT0NJqYOwsLfOc4YrqoUXUnvc1tGNYvocym3UXv85zSkm+jpjFpdik8ce1lUf7tZWcZX6AA9V0h2Iw7Mb2Um99FB1+UrenUylQSw0JTmPIHaFrxBUvWQ75Auyi+2QXM4cA5Iz5mHITtHEqq3O3QHUelriRPGFvdVY9LNb5xVLwPx9Ckoqmy5b7Z9TBa2NNM2BOvQ7Smpj6j3OXQ9W2tAXDOdeWumv4xqP2Dl9BfvpNxc2OwvC8Pj1UAKMhG5DZW/GKqtZntm1ttoB9JDTrKcUyVNoffxhRcjNffvKrFvMi0EfibObjQ8yTb0FiIrPnCKdQbBAx9YtEh7NjQVVYqz37osMtyPkBv6ynFVc3wuVC/bfKdeg/+zy4arYMbopGhUZiLcpQ/DmJHfDZhfY38dJCSvlltuuEUghScyipsRZj+JH0lSoXbQAX5dB9TGGB4cpDZyQytYqupFudhr6xkmGSmmjg6gkUzdm15g/pLc0iFFyFdHg7t/Mo8/wBZViOGMgJuDbwYTQVcSgTOaiKw2VkN/wAAQTFK8WdiVvmAH2iAZCnJ8pFuEVw2B4TDszLTa+XV2Ci5IAvfSTXDU2JXKy2PxDYi/jzh6UWvmuEGp72gMjRQMSrWQHS4XMPC/QRvJwSsdMCbha30Zh1uv08IA9EAlb63sDpYiaZMtOyIzNc3OSoq3v8A6bbRJxENo2ttbjJlCn0AEqEm32KUUl0A9mQdbGx110/CO8BQzgimiX/m718t+pYaCDlaYCkm5KXY9WFrCAU6jqGysyg75WIB87TWUXRlFpM1SU7EItmtqbsNfu6kekk7s1gAENyBazbaXJEzWCx7Ib6kDpYHzBtGY4jZDs/aH+Z2XLpqTr4fjMHBpm8ZpoLZFAIapZzoW0QadAeekWY6qtu4xzc7MWv1O1hBXqhjdmJHjfu+Cg8pGplOVUBPUt+9JSjRLlZQhPpudfxMvy8gR66SFBTfTYbmHZFYizKp2IK/jeOTphGNo9RQsBYnlta0M92OhNybbiU+7FGut3Vr7KAB4jwhwoHmGXyNgfK4mUqNFZmivn4ydNLnw5i4U+l5XLh8Im7OdBdDCrpYK2v82bQeNjNHgsHRHfqZaZtlyqwCjxuRMaHOmp+cNLk5bknbc3mU0/s1g0vDWtToupQVlVdLAOosPKZ/E1lVmVWGZLgMLbW2vpc+ESP8R8zJ4cd4+UahQOYfhVdnGTNmO5Bvp4w7iIZVLFwzDcNZL26AfFEDVCDoSPI2lTMTuSfM3j0t2G1IJQMVDMWIzAKLEg9bCajA0qbACnlIYXIsdPPp5TMI5tT1PzlnaMGFiRryJEU1YQdGjq1Bm7MU7ZfhsxKnzFoRRwqvqyheYsbA+Novw1QlVuSdtzeO32Exao2TsXPZPgsxGhJsAfNpYMIHBLgDmezsLDoObS3F/D6Qp/hWCYNCTF8CTWzMoKgi4APlM1iaJR8ua5HOxH4Gat3JfUk6Dc3ib2i3T/dNsc23RjkglyKqYufLU2F5xmOugtry6wvA/C/pBJp6ZeHA1pMrcXHePO3KQnl3EYBOGYHQLrpc3IvHGHw+t9F6gNv6c4pwWzxgh0HpMJ9m0Ohg+KQDL8JHVZSvE+zJAIqA7Ai+X9IPu4vrHSUxbYcuUgs//9k=',
          'wineName' : 'Chateau Lynch-Moussas 5eme Cru Classe, Pauillac',
          'vintage' : 1996,
          'rating' : 4.2
        },
        {
          'id' : 2,
          'image' : 'https://media.istockphoto.com/photos/red-wine-with-property-release-picture-id157405246?k=20&m=157405246&s=612x612&w=0&h=6ZpdTaBPuDJajqXvYAyFDzu588NW7sP-ev8kI1p9p6Q=',
          'wineImage' : 'data:image/jpeg;base64,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',
          'wineName' : 'Bhateau Lynch-Moussas 5eme Cru Classe, Pauillac',
          'vintage' : 1996,
          'rating' : 4.2
        },
        {
          'id' : 3,
          'image' : 'https://media.istockphoto.com/photos/red-wine-with-property-release-picture-id157405246?k=20&m=157405246&s=612x612&w=0&h=6ZpdTaBPuDJajqXvYAyFDzu588NW7sP-ev8kI1p9p6Q=',
          'wineImage' : 'data:image/jpeg;base64,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',
          'wineName' : 'Ahateau Lynch-Moussas 5eme Cru Classe, Pauillac',
          'vintage' : 1996,
          'rating' : 4.2
        },

      ]);

      // 👇️ only update state if component is mounted
      if (isMounted) {
          Setwines(result);
      }
      }

      fetchData();

      return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false;
      };
    }, []);

    // const _button = ({
    //   rightText,
    //   leftText,
    //   colorPressed,
    //   colorNotPressed,
    //   textColor,
    //   rightTextonPress,
    //   leftTextonPress,
    //   paddingVertical,
    //   paddingHorizontal,
    //   fontSize
    // }
    //   ) => {
    //   return (
    //   <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
    //           <Pressable
    //             onPress={leftTextonPress ? leftTextonPress :  onPressFunction}
    //             style={({pressed}) => [
    //               { backgroundColor: pressed ? `${colorPressed ? colorPressed : secondaryColor }` : `${colorNotPressed ? colorNotPressed : primaryColor}`, 
    //               borderWidth: pressed ? 4 : 0, 
    //               borderRadius: 5, 
    //               borderColor: '#414BB2',
    //               justifyContent: 'center'},
                  
    //             ]}>
    //               <Text style={{paddingHorizontal: paddingHorizontal ? paddingHorizontal : 35, 
    //                             paddingVertical: paddingVertical ? paddingVertical : 15, fontSize: fontSize ? fontSize : fontSmallest, color: textColor ? textColor : '#eee'}}>{rightText ? rightText :  Confirm}</Text>
    //           </Pressable>
    //           <Pressable
    //             onPress={rightTextonPress ? rightTextonPress : onPressFunction}
    //             style={({pressed}) => [
    //               { backgroundColor: pressed ? `${colorPressed ? colorPressed : secondaryColor }` : `${colorNotPressed ? colorNotPressed : primaryColor}`,
    //                 borderWidth: pressed ? 4 : 0, borderRadius: 5, borderColor: '#414BB2', justifyContent: 'center'},
                  
    //             ]}>
    //               <Text style={{paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical, fontSize: fontSize ? fontSize : fontSmallest, color: textColor ? textColor : '#eee'}}>{leftText ? leftText : Cancel}</Text>
    //           </Pressable>
    //   </View>
    //   )
    //   }

      console.log(_image, "Hellllllllllllllllllllllllllllllll")

  return (
    <SafeAreaView style={{
        backgroundColor : '#fff',
        flex : 1

    }}>

        <Header 
        title= 'Update Wine Content'
        icon =  {arrowBack}
        iconFunc = { () => {
          navigationRef.goBack()
      } }
        subtitle = 'Cannot Find your Wine?'
        subtitleFontSize={fontSmall}
        color = '#fff' 
        backgroundColor = {primaryColor} 
        titleFontSize = {fontLarge} 
        subtitleFunc = { () => {
            navigationRef.navigate('UpdateWineContent3', { _image : _image, _method : _method })
        } }

        />
       
       
        <View style={{flexDirection : 'row', marginVertical : 10, alignItems : 'center', width : '100%', paddingHorizontal : 10}}>
          
          <View style={{borderWidth : 1, borderColor : iconColorTwo, flex : 1,
                          paddingVertical : 5, justifyContent : 'center', paddingLeft : 35}}>
              <TextInput
                    onChangeText={Setsearched}
                    value={searched}
                    placeholder= 'Search'
                />
                <View style={{position : 'absolute', left: 10}}>
                  {search}
                </View>
          </View>
          <View style={
              {flexDirection: 'row', 
              paddingVertical: 5,
              alignItems: 'center'}}>

              <Pressable onPress={ () => {
                SetfilterCellarDetailsModal(!filterCellarDetailsModal)
              } }
              style={{paddingHorizontal : 5}}
              hitSlop={5}
              >
                {filter}
              </Pressable>
            
              <Pressable
                onPress={() => (
                  shelfViewList && SetshelfViewList(!shelfViewList)
                )}
                style={{paddingHorizontal : 5}}
                hitSlop={5}
                >
                {column}
              </Pressable>

              <Pressable
                onPress={() => (
                  !shelfViewList && SetshelfViewList(!shelfViewList)
                )}
                style={{paddingLeft : 5}}
                hitSlop={5}
                >
                {list}
              </Pressable>
          </View>
         
        </View>
          
          
           <ScrollView
          style={{flex : 1,
                  width : '100%'}}
            >
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
                        let [ show, Setshow ] = useState(false)
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
                              console.log(show)
                              Setshow(!show)
                            } }>
                                <Text style={{
                                  // backgroundColor : 'red',
                                  marginRight : 'auto'
                                }}>{item.value}</Text>

                                <View style={{
                                  // backgroundColor : 'red'
                                  }}>
                                  {show ? arrowUp : arrowDown}
                                </View>
                            </Pressable>
                        </View>
                        )
                    } )
                  }

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

            {
              _image && 
              <View style={{ alignItems : 'center', marginVertical : 20}}>
                  <Image
                    resizeMode='contain'
                    source={{uri : _image}}
                    style={{width : 150, height : 250}}>

                  </Image>
                  <Text style={{fontSize: fontMedium}}>Wine not found</Text>

              </View>
              
            }
             <Text style={{marginHorizontal : 10, fontSize : fontMedium}}>Recommended Wine</Text>
            <View
              style={{width : '100%', maxWidth : 500, justifyContent : 'space-between', alignItems : 'center', flexDirection : 'row', flexWrap : 'wrap'}}>
              {
                wines && 
                  wines.filter( (item) => {
                      if (searched) {
                        const itemName = item.wineName.toLowerCase()
                        const searchedItem = searched.toLowerCase()
                        // console.log(itemName)
                        // console.log(searchedItem)
                        // console.log('888888888888888888', itemName.startsWith(searchedItem))
                        return itemName.startsWith(searchedItem) && item
                      }
                    else  {
                      return item
                    }
                  } )
                  .map( (item) => {
                    return (
                        <Pressable style={{
                          borderWidth: 3,
                          borderColor: '#eee',
                          borderRadius: 30,
                          padding: 7,
                          // paddingVertical : 12,
                          flex: 1,
                          width : width * 0.5,
                          minWidth : width * 0.45,
                          maxWidth : width * 0.5,
                          marginHorizontal: 5,
                          alignItems : 'center',
                          marginVertical: 7,
                        }}
                  
                        onPress={ () =>{
                          // console.log(cellarID, 'ggg')
                          navigationRef.navigate('UpdateWineContent2')
                        } }
                        key={item.id}>
                            <View style={{
                              width : '100%'
                            }}>
                              <Text>{item.wineName}</Text>
                              <Text>{item.vintage}</Text>
                            </View>

                            <View>
                                <Image source={{'uri' : item.wineImage}}
                                        style={{
                                          width : width * 0.25,
                                          maxWidth : 90,
                                          height : 120,
                                          borderRadius : 15
                                        
                                        }}
                                        resizeMode = 'stretch'
                                ></Image>
                            </View>
                            <View style={{flexDirection : 'row', alignItems : 'center', flexWrap : 'wrap', marginTop : 20, marginBottom : 5}}>
                              <Text style={{fontSize : fontSmall, marginRight : 10}}>Average</Text>
                              <Rating size={fontSmallest} color={primaryColor} rate={4.2}/>
                              <Text style={{fontSize : fontSmall, marginLeft : 5}}>{item.rating}</Text>
                            </View>
                            

                           

                        </Pressable>
                    )
                  } )
                            
              }
            </View>
          </ScrollView>
    </SafeAreaView>
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
    margin: 5
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
  },
  addCellarIcon: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 25,
    elevation: 5

  }
})

export default UpdateWineContent1
