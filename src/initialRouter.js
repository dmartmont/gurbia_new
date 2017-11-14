import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';

import SignUpScreen from './scenes/SignUp';
import SignInScreen from './scenes/SignIn';

import HomeScreen from './scenes/Home';
import PostScreen from './scenes/Post';

import NewPostScreen from './scenes/NewPost';
import ProfileScreen from './scenes/Profile';
import EditProfileScreen from './scenes/EditProfile';
import SearchScreen from './scenes/Search';
import SearchResultScreen from './scenes/SearchResult';

import MyPostsScreen from './scenes/MyPosts';
import OrdersScreen from './scenes/Orders';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const ProfileNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  EditProfile: {
    screen: EditProfileScreen
  }
}, {
    headerMode: 'none'
  });

const HomeNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Post: {
    screen: PostScreen
  },
  NewPost: {
    screen: NewPostScreen
  },
  Search: {
    screen: SearchScreen
  },
  SearchResult: {
    screen: SearchResultScreen
  }
}, {
    headerMode: 'none'
  })

const MyPostsNavigator = StackNavigator({
  MyPosts: {
    screen: MyPostsScreen
  },
  Orders: {
    screen: OrdersScreen
  }
}, {
    headerMode: 'none'
  })

const SignedOutNavigator = StackNavigator({
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerStyle
    }
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerStyle
    }
  }
}, {
    initialRouteName: 'SignIn'
  });

const SignedInNavigator = DrawerNavigator({
  Home: {
    screen: HomeNavigator
  },
  Profile: {
    screen: ProfileNavigator
  },
  MyPosts: {
    screen: MyPostsNavigator
  }
}, {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#c62828',
      inactiveTintColor: '#BDBDBD',
      style: {
        flex: 1,
        paddingTop: 30,
      }
    }
  });

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: ({ navigation, screenProps }) =>
          <SignedInNavigator
            screenProps={{ rootNavigation: navigation, ...screenProps }} />,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: ({ navigation, screenProps }) =>
          <SignedOutNavigator
            screenProps={{ rootNavigation: navigation, ...screenProps }} />,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
