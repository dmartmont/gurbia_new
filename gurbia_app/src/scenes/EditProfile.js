import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';

import Database from '../database/database';
import Navbar from './../components/Navbar';


export default class EditProfileScene extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    var { displayName, email, photoURL } = Database.getUser();
    this.setState({
      displayName,
      email,
      photoURL
    })
  }

  handleFormSubmit() {
    try {
      Database.updateProfileFireBase(
        this.state.displayName,
        this.state.email,
        this.state.photoURL
      );
      this.props.navigation.goBack();

    } catch (error) {
      console.error('Error: ', error);
    }
  }

  openImage() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      this.setState({ photoURL: image.path });
    }).catch(function (e) {
      console.log('El usuario no eligio foto', e)
    });
  }

  render() {
    return (
      <View style={styles.createContainer}>
        <Navbar
          onpressLeft={() => { this.props.navigation.goBack() }}
          iconLeft='close'
        />
        <KeyboardAvoidingView
          behavior='position'
          style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: this.state.photoURL }}
            />
            <ActionButton
              buttonColor='rgba(255, 87, 34, 1)'
              onPress={() => this.openImage()}
              offsetX={75}
              offsetY={0}
            />
          </View>
          <View
            style={styles.formContainer}>
            <FormLabel>Name</FormLabel>
            <FormInput
              onChangeText={(displayName) => this.setState({ displayName })}
              placeholder={this.state.displayName}
            />
            <FormLabel>Email</FormLabel>
            <FormInput
              onChangeText={(email) => this.setState({ email })}
              placeholder={this.state.email}
            />
          </View>
          <Button
            raised
            icon={{ name: 'save' }}
            onPress={() => this.handleFormSubmit()}
            title='UPDATE'
            backgroundColor='#FF5722' />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  createContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 30
  },
  imageContainer: {
    backgroundColor: '#CDCDCD'
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    padding: 10,
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  addButton: {
    backgroundColor: '#FF5722',
    borderRadius: 25,
  }
})
