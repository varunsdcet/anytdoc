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
import Loader from './Loader.js';
import Button from 'react-native-button';
const window = Dimensions.get('window');



const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class LabMember extends Component {
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
            results: [],
            images: [
                {
                    days :'10.00',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.23',
                    selected:'',
                },
                {
                    days :'10.33',
                    selected:'',
                },
                {
                    days :'10.56',
                    selected:'',
                },
                {
                    days :'10.66',
                    selected:'',
                },
            ]

        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
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
            title: 'Select Member',
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
      //alert('hi')

      // body: JSON.stringify({
      //     "user_id":GLOBAL.user_id,
      //     "test_id": GLOBAL.labid,
      //     "test_type":'single'
      //
      //
      //
      //
      //
      //
      // }),
        const url =  GLOBAL.BASE_URL  + 'list_all_memebrs'
console.log(url)
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

        //   this._handlePressLogin()
    }


    login = () => {


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

        if(s==''){
            alert('Please select members')
            return
        }
      //  alert(s)

         s = s.slice(0,-1)

         this.showLoading()

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
                "test_type":"single",
                "is_member":k,
                "order_price":this.state.myprice,
                "main_price":this.state.myprice






            }),
        }).then((response) => response.json())
            .then((responseJson) => {

this.hideLoading()


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

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = (item) => {


        this.setState({selected:true})
    }
    selectedFirst = (item,index) => {
     //   alert(JSON.stringify(item))
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
     //   alert(indexs)



        var a = "";

        if (GLOBAL.lab.discount_price  == "0.00"){
            a = GLOBAL.lab.sell_price
        }else{
            a = GLOBAL.lab.discount_price
        }

        var f = parseInt(a) * indexs
      //  alert(f)
        this.setState({myprice:f})

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

    _renderDepartmentss =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }
    _renderDepartments =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }
    _renderDepartment =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:GLOBAL.regular,margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }

    _renderItems = ({item,index}) => {
        var commonHtml = ""
        if (item.relation == ""){
            commonHtml = item.name
        }else {
             commonHtml = ` ${item.name} (${item.relation})`
        }


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item,index)
            }>
                <View style={{ flexDirection: 'row',flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 2,marginBottom:20,marginTop:20}}>


                    <View style = {{width:'80%'}} >

                    <Text style={{marginLeft : 5,fontSize : 16,color :'#1E1F20',fontFamily:GLOBAL.semi,width :'60%',marginTop:2}}>

                        {commonHtml}
                    </Text>

                    <Text style={{marginLeft : 5,fontSize : 12,color :'#83878E',fontFamily:GLOBAL.regular,width :'60%',marginTop:2}}>

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
      //  alert(JSON.stringify(GLOBAL.lab))



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

})
