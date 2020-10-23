import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddPlantScreen from './src/addPlant'
import Plant from './src/plant';
import Utils from './src/utils'

const Stack = createStackNavigator();

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plants: [],
    }
  }

  makeMockupPlantsData(n, array) {
    for (let i = 0; i < n; i++) {
      let data = Utils.MockPlants.getPlantData();
      array.push({ name: data.name, timeToWater: data.time});
    }
    console.log(`typeof([]) is ${typeof(new Array())}`)
    console.log(`making mock of type ${typeof(array)}`)
    return array;
  }

  handleClick(name) {
    Alert.alert(
      name,
      "PODLEJ MNIE!!1!",
      [
        {
          text: "Podlano!"
        }
      ]);
  }

  makePlant(name, wateringInterval, image) {
    console.log(`image.uri: ${image}`);
    this.setState({
      plants: [...this.state.plants, {name: name, timeToWater: Utils.timeToSeconds(wateringInterval), image: image}],
    })
    console.log(`this.state.plants: ${JSON.stringify(this.state.plants)}\ntypeof(this.state.plants): ${typeof(this.state.plants)}`)
  }


  render() {
    return (
      <View style={styles.container} >
        <View style={styles.plantList}>
          <ScrollView>
            {this.state.plants && this.state.plants.map(data => (
              <Plant key={`${data.name}_${data.timeToWater}`}
                name={data.name}
                timeToWater={data.timeToWater}
                image={data.image}
                handler={() => this.handleClick(data.name)}
              />))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => this.props.navigation.navigate('NewPlant', { handler: this.makePlant.bind(this) })}>
          <Text style={styles.appButtonText}>Dodaj roślinkę</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer initialRouteName="HomeScreen">
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={MainScreen} options={{ title: "Twoje roślinki" }} />
          <Stack.Screen name="NewPlant" component={AddPlantScreen} options={{ title: "Dodaj roślinkę" }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#eeeae1'
  },
  plantList: {
    flex: 8,
    paddingHorizontal: 20,
    marginTop: 10
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginHorizontal: 5
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});