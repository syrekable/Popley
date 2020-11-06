import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MainScreen from './src/features/mainScreen/MainScreen';
import AddPlantScreen from './src/features/addPlant/addPlant';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./src/app/store";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer store={store} initialRouteName="HomeScreen">
        <Stack.Navigator>
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: "Twoje roślinki" }} />
          <Stack.Screen name="AddPlantScreen" component={AddPlantScreen} options={{ title: "Dodaj roślinkę" }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#eeeae1'
  }
});