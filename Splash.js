import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image, Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import VersionNumber from 'react-native-version-number';
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
type Props = {};
export default class Splash extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

componentDidMount() {


  getAppstoreAppMetadata("com.anytimedoc") //put any apps packageId here
     .then(metadata => {

var s = parseFloat(metadata.version)

             if(parseFloat(VersionNumber.appVersion) < s){


this.proceed();
            //   Alert.alert("Update your app for new features.", s.toString());

     }else{
               this.timeoutCheck = setTimeout(() => {
          this.proceed();
          }, 1000);
     }



}
)
}

proceed=()=>{
        var value =  AsyncStorage.getItem('userID');
    value.then((e)=> {
        if (e == '' || e == null ){
            this.props.navigation.replace('Slider')
        }else {
            GLOBAL.user_id = e




            var k =  AsyncStorage.getItem('apply');
            k.then((f)=> {
              if (f == '' || f == null ){
                //  this.props.navigation.replace('Slider')
              }else {
if (f == 1){
  GLOBAL.appply =1
}else{
    GLOBAL.appply =0
}
              }
              //  GLOBAL.myname = f

            })

            var values =  AsyncStorage.getItem('name');
            values.then((f)=> {
                GLOBAL.myname = f

            })

            var valuess =  AsyncStorage.getItem('email');
            valuess.then((f)=> {
                GLOBAL.myemail = f

            })
            var values2 =  AsyncStorage.getItem('mobile');
            values2.then((f)=> {
                GLOBAL.mymobile = f
            })


            this.props.navigation.replace('TabNavigator')
        }
    })

}

    render() {
        return (
            <View style={styles.container}>
                <Image style = {{width :'100%' ,height : '100%'}}
                       source={require('./splash.png')}/>
                       <Image style = {{width :260 ,height : 260,resizeMode:'contain',marginTop:-window.height/2 - 130,alignSelf:'center'}}
                                                  source={require('./logo.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});
