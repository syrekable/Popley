import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Plant from '../plant/Plant';
import Utils from '../../app/utils';
import { styles } from './styles'

const STORAGE_KEY = '@save_plants';

export default class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      plants: [],
    }
  }

  makeMockupPlantsData(n, array) {
    //create an array of n mock flowers, encoded as {name, timeToWater}
    for (let i = 0; i < n; i++) {
      let data = Utils.MockPlants.getPlantData();
      array.push({ name: data.name, timeToWater: data.time });
    }
    return array;
  }

  makePlant(name, wateringInterval, image) {
    //concat plants stored in state with the new one, then call storeData to store the whole family on device
    this.setState({
      plants: [...this.state.plants, { name: name, timeToWater: Utils.timeToSeconds(wateringInterval), image: image }],
    }, this.storeData)
  }

  storeData = async () => {
    try {
      const jsonValue = JSON.stringify(this.state.plants)
      console.log(`STORE jsonValue: ${jsonValue}`)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
      console.error(`An exception ocurred while storing data:\n${e}`);
    }
  }

  getData = async () => {
    //set the state.plants to stored plants or to an empty array 
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      console.log(`READ jsonValue: ${jsonValue}`);
      const newState = jsonValue != null ? JSON.parse(jsonValue) : [];
      this.setState({ plants: newState });
    } catch (e) {
      console.error(`An exception ocurred while loading data:\n${e}`);
    }
  }

  componentDidMount() {
    this.getData();
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
              />))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => console.log('Button pressed')}>
          <Text style={styles.appButtonText}>Dodaj roślinkę</Text>
        </TouchableOpacity>
      </View>
    );
  }
}