import React from 'react';
import { 
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import Flower from './src/flower';

Array.prototype.pickRandom = function(){
  return this[Math.floor(Math.random()*this.length)];
}

class MockFlowers{
  static randomTime(){  
    let interval = this.intervals.pickRandom();
    return interval * Math.floor(100*Math.random())
  }
  static getFlower(){
    return {
      name: this.names.pickRandom(),
      time: this.randomTime()
    }
  }
}

MockFlowers.intervals = [0, 15, 30, 45, 60, 120, 300, 600, 3600];
MockFlowers.names = ["mandragora", "kuktas", "cukinia", "magnolia", "konopia", "orichidea", "burak"];

const App = () => { 
  let flowers = [];
  for(let i = 0; i < 10; i++){
    let data = MockFlowers.getFlower();
    flowers.push(<Flower name={data.name} timeToWater={data.time}/>);
  }
  return (
    <View style={styles.container} >
      <View style={styles.flowerList}>
        <ScrollView>
          { flowers }
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (2+2)}>
        <Text style={styles.buttonText}>Dodaj roślinkę</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#979f8e'
  },
  flowerList: { 
    flex: 8, 
    backgroundColor: '#eeeae1', 
    paddingHorizontal: 20
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

export default App;