import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Alert, 
  Button
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import DropDownPicker from 'react-native-dropdown-picker'

import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import firebase from 'firebase'

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf')
}

export default class CreateStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      previewImage: 'image_1',
      dropdownHeight: 40,
      story: '',
      title: '',
      description: '',
      moral: ''
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }

  addStory(){
    if(this.state.title && this.state.description && this.state.story && this.state.moral) {
      let storeData = {
        previewImage: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        story: this.state.story,
        moral: this.state.moral,
        date: new Date(),
        author: "Ricardo",
        author_uid: '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',
        likes: 0
      }
      firebase
      .database()
      .ref("/posts/" + (Math.random().toString(36).slice(2)))
      .set(storeData)
      .then(function (snapshot) {
        console.log('enviado')
      })
      this.props.navigation.navigate('Feed')
    }
    else{
      Alert.alert('Preencha todos os campos e tente novamente')
    }
  }


  componentDidMount() {
    this._loadFontsAsync()
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      let preview_images = {
        image_1: require('../assets/story_image_1.png'),
        image_2: require('../assets/story_image_2.png'),
        image_3: require('../assets/story_image_3.png'),
        image_4: require('../assets/story_image_4.png'),
        image_5: require('../assets/story_image_5.png')
      }
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Story</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}
            ></Image>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
              <DropDownPicker
                items={[
                  { label: 'Image 1', value: 'image_1' },
                  { label: 'Image 2', value: 'image_2' },
                  { label: 'Image 3', value: 'image_3' },
                  { label: 'Image 4', value: 'image_4' },
                  { label: 'Image 5', value: 'image_5' }
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropdownHeight == 170 ? true : false}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 })
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 })
                }}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: 'white'
                }}
                textStyle={{
                  color: this.state.dropdownHeight == 170 ? 'black' : 'white',
                  fontFamily: 'Bubblegum-Sans'
                }}
                onChangeItem={item =>
                  this.setState({
                    previewImage: item.value
                  })
                }
              />
            </View>
            <TextInput
              style={styles.inputFont}
              onChangeText={title => this.setState({ title: title })}
              placeholder={'Título'}
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={description =>
                this.setState({ description: description })
              }
              placeholder={'Descrição'}
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={story => this.setState({ story: story })}
              placeholder={'História'}
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={moral => this.setState({ moral: moral })}
              placeholder={'Moral'}
              placeholderTextColor="white"
            />
            <Button tittle="Enviar" onPress={() => {this.addStory()}}/>
              
            
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c'
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row'
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center'
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans'
  },
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain'
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    color : 'white',
    fontFamily: 'Bubblegum-Sans',
    paddingLeft: RFValue(10)
  }
})
