import React, { Component } from "react";
import { StyleSheet, Text, View, Switch, SafeAreaView, Image, Platform, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import firebase from "firebase";
let user = "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"

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};
export default class Profile extends Component {
     constructor(props) {
          super(props);
          this.state = {
            fontsLoaded: false,
            isEnabled: false,
            light_theme: true,
           
          };
        }
      
        async _loadFontsAsync() {
          await Font.loadAsync(customFonts);
          this.setState({ fontsLoaded: true });
        }
      
        componentDidMount() {
          this._loadFontsAsync();
          this.fetchUser();

        }

        async fetchUser(){
          let theme, name, image, snapshot;
      
          await firebase
                .database()
                .ref("/users/" + user)
                .on("value", data => {
                 snapshot = data.val()
                  theme = snapshot.current_theme
                   name = snapshot.first_name
                   image = snapshot.profile_picture;
                })
                this.setState({
                  light_theme: theme === "light" ? true : false,
                   isEnabled: theme === "light" ? false : true,
                   name: name,
                   profile_image: image
                })
        }

        toggleSwitch(){
          const previous_state = this.state.isEnabled;
          const theme = !this.state.isEnabled ? "dark" : 
          "light"
          var updates = {}
          updates[
               "/users/" + user + "/current_theme"
          ] = theme;
          firebase
          .database().ref()
          .update(updates)
          this.setState({
               isEnabled: !previous_state, light_theme: previous_state
          })
        }

     render(){
          if (!this.state.fontsLoaded) {
               return <AppLoading />
             } else {
          return(
               <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>
                    <View style={styles.appHeader}>
                         <Image source={require("../assets/logo.png")}  style={styles.imageLogo}/>              
                         <Text style={this.state.light_theme ? styles.appTitleTextLight :styles.appTitleText}>App Narração de Histórias</Text>
                         </View>

                         <View style={styles.screenContainer}>
                         <Text style={this.state.light_theme ? styles.nameTextLight : styles.nameText}>{this.state.name}</Text>
                          <Image source={{uri: this.state.profile_image}} style={styles.profilePic}/>
                         <Text style={this.state.light_theme ? styles.themeTextLight:styles.themeText}>Tema Escuro</Text>
                         <Switch style={{transform: [{scaleX: 1.3},{scaleY: 1.3}]}}
                              trackColor={{false:"#767577",true: this.state.light_theme ? "#eee" : "white"}}
                              thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={()=>this.toggleSwitch()}
                              value={this.state.isEnabled}
                         />
                    </View>
               </View>
          )
        }
     }
}


const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: "#15193c"
     },
     containerLight: {
       flex: 1,
       backgroundColor: "white",
     },
     droidSafeArea: {
       marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
     },
     appHeader: {
       flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
       marginTop:10
     },
   
     imageLogo: {
       width:  RFValue(30),
       height: RFValue(30),
     },
     appTitleText: {
       color: "white",
       fontSize: RFValue(20),
       fontFamily: "Bubblegum-Sans"
     },
     appTitleTextLight: {
       color: "#15193c",
       fontSize: RFValue(20),
       fontFamily: "Bubblegum-Sans"
     },
     screenContainer: {
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center",
       marginTop:50
     },
     nameText: {
       color: "white",
       fontSize: RFValue(30),
       fontFamily: "Bubblegum-Sans",
       marginTop: RFValue(10)
     },
     nameTextLight: {
       color: "#15193c",
       fontSize: RFValue(30),
       fontFamily: "Bubblegum-Sans",
       marginTop: RFValue(10)
     },
     themeText: {
       color: "white",
       fontSize: RFValue(30),
       fontFamily: "Bubblegum-Sans",
       marginBottom: 20
     },
     themeTextLight: {
       color: "#15193c",
       fontSize: RFValue(30),
       fontFamily: "Bubblegum-Sans",
       marginBottom: 20
     },
     profilePic:{
       width:  RFValue(50),
       height: RFValue(50),
       borderRadius: 100,
       margin: 30,
     }
   });