import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  SearchBar,
  Icon
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import Database from '../database/database';

export default class SearchScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: ["almuerzo express",
        "arepas y empanadas",
        "carnes y parrillas",
        "arabe",
        "asiatica",
        "china",
        "colombiana",
        "mar",
        "italiana",
        "mexicana",
        "desayunos",
        "hamburguesas",
        "perritos calientes",
        "pizza",
        "sanduches",
        "sushi",
        "sopas",
        "vegetariano"],
      filteredTags: []
    }
  }

  componentWillMount() {
    let filteredTags = this.state.allTags;
    this.setState({ filteredTags });
  }

  searchTag(tag) {
    let re = new RegExp(tag);
    let filteredTags = this.state.allTags.filter((tag) => tag.match(re))
    this.setState({ filteredTags })
  }

  navigateSearch(tag) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'SearchResult',
      params: {
        tag
      }
    });

    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    const filtComponents = this.state.filteredTags.map((data, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={styles.chipContainer}
          onPress={() => this.navigateSearch(data)}
        >
          <Text style={styles.chipText}>
            {data}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View>
        <View style={styles.navContainer}>
          <View style={[styles.buttonContainer, { marginLeft: 3 }]}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='close' size={30} color='#FFF' />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer} >
            <Icon name='search' size={20} color='#FFF' />
            <TextInput
              style={[{ flex: 1 }, styles.searchInput]}
              placeholder='Search tags...'
              placeholderTextColor='#FFCCBC'
              underlineColorAndroid='transparent'
              autoFocus
              onChangeText={(val) => this.searchTag(val)}
            />
          </View>
        </View>
        <View style={styles.filteredContainer} >
          {filtComponents}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F44336',
    height: 50,
    elevation: 5
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 35,
    width: 35,
    backgroundColor: '#BF360C',
    paddingRight: 15,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 25
  },
  searchInput: {
    borderBottomWidth: 0
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
  },
  filteredContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10
  },
  chipContainer: {
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#FFCC80',
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 10,
    marginBottom: 10
  },
  chipText: {
    color: '#424242',
    fontSize: 17,
    textAlign: 'center'
  }
})
