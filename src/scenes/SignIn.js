import React from "react";
import {
  View,
  Image,
  StyleSheet
} from "react-native";
import {
  Card,
  Button,
  FormLabel,
  FormInput
} from "react-native-elements";
import { NavigationActions } from 'react-navigation';

import Database from '../database/database';
import { onSignIn } from '../auth';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    header: null
  }

  onSignIn() {
    if (this.state.email && this.state.password) {
      let user = Database.loginUser(this.state.email, this.state.password);
      if (user) {
        onSignIn(this.state.email + ':' + this.state.password);

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SignedIn' })
          ]
        });
        this.props.screenProps.rootNavigation.dispatch(resetAction);
      } else {
        alert('Email or password not found.');
      }
    } else {
      alert('Please enter your email and password.')
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Card
          image={require('../resources/fondo.jpg')}
          containerStyle={styles.card} >

          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email address..."
            onChangeText={(email) => this.setState({ email })} />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Password..."
            onChangeText={(password) => this.setState({ password })} />
          <Button
            title="SIGN IN"
            raised
            buttonStyle={{
              backgroundColor: "#F57C00",
              padding: 10
            }}
            icon={{ name: 'send' }}
            onPress={() => this.onSignIn()}
          />
          <Button
            title="SIGN UP"
            buttonStyle={{
              backgroundColor: "#F5F5F5",
            }}
            color="#FF7043"
            icon={{
              name: 'create',
              color: "#D84315"
            }}
            onPress={() => navigate("SignUp")}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  }
})
