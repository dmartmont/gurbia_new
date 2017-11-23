import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import Database from '../database/database';
import Navbar from '../components/Navbar';
import Post from '../components/Post';

export default class SearchResultScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    let tag = this.props.navigation.state.params.tag;
    let res = this.fetchPosts(tag);
    res.then((data) => {
      console.log('Estos traje:', data);
      this.setState({
        data: data
      });
    })
      .catch((err) => {
        console.log('Error de fb:', err);
      });
  }

  async fetchPosts(tag) {
    let data = await Database.getPostsByTag(tag);
    console.log(data);
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
    const postsComponents = (() => {
      if (posts.length === 0) {
        return (
          <Text style={{ fontSize: 16, textAlign: 'center' }} >
            There are no posts by this tag.
          </Text>
        )
      } else {
        return posts.map(data => {
          return (
            <Post
              info={{ ...data.data, key: data.key }}
              key={data.key}
              navigation={this.props.navigation}
            />
          )
        });
      }
    })();
    return (
      <View>
        <Navbar
          onpressLeft={() => {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ]
            });
            this.props.navigation.dispatch(resetAction);
          }}
          iconLeft='close'
        />
        {postsComponents}
      </View>
    )
  }
}
