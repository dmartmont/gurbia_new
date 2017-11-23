import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  List,
  ListItem,
  Avatar
} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { NavigationActions } from 'react-navigation';

import Database from './../database/database';

export default class PostSubscriptions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      starCount: 0
    }
  }

  componentWillMount() {
    this.getRate().then((data) => {
      this.setState({
        starCount: parseInt(data.rate)
      })
    })
  }

  async getRate() {
    var rate = await Database.getUserRate(this.props.info.uid);
    return rate;
  }

  navigate(data) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Orders',
      params: data
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        activeOpacity={0.8}
        onPress={() => this.navigate({
          data: this.props.info
        })}
      >
        <ListItem
          roundAvatar
          avatar={{ uri: this.props.info.picture }}
          title={this.props.info.title}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#FFFFFF'
  }
});
