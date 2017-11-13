import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.navContainer}>
        <View style={[styles.buttonContainer, { marginLeft: 3 }]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={this.props.onpressLeft}
          >
            <Icon name={this.props.iconLeft} size={30} color='#FFF' />
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonContainer, { marginRight: 5 }]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={this.props.onpressRight}
          >
            <Icon name={this.props.iconRight} size={30} color='#FFF' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F44336',
    height: 50,
    elevation: 5
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  },
  button: {
    height: 35,
    width: 35
  }
})
