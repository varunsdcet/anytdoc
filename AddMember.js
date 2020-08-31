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
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');
var validator = require("email-validator");
import ActionSheet from 'react-native-actionsheet'
import { TextField } from 'react-native-material-textfield';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
             name:'',
             visible:false,
            email:'',
            mobile:'',
            relation:'Select Relations',
            gender:'',
            department:['Mother','Father','Sister','Brother','Children','Spouse','Relatives','Others'],
            visible:false,
            modalVisible:false,
            dob:'',
            value:0,
            mode: 'date',
            show: false,
            date:new Date('2020-06-12T14:42:42'),

        };

    }

    componentWillUnmount() {

    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }
    showActionSheet = () => {
       this.ActionSheet.show()
     }

    datepicker = () => {
        //   alert('hi')
        this.show('date');
    }
    setDate = (event, date) => {
        this.setState({show:false})
      //  const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
//    alert(formattedDate)
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        //date = date || this.state.date;
        this.setState({dob :formattedDate})

        // this.setState({
        //   show: Platform.OS === 'ios' ? true : false,
        //   date,
        // });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'ADD MEMBER',
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

    blood = (index) => {
        this.setState({relation:this.state.department[index]})
    }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }






    componentDidMount(){
        //   this._handlePressLogin()
    }
_handlePress() {
        var type;
        if (this.state.value == 0){
            type = "Male"
        }else{
            type = "Female"
        }

        if (this.state.name == ''){
            alert('Please enter name')

        }else if (this.state.email == ''){
            alert('Please enter email')

        }else if (validator.validate(this.state.email) == false){
            alert('Please enter Valid email')
        }

        else if (this.state.mobile == ''){
            alert('Please enter mobile')

        }else if (this.state.relation == ''){
            alert('Please enter relation')

        }else if (this.state.dob == ''){
            alert('Please enter dob')
        }else {


            const url = GLOBAL.BASE_URL + 'add_member'

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
                    "member_name": this.state.name,
                    "member_email": this.state.email,
                    "member_mobile": this.state.mobile,
                    "member_relation": this.state.relation,
                    "member_dob": this.state.dob,
                    "gender": type,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {


                    if (responseJson.status == true) {
                        this.props.navigation.goBack()
                        alert('Member Added Successfully')
                    }else{
                        alert('Already member Added')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

        }

    }

    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item) => {
      this.setState({visible:false})

      this.setState({relation:item})

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


    _renderDepartment =  ({item,index}) => {
        return (
          <TouchableOpacity onPress={() => this.selectedFirst(item)
          }
          activeOpacity={0.9}>
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{fontFamily:GLOBAL.semi,margin:4,fontSize:12,color:'#83878E'}}>
                    {item}

                </Text>

                <View style ={{marginTop:5,width:window.width,backgroundColor:'#1E1F20',height:1,marginBottom:5}}>

                </View>




            </View>

</TouchableOpacity>


        )


    }
    render() {
        const { show, date, mode } = this.state;
        var speciality =  GLOBAL.speciality

        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { mobile } = this.state;
        let { gender } = this.state;
        let { relation } = this.state;
        let { dob } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>




                        <View style = {{backgroundColor:'white',borderRadius:8,marginLeft:10,width:window.width - 20}}>
                            <View style = {{marginLeft:10}}>
                                <TextField
                                    label= 'Name'
                                    value={name}
                                    onChangeText={ (name) => this.setState({ name }) }
                                    tintColor = {'#D90000'}
                                />
                                <TextField
                                    label= 'Email'
                                    value={email}
                                    onChangeText={ (email) => this.setState({ email }) }
                                    tintColor = {'#D90000'}
                                />

                                <TextField
                                    label= 'Mobile'
                                    value={mobile}
                                    keyboardType={'numeric'}
                                    maxLength={10}
                                    onChangeText={ (mobile) => this.setState({ mobile }) }
                                    tintColor = {'#D90000'}
                                />
                                  <TouchableOpacity onPress={()=>this.showActionSheet()}>
 <View>

                                <Text style = {{width:window.width-20,height:40,marginTop:20,color:'#83878E',fontFamily:GLOBAL.semi}}>
                                {this.state.relation}
                                </Text>

                                <View style ={{width:window.width -20,height:1,backgroundColor:'grey',marginTop:0,marginBottom:8}}>
                                </View>

                                </View>
                                </TouchableOpacity>

                                <ActionSheet
                                        ref={o => this.ActionSheet = o}
                                        title={'Select Relations'}
                                        options={this.state.department}
                                        cancelButtonIndex={8}
                                        destructiveButtonIndex={1}
                                        onPress={(index) => { this.blood(index)}}
                                      />

                                <Modal
         animationType="slide"
         transparent={false}
         visible={this.state.visible}
         onRequestClose={() => {

          this.setState({visible:false})
         }}>
           <View style = {{height:200}}>

           <FlatList style= {{margin:1}}
                     data={this.state.department}

                     keyExtractor = { (item, index) => index.toString() }
                     renderItem={this._renderDepartment}
           />
           </View>
       </Modal>



                                <Text style={{fontSize : 12,color :'rgba(0,0,0,0.5)',fontFamily:GLOBAL.semi,}}>

                                    Gender
                                </Text>

                                <RadioForm style={{ marginTop:12}}
                                           labelStyle={{paddingRight:20}}
                                           radio_props={radio_props_one}
                                           initial={0}
                                           buttonSize={10}
                                           formHorizontal={true}
                                           buttonColor={'#D90000'}
                                           labelHorizontal={true}
                                           animation={false}
                                           labelColor={'black'}
                                           selectedButtonColor={'#D90000'}
                                           onPress={(value) => {this.setState({value:value})}}
                                />

                                <TouchableOpacity onPress={()=>this.datepicker()}>
                                    <TextInput
                                        style={{ height: 50, borderColor: 'gray',fontSize:16, borderBottomWidth: 1, marginTop:0 ,marginBottom: 20 ,marginLeft:0,width:window.width -40,color:'black' }}
                                        // Adding hint in TextInput using Placeholder option.
                                        value={this.state.dob}
                                        editable={false}
                                        placeholderTextColor = 'grey'
                                        placeholder = 'Select Date of Birth'
                                        // Making the Under line Transparent.
                                        underlineColorAndroid="transparent"
                                        value = {this.state.dob}

                                    />
                                </TouchableOpacity>

                                { this.state.show == true && (

                                    <DateTimePicker value={date}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={(event,date)=>this.setDate(event, date)} />
                                )}

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
            </SafeAreaView>
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
