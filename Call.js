import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert,StatusBar, AsyncStorage,TouchableOpacity} from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import uuid from 'uuid';




type Props = {};


  const hitSlop = { top: 10, left: 10, right: 10, bottom: 10};

export default class Call extends Component<Props> {
  constructor(props) {
      super(props);
      this.webRtcClient = null;
         this.currentCallId = null;
         this.currentSession = null;

         this.state = {
           server: 'demo.wazo.community',
           username: '',
           password: '',
           number: 'Appslure',
           localVideoSrc: null,
           remoteVideoSrc: null,
           connected: false,
           ringing: false,
           inCall: false,
           error: null,
         };

this.initializeCallKeep()

    //  this.notif.localNotif()
    }
    initializeCallKeep = () => {

  // Initialise RNCallKit
  const options = {
    ios: {
      appName: 'AnytimeDoc',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
    }
  };

  try {
    RNCallKeep.setup(options);
    RNCallKeep.setActive = true
  //  RNCallKeep.setActive(true);
  } catch (err) {
    console.error('initializeCallKeep error:', err.message);
  }

  // Add RNCallKit Events
  RNCallKeep.addEventListener('didReceiveStartCallAction', this.onNativeCall);
  RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
  RNCallKeep.addEventListener('endCall', this.onEndCallAction);
  RNCallKeep.addEventListener('didDisplayIncomingCall', this.onIncomingCallDisplayed);
  RNCallKeep.addEventListener('didPerformSetMutedCallAction', this.onToggleMute);
  RNCallKeep.addEventListener('didPerformDTMFAction', this.onDTMF);
};


call = (number) => {

    // const session = this.webRtcClient.call(number);
    // this.setupCallSession(session);

    this.setState({ inCall: true, ringing: false });
RNCallKeep.displayIncomingCall(uuid.v4(), 'Appslure');
    // Tell callkeep that we are in call
    RNCallKeep.startCall(this.getCurrentCallId(), number);
  };
  answer = () => {
    alert('hi')
    this.setState({ inCall: true, ringing: false });


  };
  hangup = () => {
    const currentCallId = this.getCurrentCallId();
    if (!this.currentSession || !currentCallId) {
      return;
    }

  //  this.webRtcClient.hangup(this.currentSession);

    RNCallKeep.endCall(currentCallId);
    this.setState({ inCall: false, ringing: false });
    this.currentCallId = null;
    this.currentSession = null;
  };
  getCurrentCallId = () => {
     if (!this.currentCallId) {
       this.currentCallId = uuid.v4();
     }

     return this.currentCallId;
   };
   onAnswerCallAction = ({ callUUID }) => {
   // called when the user answer the incoming call
   this.answer();
 };

 onIncomingCallDisplayed = error => {
   // You will get this event after RNCallKeep finishes showing incoming call UI
   // You can check if there was an error while displaying
 };

 onNativeCall = ({ handle }) => {
   console.log(JSON.stringify(handle))
   // Called when performing call from native Contact app
   this.call(handle);
 };

 onEndCallAction = ({ callUUID }) => {
   this.hangup();
 };

 onToggleMute = (muted) => {
   // Called when the system or the user mutes a call
   this.webRtcClient[muted ? 'mute' : 'unmute'](this.currentSession);
 };

 onDTMF = (action) => {
   console.log('onDTMF', action);
 };
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (



     <View style={{flex:1}}>

  <View>
  <TouchableOpacity onPress={() => this.call(this.state.number)} style={styles.button} hitSlop={hitSlop}>
               <Text>Call</Text>
             </TouchableOpacity>


             <TouchableOpacity onPress={this.answer} style={styles.button} hitSlop={hitSlop}>
               <Text>Answer</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this.onEndCallAction} style={styles.button} hitSlop={hitSlop}>
              <Text>Hangup</Text>
            </TouchableOpacity>
    <Text style = {{margin:50}}>title</Text>
    <Text>body</Text>
  </View>





       </View>


    );
  }





  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
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
    button: {
   paddingTop: 50,
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
