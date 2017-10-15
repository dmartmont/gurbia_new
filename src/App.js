import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";

import * as firebase from 'firebase';
import * as auth from './auth';
import { createRootNavigator } from './initialRouter';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        }

        var config = {
            apiKey: "AIzaSyCVSx_RrH9Dq9ZW91d2IOe9vZgkbRD3Uc4",
            authDomain: "gurbia-79ddc.firebaseapp.com",
            databaseURL: "https://gurbia-79ddc.firebaseio.com",
            storageBucket: "gurbia-79ddc.appspot.com",
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    componentWillMount() {
        auth.isSignedIn()
            .then((res, data) => this.setState({
                signedIn: res, checkedSignIn: true, ...data
            }))
            .catch(err => {
                console.log("Something went wrong checking if signed in: ", err);
                this.setState({
                    signedIn: false, checkedSignIn: true
                });
            });
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);

        return <Layout />
    }
}

