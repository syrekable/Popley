import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';

export default class plant extends Component {
    //a component consisting of an captioned image of a plant with a tint
    //and a button, showing either the time to next watering
    //or alerting the user to water the plant

    render() {
        const color = this.props.timeToWater > 0 ? colors.tintNormal : colors.tintAlert;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: this.props.image }}
                    style={styles.plantImg}
                >
                    <Tint color={color} name={this.props.name} />
                </ImageBackground>
                <View>
                    <TouchableOpacity
                        onPress={() => console.log(`${this.props.name} clicked`)}
                        disabled={this.props.timeToWater > 0}//disable if there's no need to water
                        style={this.props.timeToWater > 0 ? styles.appButtonContainer : [styles.appButtonContainer, styles.appButtonRed]}
                    >
                        <Text style={styles.appButtonText}>{this.props.timeToWater > 0 ? `Podlej mnie za ${Math.round(this.props.timeToWater / 60 / 24 / 24)} dni` : "Podlej mnie!"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class Tint extends Component {
    //a semi-transparent element with a specific colour, displaying plant's name
    render() {
        return (
            <ImageBackground
                source={require("../../../assets/icon.png")}//any image will do, but icon is small -> light
                style={[styles.plantImg, styles.transparent]}
                tintColor={this.props.color}
            >
                <Text style={[styles.plantName, styles.textShadow]}>{this.props.name}</Text>
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
    plantName: {
        flex: 1,  //TODO: find a way to somehow constraint plant's dimensions
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    plantImg: {
        width: 320,
        height: 250,
    },
    transparent: {
        opacity: 0.4,
    },
    textShadow: {
        textShadowColor: 'white',
        textShadowOffset: { width: 1, height: 1 },
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
    },
    appButtonRed: {
        backgroundColor: colors.tintAlert,
    }
})