import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image, Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import VersionNumber from 'react-native-version-number';
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
type Props = {};
export default class Loader extends Component {
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

}



    render() {
        return (
            <View style={styles.container}>
                <Image style = {{alignSelf:'center',marginTop:window.height/2 - 120 ,width:240, height:240, resizeMode:'contain'}}
                       source={require('./anim.gif')}/>

                       <Text style = {{fontFamily:GLOBAL.regular,fontSize:24,color:'#9393AA',marginTop:3,alignSelf:'center'}}>
                       Loading ...
                       </Text>
                       <Text style = {{fontFamily:GLOBAL.regular,fontSize:24,color:'#9393AA',marginTop:3,alignSelf:'center'}}>
                      Please Wait
                       </Text>

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
