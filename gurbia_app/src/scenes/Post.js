import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import StarRating from 'react-native-star-rating'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Database from './../database/database'

import Navbar from './../components/Navbar'

export default class PostScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.props.navigation.state.params.data
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    var user = Database.getUser();
    Database.subscribeToPost(
      user.displayName,
      user.email,
      user.uid,
      this.state.key,
      this.state.uid);
  }

  render() {
    const pedidos = (this.state.subscribedUsers == undefined) ?
      0 :
      Object.keys(this.state.subscribedUsers).length;

    return (
      <View style={styles.container}>
        <Navbar
          onpressLeft={() => this.props.navigation.goBack()}
          iconLeft='close'
        />
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: this.state.picture }}
            style={styles.postImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.principalInfoContainer}>
            <View>
              <Text style={styles.foodNameText}>{this.state.title}</Text>
              <Text style={styles.usernameText}>{this.state.authorName}</Text>
            </View>
            <View style={styles.rateContainer}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.state.rate}
                starColor={'#D32F2F'}
                emptyStarColor={'#f2828a'}
                starSize={30}
              />
            </View>
          </View>
          <View style={styles.foodInfoContainer}>
            <View style={styles.pricingContainer}>
              <Text style={styles.priceText}>
                <Text style={{ fontWeight: 'bold' }}>Price:</Text> {this.state.price}
              </Text>
              <Text style={styles.priceText}>
                <Text style={{ fontWeight: 'bold' }}>Portions:</Text>
                {pedidos}/{this.state.portions}</Text>
            </View>
            <Text style={styles.foodDescription}>
              {this.state.description}
            </Text>
          </View>
        </View>
        <ActionButton
          buttonColor='rgba(255, 87, 34, 1)'
          onPress={() => Alert.alert(
            'Confirmacion de pedido',
            'Estas seguro que quieres suscribirse a esta publicacion?',
            [
              { text: 'No, gracias', onPress: () => console.log("Canceladei") },
              { text: 'Suscribirme!', onPress: () => this.handleFormSubmit() },
            ],
            { cancelable: false }
          )}
          icon={
            <Icon name='keyboard-arrow-right' size={32} color='#FFFFFF' />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#CDCDCD',
    alignItems: 'center',
    margin: 10,
    marginBottom: 10,
  },
  postImage: {
    height: 300,
    width: 450,
  },
  infoContainer: {
    padding: 10,
  },
  principalInfoContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  foodNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 16,
    fontStyle: 'italic'
  },
  rateContainer: {
    alignSelf: 'center'
  },
  foodInfoContainer: {
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  foodDescription: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  priceText: {
    fontSize: 15,
  },
})
