import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    Platform,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Linking,
    FlatList
} from 'react-native';
import HTML from 'react-native-render-html';
import Stars from 'react-native-stars';
import Button from 'react-native-button';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


const GLOBAL = require('./Global');

type Props = {};
const { width, height } = Dimensions.get('window');

let customDatesStyles = [];
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const window = Dimensions.get('window');



export default class DoctorDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    constructor(props) {
        super(props);



        this.state = {
            position: 1,
            interval: null,
            results:[],
            gallery:[],
            practice:[],
            speciality:[],
            password:'',
            index: 0,
            routes: [
                { key: 'first', title: 'Details' },
                { key: 'second', title: 'Rating' },
            ],
        };
    }

    _renderItems = ({item,index}) => {


        return (
            <View>
            <Text style={{fontSize:15, color:'#010101'}}>{item.hospital_name}</Text>
            <Text style={{fontSize:15, color:'#010101'}}>{item.hospital_address}</Text>
            </View>


        )
    }




    componentWillUnmount() {
    }


    call = () => {
      var phoneNumber = `tel:${'7724000070'}`;
        Linking.openURL(phoneNumber);
    }
renderTimes = ({ item, index }) => {
//  console.log(item);
  return (
    <View
      style={{
        backgroundColor: "white",
        color: "white",
        flexDirection: "row",
        margin: 5,
        flex: 1,
        height: 50,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e9eaeb',
        width: window.width / 1.4,
       }}
    >
      {item.flag == 0 && (
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{ fontSize: 15, color: "grey",fontFamily:GLOBAL.semi, marginLeft:10 }}>
          {item.day.toUpperCase()}
        </Text>
        <View style={{flexDirection:'column', marginRight:10}}>
        <Text style={{ fontSize: 15, color: "grey", fontFamily:GLOBAL.regular }}>
         {item.start1} - {item.end1}
        </Text>
        </View>
        </View>
      )}

      {item.flag == 1 && (
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{ fontSize: 15, color: "#D90000",fontFamily:GLOBAL.semi, marginLeft:10 }}>
          {item.day.toUpperCase()}
        </Text>
        <View style={{flexDirection:'column', marginRight:10}}>
        <Text style={{ fontSize: 15, color: "#D90000", fontFamily:GLOBAL.regular }}>
         {item.start1} - {item.end1}
        </Text>
        </View>
        </View>
      )}
    </View>
  );
};


_renderGallery=(item)=>{
  alert(JSON.stringify(item))
    return(
        <TouchableOpacity onPress={()=> //Linking.openUrl('')
        console.log('hi')
    }>
        <Image style={{width:50, height:50, resizeMode:'stretch', margin:3}} source={require('./delete.png')}/>
        </TouchableOpacity>
        )
}

list = () =>{
  const url = GLOBAL.BASE_URL +  'list_rating'

                       fetch(url, {
                           method: 'POST',
                           headers: {
                               'Content-Type': 'application/json',
                           },
                           body: JSON.stringify({
                               user_id:GLOBAL.user_id,
                               doctor_id :this.props.navigation.state.params



                           }),
                       }).then((response) => response.json())
                           .then((responseJson) => {







                               if (responseJson.status == true) {
        this.setState({speciality:responseJson.list})
     //video_timing

                               }else {

                               }
                           })
                           .catch((error) => {
                               console.error(error);
                           });
}

