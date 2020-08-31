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
    AsyncStorage,
    Share,
} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
const actions = [
  {
    text: "Share",
    icon: require("./arrowlogo.png"),
    name: "bt_accessibility",
    position: 1
  },

];
var arrayholder =[];
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import { WebView } from 'react-native-webview';
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ArticleDescription extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        text:'',

        selected:false,
        data:[],
        images :[
        ],

    };

    static navigationOptions = ({ navigation }) => {

        return {

            //   header: () => null,
            title: 'Article',
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


    showLoading() {
        this.setState({loading: true})
    }

    _saveDetails=()=> {

      var a = this.props.navigation.state.params

      Share.share({
              message:a
          },{
              tintColor:'green',
              dialogTitle:'Share this app via....'
          }
      ).then(this._showResult);

     }
    componentDidMount(){



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

                <WebView source={{ uri: this.props.navigation.state.params }} />
                <FloatingAction
                   actions={actions}
                   onPressItem={name => {
                     this._saveDetails()
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
