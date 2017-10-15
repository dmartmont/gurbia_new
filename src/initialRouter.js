import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUpScreen from "./scenes/SignUp";
import SignInScreen from "./scenes/SignIn";
import HomeScreen from "./scenes/Home";
import ProfileScreen from "./scenes/Profile";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

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
        screen: HomeScreen,
    },
    Profile: {
        screen: ProfileScreen,
    }
}, {
        initialRouteName: 'Home'
    });

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: ({ navigation, screenProps }) =>
                    <SignedInNavigator
                        screenProps={{ parentNavigation: navigation, ...screenProps }} />,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: ({ navigation, screenProps }) =>
                    <SignedOutNavigator
                        screenProps={{ parentNavigation: navigation, ...screenProps }} />,
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