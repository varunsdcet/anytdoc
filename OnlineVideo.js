import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');

import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};
const options = {
    title: 'Upload Images',
    maxWidth:300,
    maxHeight:500,

    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class OnlineVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            name :GLOBAL.user_details.name,
            myimages:[],
            value:'',
            dob:'',
            address:'',
            area :'',
            intital:0,
            city:'',
            path :'',
            avatarSource:'',
            member:[




            ],
            images: [
                {
                    name :'Myself',
                    selected:'',
                    myself:'Y',
                },
                {
                    name :'Someone else',
                    selected:'',
                    myself:'N',

                },

            ]

        };

    }

    componentWillUnmount() {

    }


   static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING APPOINTMENT',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'white'},
            headerStyle:{
                backgroundColor:'#D90000',
            },
            headerTintColor :'white',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }



    _handleStateChange = (state) => {

      if (  GLOBAL.ismember == "0"){

this.getNewsUpdate()
}else{
  const url = GLOBAL.BASE_URL + 'list_member'

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





      }),
  }).then((response) => response.json())
      .then((responseJson) => {



          if (responseJson.status == true) {

              var array = [];




              for (var i = 0; i<responseJson.member_list.length;i++ ){
                  if (responseJson.member_list[i].is_checked == "0"){

                  }else{
                    this.setState({name:responseJson.member_list[i].member_name})
this.setState({dob:responseJson.member_list[i].member_dob})
if (responseJson.member_list[i].gender == "Female"){
  this.setState({intital:1})

}else{
    this.setState({intital:0})
}
                      array.push(responseJson.member_list[i])

                  }
              }

              this.setState({member:array})

          }
      })
      .catch((error) => {
          console.error(error);
          this.hideLoading()
      });
}





    }

    componentDidMount(){
      GLOBAL.ismember = "0"

        this.props.navigation.addListener('willFocus',this._handleStateChange);
        //   this._handlePressLogin()
    }
    _handlePress() {


        if (this.state.value == 0){
            GLOBAL.onlinegender = "Male";
        }else{
            GLOBAL.onlinegender = "Female";
        }


        GLOBAL.onlinename = this.state.name;
        GLOBAL.onlinedob = this.state.dob;
        GLOBAL.onlineaddress = this.state.address
        GLOBAL.onlinearea = this.state.area
        GLOBAL.onlinecity = this.state.city



        GLOBAL.onlineMember = this.state.member



        this.props.navigation.navigate('BookingDetailFinal')
    }


 getNewsUpdate(){

        const url = GLOBAL.BASE_URL +  'get_profile'


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
                user_id : GLOBAL.user_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == true) {



                    this.setState({name :responseJson.user_details.name})
                    this.setState({address: responseJson.user_details.address})
                    this.setState({area: responseJson.user_details.area})
                    this.setState({city: responseJson.user_details.city})
                    this.setState({dob: responseJson.user_details.dob})

                    GLOBAL.profileImage = responseJson.user_details.image



                }else {
                    alert('No News Found')
                }
            })
            .catch((error) => {
                console.error(error);
            });



      //  const interest = this.state.member.concat(GLOBAL.mymember)
