import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import { NavigationActions } from 'react-navigation';

import Navbar from './../components/Navbar';
import Database from '../database/database';
import { onSignOut } from '../auth';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({ focused }) => {
      const col = focused ? '#c62828' : '#BDBDBD';
      return (<View>
        <Icon name="account-circle" size={25} color={col} />
      </View >);
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      starCount: 3.5
    };
  }

  componentWillMount() {
    this.setState({
      user: Database.getUser()
    })
  }

  navigateOnSelection(value) {
    if (value === 'logout') {
      onSignOut();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'SignedOut' })
        ]
      });
      this.props.screenProps.rootNavigation.dispatch(resetAction);
    } else {
      this.props.navigation.navigate('EditProfile');
    }
  }

  render() {
    return (
      <View style={styles.fromContainer}>
        < View style={styles.navContainer} >
          <View style={[styles.buttonContainer, { marginLeft: 3 }]}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name='menu' size={32} color='#FFF' />
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonContainer, { marginRight: 5 }]}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={this.props.onpressRight}
            >
              <Menu onSelect={(value) => this.navigateOnSelection(value)}>
                <MenuTrigger>
                  <Icon name='more-vert' size={32} color='#FFF' />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value='edit'>
                    <Text>Edit Profile</Text>
                  </MenuOption>
                  <MenuOption value='logout'>
                    <Text>Logout</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </TouchableOpacity>
          </View>
        </View >
        <View style={styles.infoContainer}>
          <View style={styles.backPhoto}>
            <Avatar
              xlarge
              rounded
              source={{ uri: this.state.user.photoURL }}
            />
          </View>
          <View style={styles.nys}>
            <Text style={styles.name}>
              {this.state.user.displayName}
            </Text>
            <Text style={styles.email}>
              {this.state.user.email}
            </Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={this.state.starCount}
              starColor={'#D32F2F'}
              emptyStarColor={'#f2828a'}
              starSize={30}
            />
          </View>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 10,
  },
  nys: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  backPhoto: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '800'
  },

  email: {
    fontSize: 14,
    marginBottom: 10
  },

  image: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
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

