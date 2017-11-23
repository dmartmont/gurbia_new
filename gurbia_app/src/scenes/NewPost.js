import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight
} from 'react-native';
import {
  FormInput,
  Button,
  Icon
} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import ActionButton from 'react-native-action-button';

import Navbar from './../components/Navbar';
import Database from './../database/database';
import { alignItemsMap } from 'react-native-action-button/shared';

export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagePath: '',
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
      suggestedTags: [],
      selectedTags: []
    }
  }

  componentWillMount() {
    this.setState({
      imagePath: 'https://www.daysoutwithkids.com/images/addphoto.png',
    })
  }

  getSuggestedTags() {
    this.fetchTags().then(data => {
      console.log('All:', data);
      let sug = new Set(data);
      let sel = new Set(this.state.selectedTags);
      let suggestedTags = Array.from(sug).filter((tag) => !sel.has(tag));
      this.setState({ suggestedTags });
    });
  }

  addSelectedTag(tag) {
    let selected = new Set(this.state.selectedTags);
    let suggested = new Set(this.state.suggestedTags);
    selected.add(tag);
    suggested.delete(tag);
    let selectedTags = Array.from(selected);
    let suggestedTags = Array.from(suggested);
    this.setState({ selectedTags, suggestedTags });
  }

  removeSelectedTag(tag) {
    let selected = new Set(this.state.selectedTags);
    let suggested = new Set(this.state.suggestedTags);
    selected.delete(tag);
    suggested.add(tag);
    let selectedTags = Array.from(selected);
    let suggestedTags = Array.from(suggested);
    this.setState({ selectedTags, suggestedTags });
  }

  handleFormSubmit() {
    try {
      if (this.state.imagePath != 'https://www.daysoutwithkids.com/images/addphoto.png') {
        Database.writePost(
          this.state.imagePath,
          this.state.title,
          this.state.description,
          this.state.location,
          this.state.portions,
          this.state.price,
          this.state.selectedTags
        );
        this.props.navigation.navigate('Home');
      } else {
        alert('Por favor adjunte una imagen')
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async fetchTags() {
    var data = await Database.getRecommendedTags(this.state.description);
    return data;
  }

  openImage() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      this.setState({ imagePath: image.path })
    }).catch(function (e) {
      console.log('El usuario no eligio foto', e)
    });
  }

  validateField(field) {
    if (field.length > 0) { return true }
    else { return false }
  }

  render() {
    const sugTags = this.state.suggestedTags.map((data, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={styles.chipContainer}
          onPress={() => this.addSelectedTag(data)}
        >
          <Text style={styles.chipText}>
            {data}
          </Text>
          <Icon
            name='add'
            color='#EEEEEE'
            onPress={() => this.addSelectedTag(data)}
            size={18}
            containerStyle={{ marginLeft: 5, backgroundColor: '#8BC34A', borderRadius: 25 }}
          />
        </TouchableOpacity>
      );
    });

    const selTags = this.state.selectedTags.map((data, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={styles.chipContainer}
          onPress={() => this.removeSelectedTag(data)}
        >
          <Text style={styles.chipText}>
            {data}
          </Text>
          <Icon
            name='close'
            color='#EEEEEE'
            onPress={() => this.removeSelectedTag(data)}
            size={18}
            containerStyle={{ marginLeft: 5, backgroundColor: '#ef5350', borderRadius: 25 }}
          />
        </TouchableOpacity>
      );
    });

    const sugTagsComponent = (() => {
      if (sugTags.length === 0) {
        return (
          <Text style={{ fontSize: 15, padding: 10 }} >
            No suggested tags
          </Text>
        );
      } else {
        return (
          <View style={styles.suggestedContainer}>
            {sugTags}
          </View>);
      }
    })();

    return (
      <View style={styles.createContainer}>
        <Navbar
          onpressLeft={() => { this.props.navigation.goBack() }}
          iconLeft='close'
          onpressRight={() => this.handleFormSubmit()}
          iconRight='send'
        />
        <View
          style={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => this.openImage()}>
              <Image
                style={styles.image}
                source={{ uri: this.state.imagePath }}
              />
            </ TouchableOpacity>
            <View style={styles.titleContainer}>
              <FormInput
                onChangeText={(title) => this.setState({ title })}
                placeholder='Title'
                autoCorrect={true}
                autoCapitalize='sentences'
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <FormInput
              onChangeText={(description) => this.setState({ description })}
              onEndEditing={() => this.getSuggestedTags()}
              placeholder='Description'
              autoCorrect={true}
              autoCapitalize='sentences'
            />
            <FormInput
              onChangeText={(location) => this.setState({ location })}
              placeholder='Location'
              autoCorrect={true}
              autoCapitalize='sentences'
            />
            <View style={styles.horizontalAlign}>
              <View style={styles.inputContainer}>
                <FormInput
                  onChangeText={(portions) => this.setState({ portions })}
                  placeholder='Portions'
                  autoCorrect={true}
                  autoCapitalize='sentences'
                  inputStyle={{ marginLeft: 0 }}
                />
              </View>
              <View style={styles.inputContainer}>
                <FormInput
                  onChangeText={(price) => this.setState({ price })}
                  placeholder='Price'
                  autoCorrect={true}
                  autoCapitalize='sentences'
                  inputStyle={{ marginLeft: 0 }}
                />
              </View>
            </View>
          </View>
          <View style={styles.tagsContainer} >
            <View style={styles.selectedContainer}>
              {selTags}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }} >
                <Icon
                  name='tags'
                  type='font-awesome'
                  size={23} />
                <Text style={{ fontSize: 17, color: '#212121' }} >   Suggested tags</Text>
              </View>
            </View>
            {sugTagsComponent}
          </View>
        </View>
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
    justifyContent: 'flex-start',
    padding: 5,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  imageContainer: {
    flexDirection: 'row',
    padding: 5
  },
  image: {
    height: 80,
    width: 80,
    padding: 10,
    borderRadius: 5
  },
  titleContainer: {
    flexDirection: 'column',
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  addButton: {
    backgroundColor: '#FF5722',
    borderRadius: 25,
  },
  horizontalAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inputContainer: {
    width: 150,
  },
  tagsContainer: {
    margin: 10,
    padding: 5,
    bottom: 5
  },
  suggestedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
  },
  chipContainer: {
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    backgroundColor: '#EEEEEE',
    paddingLeft: 12,
    paddingRight: 8,
    marginRight: 5,
    marginBottom: 5
  },
  chipText: {
    color: '#424242',
    fontSize: 17,
    textAlign: 'center'
  }
})
