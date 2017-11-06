import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-checkbox';

import Database from '../database/database';
import Navbar from './../components/Navbar';


export default class TagsScene extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    tagList = this.props.navigation.state.params.recTags;
    defTags = ["almuerzo express",
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
                "vegetariano"]
    othTags = this.sym(defTags, tagList)
    this.setState({othTags : othTags})

    this.setState({tagList: tagList});
    finalList = [];
    this.setState({finalList : finalList});
  }

  handleFormSubmit() {
    try {
      Database.writePost(
        this.props.navigation.state.params.imagePath,
        this.props.navigation.state.params.title,
        this.props.navigation.state.params.description,
        this.props.navigation.state.params.location,
        this.props.navigation.state.params.portions,
        this.props.navigation.state.params.price,
        this.state.finalList
      );
      this.props.navigation.navigate('Home')
    } catch (error) {
      console.log('Error ', error);
    }
  }

  sym(...arrays) {
  return [].concat(arrays .
    map((array, i) => array .
      filter(elt => !arrays .
        some((a, j) => i !== j && a.indexOf(elt) >= 0))))[0];
  }

  formatTags = (tagList) => {
    let tagsData = [];
    for (var i in tagList) {
      tagsData.push({
        key: i,
        data: tagList[i]
      })
    }
    return tagsData;
  }


  render() {
    const tagsRec = this.formatTags(this.state.tagList);
    const tagsNoRec = this.formatTags(this.state.othTags);
    const tagRenderRec = tagsRec.map(tag => {
      return (
        <CheckBox
         label = {tag.data.charAt(0).toUpperCase() + tag.data.slice(1)}
         key = {tag.key}
         checkboxStyle={styles.tagCheckBox}
         onChange = {(checked) => {
           tList = this.state.finalList;
           if (checked){
             tList.push(tag.data);
           } else {
             index = tList.indexOf(tag.data);
             tList.splice(index, 1);
           }
           this.setState({finalList: tList})
           console.log(this.state.finalList)
         }}

        />
      )
    })
    const tagRenderNoRec = tagsNoRec.map(tag => {
      return (
        <CheckBox
         label = {tag.data.charAt(0).toUpperCase() + tag.data.slice(1)}
         key = {tag.key}
         checkboxStyle={styles.tagCheckBox}
         onChange = {(checked) => {
           tList = this.state.finalList;
           if (checked){
             tList.push(tag.data);
           } else {
             index = tList.indexOf(tag.data);
             tList.splice(index, 1);
           }
           this.setState({finalList: tList})
           console.log(this.state.finalList)
         }}

        />
      )
    })
    return (
      <View style={styles.createContainer}>
        <Navbar
          onpressLeft={() => { this.props.navigation.goBack() }}
          iconLeft='close'
        />
        <ScrollView
          behavior='position'
          style={styles.container}>
          <View
            style={styles.tagContainer}>
            <Text
            style={styles.titles}>
            Help us find your post!
            </Text>
            <Text
            style={styles.titles}>
            Sugested tags
            </Text>
          </View>
          {tagRenderRec}
          <View
            style={styles.tagContainer}>
            <Text
            style={styles.titles}>
            Other tags
            </Text>
          </View>
          {tagRenderNoRec}
          <Button
            raised
            icon={{ name: 'publish' }}
            onPress={() => this.handleFormSubmit()}
            title='POST'
            backgroundColor='#FF5722' />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  createContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  titles: {
    fontSize: 20,
    fontWeight:'bold',
    marginLeft: 20,
    marginTop:20,
  },
  tagCheckBox: {
    marginLeft:20,
  }
})
