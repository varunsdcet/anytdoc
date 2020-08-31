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
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class BasicDetail extends Component {
    state = {
        height :'',
        weight:'',
        blood_group :'',
        allergies :'',
        illnesses :'',
        surgeries :'',
        loading:false,
        visible:false,
        department:['A+','A-','B+','B-','AB+','AB-','O+','O-'],


        selected:false,
        data:[],

    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    selectedFirst = (item) => {
      this.setState({visible:false})

      this.setState({blood_group:item})

    }
    _renderDepartment =  ({item,index}) => {
        return (
          <TouchableOpacity onPress={() => this.selectedFirst(item)
          }
          activeOpacity={0.9}>
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:'Poppins-Regular',margin:4,fontSize:22}}>
                    {item}

                </Text>




            </View>

  </TouchableOpacity>


        )


    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            }>
                <Text style={{color :'#7BAAED',fontFamily:'Poppins-Regular',fontSize: 16,marginRight:10}} >

                  SKIP
                </Text>
            </TouchableOpacity>,
            //   header: () => null,
            title: 'BASIC DETAIL',
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



    _saveDetails=()=> {
//        Alert.alert('clicked save');
        this.props.navigation.replace('TabNavigator')
    }
    _handleStateChange =(state) => {

        if (GLOBAL.allergies.length != 0) {
            var alle = '';
            for (var i = 0 ; i< GLOBAL.allergies.length ; i++){
                if (GLOBAL.allergies[i].selected != '') {
                    alle = alle + GLOBAL.allergies[i].name + ','
                }
            }

 this.setState({allergies:alle})



        }
        if (GLOBAL.surgries.length != 0) {
            var alle = '';
            for (var i = 0 ; i< GLOBAL.surgries.length ; i++){
                if (GLOBAL.surgries[i].selected != '') {
                    alle = alle + GLOBAL.surgries[i].name + ','
                }
            }

            this.setState({surgeries:alle})

        }
        if (GLOBAL.illness.length != 0) {
            var alle = '';
            for (var i = 0 ; i< GLOBAL.illness.length ; i++){
                if (GLOBAL.illness[i].selected != '') {
                    alle = alle + GLOBAL.illness[i].name + ','
                }
            }

            this.setState({illnesses:alle})
        }

    }


    componentDidMount() {
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        this.props.navigation.setParams({ handleSave: this._saveDetails });
    }
    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }






    login = () => {
        const url = GLOBAL.BASE_URL +  'basic_detail_update'

        this.showLoading()
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
                height: this.state.height,
                weight:this.state.weight,
                blood_group:this.state.blood_group,
                allergies:this.state.allergies,
                illnesses:this.state.illnesses,
                surgeries:this.state.surgeries,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
  //              alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
//                    alert(JSON.stringify(responseJson))

                    this.props.navigation.replace('TabNavigator')
                }else {
                    alert(responseJson.message)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

hello =(text)=>{
  if (text == ""){
    this.setState({height:''})
  }else{
  var a = parseInt(text)


  this.setState({height:a.toString()})
}

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
                    <KeyboardAwareScrollView>


                        <Text style = {{marginLeft: '5%',width:'90%',color:'#000000',fontSize: 16,marginTop: '4%',fontFamily:'Poppins-Medium',textAlign:'center',fontWeight:'bold'}}>
                            Tell us a little about yourself

                        </Text>

                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'2%'}}>

                            <View style = {{flexDirection: 'row'}}>

                            <TextInput style={styles.inputs}
                                       placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                       onChangeText={(text) => this.hello(text)}
                                       keyboardType={'numeric'}
                                       maxLength={3}
                                       value = {this.state.height}
                                       placeholder={" Height(In cm)"}/>



                            <TextInput style={styles.inputss}
                                       placeholderTextColor='rgba(0, 0, 0, 0.6)'

                                       onChangeText={(text) => this.setState({weight:text})}
                                        keyboardType={'numeric'}
                                       maxLength={4}

                                       placeholder={" Weight(In Kg)"}/>

                            </View>

<TouchableOpacity onPress={()=>this.setState({visible:!this.state.visible})}>
                            <TextInput style={styles.input}
                            editable= {false}
                            value = {this.state.blood_group}
                                       placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                       onChangeText={(text) => this.setState({blood_group:text})} placeholder={" Blood Group"}/>

</TouchableOpacity>

                            <View style = {{flexDirection:'row'}}>

                                <TextInput style={styles.input}
                                           placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                           value = {this.state.allergies}
                                           onChangeText={(text) => this.setState({allergies:text})} placeholder={" Allergies"}/>

                                <TouchableOpacity
                                style = {{marginTop:30,marginLeft:-70,}}
                                onPress={() => this.props.navigation.navigate('BasicSurgies')
                                }>
                                    <Text style = {{color:'black',fontSize:17}}>
                                        SELECT
                                    </Text>
                                </TouchableOpacity>

                            </View>






                            <View style = {{flexDirection:'row'}}>

                                <TextInput style={styles.input}
                                           placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                           value = {this.state.illnesses}
                                           onChangeText={(text) =>this.setState({illnesses:text})} placeholder={" Chronic illnesses"}/>

                                <TouchableOpacity
                                style = {{marginTop:30,marginLeft:-70,}}
                                onPress={() => this.props.navigation.navigate('Illness')
                                }>
                                    <Text style = {{color:'black',fontSize:17}}>
                                        SELECT
                                    </Text>
                                </TouchableOpacity>

                            </View>






                            <View style = {{flexDirection:'row'}}>

                                <TextInput style={styles.input}
                                           placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                           value = {this.state.surgeries}
                                           onChangeText={(text) => this.setState({surgeries:text})} placeholder={" Surgeries"}/>


                                <TouchableOpacity
                                style = {{marginTop:30,marginLeft:-70,}}
                                onPress={() => this.props.navigation.navigate('Allergies')
                                }>
                                <Text style = {{color:'black',fontSize:17}}>
                                    SELECT
                                </Text>
                                </TouchableOpacity>

                            </View>



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
                            style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#7BAAED',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            SAVE
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

        backgroundColor :'white'
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
    inputContainer: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 70
    },
    input: {
        height : 50,
        borderWidth:1,
        borderColor:'#e6e7f0',
        borderRadius:4,
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily:'Poppins-Medium',
        fontSize:14,
        marginTop:20,


        width:'100%'
    },
    selinput:{
        height : 50,
        borderWidth:1,
        borderColor:'#e6e7f0',
        borderRadius:4,
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily:'Poppins-Medium',
        fontSize:18,
        marginTop:20,
        width:'80%'
    },
    inputs: {
        height : 50,
        borderWidth:1,
        borderColor:'#e6e7f0',
        borderRadius:4,
        color: 'black',
        fontFamily:'Poppins-Medium',
        fontSize:14,
        marginTop:20,
        width:'45%'
    },
    inputss: {
        height : 50,
        borderWidth:1,
        borderColor:'#e6e7f0',
        borderRadius:4,
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily:'Poppins-Medium',
        fontSize:14,
        marginTop:20,
        marginLeft:'7%',


        width:'45%'
    },
})
