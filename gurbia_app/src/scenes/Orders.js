import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Database from './../database/database';

import Navbar from './../components/Navbar';

export default class OrdersView extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    var user = Database.getUser();
  }

  componentWillMount() {
    if (typeof this.props.navigation.state.params.data.subscribedUsers !== 'undefined') {
      this.setState({
        subs: this.props.navigation.state.params.data.subscribedUsers
      });
    } else {
      this.setState({
        subs: {}
      });
    }
  }

  formatData() {
    let subData = [];
    for (var i in this.state.subs) {
      subData.push({
        key: i,
        data: this.state.subs[i]
      })
    }
    return subData;
  }

  render() {
    const subs = this.formatData();
    console.log(subs);

    const subsComponents = subs.map(data => {
      return (
        <ListItem
          key={data.key}
          title={data.data.userName}
          subtitle={data.data.email}
          hideChevron
        />
      )
    });

    return (
      <View style={styles.container}>
        <Navbar
          onpressLeft={() => this.props.navigation.goBack()}
          iconLeft='close'
        />
        <ScrollView style={styles.postsList}>
          <List>
            {subsComponents}
          </List>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  postsList: {
    padding: 5,
    backgroundColor: '#DDDDDD'
  }
})
