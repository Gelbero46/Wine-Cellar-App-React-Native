import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import { navigationRef } from '../RootNavigation'

import Header from '../Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';

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
const tertiaryColor3 = '#F24726'
const iconColorOne = '#808080'
const iconColorTwo = '#ccc'

const arrowBack = <FontAwesome5 name="arrow-left" size={25} color= '#eee' />;
const shelf = <FontAwesome5 name="database" size={17} color={primaryColor} />;
const plus = <FontAwesome5 name="plus" size={17} color='#000' />;
const minus = <FontAwesome5 name="minus" size={17} color='#000' />;
const question = <FontAwesome5 name="question" size={15} color='#fff' />;

const dot = <Octicons name="dot-fill" size={30} color= {primaryColor} />;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Notification2 = ({route}) => {
    const [ notifications, Setnotifications ] = useState([])
    useEffect(() => {
      // 👇️ set isMounted to true
      let isMounted = true;

      async function fetchData() {
      const result = await Promise.resolve([ 
        {
          'id' : 1,
          'image' : 'https://upload.wikimedia.org/wikipedia/commons/b/bb/White-lion.jpg',
          'wineImage' : 'https://images.unsplash.com/photo-1592845148519-b0d41df97ac2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
          'name' : 'Home',
          'wineName' : 'Chateau Lynch-Moussas 5eme Cru Classe, Pauillac',
          'vintage' : 1996,
          'volume' : 750,
          'address' : 'Saint-Estephe, France',
          'shelf' : 2,
          'operation' : 'add',
          'btl' : 1,
          'recognized' : true
        },
        {
          'id' : 2,
          'image' : 'https://upload.wikimedia.org/wikipedia/commons/b/bb/White-lion.jpg',
          'wineImage' : 'https://images.unsplash.com/photo-1592845148519-b0d41df97ac2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
          'name' : 'Home',
          'wineName' : 'Chateau Lynch-Moussas 5eme Cru Classe, Pauillac',
          'vintage' : 1996,
          'volume' : 750,
          'address' : 'Saint-Estephe, France',
          'shelf' : 2,
          'operation' : 'add',
          'btl' : 1,
          'recognized' : true
        },
        {
          'id' : 3,
          'image' : 'https://upload.wikimedia.org/wikipedia/commons/b/bb/White-lion.jpg',
          'wineImage' : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRISFRUYERUSGBISEhgSEhgRGBIYGBgZGRgVGBgcIS4lHB4rIRkYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrJSw0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NP/AABEIAQoAvgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EAD0QAAIBAgQDBQUGBAUFAAAAAAECAAMRBBIhMQVBURMiYXGBBhQykbFScqHB0fAVQqKyIzNigvElNESS4f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACURAAICAgMAAgICAwAAAAAAAAABAhEDEiExQRNRIjIEoUJxgf/aAAwDAQACEQMRAD8A+NqpO2sYYYaTS8B4XTFMO1rnU3i3ieTtCE2HSYfKpScUjb49UpMT4sQKH4wQCbRM2enp609GSenpJVubDnGtLgVRlzWtJlKMe2Uot9CiellakVJU6ESKrcyr9FR1FuYaAFE7TQKLwSvVuZH7MqtURrVLmeo7yuWUd5VcCTthwGkErwwbQSqL6DWRHsuXQPPSxqTDUgiVzSzItSpaWb7SqnSY7AnyntVNiLecTrwpP7OvLQDacBBlqPaJMGvoGNE3hVPD2HnI1Ks62I0Gto0waO/xOoFyBrDaXYTXUxcFLHQXjPCIRodIqS6HbbKMZKcBQzuqnYw+rhHf4ReBPSeiwJFiNor4aT5CubNv/A6a0zttMJi6YV2A2BNofX49VZcl7DaR4VwpqxvymGNSxpymzSTUqUUC4GwdC2159CXjFFaepUWEx/F+EGiuaJNTHLHHNUrEpPHxQXxCuKlRmUaE6eU7RQDWRpUbayutU5CbVxSJv1nsRWvoIPPT0pKiG7PSyjvK5ZR3gwXYdyhnB6aFzmgg2g1RypuDYzJx2TRqpatM2XFKFLJpbaYeqACbbSdTFu2hYmU3jxY3HthkyKXSNt7O06WQXttFXtIiA920R0cU6/CxEi9Usbk3MlYWp7WN5U460QBl6VLweemzRinRe4lMtp1eRkynMRdDq+jV+z3DkyBjYk7yriqIHsvTW0RJxCrSBQG1tIThHLak3JmccctnJs0lONJJGt4KKYS5teZ/2sxKMwVLab25QHF4h1BCsQPCLsJTzuATe51vzk/FUnNsHk/HVIpyk62mi9n+MLSXK2kf0eBIE2G0w3EKIR2UbAwUo5k4hrLH+Q24/wAbFayqNOsU0afORoUuZl7HkJcYqK1iS5N8s7UewsJBcIW1ldZCJfg8SFWxB8JpFJESbYDVplTYy7BYY1KlOmN6jKgsCfiIGw1O85jKmZrw/wBmcT2WKw1W2bJUQgXtck2Avy3g+gRpuJexlGjU7PPUYAC7EBdba6FQR6w7F+wlFcOK6NWBAa5srIbX5205Rt7WCu1dmPZDPrZC5tfxIH0jGucWuBFO9Eqc2YZXzc+d7Tg+SeztnbrHVUj5I6WJG9tIBiIxxHxMDuDaLsROyBzTB5NUJ2F5xBcgdSJu+E8OplOW0MmTRWLHj2dGDInI649h1Vu7EplRlsrJlHV0N+D8L7XUwji3BOzFxpaCcK4oaXiJfxLjZqC0xayb8dGqcNOexJJByJEmenQYheLftHZlG50jDBIRoRaMuAcPTLmOphHF6aKVy7zJTW2po4OrEeJos5sovAzQekQxFrTV8FCa3tfxkPad0CWFrnpIeV760NQWtipvaZ8mUCxta94pQFjmOpJvIU6dzLnbKJpGKj+qIcm+y10sJHh25vvKlqkzh012mi4IfIbxFxZev5ReXkGuxllOlB8guCtBcjxj3huB79I9Hpn5ODEzrYgjlYx3gceM9IWN89Mf1CPimJ3fB9Q9tUyYh7HYIR4d0ERmxzcOViTmZmBN99Gi727INckc1Qf0ARhRH/TlHRmnmP8Ad/8AT0P8InxPGizuOhIi6vGfExarU+9+UXtTLGwF53Q6RzT7BYfQ4rUVcoOkqq4FlFyILK/Ga+zP8oltbEMxuxuZTJIhJAG5jReBvlzQcox7Goyl0KZ6W1qJU2M5RpliAOcq1Vk07ornppqfs5dc0RYvDFGKzOOWMnSLljklbGNPiDpoPSSSsznMxvF1d9RDsK2kpRSdi2tHMRXZNVNouZ2c3Yk+cNxkCpsAY6ViL1IWdalm1lVTvQqlUAGsaolsDIy7whKGYSmqMxJhVCsFGsaoTBKi5b6Q/CUQy5uusEq98ky+jiMi2te20E0DTB8SMrES7hferUB1qUh83WA1qhYljzl3Dxd0X7TIvzYCJqx3R9m9sXAcag6Dn4RpQI9wY3HdLHcc58k9ucalTEHIpUUlWhrbUpmBItyi3BMuSvmA7tNWUbXPaoPWwYmcS/j3y2dC/k3Fcf2XcW/zXPWx0+X5SfBXQOc0V0dvn9ZByQbjQzo1/HUjbnY1/GKtPJpbaYura5tOvVZtyTIWMMePT0Mk9vC7B1QrhjtNmvGKfZ202mGymesY8mNT7CGRx6CuIYgOxI2lFCrlYMOUhkM9kMpJJUQ227NTT9pAEy+G0zuLxJdiZTkM5kMmOOMXaKeSTVMveiSbw3DJaXlR0nLzQgqxCXgfu0PJnCYhgyUp56fSEM0hmgBUlO086X2lpMiTACtEtPPr4SRacJgMo7KWYcZXVuhB+Ws6TKqr2tzv/wAQDgI4mR2lQMy1CWYlkbOpJ1up5jWeNJQqtmXvZsoDXYZTazAfDflfeLpMPrew6QoVl9LS48TLCsrD3F/Im2+mgI/SSBiGjuQTuQTlzPXMQHconrCRJnrwCztp60jmns0KCzs5OXnrwCx5STQyqtT2hYptOGmZdkAApzrU9IeKMl7vE2OhWaRnOxMa+7Tvu0VlCkUDPHDmOBhZ04aFiYl93njh44OFkThpRImTDFnVALkkC3Uk2VfUz3HeHmjWejnSqaeUM1MkpmKgsoJGuUkrfqDGVfhlVEfEFG7LOKYexK5wuYi/L4gPSKaz5rsTdmJLE6kk7kmQ7TKVNAS0yfpG2F4ZSbDVKrVctVWKrTAQ6BQRmBYN3iSAVBAym/gAjKvPe/jL0qAMDYEdDt6iDbBJEEoEa2OXZiAba6anaU0msbH9/v8ASMqzVHQuVdqakAsqMKaFtVUkDKCbj5xVW3BH7tH6F8DMURvPGiJfg1zID++v5yxqcnkrgAalIGnD2pyBpRiAuznOzhvZT3ZQAD7Oc7OHCjJdjADQtTHSQKCGOkrKR2Sog2USSgSOJ0gKVje0Ww6GaoJYKIg9B7wxDHYmiIoiSFAS1TLAIxA3YCRbDiGWniIwFGC9pcQmDx2E7rU6jYhWLC7LmCDT0VvVr8pkMW5JvoN9AAoA3sLR3h0vTx5+w7n55h+USV/yb+0xvwleglQWtOL+R+knX3kEG/kYijc8a4zVrJxINlyvUoFiAwYsGRVOrWHdVRtymKq7CaOqf8HG+LYdvmwmcq7D1/OVkVNCg+GPuGuBSW/Q/Uwg1FiRGbIlvsn+9p41WmdFjkusiXWJu2ac7YwoY5zrOZ1ijtWnO2MKEOQ4kwwiPtzLUxBifAI3jpKWSMXsIFUrAGDQ0wPEIbRZk70cVMUIIaq3k0UTw6wsQZcUok/e1lCYShlua0FXFLa8WcR4mF2MaJY5bEqJ5cUpmLq8Sc7SFHiThtTHQrNRw7Br2PEdT3mqA+FidR8/wmOxP6/S02eAfuY8f66h+sxeJOs0l0jKD5ZTU1kqFME2110kkpM3wqWtvYaDwJ2E7RUq9iLEWvITXRrRpq+GXJXFz3xSJ23XUcplqyzV1n7lT7izJ1pc/CIjnhdAMi+Fx/Uf1hNTACCcMxGREvzzf3GGfxASDRC/E4LLIUcLeG4nFKRKaOKAiGT90sNpR7tcy+piwRKkrag3gAPiMNaU0xCsXXvpB6QkyBH0iprAK2HvzhD1JQ9WU6JSYuxOGsN5ncczqTZo/wAfiLAzNYmrmMEDKTin+1I+9v8AakHEgu8YhthHducKHDi2p1lfDKg0j6i4mbbNFFNCZuEyK8GuZoLiXUmWNOwcRdw5+7jfEv8AQxPj6KocmUFzlsDp8K5Rc9WILcrjzEbcEqhXxDN8IcM3PQXJ056RJi8e7rmOW5PfGUCzNfvDzvr5dJeS3VGOOk2AV6zEgNrl0y7KvgANp6m5Zrnw2FgANAAOkvxFMgDOL2sE17zdQOZXnc+m8nhqq3v2Gcg31LW0v8Wmo0N+tjJT+kaNDl27lT7iTMVjNvj8YvZ1B7qlFmRUBNzlsbmwYfFYpr687TEVZbdkRGNHDlqVMjlm/uMg+EaOeA070V83/uMObDCZylTNYxtGVai0rNJppnwo6SlsKJO5epncjTusfHCCRbBiG4tRCwMIooYyODEkMPaS5WNRo0mKcLF7YkGC8VxehIMVYPEHcmaNkJUM8YtxM9iUsY+fEC28UYwgxRYSQDeRYSREjNDMLwb2Mf4apoJlUexjXAYrlM5o0g/B+HlNTEFTIo4InMQoImcXyayjwC8Of/ufH8w0Q1zHGBa3b+n0aJqxnVLpHGv2ZH8JZQc33PzP75n5yrlJYc6ySx+XJRrknuLub/vb8Ihq7x1n7jfcER1DrKZKNZ7Mn/Bt0ZvrGxES+y5/w2+9+sdzlnKpM64RuKKnSVFIQZW7gc5ntZetFRSQKSutjFEBrcQvtKUWxNpBjsBOIt4lq4ljCcPjCB1la0TsmCYjEXW0CSpaXpQ6zzURNLSMqb5B3xLGRLkwhqInaeELR2hJMDLSaoTCzw4gxvguHaawckg0bM52RllGmwN5on4cBynPdwJPyIr42KhimWdPEJPHUwNooMIpPkTk1wNsDVt2jWB+A2YXB33EofGJaxoUydrguv2td/Ec+QnsMe5U8qcBa3P8Ju+kYrtjLNSJQ5KYW4uvauDYhiQTa4Go11+Hxnu0orltTR76f5rtawW5IsN+9+xqB2R8fl4XPPprJJTtrry5W3Fxz8/lILHwxyBSRQp/Cps2dwbFdDrtofHvHWZ2qdSdrknTb0jT+U2+z+cUvLZCNL7NVQqNfmQR+MbVcao5xBg8KyKhY5e0GdRe/dOoJ8wRIYp+hnLKFyZ1xlUUNa2P8Yur4pjzgJc9ZEsZUYJEym2XM99zI5pWJ1RLIPMZwMZN2E8igxNhRx8T0kBWMkcIesj7ow8Y+A/I7nl+HxIXeUdk3SUOh6H5QpME2hm/EFheE4iJnDCKLgROKoam7NLVxwMArYyLmqeMrJvIWMp5C+tVzQJ0lt5YlK4vNEqM27O0T3H+6n1gNrm0Jc2BA5qLf+xghM0b4Rmlyy4UW6f1D9ZKjRYmwG3iBzI5+sHkqe8Qxoh7p+7+cV1NzCUxBsw8CB84Ix1jYkPsbi0dMOqEk06arU0IAYKBlF99t/GAEynDtpLTM32aeHiZG88Zy8AJqZbmAg9568GgTotcSCmRJnLwoGxktTwne1EqSqJJnEmirLg6yWVT0gDYnoLyBrnpJ1K2GD0V52i/EFBoo9ZB6t9NpAnlKiqJk7OKJK8jPFpRJ6dzSN5yAHSMxsOS6+hvKGheG0Z/uH8oI0vxEekZKnvIzwgBPmf3zkTGFXhjhVcWYMnamx+Ec/pF5EbTXYk7CaYso8byZMiG7q+o+ktpYV31VSR1mbNP9FRMiTGNPg9Q2vZQfWMMPw9F0K5z1baS5pFKEmKaWGzWABY87S0YI31Qx3hUVRsBvreW9uoG4mbmzRQRnvcHb4VI85H+HuN9I/fHpoFNzz8JSA7EkrcctY95C0iZ3MOQkTeODwtG7yFgo3zafWDnCKLfzDTnr8hK+SJPxyF95EtGb8PGpBCWtoSb/Iy3DcHz3sS9t8trekN4hpIU5pwxynAw17MFI3DG+vTSC4nhFRNxfl3Tf5xqUWJxaAAJ4zt/n0MjKJOGevOkicgBPDt3mud1IP4Qdpa76hlBFhY85ReUuifT08RPXncv6wA01GoOxIv/AOK3zudJmSYSK5sBe/dK2F9ukHUXlyd0TFVYZgy4tlUuCdgpMbPxCpT0NJqYOwsLfOc4YrqoUXUnvc1tGNYvocym3UXv85zSkm+jpjFpdik8ce1lUf7tZWcZX6AA9V0h2Iw7Mb2Um99FB1+UrenUylQSw0JTmPIHaFrxBUvWQ75Auyi+2QXM4cA5Iz5mHITtHEqq3O3QHUelriRPGFvdVY9LNb5xVLwPx9Ckoqmy5b7Z9TBa2NNM2BOvQ7Smpj6j3OXQ9W2tAXDOdeWumv4xqP2Dl9BfvpNxc2OwvC8Pj1UAKMhG5DZW/GKqtZntm1ttoB9JDTrKcUyVNoffxhRcjNffvKrFvMi0EfibObjQ8yTb0FiIrPnCKdQbBAx9YtEh7NjQVVYqz37osMtyPkBv6ynFVc3wuVC/bfKdeg/+zy4arYMbopGhUZiLcpQ/DmJHfDZhfY38dJCSvlltuuEUghScyipsRZj+JH0lSoXbQAX5dB9TGGB4cpDZyQytYqupFudhr6xkmGSmmjg6gkUzdm15g/pLc0iFFyFdHg7t/Mo8/wBZViOGMgJuDbwYTQVcSgTOaiKw2VkN/wAAQTFK8WdiVvmAH2iAZCnJ8pFuEVw2B4TDszLTa+XV2Ci5IAvfSTXDU2JXKy2PxDYi/jzh6UWvmuEGp72gMjRQMSrWQHS4XMPC/QRvJwSsdMCbha30Zh1uv08IA9EAlb63sDpYiaZMtOyIzNc3OSoq3v8A6bbRJxENo2ttbjJlCn0AEqEm32KUUl0A9mQdbGx110/CO8BQzgimiX/m718t+pYaCDlaYCkm5KXY9WFrCAU6jqGysyg75WIB87TWUXRlFpM1SU7EItmtqbsNfu6kekk7s1gAENyBazbaXJEzWCx7Ib6kDpYHzBtGY4jZDs/aH+Z2XLpqTr4fjMHBpm8ZpoLZFAIapZzoW0QadAeekWY6qtu4xzc7MWv1O1hBXqhjdmJHjfu+Cg8pGplOVUBPUt+9JSjRLlZQhPpudfxMvy8gR66SFBTfTYbmHZFYizKp2IK/jeOTphGNo9RQsBYnlta0M92OhNybbiU+7FGut3Vr7KAB4jwhwoHmGXyNgfK4mUqNFZmivn4ydNLnw5i4U+l5XLh8Im7OdBdDCrpYK2v82bQeNjNHgsHRHfqZaZtlyqwCjxuRMaHOmp+cNLk5bknbc3mU0/s1g0vDWtToupQVlVdLAOosPKZ/E1lVmVWGZLgMLbW2vpc+ESP8R8zJ4cd4+UahQOYfhVdnGTNmO5Bvp4w7iIZVLFwzDcNZL26AfFEDVCDoSPI2lTMTuSfM3j0t2G1IJQMVDMWIzAKLEg9bCajA0qbACnlIYXIsdPPp5TMI5tT1PzlnaMGFiRryJEU1YQdGjq1Bm7MU7ZfhsxKnzFoRRwqvqyheYsbA+Novw1QlVuSdtzeO32Exao2TsXPZPgsxGhJsAfNpYMIHBLgDmezsLDoObS3F/D6Qp/hWCYNCTF8CTWzMoKgi4APlM1iaJR8ua5HOxH4Gat3JfUk6Dc3ib2i3T/dNsc23RjkglyKqYufLU2F5xmOugtry6wvA/C/pBJp6ZeHA1pMrcXHePO3KQnl3EYBOGYHQLrpc3IvHGHw+t9F6gNv6c4pwWzxgh0HpMJ9m0Ohg+KQDL8JHVZSvE+zJAIqA7Ai+X9IPu4vrHSUxbYcuUgs//9k=',
          'name' : 'Home',
          'wineName' : '',
          'vintage' : '',
          'volume' : '',
          'address' : '',
          'shelf' : 2,
          'operation' : 'add',
          'btl' : 1,
          'recognized' : false
        },

      ]);

      // 👇️ only update state if component is mounted
      if (isMounted) {
          Setnotifications(result);
      }
      }

      fetchData();

      return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false;
      };
    }, []);

  return (
    
    <View style={{
        backgroundColor : '#fff',
        flex : 1
    }}>
        <Header 
        title= {route.params.title}
        icon =  {arrowBack}
        iconFunc = { () => {
          navigationRef.goBack()
      } }
        subtitle = {route.params.datetime}
        color = '#fff' 
        backgroundColor = {primaryColor} 
        titleFontSize = {fontLarge} 
        subtitleFunc = { () => {
            console.log('fucker')
        } }
        />
 
           <ScrollView
          style={{flex : 1,
                  width : '100%',
                }}
            >
            <View
              style={{width : '100%', marginTop : 10, borderBottomWidth : 2, borderTopWidth : 2, borderColor : iconColorTwo}}>
              {
                notifications && 
                notifications.map( (item) => {
                    return (
                      <View key={item.id}
                      style={{paddingHorizontal : 10, borderBottomWidth : 2,
                              paddingVertical : 10,
                              borderTopWidth : 2,
                              borderColor : !item.recognized ? tertiaryColor3 : iconColorTwo,
                              borderLeftWidth : !item.recognized ? 2 : 0,
                              borderRightWidth : !item.recognized ? 2 : 0,
                              }}>
                        {
                          item.recognized ? 
                          <Text>{item.wineName} {item.vintage}</Text>
                          :
                          <Text>Wine not recognized</Text>
                        }
                        
                        <View style={{flexDirection : 'row', alignItems : 'center', paddingTop : 5}}>
                              <Image
                              source={{ 'uri' : item.wineImage }}
                              style={{width : width * .25, maxWidth : 200, height : 150, borderRadius : 15 }}>

                              </Image>
                              <View style={{flex : 1, marginLeft : 10}}>

                                  <View style={styles.box}>
                                    <Image
                                        source={{ 'uri' : item.image }}
                                        style={{width : 50, height : 50, borderRadius : 50}}>

                                    </Image>
                                    <Text style={{marginLeft : 10, fontSize : fontMedium}}>{item.name}</Text>
                                  </View>
                                  <View style={[styles.box, {marginTop : 0,}]}>
                                    
                                      {dot}
                                  
                                      <Text style={{fontWeight : 'bold', marginLeft : 3}}>
                                          {item.recognized ? item.volume : '-'}ml
                                         </Text>
                                      <Text style={{marginLeft : 10}}>{item.address}</Text>
                                  </View>
                                  <View style={[styles.box, {marginTop : 0, justifyContent : 'space-between'}]}>
                                    <View style={[styles.box]}>
                                        {shelf}
                                        <View style={{flexDirection : 'row', marginLeft : 5, alignItems : 'center'}}>
                                          <Text>Shelf </Text>
                                          <Text style={{color : primaryColor}}>{item.shelf}</Text>
                                        </View>
                                        
                                    </View>
                                    <View style={[styles.box]}>
                                        {item.operation == 'add' ? plus : minus}
                                        <View style={{flexDirection : 'row', marginLeft : 5, alignItems : 'center'}}>
                                          <Text>{item.btl} </Text>
                                          <Text> Bottle</Text>
                                        </View> 
                                    </View>
                                  </View>
                                 
                                  <Pressable
                                    onPress={ () => {
                                      item.recognized ? 
                                      navigationRef.navigate('UpdateWineContent2')
                                      :
                                      navigationRef.navigate('UpdateWineContent1', { _image : '',  _method : 'add' })
                                    }}
                                    style={ ({pressed}) => [
                                      {backgroundColor : pressed ? secondaryColor : '#fff',
                                        borderWidth : pressed ? 0 : 1,
                                        borderColor : tertiaryColor3,
                                      paddingVertical: 4,
                                      marginTop : 5,
                                    alignItems : 'center'}
                                    ] }>
                                        <Text style={{color : tertiaryColor3}}>Edit</Text>
                                  </Pressable>
                              </View>
                        </View>
                      </View>
                    )
                } )
              }
            </View>
          </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create ({
  box : {flexDirection : 'row', alignItems : 'center'}
})

export default Notification2
