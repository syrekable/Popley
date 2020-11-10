import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect, useSelector } from 'react-redux';
import Plant from '../plant/Plant';
import { styles } from './styles'

export class MainScreen extends Component {

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.plantList}>
          <ScrollView>
            {this.props.plants}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => this.props.navigation.navigate("AddPlantScreen")}>
          <Text style={styles.appButtonText}>Dodaj roślinkę</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    plants: state.plants.map(plant => (
      <Plant
        name={plant.name}
        timeToWater={plant.timeToWater}
        image={plant.image}
      />
    ))
  }
}

export default connect(mapStateToProps)(MainScreen);