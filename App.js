import * as React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Login from './screens/Login'
import LoadingScreen from './screens/LoadingScreen'
import Dashboard from './screens/Dashboard'

import * as firebase from 'firebase'
import { firebaseConfig } from './config'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const AppSwitchNavigator = createSwitchNavigator({
  // LoadingScreen: LoadingScreen,
  //Login: Login,
  Dashboard: Dashboard
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return <AppNavigator />
}
