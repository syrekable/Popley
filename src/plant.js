import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';

export default class Plant extends Component {
    //a component consisting of an captioned image of a plant with a tint
    //and a button, showing either the time to next watering
    //or alerting the user to water the plant
    render(){
        const color = this.props.timeToWater > 0 ? colors.tintNormal : colors.tintAlert;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/mandragora.jpg")}
                    style={styles.PlantImg}
                >
                    <Tint color={color} name={this.props.name}/>
                </ImageBackground>
                <View>
                    <PlantInfoButton 
                        timeToWater={this.props.timeToWater} 
                        onPress={() => this.props.handler(this.props.name)}/>
                </View>
            </View>
        );
    }
}

class PlantInfoButton extends Component {
    render(){
        return(
            <TouchableOpacity
                onPress={this.props.onPress}
                disabled={this.props.timeToWater > 0}
                style={styles.appButtonContainer}
                onPress={this.props.ImageonPress}
                activeOpacity={0.2}
            >
            <Text style={styles.appButtonText}>{this.props.timeToWater > 0 ? `Podlej mnie za ${Math.round(this.props.timeToWater / 60)} minut` : "Podlej mnie!"}</Text>
            </TouchableOpacity>
        )
    }
}

class Tint extends Component {
    //a semi-transparent element with a specific colour, displaying plant's name
    render(){
        return (
            <ImageBackground
            source={require("../assets/icon.png")}//any image will do, but icon is small -> light
            style={[styles.PlantImg, styles.transparent]}
            tintColor={this.props.color}
            >
                <Text style={[styles.PlantName, styles.textShadow]}>{this.props.name}</Text>
            </ImageBackground>
        )
    }
}

const colors = {
    tintNormal: "#87945D",
    tintAlert: "#B26159"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    PlantName: {
        flex:1,  //TODO: find a way to somehow constraint Plant's dimensions
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    PlantImg: {
        width: 320,
        height: 250,
    },
    transparent: {
        opacity: 0.4,
    },
    textShadow: {
        textShadowColor: 'white',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
})