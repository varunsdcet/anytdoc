import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
//import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';

const GLOBAL = require('./Global');
import {Platform, StyleSheet,TouchableOpacity,Image, Text, View ,Button, Share} from 'react-native';

import Splash from './Splash.js';
import Login from './Login.js';
import Forgot from './Forgot.js';
import MyOtp from './MyOtp.js';
import NewOtp from './NewOtp.js';
import Register from './Register.js';
import Loader from './Loader.js';
import Otp from './Otp.js';
import Slider from './Slider.js';
import FinalOtp from './FinalOtp.js';
import VideoList from './VideoList.js';
import ChangePassword from './ChangePassword.js';
import ChangeSuccess from './ChangeSuccess.js';
import NurseScreen from './NurseScreen.js';
import NurseBooking from './NurseBooking.js';
import NurseTime from './NurseTime.js';
import ListAddress from './ListAddress.js';
import AddAddress from './AddAddress.js';
import Pharmacy from './Pharmacy.js';
import Emergency from './Emergency.js';
import Body from './Body.js';
import PhramacySuccess from './PhramacySuccess.js';
import MedicalService from './MedicalService.js';
import MedicalServiceBooking from './MedicalServiceBooking.js';
import Home from './Home.js';
import Quatation from './Quatation.js';
import SurgicalPackage from './SurgicalPackage.js';
import MyMap from './MyMap.js';
import ArticleDesc from './ArticleDesc.js';
import Insurance from './Insurance.js';
import HospitalList from './HospitalList.js';
import HospitalDetail from './HospitalDetail.js';
import AmbulanceBooking from './AmbulanceBooking.js';
import Location from './Location.js';
import MedicalEquipment from './MedicalEquipment.js';
import MedicalDetail from './MedicalDetail.js';
import EquipmentCart from './EquipmentCart.js';
import Labtest from './Labtest.js';
import LabDetail from './LabDetail.js';
import LabMember from './LabMember.js';
import AddMember from './AddMember.js';
import Cart from './Cart.js';
import LabCartDetail from './LabCartDetail.js';
import DoctorVisitDetail from './DoctorVisitDetail.js';
import HealthPackege from './HealthPackege.js';
import PackageMember from './PackageMember.js';
import HealthDetail from './HealthDetail.js';
import BookingAppointment from './BookingAppointment.js';
import OnlineBooking from './OnlineBooking.js';
import OnlineVideo from './OnlineVideo.js';
import BookingDetailFinal from './BookingDetailFinal.js';
import BookingAppointmentDetail from './BookingAppointmentDetail.js';
import Payment from './Payment.js';
import ListMember from './ListMember.js';
import MyAccount from './MyAccount.js';
import AboutUs from './AboutUs.js';
import Support from './Support.js';
import Privacyp from './Privacyp.js';
import WalletHistory from './WalletHistory.js';
import Wallet from './Wallet.js';
import WalletRecharge from './WalletRecharge.js';
import NurseHistory from './NurseHistory.js';
import NurseHistoryDetail from './NurseHistoryDetail.js';
import Appointment from './Appointment.js';
import AppointmentDetail from './AppointmentDetail.js';
import AppointmentResc from './AppointmentResc.js';
import PharmacyOrder from './PharmacyOrder.js';
import PharmacyDetail from './PharmacyDetail.js';
import LabHistory from './LabHistory.js';
import LabHistoryDetail from './LabHistoryDetail.js';
import EquipmentAddress from './EquipmentAddress.js';
import History from './History.js';
import HistoryDetail from './HistoryDetail.js';
import Speciality from './Speciality.js';
import Search from './Search.js';
import Notification from './Notification.js';
import EditProfile from './EditProfile.js';
import BasicSurgies from './BasicSurgies.js';
import Illness from './Illness.js';
import Allergies from './Allergies.js';
import SearchSpeciality from './SearchSpeciality.js';
import ArticleDescription from './ArticleDescription.js';
import Filter from './Filter.js';
import Department from './Department.js';
import HospitalFilter from './Department.js';
import SpecialityFilter from './SpecialityFilter.js';
import Chat from './Chat.js';
import MyChat from './MyChat.js';
import VideoCall from './VideoCall.js';
import VideoView from './VideoView.js';
import HealthRecord from './HealthRecord.js';
import MyHealthRecord  from './MyHealthRecord.js';
import MyAllergies from './MyAllergies.js';
import MyIllness from './MyIllness.js';
import MySurgery from './MySurgery.js';
import DoctorDetail from './DoctorDetail.js';
import MyFilter from './MyFilter.js';
import Thankyou from './Thankyou.js';
import ArticleList from './ArticleList.js';
import OpdHealth from './OpdHealth.js';
import Gulcose from './Gulcose.js';
import Rating from './Rating.js';
import Blood from './Blood.js';
import ListSugar from './ListSugar.js';
import ListBp from './ListBp.js';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';import React, {Component} from 'react';


