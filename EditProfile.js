import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    TextInput,
    View,
    Image,
    Alert,
    AsyncStorage,
    Dimensions,
    TouchableOpacity,
    Modal,

    ActivityIndicator,
    FlatList
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
const window = Dimensions.get('window');
var radio_props_one = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
];
var intital = 0;
const GLOBAL = require('./Global');
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const options = {
    title: 'Select Avatar',
    maxWidth : 500,
    maxHeight : 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
import DateTimePicker from '@react-native-community/datetimepicker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
export default class EditProfile extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        city:'',
        address:'',
        password: '',
        initial:0,
        status :'',
        ipAdd : '',
        name:'',
        description:'',
        value:0,
        height:'',
        weight:'',
        blood:'Select Blood Group',
        visible:false,
        allergie:'',
        illness:'',
        surgery:'',
          department:['A+','A-','B+','B-','AB+','AB-','O+','O-'],

        newsHeading :[],
        loading:'',
        states:'',
        results: [],
        avatarSource:'',
        image :'',username:'', date:new Date('2020-06-12T14:42:42'),
    mode: 'date',
    show: false,

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'EDIT PROFILE',
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
    showActionSheet = () => {
       this.ActionSheet.show()
     }
  setDate = (event, date) => {
      this.setState({show:false})
  //  const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
      const formattedDate = `${date.getFullYear()}-${date.getMonth()-1}-${date.getDate()}`;
//    alert(formattedDate)

    //date = date || this.state.date;
    this.setState({dob :formattedDate})

    // this.setState({
    //   show: Platform.OS === 'ios' ? true : false,
    //   date,
    // });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }
blood = (index) => {
    this.setState({blood:this.state.department[index]})
}
  selectedFirst = (item) => {
    this.setState({visible:false})

    this.setState({blood:item})

  }
  _renderDepartment =  ({item,index}) => {
      return (
        <TouchableOpacity onPress={() => this.selectedFirst(item)
        }
        activeOpacity={0.9}>
          <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

              <Text style = {{color:'#8E9198',fontFamily:GLOBAL.regular,margin:4,fontSize:14,fontWeight:'bold'}}>
                  {item}

              </Text>




          </View>

</TouchableOpacity>


      )


  }
  datepicker = () => {
     //   alert('hi')
    this.show('date');
  }

    showLoading() {
        this.setState({loading: true})
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
                  if (responseJson.user_details.gender == ""){

                  } else if (responseJson.user_details.gender == "Male"){
                     this.setState({initial:0})
                  }else{
                         this.setState({initial:1})
                  }



                    this.setState({name :responseJson.user_details.name})
                    this.setState({address: responseJson.user_details.address})
                    this.setState({area: responseJson.user_details.area})
                    this.setState({city: responseJson.user_details.city})
                    this.setState({description :responseJson.user_details.email})
                    this.setState({image :responseJson.user_details.image})
                    this.setState({username: responseJson.user_details.username})
                      this.setState({height: responseJson.user_details.height})
                        this.setState({weight: responseJson.user_details.weight})
                          this.setState({blood: responseJson.user_details.blood_group})
                            this.setState({allergie: responseJson.user_details.allergies})
                              this.setState({illness: responseJson.user_details.illnesses})
                                      this.setState({surgery: responseJson.user_details.surgeries})




                    if(responseJson.user_details.dob==''){
                        this.setState({dob:'Select Date of Birth'})
                    }else{
                        this.setState({dob: responseJson.user_details.dob})
                    }
                    GLOBAL.profileImage = responseJson.user_details.image
                }else {
                    alert('No News Found')
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    changeImage=()=>{
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

                GLOBAL.profileImage = response.uri
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });

    }



    _handleStateChange = state => {
      if (GLOBAL.allergies.length != 0) {
          var alle = '';
          for (var i = 0 ; i< GLOBAL.allergies.length ; i++){
              if (GLOBAL.allergies[i].selected != '') {
                  alle = alle + GLOBAL.allergies[i].name + ','
              }
          }

this.setState({allergie:alle})
        this.setState({newsHeading:GLOBAL.array})

    }


    if (GLOBAL.surgries.length != 0) {
        var alle = '';
        for (var i = 0 ; i< GLOBAL.surgries.length ; i++){
            if (GLOBAL.surgries[i].selected != '') {
                alle = alle + GLOBAL.surgries[i].name + ','
            }
        }

        this.setState({surgery:alle})

    }
    if (GLOBAL.illness.length != 0) {
        var alle = '';
        for (var i = 0 ; i< GLOBAL.illness.length ; i++){
            if (GLOBAL.illness[i].selected != '') {
                alle = alle + GLOBAL.illness[i].name + ','
            }
        }

        this.setState({illness:alle})
    }
  }
    buttonClickListener = () =>{
var as = ""
if (this.state.dob == "Select Date of Birth"){
  as = ""
}else{
  as = this.state.dob
}


        if (this.state.name == ''){
            alert('Please Enter Name')
        } else if (this.state.description == ''){
            alert('Please Enter Email')
        }


        else {
var gender;
          if (this.state.value == 0){
            gender = "Male"
          }else{
                gender = "Female"
          }

            //   this.showLoading()
            const url = GLOBAL.BASE_URL +  'update_profile'
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('name', this.state.name);
            data.append('email', this.state.description);
            data.append('gender', gender);
            data.append('dob', as);
            data.append('flag',"1");
            data.append('address', this.state.address)
            data.append('area', this.state.area)
            data.append('city', this.state.city)
                    data.append('height', this.state.height)
                            data.append('weight', this.state.weight)
                                    data.append('blood_group', this.state.blood)
                                            data.append('allergies', this.state.allergie)
                                                    data.append('illnesses', this.state.illness)
                                                    data.append('surgeries', this.state.surgery)


            // you can append anyone.
            data.append('image', {
                uri: GLOBAL.profileImage,
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
//                    alert(JSON.stringify(responseJson))
                    const { navigation } = this.props;
                    navigation.goBack();

                    alert('Profile Updated Successfully!')



                });
        }

    }
    delete = (index) => {
        alert(index)
        let { newsHeading } = this.state;
        let targetPost = newsHeading[index];

        // Flip the 'liked' property of the targetPost


        var array = [...this.state.newsHeading]; // make a separate copy of the array

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({newsHeading: array});
            GLOBAL.array = array
        }

    }





    componentWillUnmount() {

    }

    handleConnectionChange = (isConnected) => {

        this.setState({ status: isConnected });
        if (this.state.status == false){
            alert('You are not connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
    }



    hideLoading() {
        this.setState({loading: false})
    }

    componentDidMount(){
        this.getNewsUpdate()
      this.props.navigation.addListener('willFocus',this._handleStateChange);
        this.setState({newsHeading:GLOBAL.array})
    }


    render() {

    const { show, date, mode } = this.state;


        return (
            <View style={styles.container}>


                <View style={{marginTop:3,width:window.width}}>
                    <KeyboardAwareScrollView contentContainerStyle = {{height:1200,backgroundColor:'white'}} keyboardShouldPersistTaps='always'>






                        <View style = {{flexDirection:'row',width:window.width,marginTop:40}}>
                            <TouchableOpacity
                                onPress={() => this.changeImage()}>

                                {this.state.avatarSource != '' && (

                                    <Image style = {{width :80 ,height : 80 ,marginLeft: 20,borderRadius:40}}
                                           source={this.state.avatarSource} />
                                )}
                                {this.state.avatarSource == '' && (

                                    <Image style = {{width :80 ,height : 80 ,marginLeft: 20,borderRadius:40}}
                                           source={{uri:this.state.image}}/>
                                )}

                            </TouchableOpacity>

                            <Text style = {{marginLeft:10,fontSize: 16,color:'#1E1F20',marginTop:25,fontWeight:'bold'}}>
                                Update Profile Pic
                            </Text>




                        </View>


                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:60 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Enter Name"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.name}
                            onChangeText={(text) => this.setState({name:text})}
                        />
                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Address"
                            placeholderTextColor = '#1E1F20'

                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"

                            value = {this.state.address}
                            onChangeText={(text) => this.setState({address:text})}
                        />



                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Area"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.area}
                            onChangeText={(text) => this.setState({area:text})}
                        />

                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="City"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.city}
                            onChangeText={(text) => this.setState({city:text})}
                        />

                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Height"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.height}
                            onChangeText={(text) => this.setState({height:text})}
                        />

                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Weight"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.weight}
                            onChangeText={(text) => this.setState({weight:text})}
                        />
                        <TouchableOpacity onPress={()=>this.showActionSheet()}>
<View>
                      <Text style = {{marginLeft:20,height:40,marginTop:10}}>
                           {this.state.blood}
                        </Text>

{this.state.blood == '' && (
  <Text style = {{marginLeft:20,height:40,marginTop:-30}}>
     Select Blood Group
  </Text>
)}

</View>
                        <View style = {{width:window.width-30,alignSelf:'center',backgroundColor:'#eeeeee',height:1}}>
                        </View>
                        </TouchableOpacity>

                        <ActionSheet
                                ref={o => this.ActionSheet = o}
                                title={'Select Blood Group'}
                                options={this.state.department}
                                cancelButtonIndex={8}
                                destructiveButtonIndex={1}
                                onPress={(index) => { this.blood(index)}}
                              />

                        <TouchableOpacity

                        onPress={() => this.props.navigation.navigate('BasicSurgies')
                        }>
                        <View>
                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Allergies"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            editable = {false}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.allergie}
                            onChangeText={(text) => this.setState({allergie:text})}
                        />

                        <View style = {{width:window.width - 30,marginLeft:15,height:45,marginTop:-45}}>

                        </View>

                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity

                        onPress={() => this.props.navigation.navigate('Illness')
                        }>
                        <View>
                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Illness"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            editable = {false}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.illness}
                            onChangeText={(text) => this.setState({illness:text})}
                        />
                        <View style = {{width:window.width - 30,marginLeft:15,height:45,marginTop:-45}}>

                        </View>

                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity

                        onPress={() => this.props.navigation.navigate('Allergies')
                        }>
                            <View>
                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Surgeries"
                            placeholderTextColor = '#1E1F20'
                            maxLength={35}
                            editable = {false}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.surgery}
                            onChangeText={(text) => this.setState({surgery:text})}
                        />
                        <View style = {{width:window.width - 30,marginLeft:15,height:45,marginTop:-45}}>

                        </View>

                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.datepicker()}>
                          <View>
                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            value={this.state.dob}
                            editable={false}
                            placeholderTextColor = '#1E1F20'
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.dob}

                        />
                        <View style = {{width:window.width - 30,marginLeft:15,height:45,marginTop:-45}}>

                        </View>

                        </View>
                        </TouchableOpacity>


                        { this.state.show == true && (

                            <DateTimePicker value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={(event,date)=>this.setDate(event, date)} />
                        )}


                        <TextInput
                            style={{ height: 45, borderColor: '#eeeeee',fontSize:14, borderBottomWidth: 1, marginTop:3 ,marginBottom: 5 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Enter Email"
                            placeholderTextColor = '#1E1F20'
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({description:text.replace(/\s+/g,'')})}
                            value = {this.state.description}
                        />




  <View style = {{marginLeft:20,width:window.width - 40}}>
  {this.state.initial == 0 && (
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
  )}
  {this.state.initial == 1 && (
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


</View>
<Modal
animationType="slide"
transparent={false}
visible={this.state.visible}
onRequestClose={() => {

this.setState({visible:false})
}}>
<View >

<FlatList style= {{margin:1}}
data={this.state.department}

keyExtractor = { (item, index) => index.toString() }
renderItem={this._renderDepartment}
/>
</View>
</Modal>

                        <Button
                            style={{ fontSize: 20, color: 'white' }}
                            containerStyle={{ marginTop:20,marginLeft:15,width:window.width-30,padding: 10, height: 45, overflow: 'hidden', borderRadius: 20, backgroundColor: '#D90000',margin:15}}

                            onPress={() => this.buttonClickListener()}
                        >
                            SUBMIT
                        </Button>

                        <Text style = {{height:200}}>

                        </Text>





                    </KeyboardAwareScrollView>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor:'white'

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
    }
})
