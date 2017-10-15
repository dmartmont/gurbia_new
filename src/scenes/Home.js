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
import ActionButton from 'react-native-action-button';

import Navbar from './../components/Navbar';
import Post from './../components/Post';
import Database from './../database/database';

export default class HomeScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };

        this.navigate = this.navigate.bind(this);
    }

    componentWillMount() {
        this.fetchPosts().then(data => {
            this.setState({
                data: data
            });
        });
    }

    navigate(id) {
        this.props.navigator.push({ id });
    }

    async fetchPosts() {
        var data = await Database.getPosts();
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
        closeDrawer = () => {
            this._drawer.close()
        };
        openDrawer = () => {
            this._drawer.open()
        };

        const posts = this.formatData();
        const postsComponents = posts.map(data => {
            return (
                <Post
                    info={{ ...data.data, key: data.key }}
                    key={data.key}
                    navigator={this.props.navigator}
                />
            )
        });

        return (

            <View style={styles.container}>
                <Navbar
                    onpressnav={() => openDrawer()}
                    type='Home'
                />
                <ScrollView style={styles.postsList}>
                    {postsComponents}
                </ScrollView>
                <ActionButton
                    buttonColor='rgba(255, 87, 34, 1)'
                    onPress={() => this.navigate('CreatePost')}
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
        padding: 5,
        backgroundColor: '#DDDDDD'
    }
})

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1) {
        return false;
    }
    _navigator.pop();
    return true;
});
