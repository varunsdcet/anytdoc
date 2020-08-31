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
var arrayholder = [];
import { FloatingAction } from "react-native-floating-action";
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';
const GLOBAL = require('./Global');
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const actions = [
  {
    text: "Add",
    icon: require("./arrowlogo.png"),
    name: "bt_accessibility",
    position: 1
  },

];
export default class ListSugar extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        images :[

        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: '',
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

    getWallet = () =>{
      var a = 0
        if (this.state.images.length == 0){
          a = 0
        }else{
          a = this.state.images.length + 1
        }
      const url = GLOBAL.BASE_URL +  'sugar_bp_list'

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
              "condition":"sugar",
              "limit_from":a




          }),
      }).then((response) => response.json())
          .then((responseJson) => {

              if (responseJson.status == true) {

                const interest = [...this.state.images, ...responseJson.listo];

                                               this.setState({images: interest})



              }
          })
          .catch((error) => {
              console.error(error);
              this.hideLoading()
          });
    }
    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loading) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000' }}
            />
        );
    };
_handleStateChange = (state) =>{
this.getWallet()
}
    componentDidMount(){
       this.props.navigation.addListener('willFocus',this._handleStateChange);

    }




    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (item) => {
     GLOBAL.serviceid = item.id

        GLOBAL.price = item.price
        GLOBAL.type = '3'
       this.props.navigation.navigate('MedicalServiceBooking')
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

    _renderItems = ({item,index}) => {
  var s = item.date
        return (


                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    marginTop: 10,marginBottom:10,borderRadius:12}}>






                            <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{marginLeft : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                                Date
                            </Text>

                            <Text style={{marginRight : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                                {s}
                            </Text>



                            </View>

                            <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{marginLeft : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                              Time
                            </Text>

                            <Text style={{marginRight : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                                {item.time}
                            </Text>



                            </View>

                            <View style = {{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                            <Text style={{marginLeft : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                                Measurement
                            </Text>

                            <Text style={{marginRight : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                                {item.content.mesaurement}
                            </Text>



                            </View>

                            <View style = {{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                            <Text style={{marginLeft : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                                Concentration
                            </Text>

                            <Text style={{marginRight : 10,marginTop:10,fontSize : 18,color :'#1E1F20', height:'auto',fontFamily:GLOBAL.semi}}>

                                {item.content.sugar_concentration} mg/dl
                            </Text>



                            </View>


 </View>




        )
    }
    SearchFilterFunction(text){


        // let tracks = arrayholder
        // let filterTracks = tracks.filter(item => {
        //     if(item.test_name.toLowerCase().match(text)) {
        //         return item
        //     }
        // })
        // this.setState({ results: filterTracks })
        // this.setState({ text: text })


        const newData = arrayholder.filter(function(item){

            const mergetwo= item.title
            const itemData = mergetwo.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })


        const interest = newData;
        this.setState({
            images: interest,
            text: text


        })

    }
    render() {

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



                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.images}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                              extraData={this.state}
                              ListFooterComponent={this.renderFooter.bind(this)}
                                         onEndReachedThreshold={0.5}
                                         onEndReached={() => this.getWallet()}
                    />
                    <FloatingAction
                       actions={actions}
                       onPressItem={name => {
                         this.props.navigation.navigate('Gulcose')
                         console.log(`selected button: ${name}`);
                       }}
                     />
                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        flex:1
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
