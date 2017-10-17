import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  BackAndroid,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { List } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Navbar from './../components/Navbar';
import Database from './../database/database';
import PostSubscriptions from './../components/PostSubscriptions';

export default class MyPostsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'My Posts',
    drawerIcon: ({ focused }) => {
      const col = focused ? '#c62828' : '#BDBDBD';
      return (<View>
        <Icon name="food-variant" size={25} color={col} />
      </View >);
    },
  };

  constructor(props) {
    super(props)

    this.state = {
      data: {}
    }

    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    this.fetchPosts().then(data => {
      this.setState({
        data: data
      })
    });
  }

  navigate(id) {
    this.props.navigator.push({ id });
  }

  async fetchPosts() {
    var data = await Database.getUserPosts();
    return data;
  }

  formatData = () => {
    let postData = [];
    for (var i in this.state.data) {
      postData.push({
        key: i,
        data: this.state.data[i]
      })
    }
    return postData;
  }

  render() {
    const posts = this.formatData();
    console.log('Mis posts', posts);
    const postsComponents = posts.map(data => {
      return (
        <PostSubscriptions
          info={{ ...data.data }}
          key={data.key}
          navigation={this.props.navigation}
        />
      )
    });
    return (
      <View style={styles.container}>
        <Navbar
          onpressLeft={() => this.props.navigation.navigate('DrawerOpen')}
          iconLeft='menu'
        />
        <ScrollView style={styles.postsList}>
          <List>
            {postsComponents}
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
