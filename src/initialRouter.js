import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./scenes/SignUp";
import SignIn from "./scenes/SignIn";
import Home from "./scenes/Home";
import Profile from "./scenes/Profile";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
    SignUp: {
        screen: SignUp
    },
    SignIn: {
        screen: SignIn,

    }
}, {
        initialRouteName: 'SignIn'
    });

export const SignedIn = DrawerNavigator({
    Home: {
        screen: Home,
    },
    Profile: {
        screen: Profile,
    }
});

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOut,
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