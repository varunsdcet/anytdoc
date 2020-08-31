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
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');
import {Card} from 'react-native-shadow-cards';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import Loader from './Loader.js';
type Props = {};
const options = {
    title: 'Select Image',
    maxWidth:300,
    maxHeight:500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Pharmacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            name :'',
            myimages:[],
            value:'',
            dob:'',
            address:[],
            area :'',
            city:'',
            path :'',
            avatarSource:'',
            member:[




            ],
            images: [


            ]

        };

    }

    componentWillUnmount() {

    }



    call = ()=>{
      this.showLoading()
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
this.hideLoading()

              if (responseJson.status == true) {

              this.setState({address:responseJson.user_details.get_default_address})
GLOBAL.selectedAddress = responseJson.user_details.get_default_address
            }



          })
          .catch((error) => {
            this.hideLoading()
              console.error(error);
          });
    }
    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'PHARMACY',
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



        this.setState({address :GLOBAL.selectedAddress})



        //   const interests = [...interest, ...a];
        //
        // var b = interest.concat(a)
        //



    }

    componentDidMount(){
      this.call()
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        this.showLoading()
        const url = GLOBAL.BASE_URL + 'list_upload_images_pharmacy'

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

this.hideLoading()


                //  this.rajorPay()
                if (responseJson.status == true) {

                    this.setState({myimages:responseJson.list})
                  //  alert(JSON.stringify(responseJson.list))
                    this.setState({path:responseJson.path})

                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

        //   this._handlePressLogin()
    }
    _handlePress() {

this.showLoading()

        var imgid = ""

        for (var i = 0; i< this.state.myimages.length ; i ++){
            imgid = imgid + this.state.myimages[i].image + '|'
        }
        if (imgid == ""){

        } else{
            imgid = imgid.slice(0,-1)

        }

 this.setState({loading:true})
        const url = GLOBAL.BASE_URL + 'add_pharmacy_query'

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
                "name": GLOBAL.myname,
                "email":GLOBAL.myemail,
                "mobile":GLOBAL.mymobile,
                "address":this.state.address.address,
                "area":this.state.address.area,
                "pincode":this.state.address.pincode,
                "city_state":this.state.address.city_state,
                "images":imgid



            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({loading:false})
this.hideLoading()

                //  this.rajorPay()
                if (responseJson.status == true) {

                //  alert('Your Order Placed Successfully.')
                  this.props.navigation.navigate('PhramacySuccess')

                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({loading:false})
            });

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

this.showLoading()
                const url = GLOBAL.BASE_URL +  'image_attchment_upload_pharmacy'
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
                               this.hideLoading()
                        this.setState({myimages:responseJson.images})

                        this.setState({path:responseJson.path})




                    });
            }




            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };


        });
    }

    selectedFirstd  = (item) => {
      this.showLoading()

        const url = GLOBAL.BASE_URL + 'delete_images_pharmacy'

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

this.hideLoading()
//                alert(JSON.stringify(responseJson))

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

    render() {
        var speciality = GLOBAL.appointmentArray.speciality_detail_array
        // name :'',
        //     value:'',
        //     dob:'',
        //     address:'',
        //     area :'',
        //     city:'',


        let { name } = this.state;
        let { dob } = this.state;
        let { address } = this.state;
        let { area } = this.state;
        let { city } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <Loader>
                    </Loader>
                </View>
            )
        }
        return (

                <View style={styles.container}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">









                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListAddress')
                    }>




                         <Card style={{padding: 10, margin: 10,flexDirection:'row',width:window.width - 20,marginTop:20,borderRadius:12}}>
                        <Text style={{marginLeft : 10,marginTop:7,fontSize : 18,
                            color :'#D90000', height:'auto',
                        fontFamily:GLOBAL.semi,width :window.width - 80,fontWeight:'bold'}}>
                            Select Address
                        </Text>

                        <Image style={{marginLeft:-20, resizeMode:'contain', width:25, height:25, marginTop:5,marginBottom:7}}
                        source={require('./arrowlogo.png')}/>
                        </Card>
                    </TouchableOpacity>


                    <Card style={{ flex: 1 ,marginLeft : 10,width:window.width - 20, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                            <Text style={{marginLeft : 5,fontSize : 16,color :'black',fontFamily:GLOBAL.semi,width :'80%',marginTop:15,fontWeight:'bold'}}>

                                Address:   {this.state.address.address}
                            </Text>

                            <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:GLOBAL.semi,width :window.width - 20,fontWeight:'bold',marginTop:8}}>

                                Area:   {this.state.address.area}
                            </Text>

                            <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:GLOBAL.semi,width :'80%',fontWeight:'bold',marginBottom:15,marginTop:8}}>

                                State:   {this.state.address.city_state}
                            </Text>






                    </Card>
                        <View >
                            <Text style={{fontSize : 14,color :'#1E1F20',fontFamily:GLOBAL.semi,margin:10,alignSelf:'center',marginTop:20}}>

                               Upload Your Prescription (if Any)
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
                                style={{padding:12,marginTop:18,fontSize: 20,borderWidth:1,borderColor:"#D90000",color:"#D90000",marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePressd()}>
                              Attach Images
                            </Button>
                            <Text style={{fontSize : 14,color :'#000000',fontFamily:GLOBAL.regular,margin:10,marginTop:20,alignSelf:'center'}}>

                                Attach up to 3 images here.
                            </Text>

                        </View>





                        <Button
                            style={{padding:12,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:50,fontFamily:GLOBAL.semi,borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            SUBMIT
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
        flex:1,
        backgroundColor :'white',


    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