//        alert(JSON.stringify(interest))



        //   const interests = [...interest, ...a];
        //
        // var b = interest.concat(a)
        //
       // this.setState({member:interest})


    }
    getNewsUpdate(){

        const url = GLOBAL.BASE_URL +  'get_profile'


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
                user_id : GLOBAL.user_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == true) {



                    this.setState({name :responseJson.user_details.name})
                    this.setState({address: responseJson.user_details.address})
                    this.setState({area: responseJson.user_details.area})
                    this.setState({city: responseJson.user_details.city})
                    this.setState({dob: responseJson.user_details.dob})

                    GLOBAL.profileImage = responseJson.user_details.image
                }else {
                    alert('No News Found')
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    componentDidMount(){
        //this.getNewsUpdate()
  GLOBAL.ismember = "0"
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        const url = GLOBAL.BASE_URL + 'list_upload_images'

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


                "user_id": GLOBAL.user_id,



            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                //  this.rajorPay()
                if (responseJson.status == true) {

                    this.setState({myimages:responseJson.list})
            //        alert(JSON.stringify(responseJson.list))
                    this.setState({path:responseJson.path})

                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }
    _handlePress() {


        if (this.state.value == 0){
            GLOBAL.onlinegender = "Male";
        }else{
            GLOBAL.onlinegender = "Female";
        }


        GLOBAL.onlinename = this.state.name;
        GLOBAL.onlinedob = this.state.dob;
        GLOBAL.onlineaddress = this.state.address;
        GLOBAL.onlinearea = this.state.area,
        GLOBAL.onlinecity = this.state.city;



        GLOBAL.onlineMember = this.state.member
        var imgid = ""

        for (var i = 0; i< this.state.myimages.length ; i ++){
            imgid = imgid + this.state.myimages[i].image + '|'
        }
        if (imgid == ""){
            GLOBAL.listofimages = ""
        } else{
            imgid = imgid.slice(0,-1)
            GLOBAL.listofimages = imgid
        }
// alert(GLOBAL.listofimages)


        this.props.navigation.navigate('BookingDetailFinal')
    }



    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {

        this.props.navigation.navigate('ListMember')

    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    _handlePressd = () => {
        if (this.state.myimages.length >= 3){
            alert('You have not upload any image')
            return
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };


                const url = GLOBAL.BASE_URL +  'image_attchment_upload'
                const data = new FormData();
                data.append('user_id', GLOBAL.user_id);
                data.append('flag',"1");


                // you can append anyone.
                data.append('image', {
                    uri: response.uri,
                    type: 'image/jpeg', // or photo.type
                    name: 'image.png'
                });
                fetch(url, {
                method: 'POST',
                    timeoutInterval: 90000, // milliseconds
                sslPinning: {
                certs: ['anytimedoc_in']
                  },
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }

                }).then((response) => response.json())
                    .then((responseJson) => {
                        //       this.hideLoading()
                        this.setState({myimages:responseJson.images})

                        this.setState({path:responseJson.path})




                    });
            }

        });
    }

    selectedFirstd  = (item) => {

        const url = GLOBAL.BASE_URL + 'delete_images'

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


                "user_id": GLOBAL.user_id,
                "id":item.id


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


          //      alert(JSON.stringify(responseJson))

                //  this.rajorPay()
                if (responseJson.status == true) {

             this.setState({myimages:responseJson.list_of_images})

                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    _renderItemsd  = ({item,index}) => {
        var uri = `${this.state.path}${item.image}`;

        return (



                <View style = {{backgroundColor:'transparent',margin:1}}>
                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={{uri:uri}}/>
                    <TouchableOpacity style = {{width :20 ,height :20,position:'absolute',right:2}} onPress={() => this.selectedFirstd(item)
                    }>

                    <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                           source={require('./remove.png')}/>
                    </TouchableOpacity>

                </View>



        )

    }
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                <View style = {{backgroundColor:'transparent',margin:1}}>
                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={require('./myself.png')}/>

                    <Text style={{fontSize : 14,color :'#D90000',fontFamily:GLOBAL.regular,textAlign:'center'}}>

                        {item.member_name}
                    </Text>
                </View>


            </TouchableOpacity>
        )
    }
    render() {
      var speciality = GLOBAL.appointmentArray.speciality_detail_array
      const renderedButtons =  GLOBAL.appointmentArray.gallery.map((b, index) => {


        return(
          <View style = {{flexDirection:'row'}}>
          <Image style = {{width :60 ,height :60,margin:10,marginTop:17}}
                 source={{ uri: b.image }}/>
                 </View>


        )








        ;
      })
      var radio_props_one = [
          {label: 'Male', value: 0 },
          {label: 'Female', value: 1 }
      ];
      let { name } = this.state;
       let { dob } = this.state;
       let { address } = this.state;
       let { area } = this.state;
       let { city } = this.state;

      if(this.state.loading){
          return(
              <View style={styles.container}>
                  <ActivityIndicator style = {styles.loading}

                                     size="large" color='#006FA5' />
              </View>
          )
      }
      return (

              <View style={styles.container}>
                  <KeyboardAwareScrollView>

                  <View style={{ flex: 1 ,marginLeft : 0,width:window.width , backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>







  <View style = {{flexDirection:'row',width :'100%'}}>


                      <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10,marginTop:17}}
                             source={{ uri: GLOBAL.appointmentArray.image }}/>




                             <View>

      <View style = {{flexDirection:'row',width:window.width -80}}>
                      <Text style={{marginLeft : 5,fontSize : 14,color :'#1E1F20',fontFamily:GLOBAL.semi,width :'70%',marginTop:18}}>

                          {GLOBAL.appointmentArray.name}
                      </Text>

  <View style = {{alignSelf:'flex-end',marginRight:20}}>
                      <View style = {{marginTop:18,flexDirection:'row'}}>
   {GLOBAL.appointmentArray.is_bookmark == "0" && (
     <Image style = {{width :30 ,height :30,marginLeft:4,resizeMode:'contain'}}
            source={require('./like-un.png')}/>
   )}
   {GLOBAL.appointmentArray.is_bookmark == "1" && (
     <Image style = {{width :30 ,height :30,marginLeft:4,resizeMode:'contain'}}
            source={require('./filled.png')}/>
   )}


                          <Text style={{marginLeft : 5,fontSize : 12,marginTop:8,color :'#D90000',fontFamily:GLOBAL.regular,}}>

                              {GLOBAL.appointmentArray.ratting}
                          </Text>
                      </View>
                      <Text style={{marginLeft : 5,fontSize : 10,marginTop:8,color :'#83878E',fontFamily:GLOBAL.regular,}}>

                          {GLOBAL.appointmentArray.ratting} Ratings
                      </Text>

                      </View>

      </View>

                                 <View style = {{flexDirection:'row'}}>
                                 <Text style={{marginLeft : 5,fontSize : 12,color :'#83878E',height:'auto',fontFamily:GLOBAL.regular,width :'80%'}}>
                                     {speciality}
                                 </Text>


                                 </View>
                                 <Text style={{marginLeft : 5,fontSize : 12,color :'#83878E',height:'auto',fontFamily:GLOBAL.regular,width :'70%'}}>
                                     {GLOBAL.appointmentArray.lat_long_address}
                                 </Text>





      </View>

  </View>

  <View style = {{flexDirection:'row',marginLeft:10}}>
  {renderedButtons}
  </View>

  <View style = {{alignSelf:'flex-end',marginRight:20}}>
  {GLOBAL.appointmentArray.doctor_avail_status == 1 && (

      <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:60,textAlign:'center'}}>

          Available
      </Text>
  )}
  {GLOBAL.appointmentArray.doctor_avail_status == 0 && (

      <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>

          Offline
      </Text>
  )}

  {GLOBAL.appointmentArray.doctor_avail_status == 2 && (

      <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>

          Busy
      </Text>
  )}
  {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
      <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:GLOBAL.regular,width:50,textAlign:'center'}}>
          Prime
      </Text>
  )}


  </View>

  <Text style={{fontSize : 12,color :'#83878E',fontFamily:GLOBAL.regular,marginLeft:10}}>

      {GLOBAL.appointmentArray.experience} yrs exp
  </Text>






                  </View>



                        <Text style={{fontSize : 15,color :'#132439',fontFamily:GLOBAL.regular,margin:10,fontWeight:'bold'}}>

                            Is this for you or someone else?
                        </Text>

                        <View style = {{flexDirection:'row',margin:8}}>
                        {this.state.member.length == 0 && (
                          <View>

                          <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                                 source={require('./myself.png')}/>

                                 <Text style = {{color:'black',fontFamily:GLOBAL.semi,textAlign:'center'}}>
                                     Self

                                 </Text>


                          </View>
                        )}
                            <FlatList style= {{flexGrow:0,backgroundColor:'transparent'}}
                                      horizontal = {true}
                                      data={this.state.member}
                                      numColumns={1}
                                      horizontal={true}
                                      keyExtractor = { (item, index) => index.toString() }
                                      renderItem={this._renderItems}
                            />



                            <View>
                                <TouchableOpacity onPress = {()=>this.props.navigation.navigate('ListMember')}>
                                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                                           source={require('./add.png')}/>

                                    <Text style = {{color:'black',fontFamily:GLOBAL.semi,textAlign:'center'}}>
                                        Add

                                    </Text>
                                </TouchableOpacity>


                            </View>




                        </View>
                        <View >
                            <Text style={{fontSize : 16,color :'#1E1F20',fontFamily:GLOBAL.semi,margin:10}}>

                                Describe your issue in detail
                            </Text>

                            <Text style={{fontSize : 16,color :'#1E1F20',fontFamily:GLOBAL.regular,margin:10,alignSelf:'center'}}>

                              For e.g. I am losing hair quickly and have tried all shampoos but no effect yet. I am not sure what else can I do. Can you please help me with this?
                            </Text>

                            {this.state.myimages.length != 0 && (

                                <FlatList style= {{flexGrow:0,backgroundColor:'transparent'}}
                                          horizontal = {true}
                                          data={this.state.myimages}
                                          numColumns={1}
                                          horizontal={true}
                                          keyExtractor = { (item, index) => index.toString() }
                                          renderItem={this._renderItemsd}
                                />

                            )}

                            <Button
                                style={{padding:7,marginTop:18,fontSize: 20,borderWidth:1,borderColor:"#D90000",color:"#D90000",marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePressd()}>
                                ATTACH IMAGES /REPORT
                            </Button>
                            <Text style={{fontSize : 16,color :'#000000',fontFamily:GLOBAL.regular,margin:10,alignSelf:'center'}}>

                                Attach up to 3 images here.
                            </Text>

                        </View>

                        <Text style={{fontSize : 16,color :'#132439',fontFamily:GLOBAL.regular,margin:10,fontWeight:'bold'}}>


                            Basic Information
                        </Text>

                        <View style = {{backgroundColor:'white',borderRadius:8,marginLeft:10,width:window.width - 20}}>
                            <View style = {{marginLeft:10}}>
                                <TextField
                                    label= 'Name'
                                    value={name}
                                    onChangeText={ (name) => this.setState({ name }) }
                                    tintColor = {'#D90000'}
                                />
                                <Text style={{fontSize : 12,color :'rgba(0,0,0,0.5)',fontFamily:GLOBAL.semi,}}>

                                    Gender
                                </Text>

                                {this.state.intital == 0 && (
                                  <RadioForm style={{ marginTop:12}}
                                             labelStyle={{paddingRight:20}}
                                             radio_props={radio_props_one}
                                             initial={this.state.intital}
                                             buttonSize={10}
                                             formHorizontal={true}
                                             buttonColor={'#D90000'}
                                             labelHorizontal={true}
                                             animation={false}
                                             labelColor={'black'}
                                             selectedButtonColor={'#D90000'}
                                             onPress={(value) => {this.setState({value:value})}}
                                  />
                                )}
                                {this.state.intital == 1 && (
                                  <RadioForm style={{ marginTop:12}}
                                             labelStyle={{paddingRight:20}}
                                             radio_props={radio_props_one}
                                             initial={1}
                                             buttonSize={10}
                                             formHorizontal={true}
                                             buttonColor={'#D90000'}
                                             labelHorizontal={true}
                                             animation={false}
                                             labelColor={'black'}
                                             selectedButtonColor={'#D90000'}
                                             onPress={(value) => {this.setState({value:value})}}
                                  />
                                )}
                                <TextField
                                    label= 'Date of Birth'
                                    value={dob}
                                    onChangeText={ (dob) => this.setState({ dob }) }
                                    tintColor = {'#D90000'}
                                />

                                <TextField
                                    label= 'Address'
                                    value={address}
                                    onChangeText={ (address) => this.setState({ address }) }
                                    tintColor = {'#D90000'}
                                />

                                <TextField
                                    label= 'Area Locality'
                                    value={area}
                                    onChangeText={ (area) => this.setState({ area }) }
                                    tintColor = {'#D90000'}
                                />
                                <TextField
                                    label= 'City'
                                    value={city}
                                    onChangeText={ (city) => this.setState({ city }) }
                                    tintColor = {'#D90000'}
                                />

                            </View>
                        </View>

                        <Button
                            style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:40,fontFamily:GLOBAL.semi,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            PROCEED
                        </Button>
                    </KeyboardAwareScrollView>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',


    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:GLOBAL.regular,


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#D90000',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#D90000',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
