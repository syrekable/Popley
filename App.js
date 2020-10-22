import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import  Plant  from './src/plant';
import  MockPlants from './src/utils'

export default class App extends Component { 
  constructor(props){
    super(props);
    this.plants = this.makeMockupPlants(10, []);
    this.handleClick = this.handleClick.bind(this);
  }

  makeMockupPlants(n, array){
    for(let i = 0; i < n; i++){
      let data = MockPlants.getPlant();
      array.push(<Plant key={i} handler={ this.handleClick } name={ data.name } timeToWater={data.time}/>);
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

  render(){
    return (
      <View style={styles.container} >
        <View style={styles.PlantList}>
          <ScrollView>
            { this.plants }
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Alert", "Jeszcze nie okodowano /:")}
          >
          <Text style={styles.buttonText}>Dodaj roślinkę</Text>
        </TouchableOpacity>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#979f8e'
  },
  PlantList: { 
    flex: 8, 
    backgroundColor: '#eeeae1', 
    paddingHorizontal: 20,
    marginTop: 30
  },
  bottom: {
    flex: 1, 
    backgroundColor: '#c4bcb4',
    justifyContent: 'center'
  },
  button:{
    backgroundColor: '#87945d',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonText: {
    textTransform: 'uppercase', 
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  }
});