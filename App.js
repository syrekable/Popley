import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-community/picker';
import Plant from './src/plant';
import MockPlants from './src/utils'


const Stack = createStackNavigator();

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.plants = this.makeMockupPlants(10, []);
    this.handleClick = this.handleClick.bind(this);
  }

  makeMockupPlants(n, array) {
    for (let i = 0; i < n; i++) {
      let data = MockPlants.getPlantData();
      array.push(<Plant key={i} handler={this.handleClick} name={data.name} timeToWater={data.time} />);
    }
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

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.plantList}>
          <ScrollView>
            {this.plants}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => this.props.navigation.navigate('NewPlant')}>
          <Text style={styles.appButtonText}>Dodaj roślinkę</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class AddPlantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "nowa roślinka",
      quantity: 1,
      interval: "days",
    }
  }

  //something is not yes with onFocus, it seems
  clearText() {
    this.setState({ text: "XDDD" })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.plantList}>
          <Text style={styles.label}>Nazwa:</Text>
          <TextInput
            style={{ height: 50, borderColor: "grey", borderWidth: 2 }}
            onChangeText={newText => this.setState({ text: newText })}
            onFocus={() => this.clearText()}
            value={this.state.value} />
          <Text style={styles.label}>Częstotliwość podlewania:</Text>
          <View style={{height: 50, flexDirection: "row"}}>
            <TextInput
              style={{ flex: 1, borderColor: "grey", borderWidth: 2 }}
            />
            <Picker
              selectedValue={this.state.interval}
              style={{ flex: 1}}
              onValueChange={itemValue =>
                this.setState({ interval: itemValue })
              }>
              <Picker.Item label="dnie" value="days" />
              <Picker.Item label="tygodnie" value="weeks" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.appButtonText}>Dodaj</Text>
        </TouchableOpacity>
      </View>
    )
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