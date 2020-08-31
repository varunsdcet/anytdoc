import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
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

import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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


export default class Quation extends Component {
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
            phone:'',
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

    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            //   header: () => null,

            headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            }>
                <Text style={{color :'#7BAAED',fontFamily:'Poppins-Regular',fontSize: 16,marginRight:10}} >

                    HISTORY
                </Text>
            </TouchableOpacity>,
            title: 'SURGICAL PACKAGE',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#7BAAED',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }


    showLoading() {
        this.setState({loading: true})
    }
    _handleStateChange = (state) => {



        this.setState({address :GLOBAL.selectedAddress})



        //   const interests = [...interest, ...a];
        //
        // var b = interest.concat(a)
        //



    }
    _saveDetails = () => {
        this.props.navigation.navigate('SurgicalPackage')
    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        this.props.navigation.setParams({ handleSave: this._saveDetails });
        const url = GLOBAL.BASE_URL + 'list_upload_images_quotation'

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



        var imgid = ""

        for (var i = 0; i< this.state.myimages.length ; i ++){
            imgid = imgid + this.state.myimages[i].image + '|'
        }
        if (imgid == ""){

        } else{
            imgid = imgid.slice(0,-1)

        }

        this.setState({loading:true})
        const url = GLOBAL.BASE_URL + 'add_quotation'

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
                "problem":this.state.phone,
                "surgery_id":"0",
                "images":imgid



            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({loading:false})


                //  this.rajorPay()
                if (responseJson.status == true) {

                    alert('Quotation submitted successfully!')
                    this.props.navigation.goBack()
                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({loading:false})
            });

    }

    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {

        if (GLOBAL.appointmentArray.can_book_doctor_free == 0){
        } else {


            this.props.navigation.navigate('ListMember')
        }

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


                const url = GLOBAL.BASE_URL +  'image_attchment_upload_quotation'
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




            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };


        });
    }

    selectedFirstd  = (item) => {

        const url = GLOBAL.BASE_URL + 'delete_images_quotation'

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

                    <Text style={{fontSize : 14,color :'#7BAAED',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                        {item.member_name}
                    </Text>
                </View>


            </TouchableOpacity>
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

        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
        let { phone } = this.state;
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
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>




                        <View style={{marginLeft:10, marginRight:10}}>
                      <TextField
                            label= 'Write a Problem'
                            value={phone}
                            onChangeText={ (phone) => this.setState({ phone }) }
                            tintColor = {'#7BAAED'}
                            multiline = {true}
                        />

                            <Text style={{fontSize : 16,color :'#132439',fontFamily:'Poppins-Regular',margin:10,fontWeight:'bold'}}>

                                ADD YOUR PRESCRIPTION (If any)
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
                                style={{padding:7,marginTop:16,fontSize: 20,borderWidth:1,borderColor:"#7BAAED",color:"#7BAAED",marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4,fontWeight:'bold'}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePressd()}>
                                ATTACH IMAGES /REPORT
                            </Button>
                            <Text style={{fontSize : 20,color :'#132439',fontFamily:'Poppins-Regular',margin:10}}>

                                Attach up to 3 images here.
                            </Text>

                        </View>





                        <Button
                            style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#7BAAED',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4,fontWeight:'bold'}}
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
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#7BAAED',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#7BAAED',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
