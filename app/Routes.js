import React from 'react'
import { Image, Text } from 'react-native'
import { createAppContainer, TabBarBottom, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import Splash from './containers/Splash'
import Home from './containers/Home'
import Deals from './containers/Deals'
import Map from './containers/Map'
import Favourites from './containers/Favourites'
import Profile from './containers/Profile'
import Transactions from './containers/Transactions'
import Notifications from './containers/Notifications'
import Topup from './containers/Topup'
import DealDetails from './containers/DealDetails'
import AutoAuth from './containers/AutoAuth'

import HowItWorks from './containers/HowItWorks'
import Rules from './containers/Rules'
import Bug from './containers/Bug'
import Faq from './containers/Faq'

import Subscribe from './containers/Subscribe'
import Login from './containers/Login'
import ResetPin from './containers/ResetPin'
import Pin from './containers/Pin'
import MerchantPin from './containers/MerchantPin'
import Redeem from './containers/Redeem'
import SideMenu from './containers/SideMenu'

import Hamburger from './components/hamburger';

import globalVals from './libs/global'
import Styles from './libs/style/style';
import images from './assets/imgLibrary';

import { store } from '../App'
import { getDeals } from './actions/deals'
import { changeTab } from './actions/tabnav'


const HomeStack = createStackNavigator({
    MainPage:{
        screen: Home,
        navigationOptions:{
          headerBackTitle:null,
          gesturesEnabled:false,
          headerStyle:Styles.headerBar,
          headerTitleStyle:Styles.headerBarText
        },
    }
});

const DealStack = createStackNavigator({
    DealsList:{
        screen: Deals,
        navigationOptions:{
          headerBackTitle:null,
          gesturesEnabled:false,
          headerStyle:Styles.headerBar,
          headerTitleStyle:Styles.headerBarText
        },
      },
    
});

const MapStack = createStackNavigator({
    Map:{
        screen: Map,
        navigationOptions:{
          headerBackTitle:null,
          gesturesEnabled:false,
          headerStyle:Styles.headerBar,
          headerTitleStyle:Styles.headerBarText
        },
      }
});


const FavStack = createStackNavigator({
    Fav:{
        screen: Favourites,
        navigationOptions:{
          headerBackTitle:null,
          gesturesEnabled:false,
          headerStyle:Styles.headerBar,
          headerTitleStyle:Styles.headerBarText
        },
      }
});


const ProfileStack = createStackNavigator({
    Profile:{
        screen: Profile,
        navigationOptions:{
          headerBackTitle:null,
          gesturesEnabled:false,
          headerStyle:Styles.headerBar,
          headerTitleStyle:Styles.headerBarText
        },
      }
});

// Tab Navigator
const Tabs = createBottomTabNavigator({
    DealsTab:DealStack,
    MapTab:MapStack,
    HomeTab:HomeStack,
    FavouritesTab:FavStack,
    ProfileTab:ProfileStack,
},
{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HomeTab') {
          iconName = (focused ? images.iconHomeActive : images.iconHome);
        } else if (routeName === 'DealsTab') {
            iconName = (focused ? images.iconListActive : images.iconList);
        }
        else if (routeName === 'MapTab') {
            iconName = (focused ? images.iconMapActive : images.iconMap);
        }
        else if (routeName === 'FavouritesTab') {
            iconName = (focused ? images.iconHeartActive : images.iconHeart );
        }
        else if (routeName === 'ProfileTab') {
            iconName = (focused ? images.iconUserActive : images.iconUser );
        }

        return <Image style={Styles.footerIcon} source={iconName} />;

      },
      tabBarOnPress: async ({previousScene, scene, jumpToIndex})=> {
          console.log(scene);

          console.log(navigation);

          navigation.setParams({pageTitle:'Offers'});
        //   jumpToIndex(scene.index);
        //   this.props.changeTab('Deals','Offers');
        // this.props.navigation.navigate('DealsList',{page:'Offers'});
        if(scene.index==0){
            console.log("Trying to call change tab ===== ");
            // await navigation.dispatch(changeTab("DealsList","Offers"));
            globalVals.searchKeyword = "";
            globalVals.refreshDeals = true;
            store.dispatch(changeTab('getDeals',"Offers"));
            //navigation.dispatch(NavigationActions.navigate({routeName:'DealsList'}));
        // }else {
            
        }else if(scene.index==4) {
            store.dispatch(changeTab('Profile','Profile'));
        }else if(scene.index==3) {
            console.log("current scene = favourites" +scene.index);
            store.dispatch(changeTab('Favourites','Favorite'));
            globalVals.searchKeyword = "";
            globalVals.refreshDeals = true;
            
        }
        jumpToIndex(scene.index);
        
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
    animationEnabled: true,
    swipeEnabled: false,
    initialRouteName:'HomeTab',
    lazy:true,
    removeClippedSubviews:true,

});

// Side menu


const DrawerStack = createDrawerNavigator({
    Tabs:{screen:Tabs},
},{
    contentComponent: SideMenu,
    drawerWidth: 250,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: globalVals.colors.darkPurple,
})


const DrawerNavigation = createStackNavigator({
    DrawerStack: { screen: DrawerStack }
  }, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      title: 'Logged In to your app!',
      gesturesEnabled: false,
      headerLeft: <Text onPress={() => {
        // Coming soon: navigation.navigate('DrawerToggle')
        // https://github.com/react-community/react-navigation/pull/2492
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }}>Menu</Text>
    })
  })

// Main Navigator
const HomeNavigator = createStackNavigator({
    Splash: {
      screen: Splash,
      navigationOptions:{
        title:'Voucher Club',
        headerBackTitle:null,
        header:null,
      },
    },
    Home: {
        screen: DrawerStack, //Tabs
        headerMode:'float',
        navigationOptions:{
            header:null,
        }
    },
    DealDetails:{
        screen: DealDetails,
        headerMode:'screen',
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    HowItWorks:{
        screen:HowItWorks, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Rules:{
        screen:Rules, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Bug:{
        screen:Bug, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },   
    Faq:{
        screen:Faq, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },   

    Subscribe:{
        screen:Subscribe, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Login:{
        screen:Login, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Pin:{
        screen:Pin, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    MerchantPin:{
        screen:MerchantPin, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Redeem:{
        screen:Redeem, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    ResetPin:{
        screen:ResetPin, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Transactions:{
        screen:Transactions, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Notifications:{
        screen:Notifications, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    Topup:{
        screen:Topup, 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
    AutoAuth:{
        screen:AutoAuth,
        path:"auth/:token", 
        navigationOptions:{
            headerBackTitle:null,
            gesturesEnabled:false,
            headerStyle:Styles.headerBar,
            headerTitleStyle:Styles.headerBarText,
            headerVisible: true,
        },
    },
});

const RootAppNavigator = createAppContainer(
    createSwitchNavigator({
      Home: HomeNavigator,
    })
  );

export default RootAppNavigator;
