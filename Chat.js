import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,Dimensions,Image,TouchableOpacity } from 'react-native';
import Backend from "./Backend.js";
import { GiftedChat } from "react-native-gifted-chat";
import ImagePicker from 'react-native-image-picker';
import Bubble from "react-native-gifted-chat/lib/Bubble";
import {NavigationActions, StackActions} from "react-navigation";
var randomString = require('random-string');
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
type Props = {};
const options = {
    title: 'Select Document',
    maxWidth:300,
    maxHeight:500,

    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class Chat extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chat Consulation',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    constructor(props) {
        super(props);


        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            mystatus:false,
            results: [],
            messages: [],
            texts:'',

        };

    }





    // renderBubble(props) {
    //
    //     return (
    //         <View>
    //             <Text style={{color:'black'}}>{props.currentMessage.user.name}</Text>
    //         </View>
    //     );
    // }
    componentWillMount() {


    }
    renderBubble = (props,index) => {
        var a = false;
        if (props.currentMessage.status == true){
        a = true;
        }else{
            a = false;
        }
        //
        // if (props.currentMessage.user_id != GLOBAL.user_id ){
        //
        // }
        return (

                <View style={{paddingRight: 12}}>




                    <Bubble {...props}
                    wrapperStyle={{
                                            left: {
                                                backgroundColor: '#e1e1e1',
                                            },
                                            right: {
                                                backgroundColor: '#639ced'
                                            }
                                        }} />
                    {props.currentMessage.user_id != GLOBAL.user_id  &&  (
                        <View>

                        </View>
                    )}

                    {props.currentMessage.user_id == GLOBAL.user_id  &&  (
                        <View>
                            {a == true && (

                                <Image style={{width:15, height:15, resizeMode:'contain', alignSelf:'flex-end'}}
                                source={require('./seen.png')}/>

                            )}

                            {a != true && (

                                <Image style={{width:15, height:15, resizeMode:'contain', alignSelf:'flex-end'}}
                                source={require('./unseen.png')}/>

                            )}

                        </View>
                    )}






                </View>

        )
    }

    uploadImage = () => {
        const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });
        firebase
            .storage()
            .ref(`tutorials/images/${filename}`)
            .putFile(this.state.imageUri)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    let state = {};
                    state = {
                        ...state,
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                    };
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        const allImages = this.state.images;
                        allImages.push(snapshot.downloadURL);
                        state = {
                            ...state,
                            uploading: false,
                            imgSource: '',
                            imageUri: '',
                            progress: 0,
                            images: allImages
                        };
                        AsyncStorage.setItem('images', JSON.stringify(allImages));
                    }
                    this.setState(state);
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
    };

    showActionSheet= ()=>{
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

                const url = GLOBAL.BASE_URL +  'image_attchment_for_chat'
                const data = new FormData();
                data.append('gid', GLOBAL.bookingid);
                  data.append('flag',"1");

                // you can append anyone.
                data.append('image', {
                    uri:response.uri,
                    type: 'image/jpeg', // or photo.type
                    name: 'image.png'
                });
                fetch(url, {
                    method: 'post',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }

                }).then((response) => response.json())
                    .then((responseJson) => {
                        //       this.hideLoading()
                     

                       var x = randomString({
                                      length: 20,
                                      numeric: true,
                                      letters: true,
                                      special: false,
                                      exclude: ['a', 'b']
                                  });

                                  var array = [];
                                  var users = {
                                      _id: GLOBAL.user_id,
                                      name: GLOBAL.myname,
                                  }
                                  var today = new Date();
                                  /* today.setDate(today.getDate() - 30);
                                  var timestamp = new Date(today).toISOString(); */
                                  var timestamp = today.toISOString();
                                  var dict = {
                                      text: 'Attachment',
                                      user: users,
                                      createdAt: timestamp,
                                      _id: x,
                                      image: responseJson.images,

                                      // etc.
                                  };
                                  array.push(dict)
                                  //Backend.load()

console.log(responseJson.images)
                                  Backend.sendMessage(array)




                    }

                  );




                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


            }
        });
    }


    getlog = ()=>{


        const url =  GLOBAL.BASE_URL  + 'lat_long_address'

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
                "latitude": GLOBAL.lat,
                "longitude":GLOBAL.long,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    GLOBAL.chatstatus = true

           //this.setState({mystatus:true})
                    this.getlog()

                }else{
                    GLOBAL.chatstatus = false
                    this.setState({mystatus:false})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    renderActions=() =>{
        return(
            <TouchableOpacity onPress={()=>this.showActionSheet()}>
                <Image style={{width:22, height:22, resizeMode:'contain', marginLeft:9, marginBottom:12}}
                       source={require('./attachement.png')}/>
            </TouchableOpacity>
        )
    }
    login = () => {
        this.props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Landing',
                        params: { someParams: 'parameters goes here...' },
                    }),
                ],
            }))
    }

    renderChatFooter = () => {
      if (this.state.texts != ""){
        return  <Text style = {{fontSize:14,margin:10}}> {this.state.texts}</Text>;
      }

          // if (this.state.isTyping) {
          //   if (this.typingTimeoutTimer == null) {
          //     this.startTimer();
          //   }
          //   return <TypingIndicator />;
          // }
        return null;
      };
    render() {


        return (
            <View style = {{width:'100%',flex:1}}>



            <GiftedChat
                    renderActions={this.renderActions}
                    extraData={this.state}
                    renderUsernameOnMessage = {true}
                    messages={this.state.messages}
            renderChatFooter={this.renderChatFooter}
                    onSend={message => {


                      const url = GLOBAL.BASE_URL +  'online_counsult_timer'


                     fetch(url, {
                         method: 'POST',
                         headers: {
                             'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({
                             booking_id : GLOBAL.mybookingid,

                         }),
                     }).then((response) => response.json())
                         .then((responseJson) => {
                         


                             if (responseJson.status == true) {


                               if (responseJson.start_or_end == 1){
                                     Backend.sendMessage(message);
                               }else{

                                 alert('Your session EXpired')
                               }



                                 // this.setState({name :responseJson.user_details.name})
                                 // this.setState({address: responseJson.user_details.address})
                                 // this.setState({area: responseJson.user_details.area})
                                 // this.setState({city: responseJson.user_details.city})
                                 // this.setState({description :responseJson.user_details.email})
                                 // this.setState({image :responseJson.user_details.image})
                                 // this.setState({username: responseJson.user_details.username})
                                 // if(responseJson.user_details.dob==''){
                                 //     this.setState({dob:'Select Date of Birth'})
                                 // }else{
                                 //     this.setState({dob: responseJson.user_details.dob})
                                 // }

                             }else {
                                 alert('No News Found')
                             }
                         })
                         .catch((error) => {
                             console.error(error);
                         });



                    }}
                    renderBubble={this.renderBubble}
                    onInputTextChanged = {text =>{
                        Backend.updateTyping(text)

                        // alert(text)

                    }

                    }
                    user={{
                        _id: GLOBAL.user_id,
                        name: GLOBAL.myname
                    }}
                />
            </View>





        );
    }


    componentDidMount() {
        this.getlog()
      //  GLOBAL.mystatus = "Online";



        // Backend.updateMessage(message => {
        //     alert(JSON.stringify(message))
        //
        //
        // })


        Backend.loadMessages(message => {
          //  alert(JSON.stringify(message))

            if (message.text == ''){


                for (var i = 0; i< this.state.messages.length;i++){

                         //  if (this.state.messages[i].anotherid == GLOBAL.user_id) {


                               if (this.state.messages[i].status == false) {

                                   let {messages} = this.state;
                                   let targetPost = messages[i];

                                   // Flip the 'liked' property of the targetPost
                                   targetPost.status = true;

                                   // Then update targetPost in 'posts'
                                   // You probably don't need the following line.
                                   // posts[index] = targetPost;

                                   // Then reset the 'state.posts' property
                                   this.setState({messages});
                               }
                         //  }
                   // alert(JSON.stringify(this.state.messages))
                }

                                   this.setState({messages:this.state.messages});

                return {
                    messages: this.state.messages
                };
                       //  var a = this.state.messages[i]
                       //
                       //
                       //  a.status = true
                       //
                       // // this.setState({messages:a})
                  //  this.setState({messages:})
             //   }


            } else {

                this.setState(previousState => {


                    return {
                        messages: GiftedChat.append(previousState.messages, message)
                    };
                });
            }
        });


       ;

        // Backend.updateMessage(message => {
        //     alert(JSON.stringify(message))
        //
        //
        // })

        Backend.loadMessagess(message => {
          // alert(JSON.stringify(message.typinganother))
            if (message.typinganother == true){
                var s = message.name +  ' is typing ...'
                this.setState({texts:s})
            }else{
                this.setState({texts:''})
            }

        });
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        backgroundColor :'#001739'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
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