const TabNavigator = createBottomTabNavigator({
        Home: { screen: Home,
            navigationOptions : {
                title:'Home',

                tabBarLabel: 'Home',

                swipeEnabled: false,
                gesturesEnabled: false,
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./homes.png')
                        : require('./home.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },


        MyHealthRecord: { screen: MyHealthRecord ,
            navigationOptions : {
                title:'HealthRecord',
                tabBarLabel: 'HealthRecord',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./health-records.png')
                        : require('./health-record.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },

        Notification: { screen: Notification ,
            navigationOptions : {
                title:'Notification',
                tabBarLabel: 'Notification',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./bells.png')
                        : require('./bell.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },




        MyAccount: { screen: MyAccount ,
            navigationOptions : {
                title:'MyAccount',
                tabBarLabel: 'MyAccount',

                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ focused }) => {

                    const image = focused
                        ? require('./accounts.png')
                        : require('./account.png')

                    return (
                        <Image
                            source={image}
                            style={{height: 20, width: 20}}
                        />
                    )
                }
            }
        },


    },


    {
        defaultNavigationOptions: ({ navigation }) => ({

            swipeEnabled: false,
            gesturesEnabled: false,
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'white'},
            headerStyle:{
                backgroundColor:'#D90000',
            },
            headerTintColor :'white',

            tabBarIcon: () => (
                <Image
                    source={require('./home.png')}
                    style={{width:20, height:20}}
                />
            )
        }),
        tabBarOptions: {

            swipeEnabled: false,
            gesturesEnabled: false,
            activeTintColor: '#7BAAED',
            inactiveTintColor: '#8E9198',
            inactiveBackgroundColor:'white',
            activeBackgroundColor:'white',
            showIcon:'true'
        },

    }
);


const StackNavigator = createStackNavigator({

        Splash:{screen:Splash},
        Login:{screen:Login},
        Forgot:{screen:Forgot},
          MyOtp:{screen:MyOtp},
            NewOtp:{screen:NewOtp},
            Register:{screen:Register},
            Otp:{screen:Otp},
            Loader:{screen:Loader},
            Slider:{screen:Slider},
            FinalOtp:{screen:FinalOtp},
            ChangePassword:{screen:ChangePassword},
            ChangeSuccess:{screen:ChangeSuccess},
            NurseScreen:{screen:NurseScreen},
            NurseBooking:{screen:NurseBooking},
            NurseTime:{screen:NurseTime},
            ListAddress:{screen:ListAddress},
            AddAddress:{screen:AddAddress},
            Pharmacy:{screen:Pharmacy},
            PhramacySuccess:{screen:PhramacySuccess},
            Emergency:{screen:Emergency},
            MedicalService:{screen:MedicalService},
            Body:{screen:Body},
              MedicalServiceBooking:{screen:MedicalServiceBooking},
              Home:{screen:Home},
              TabNavigator: { screen: TabNavigator,
 navigationOptions: ({ navigation }) => ({
   header:null,
  }),
  },
              Quatation:{screen:Quatation},
              SurgicalPackage:{screen:SurgicalPackage},
              MyMap:{screen:MyMap},
              Insurance:{screen:Insurance},
              HospitalList:{screen:HospitalList},
              HospitalDetail:{screen:HospitalDetail},
              AmbulanceBooking:{screen:AmbulanceBooking},
              Location:{screen:Location},
              MedicalEquipment:{screen:MedicalEquipment},
              MedicalDetail:{screen:MedicalDetail},
              EquipmentCart:{screen:EquipmentCart},
              Labtest:{screen:Labtest},
              LabDetail:{screen:LabDetail},
              LabMember:{screen:LabMember},
              AddMember:{screen:AddMember},
              Cart:{screen:Cart},
              OpdHealth:{screen:OpdHealth},
                HealthRecord:{screen:HealthRecord},
              LabCartDetail:{screen:LabCartDetail},
              DoctorVisitDetail:{screen:DoctorVisitDetail},
              HealthPackege:{screen:HealthPackege},
              HealthDetail:{screen:HealthDetail},
PackageMember:{screen:PackageMember},
BookingAppointment:{screen:BookingAppointment},
OnlineBooking:{screen:OnlineBooking},
OnlineVideo:{screen:OnlineVideo},
BookingDetailFinal:{screen:BookingDetailFinal},
BookingAppointmentDetail:{screen:BookingAppointmentDetail},
ListMember:{screen:ListMember},
Payment:{screen:Payment},
ArticleDesc:{screen:ArticleDesc},
MyAccount:{screen:MyAccount},
AboutUs:{screen:AboutUs},
Support:{screen:Support},
Privacyp:{screen:Privacyp},
WalletHistory:{screen:WalletHistory},
Wallet:{screen:Wallet},
WalletRecharge:{screen:WalletRecharge},
NurseHistory:{screen:NurseHistory},
NurseHistoryDetail:{screen:NurseHistoryDetail},
Appointment:{screen:Appointment},
AppointmentDetail:{screen:AppointmentDetail},
AppointmentResc:{screen:AppointmentResc},
PharmacyOrder:{screen:PharmacyOrder},
PharmacyDetail:{screen:PharmacyDetail},
LabHistory:{screen:LabHistory},
LabHistoryDetail:{screen:LabHistoryDetail},
EquipmentAddress:{screen:EquipmentAddress},
History:{screen:History},
HistoryDetail:{screen:HistoryDetail},
Speciality:{screen:Speciality},
Search:{screen:Search},
Notification:{screen:Notification},
EditProfile:{screen:EditProfile},
BasicSurgies:{screen:BasicSurgies},
Rating:{screen:Rating},
VideoList:{screen:VideoList},
Illness:{screen:Illness},
Allergies:{screen:Allergies},
SearchSpeciality:{screen:SearchSpeciality},
ArticleDescription:{screen:ArticleDescription},
Filter:{screen:Filter},
Department:{screen:Department},
HospitalFilter:{screen:HospitalFilter},
SpecialityFilter:{screen:HospitalFilter},
Chat:{screen:Chat},
MyChat:{screen:MyChat},
VideoCall:{screen:VideoCall},
VideoView:{screen:VideoView},
MyHealthRecord:{screen:MyHealthRecord},
MyAllergies:{screen:MyAllergies},
MyIllness:{screen:MyIllness},
MySurgery:{screen:MySurgery},
DoctorDetail:{screen:DoctorDetail},
MyFilter:{screen:MyFilter},
Thankyou:{screen:Thankyou},
ArticleList:{screen:ArticleList},
Gulcose:{screen:Gulcose},
Blood:{screen:Blood},
ListSugar:{screen:ListSugar},
ListBp:{screen:ListBp},
    },

   // {headerMode :'none'},
);

export default createAppContainer(StackNavigator);
//LabourLaw
