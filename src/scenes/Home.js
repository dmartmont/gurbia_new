import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Navbar from './../components/Navbar';
import Post from './../components/Post';
import Database from './../database/database';

export default class HomeScene extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ focused }) => {
      const col = focused ? '#c62828' : '#BDBDBD';
      return (<View>
        <Icon name="home" size={25} color={col} />
      </View>);
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    this.fetchPosts().then(data => {
      console.log(data);
      this.setState({
        data: data
      });
    });

    this.fetchRecommendations().then(data => {
      this.setState({
        ...this.state,
        recommendations: data
      });
    });
  }

  async fetchPosts() {
    var data = await Database.getPosts();
    return data;
  }

  async fetchRecommendations() {
    var data = await Database.getRecommendedPosts();
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

  formatRecommendations = () => {
    let postData = [];
    for (var i in this.state.recommendations) {
      postData.push({
        key: i,
        data: this.state.recommendations[i]
      })
    }
    return postData;
  }

  render() {
    const posts = this.formatData();
    console.log('Lista:', posts);
    const recommendations = this.formatRecommendations();

    const postsComponents = posts.map(data => {
      return (
        <Post
          info={{ ...data.data, key: data.key }}
          key={data.key}
          navigation={this.props.navigation}
        />
      )
    });

    const recommendationsComponents = recommendations.map(data => {
      return (
        <View
          key={data.key}
          style={{ marginLeft: 5, marginRight: 5 }}>
          <Post
            info={{ ...data.data, key: data.key }}
            navigation={this.props.navigation}
          />
        </View>
      )
    });

    const renderRecommended = (recommendations.length !== 0);

    return (
      <View style={styles.container}>
        <Navbar
          onpressLeft={() => this.props.navigation.navigate('DrawerOpen')}
          iconLeft='menu'
          onpressRight={() => this.props.navigation.navigate('Search')}
          iconRight='search'
        />
        <ScrollView
          style={styles.postsList}>
          {renderRecommended && <View style={styles.recommendationsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Recommended posts for you.
            </Text>
            </View>
            <ScrollView
              horizontal
            >
              {recommendationsComponents}
            </ScrollView>
          </View>}
          {postsComponents}
        </ScrollView>
        <ActionButton
          buttonColor='rgba(255, 87, 34, 1)'
          onPress={() => this.props.navigation.navigate('NewPost')}
        />
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
    backgroundColor: '#DDDDDD'
  },
  recommendationsContainer: {
    backgroundColor: '#FFF',
    elevation: 3
  },
  titleContainer: {
    marginLeft: 10,
    marginTop: 10
  },
  titleText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18
  }
})