renderRowItem1 = (itemData) => {
 var ra = itemData.item.rating
 var ras = parseInt(ra)
   var idex;
   if (itemData.index % 3 == 0){
       idex = '#7BAAED'
   }else if  (itemData.index % 3 == 1){
       idex = '#F2C1D7'
   }else{
       idex = '#8E9198'
   }
   const x = itemData.item.review
   return (

       <View style={{backgroundColor:'white',color :'white', flex: 1 ,margin: 10,borderRadius :9,width : window.width - 20, shadowColor: '#000',
       }}>

<View style = {{flexDirection: 'row',justifyContent:'space-between'}}>

<View style = {{flexDirection:'row'}}>
   <View style = {{backgroundColor:idex,width:40,height:40,borderRadius:20,marginTop: 10}}>
       <Text style={{fontFamily:GLOBAL.medium,fontSize:26,color:'white',margin:7,alignSelf:'center'}}>
           {x.substring(0, 1)}

       </Text>

   </View>

   <View>

<Text style={{fontFamily:GLOBAL.medium,fontSize:16,marginLeft:12,marginTop:18}}>
   {itemData.item.review}

</Text>

<View style = {{marginLeft:12}}>
       <Stars
           display={ras}
           spacing={2}
           count={5}
           starSize={12}

           backingColor='cornsilk'
           fullStar= {require('./star.png')}
           emptyStar= {require('./star.png')}/>



</View>






   </View>


</View>
<Text style={{fontFamily:GLOBAL.medium,fontSize:12,marginRight:12,marginTop:18,color:'#8E9198'}}>
 {itemData.item.date}

</Text>

</View>



           <Text style={{fontFamily:GLOBAL.medium,fontSize:12,marginLeft:50,marginTop:8,width:window.width - 118}}>
             {itemData.item.review}

           </Text>







       </View>

   )
}
    componentDidMount(){
      this.list()
        const url =   GLOBAL.BASE_URL +  'full_dr_detail'

        fetch(url, {
                method: 'POST',
                    timeoutInterval: 90000, // milliseconds
                sslPinning: {
                certs: ['anytimedoc_in']
                  },
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "id":this.props.navigation.state.params,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson.doctor_detail))

                if (responseJson.status == true) {

                    if(responseJson.doctor_detail.lat == "" || responseJson.doctor_detail.lon ==""){
                        this.setState({noloc: 1})
                    }else{

      var lat = parseFloat(responseJson.doctor_detail.lat)
      var long = parseFloat(responseJson.doctor_detail.lon)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({noloc:0})
      this.setState({initialPosition: initialRegion})
//        this.mapView.animateToRegion(initialRegion, 1);

                    }

                     this.setState({results:responseJson.doctor_detail})
                     this.setState({practice:responseJson.doctor_detail.practices_at})
                    this.setState({firstService:responseJson.doctor_detail.services[0]})
                    this.setState({secondService:responseJson.doctor_detail.services[1]})

                    for (var i = 0 ; i< responseJson.doctor_detail.normal_timing.length;i++){
                        if (responseJson.doctor_detail.normal_timing[i].flag == 1){
                            var a  =  ` ${responseJson.doctor_detail.normal_timing[i].start1} - ${responseJson.doctor_detail.normal_timing[i].end1}`;
                            var b  =  ` ${responseJson.doctor_detail.normal_timing[i].start2} - ${responseJson.doctor_detail.normal_timing[i].end2}`;
                           this.setState({timings:b})
                        }
                    }


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    render() {
        var yooo = this.state.results
        var defree = yooo.doctor_degree



        return (

            <ScrollView style={styles.container}>
                <Image style={{width:window.width, height:250}}
                source={{uri: yooo.doctor_image}}/>

                <View style = {{backgroundColor:'rgba(0,0,0,0.8)',width:window.width,height:250,marginTop:-250}}>

                </View>

                <View style={{backgroundColor:'transparent',color :'white',flexDirection:'row' , flex: 1 ,margin: 10, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    width:'95%',
                    elevation: 5, position:'absolute',top:20, justifyContent:'center'  }}>
                    <View style={{flexDirection:'column',  alignSelf:'center'}}>
                    <Image style={{width:60, height:60, borderWidth:2,borderColor:'white', alignSelf:'center', borderRadius:30,}} source={{uri: yooo.doctor_image}}/>
                        <Text style={{color:'white',fontFamily:GLOBAL.regular, fontSize:16,textAlign:'center', marginTop:10}}>{yooo.doctor_name}</Text>
                        <Text style={{color:'white',fontFamily:GLOBAL.regular, fontSize:12,textAlign:'center', marginTop:5}}>MBBS, Certified</Text>
                        <Text style={{color:'white', fontFamily:GLOBAL.regular,fontSize:12,textAlign:'center',}}>{yooo.doctor_experience} years of experience</Text>

                    </View>
                </View>

                <View style = {{marginLeft:10,width:window.width - 20}}>
                  <HTML html={yooo.remarks}  />

                </View>

                        <Text style={{color:'grey',fontFamily:GLOBAL.regular, fontSize:16,margin:10}}>Book  Appointment</Text>

            <View style={{backgroundColor:'white'}}>
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./pin.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                            <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,width:'70%'}}>{yooo.lat_long_address}</Text>
                        </View>
                    </View>
                <View style={{height:0.5, backgroundColor:'#bfbfbf', width:'80%', alignSelf:'center', marginLeft:30}}/>

                </View>

                <View style={{flexDirection:'column', marginTop:10}}>
                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./money.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                        {yooo.normal_appointment == "1" && (
                                                      <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Rs. {yooo.normal_appointment_price} Consultation Fee</Text>
                        )}
                        {yooo.normal_appointment != "1" && (
                                                      <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Rs. {yooo.online_consult_video_price} Consultation Fee</Text>
                        )}

                        </View>
                    </View>

                <View style={{height:0.5, backgroundColor:'#bfbfbf', width:'80%', alignSelf:'center', marginLeft:30,}}/>
                </View>


                <View style={{flexDirection:'column', marginTop:10}}>
                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./clock.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                            <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Available time slots</Text>

                                <FlatList style={{elevation:5, backgroundColor:'white', marginTop:5, borderRadius:5}}
                                data={yooo.normal_timing}
                                renderItem = {this.renderTimes}
                                keyExtractor = { (item, index) => index.toString() }
                                />


                        </View>


                    </View>

                <View style={{height:0.5, backgroundColor:'#bfbfbf', width:'80%', alignSelf:'center', marginLeft:30,}}/>
                </View>



<View>
                <View style={{flexDirection:'column', marginTop:10}}>

                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./gallery.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                        <FlatList data={yooo.gallery}
                        horizontal ={true}
                        renderItem={this._renderGallery}
                        />
                        </View>
                    </View>

                    <View style={{height:0.5, backgroundColor:'#bfbfbf', width:'80%', alignSelf:'center', marginLeft:30,}}/>
                    </View>
                    </View>




                <View style={{width:window.width, flexDirection:'row', justifyContent:'space-around'}}>
<Button
   style={{padding:12,marginTop:14,fontSize: 18,borderWidth:1,borderColor:'#D90000', color: '#D90000',width:window.width/2.5,height:50,fontFamily:GLOBAL.semi,borderRadius:2,marginBottom: 20}}
   styleDisabled={{color: 'red'}}
   onPress={() => this.call()}>
   CALL
</Button>




                   </View>

                   </View>

                   {yooo.online_consult == "4" && (
                     <View>
                     <Text style={{color:'grey',fontFamily:GLOBAL.regular, fontSize:16,margin:10}}>Consult Online</Text>
                       <View style={{backgroundColor:'white',}}>
                           <View style={{flexDirection:'column'}}>
                           <TouchableOpacity>
                               <View style={{flexDirection:'row', margin:10,}}>
                                   <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./comment.png')}/>
                                   <View style={{flexDirection:'column', marginLeft:30}}>
                                       <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Text Consult</Text>
                                       <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}> Consultation Rs. {yooo.online_consult_chat_price}</Text>
                                   </View>
                               </View>
                               </TouchableOpacity>
                           <View style={{height:0.5, backgroundColor:'#bfbfbf', width:'80%', alignSelf:'center', marginLeft:30}}/>

                           </View>


                           <View style={{flexDirection:'column'}}>
                           <TouchableOpacity>
                               <View style={{flexDirection:'row', margin:10,}}>
                                   <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./video.png')}/>
                                   <View style={{flexDirection:'column', marginLeft:30}}>
                                       <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Video Consult</Text>

                                       <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Consultation Rs. {yooo.online_consult_video_price}</Text>
                                   </View>
                               </View>
                               </TouchableOpacity>


                           </View>
                           </View>



                     </View>
                   )}

                   <Text style={{color:'grey',fontFamily:GLOBAL.regular, fontSize:16,margin:10}}>Patient Reviews</Text>
                   <FlatList style = {{marginTop:6,marginLeft:5,width:window.width - 10}}
                     data={this.state.speciality}

                     keyExtractor={this._keyExtractor}
                     renderItem={this.renderRowItem1}
                     extraData={this.state}
           />


          <Text style={{color:'grey',fontFamily:GLOBAL.regular, fontSize:16,margin:10}}>Additional Info</Text>
            <View style={{backgroundColor:'white',}}>
                <View style={{flexDirection:'column'}}>

                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./education.png')}/>

                        <View style={{flexDirection:'column', marginLeft:10}}>
                            <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Education</Text>
                            <Text style={{fontSize:13, color:'#bfbfbf',fontFamily:GLOBAL.regular,width:'80%'}}>{defree}</Text>

                        </View>
                    </View>

                <View style={{height:0.5, backgroundColor:'#bfbfbf', width:'80%', alignSelf:'center', marginLeft:30}}/>

                </View>

                <View style={{flexDirection:'column'}}>

                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./kit.png')}/>

                        <View style={{flexDirection:'column', marginLeft:10}}>
                            <Text style={{fontSize:15, color:'black',fontFamily:GLOBAL.regular,}}>Experience</Text>
                            <Text style={{fontSize:13, color:'#bfbfbf',fontFamily:GLOBAL.regular,width:'80%'}}>{yooo.doctor_experience} Yrs</Text>

                        </View>
                    </View>

                <View style={{height:0.5, backgroundColor:'#bfbfbf', width:'80%', alignSelf:'center', marginLeft:30}}/>

                </View>




                </View>

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        backgroundColor:'#000000',
    },
})
