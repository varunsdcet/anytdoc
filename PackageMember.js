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
import Button from 'react-native-button';
import Loader from './Loader.js';
const window = Dimensions.get('window');
import { FloatingAction } from "react-native-floating-action";

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};
const actions = [
  {
    text: "Add Member",
    icon: require("./arrowlogo.png"),
    name: "bt_accessibility",
    position: 1
  },

];
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class PackageMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            department :[],
            speciality :[],
            hospital:[],
            price:[],
            myprice:'',
            results: [],atleast:0


        };

    }

    componentWillUnmount() {

    }





    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
            return {
              headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
              }>
                  <Text style={{color :'white',fontFamily:GLOBAL.regular,fontSize: 16,marginRight:10}} >

                      Add
                  </Text>
              </TouchableOpacity>,
            title: 'BOOK HEALTH PACKAGE',
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
        console.log(GLOBAL.user_id + '==' + GLOBAL.labid)

        const url =  GLOBAL.BASE_URL  + 'list_all_memebrs'

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
                "test_id": GLOBAL.labid,
                "test_type":'single'






            }),
        }).then((response) => response.json())
            .then((responseJson) => {

           //     alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})

                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });





    }
    _saveDetails=()=> {

         this.props.navigation.replace('AddMember')
     }

    componentDidMount(){
      this.props.navigation.setParams({ handleSave: this._saveDetails });
        var a = "";

        if (GLOBAL.lab.discount_price  == "0.00"){
            a = GLOBAL.lab.sell_price
        }else{
            a = GLOBAL.lab.discount_price
        }
        this.setState({myprice:a})

        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }


    login = () => {
        if(this.state.atleast== 0){
            alert('Please select atleast one member')
        }else{
        var s = ""
        var k = "0";
        for (var i = 0 ; i < this.state.results.length ; i++){
            if (this.state.results[i].in_cart == 1){


                var a  = "0";
                if (this.state.results[i].type == "self"){
                    k = "1";
                    a = "0"
                }else{
                    a = "1"
                }


                s = s + this.state.results[i].id + ',' + a + '|'

            }
        }

        s = s.slice(0,-1)
     //   alert(s)
        const url =  GLOBAL.BASE_URL  + 'add_to_cart'



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
                "user_id":s,
                "main_user_id":GLOBAL.user_id,
                "test_id":GLOBAL.lab.id,
                "test_type":"package",
                "is_member":k,
                "order_price":this.state.myprice,
                "main_price":this.state.myprice






            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    this.props.navigation.navigate('Cart')

                }else{
                    this.props.navigation.navigate('Cart')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


        }

    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item,index) => {
//        alert(JSON.stringify(item))
        var a = this.state.results[index]
        if (a.in_cart == 0){
            a.in_cart = 1
        }else{
            a.in_cart = 0
        }
        this.state.results[index] = a
        this.setState({results:this.state.results})





        var indexs = 0;
        for (var i = 0; i<this.state.results.length; i++){
            if (this.state.results[i].in_cart == 1){
                indexs = indexs + 1;
            }else{

            }
        }
  //      alert(indexs)



        var a = "";

        if (GLOBAL.lab.discount_price  == "0.00"){
            a = GLOBAL.lab.sell_price
        }else{
            a = GLOBAL.lab.discount_price
        }

        var f = parseInt(a) * indexs
//        alert(f)
        this.setState({myprice:f})
        this.setState({atleast : 1})

    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }




    _renderItems = ({item,index}) => {
//        alert(JSON.stringify(item))
        var commonHtml = ""
        if (item.relation == ""){
            commonHtml = item.name
        }else {
            commonHtml = ` ${item.name} (${item.relation})`
        }


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item,index)
            }>
                <View style={{ flexDirection: 'row',flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 2,marginBottom:10,borderRadius:10}}>


                    <View style = {{width:'80%'}} >

                        <Text style={{marginLeft : 5,fontSize : 14,fontWeight:'bold',color :'black',fontFamily:GLOBAL.regular,width :'60%',marginTop:2}}>

                            {commonHtml}
                        </Text>

                        <Text style={{marginLeft : 5,fontSize : 12,color :'black',fontFamily:GLOBAL.regular,width :'60%',marginTop:2}}>

                            Age: {item.age}
                        </Text>

                    </View>
                    <View>

                        {item.in_cart == 0 && (


                            <Image style = {{width :30 ,height: 30,alignSelf:'center',marginTop:5,resizeMode: 'contain'}}
                                   source={require('./uncheck.png')}/>

                        )}


                        {item.in_cart == 1 && (

                            <Image style = {{width :30 ,height: 30,alignSelf:'center',marginTop:5,resizeMode: 'contain'}}
                                   source={require('./check.png')}/>
                        )}
                    </View>

                </View>





            </TouchableOpacity>
        )
    }
    render() {
//        alert(JSON.stringify(GLOBAL.lab))

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

<KeyboardAwareScrollView>





            <FlatList style= {{flexGrow:0,margin:8,height:200}}
                      data={this.state.results}
                      numColumns={1}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderItems}
            />







<Text style = {{height:200}}>

</Text>




        </KeyboardAwareScrollView>



        <View style = {{position:'absolute',borderWidth:1,borderColor:'#D90000',bottom:20,flexDirection:'row',width:window.width-20,marginLeft:10,backgroundColor:'white',height:50, justifyContent:'space-between'}}>


            <Text style={{marginLeft : 10,marginTop:10,fontSize : 18,color :'#FF2D00', height:'auto',fontFamily:GLOBAL.regular,width :'60%'}}>

                ₹{this.state.myprice}/-
            </Text>

            <Button
                style={{padding:4,fontSize: 14,marginTop:10, color: 'white',backgroundColor:'#D90000',marginRight:10,width:100,height:30,fontFamily:GLOBAL.semi,borderRadius:4}}
                styleDisabled={{color: 'red'}}
                onPress={() => this.login()}>
                ADD TO CART
            </Button>



        </View>

        </View>


        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        flex:1,
        backgroundColor :'#f1f1f1'

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

})
