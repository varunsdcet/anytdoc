import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class ListMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            results: [],
        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {

    }

    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        this.setState({modalVisible: visible});
    }



    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            }>
                <Text style={{color :'white',fontFamily:GLOBAL.regular,fontSize: 16,marginRight:10}} >

                    ADD
                </Text>
            </TouchableOpacity>,
            //   header: () => null,
            title: 'LIST MEMBER',
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
        const url = GLOBAL.BASE_URL +  'list_member'

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
                    this.setState({results:responseJson.member_list})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }

    _saveDetails = () => {
        this.props.navigation.push('AddMember')
    }

    componentDidMount(){

        this.props.navigation.addListener('willFocus',this._handleStateChange);
        this.props.navigation.setParams({ handleSave: this._saveDetails });


    }
    _handlePress() {
        console.log('Pressed!');

GLOBAL.ismember = "1"

        this.props.navigation.goBack()
    }

    login = (s,item) => {
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s

        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item) => {

        var a = "";

        if (item.is_checked == "0"){
            a = "1";
        }else{
           a = "0";
        }

        const url = GLOBAL.BASE_URL +  'add_rem_member'

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
                "member_id":item.id,
                "what":a





            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                    this.setState({results:responseJson.member_list})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

      //   GLOBAL.mymember = item
      // this.props.navigation.goBack()

    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    selectedFirstss = (item) =>{


      const url = GLOBAL.BASE_URL +  'delete_member'

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

              "member_id":item.id,
              "user_id":GLOBAL.user_id






          }),
      }).then((response) => response.json())
          .then((responseJson) => {


              if (responseJson.status == true) {
                  this.setState({results:responseJson.member_list})

              }else{
                    this.setState({results:[]})
              }
          })
          .catch((error) => {
              console.error(error);
            //  this.hideLoading()
          });

    }

    _renderItems = ({item,index}) => {


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>



                    <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:GLOBAL.semi,width :'60%',marginTop:18,fontWeight:'bold'}}>

                        {item.member_name}
                    </Text>

                        {item.is_checked == "0" && (
                            <Image style = {{width :25 ,height :25,marginRight:16,resizeMode:'contain',marginTop:24}}
                                   source={require('./uncheck.png')}/>
                        )}
                        {item.is_checked == "1" && (
                            <Image style = {{width :25 ,height :25,marginRight:16,resizeMode:'contain',marginTop:24}}
                                   source={require('./check.png')}/>
                        )}


                    </View>

                    <View style = {{flexDirection:'row',justifyContent:'space-between'}} >

                    <Text style={{marginLeft : 5,fontSize : 12,color :'#3A3A3A',fontFamily:GLOBAL.semi,marginTop:5}}>

                        {item.email}
                    </Text>


                    </View>









                </View>


                <TouchableOpacity  style = {{
                    position: 'absolute', width: 20, right: 6, height: 20,top:4
                }}

                    onPress={() => this.selectedFirstss(item)
                }>
            <Image style = {{resizeMode: 'contain',height: 14,width:14}}
            source={require('./remove.png')} />
                </TouchableOpacity>


            </TouchableOpacity>
        )
    }
    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
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





                    <FlatList style= {{flexGrow:0,margin:8,height:window.height - 200}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />







                    <Button
                                         style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#D90000',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                                         styleDisabled={{color: 'red'}}
                                         onPress={() => this._handlePress()}>
                                         ADD MEMBER
                                     </Button>


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
