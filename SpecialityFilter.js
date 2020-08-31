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

    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];
import store from 'react-native-simple-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class SpecialityFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            images: [

            ]

        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SELECT',
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
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

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
    fetchDepartment = (res)=>{


        if (res == null ||res.length == 0 ){

            const url = GLOBAL.BASE_URL + 'view_all_specialty'

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
                    "key": "all_specialty"


                }),
            }).then((response) => response.json())
                .then((responseJson) => {


                    if (responseJson.status == true) {
                        this.setState({images: responseJson.specialty})

                        var array = [];
                        for (var i = 0; i < this.state.images.length; i++) {
                            var dict = {
                                name: this.state.images[i].title,
                                selected: '',
                                id: this.state.images[i].id,


                            }
                            array.push(dict)

                        }


                        this.setState({results: array})
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
        }else{
  //          alert('dd')

//            alert(JSON.stringify(res))

            this.setState({results:res.array})
        }
    }

    componentDidMount(){
        store.get('speciality')
            .then((res) =>
                //  alert(JSON.stringify(res))
                this.fetchDepartment(res)

            )





    }


    login = () => {
        store.delete("speciality");
        var dict = {
            "array" :this.state.results
        }



        store.update("speciality", dict);
        this.props.navigation.goBack()
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {


        let movie = this.state.results

        let selectedIndex = movie[indexs]


        if (selectedIndex.selected == ""){
            selectedIndex.selected = "Y"
        }else {
            selectedIndex.selected = ""
        }
        this.state.results[indexs] = selectedIndex


        this.setState({results:this.state.results})

        store.delete("speciality");
        var dict = {
            "array" :this.state.results
        }



        store.update("speciality", dict);

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

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>





                <View style = {{flexDirection:'row',width :'100%'}}>

                    <Text style = {{width:'90%',marginTop:10,marginBottom:8,color:'black'}}>
                        {item.name}


                    </Text>

                    {item.selected != '' && (

                        <Image style = {{width :22 ,height: 22,resizeMode: 'contain',marginTop:10}}
                               source={require('./check.png')}/>

                    )}

                    {item.selected == '' && (

                        <Image style = {{width :22 ,height: 22,resizeMode: 'contain',marginTop:10}}
                               source={require('./uncheck.png')}/>

                    )}




                </View>










            </TouchableOpacity>
        )
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

                <View style={{width:'100%'}}>

                    <FlatList style= {{flexGrow:0,height:window.height - 140,width:'60%'}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
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
        fontFamily:GLOBAL.regular,


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
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
