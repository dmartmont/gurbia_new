import React from 'react';

import { isSignedIn } from './auth';
import { createRootNavigator } from './initialRouter';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        }
    }

    componentWillMount() {
        isSignedIn()
            .then(res => this.setState({
                signedIn: res, checkedSignIn: true
            }))
            .catch(err => {
                console.log("Something went wrong signedin: ", err);
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

        console.log(signedIn);

        const Layout = createRootNavigator(signedIn);

        return (
            <Layout />
        );
    }
}