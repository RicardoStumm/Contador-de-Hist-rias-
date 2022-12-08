import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import Feed from '../screens/Feed'
import CreateStory from '../screens/CreateStory'
import Profile from '../screens/Profile'
import firebase from 'firebase'
const Tab = createMaterialBottomTabNavigator()

export default class BottomTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      isUpdated: false,
    };
  }

   componentDidMount() {
    this.fetchUser();
  }

  changeUpdated = () => {
    this.setState({isUpdated: true})
  }

  removeUpdated = () => {
    this.setState({isUpdated: false})
  }

  renderFeed = (props) => {
    return <Feed setUpdateToFalse={this.removeUpdated}{...props}/>
  }

  renderStory = (props) => {
    return <CreateStory setUpdateToTrue={this.removeUpdated}{...props}/>
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("users/" + "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")
      .on("value", snapshot => {
        let data = snapshot.val()
        theme = data.current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Criar História") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            else if (route.name === "Perfil") {
                iconName = focused ? "person-circle-outline" : "person-outline";
              }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        <Tab.Screen name="Feed" component={this.renderFeed} options={{unmountOnBlur: true}}/>
        <Tab.Screen name="Criar História" component={this.renderStory} options={{unmountOnBlur: true}}/>
        <Tab.Screen name = "Perfil" component = {Profile}/>
        
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});