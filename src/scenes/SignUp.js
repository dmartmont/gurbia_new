import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import {
    Button,
    Card,
    FormLabel,
    FormInput
} from 'react-native-elements';

import Database from '../database/database';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    static navigationOptions = {
        headerTitle: "Sign Up",
        headerStyle: {
            backgroundColor: "#E64A19",
        },
        headerTitleStyle: {
            color: "#FFFFFF"
        },
        headerBackTitleStyle: {
            color: "#FFFFFF"
        }
    }

    validateEmail = (email) => {
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    };

    validatePassword(password) {
        return password.length > 5;
    }

    handleFormSubmit() {
        try {
            if (!this.validateEmail(this.state.email)) {
                alert('Please enter a valid email.');
            } else if (!this.validatePassword(this.state.password)) {
                alert('The password must be at least 6 characters long.');
            } else {
                Database.createUser(
                    this.state.firstname,
                    this.state.lastname,
                    this.state.email,
                    this.state.password
                );

                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'SignedIn' })
                    ]
                });
                this.props.screenProps.parentNavigation.dispatch(resetAction);
            }
        } catch (err) {
            alert('Error creando usuario', err);
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container} >
                <Card>
                    <FormLabel>FIRSTNAME</FormLabel>
                    <FormInput
                        onChangeText={(firstname) => this.setState({ firstname })}
                        placeholder="Please enter your firstname..."
                    />
                    <FormLabel>LASTNAME</FormLabel>
                    <FormInput
                        onChangeText={(lastname) => this.setState({ lastname })}
                        placeholder="Please enter your lastname..."
                    />
                    <FormLabel>EMAIL</FormLabel>
                    <FormInput
                        onChangeText={(email) => this.setState({ email })}
                        placeholder="Please enter your email..."
                    />
                    <FormLabel>PASSWORD</FormLabel>
                    <FormInput
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry
                        placeholder="Please enter a password..."
                    />
                    <Button
                        title="SIGN UP"
                        raised
                        icon={{ name: 'create' }}
                        buttonStyle={{ backgroundColor: "#F57C00" }}
                        onPress={() => this.handleFormSubmit()}
                    />
                </Card >
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 0
    }
})