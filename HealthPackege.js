
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    Linking,
    FlatList,
    Dimensions,



} from 'react-native';
const window = Dimensions.get('window');
import Loader from './Loader.js';
const GLOBAL = require('./Global');


import Button from 'react-native-button';



class  HealthPackege extends React.Component{
    constructor() {
        super();

        this.state = {
            aha:'',
            loading:false,
            results:[]

            }
    }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    componentDidMount(){
      this.showLoading()
        const url =  GLOBAL.BASE_URL  + 'lab_test_package2'

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





            }),
        }).then((response) => response.json())
            .then((responseJson) => {
 this.hideLoading()



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
    selectedFirst = (item) =>{
        GLOBAL.lab = item
        this.props.navigation.navigate('HealthDetail')
       // alert(JSON.stringify(item))
    }

    renderItem=({item}) => {
        var test_included = item.test_included
        var s = "";
        var k ;

          k = require('./packagesw.png')

                // var test_included = item.test_included


        const renderedButtons =  test_included.map((b, index) => {
          return <Text style={{color:'#808080',fontFamily:GLOBAL.regular,fontSize:12,marginTop:3,marginLeft:5}}>
*{b}
</Text>
          ;
        })


        // if (test_included.length == 1){
        //     s = test_included[0]
        // }else {
        //     s = test_included.join(",")
        // }
        return(
            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>

            <View style={{backgroundColor:'#f1f1f1',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,marginLeft : 10,width:window.width - 20, shadowColor: '#D3D3D3',
                shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>

                <ImageBackground  source={{uri:item.path}}
                               style  = {{width:'100%', height:200,alignSelf:'center',marginLeft:4,resizeMode:'contain',marginTop:0,borderRadius:20
                               }}>
                <View style={{flexDirection: 'row', marginTop:6}}>
                    <Text style={{color:'white',fontWeight:'bold', fontSize:15,marginLeft:5,fontFamily:GLOBAL.semi,alignItems:'flex-start'}}>{item.package_name}</Text>

                </View>

                <View style={{flexDirection:'column', marginTop:5}}>
                    <View style={{flexDirection:'row', marginTop:5}}>
                        <Text style={{color:'white', fontSize:13,fontFamily:GLOBAL.regular,marginLeft:5}}>
                            Includes
                        </Text>
                        <Text style={{color:'white',fontSize:13,fontFamily:GLOBAL.semi,marginLeft:3}}>{item.includes} Tests</Text>
                    </View>
                    <Text style={{color:'white',fontFamily:GLOBAL.regular,fontSize:15,marginTop:3,marginLeft:5}}
                    maxLines={2}>{item.include_string}</Text>
                </View>

<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{marginTop:70}}>

<View style = {{flexDirection:'row'}}>
                        <Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>Recomended for:</Text>

      <Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>{item.recommed_for} {item.recommand_for}</Text>
</View>
<View style = {{flexDirection:'row'}}>
      <Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>Age Group:</Text>

<Text style={{fontSize:15,color:'white',fontFamily:GLOBAL.semi,marginLeft:3}}>{item.age_group}yrs.</Text>

</View>



                </View>


                <View style={{marginRight:30,marginTop:70}}>
                    <View >

                        {item.discount_price != "0.00" && (

                            <Text style={{fontSize:15,color:'white',textDecorationLine:'line-through',marginLeft:5,fontFamily:GLOBAL.semi}}>₹{item.base_price}/-</Text>

                        )}
                        {item.discount_price != "0.00" && (

                            <Text style={{fontSize:15,color:'white',marginLeft:5,fontFamily:GLOBAL.semi}}>₹{item.discount_price}/-</Text>

                        )}

                        {item.discount_price == "0.00" && (

                            <Text style={{fontSize:15,color:'white',marginLeft:5,fontFamily:GLOBAL.semi}}>₹{item.base_price}/-</Text>

                        )}
                        {item.discount_price == "0.00" && (

                            <Text style={{fontSize:15,color:'white',textDecorationLine:'line-through',marginLeft:5,fontFamily:GLOBAL.semi}}></Text>

                        )}


                </View>

                </View>

                </View>





</ImageBackground>
            </View>
            </TouchableOpacity>

        );
    }

    _keyExtractor=(item, index)=>item.id;

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'HEALTH PACKAGES',
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



    render(){
      if(this.state.loading){
          return(
              <View style={{backgroundColor:'white'}}>
                  <Loader>
                  </Loader>
              </View>
          )
      }
        return(
            <View style={{justifyContent: 'center',flex:1,backgroundColor:'#F5F5F5'}}>
                <FlatList
                    data={this.state.results}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>

        );
    }
}

export default HealthPackege;
