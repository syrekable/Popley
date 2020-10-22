import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, ImageBackground } from 'react-native';

export default class Flower extends Component {
    render(){
        let color = this.props.timeToWater > 0 ? colors.tintNormal : colors.tintAlert;
        return (
            /*
            TODO:
            A new, better flower.
            Go with image, put a semi-transparent View representing the highlightning,
            put a Button/TouchableOpacity at the bottom
            and some Text in a semi-transparent View at the top.
            As seen in the TILES.pdn yet.
            */
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/mandragora.jpg")}
                    style={styles.flowerImg}
                >
                    <Tint color={color} name={this.props.name}/>
                </ImageBackground>
                <View>
                    <FlowerInfo timeToWater={this.props.timeToWater}/>
                </View>
            </View>
        );
    }
}

class FlowerInfo extends Component {
    render(){
        return(
        <Button title={this.props.timeToWater > 0 ? 
            `Podlej mnie za ${Math.round(this.props.timeToWater / 60)} minut` :
            "Podlej mnie!"}/>   
        )
    }
}

class Tint extends Component {
    //a semi-transparent element with a specific colour
    render(){
        return (
            <ImageBackground
            source={require("../assets/icon.png")}//any image will do, but icon is small -> light
            style={[styles.flowerImg, styles.transparent]}
            tintColor={this.props.color}
            >
                <Text style={[styles.flowerName, styles.textShadow]}>{this.props.name}</Text>
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
    flowerName: {
        flex:1,  //TODO: find a way to somehow constraint flower's dimensions
        color: 'black',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    flowerImg: {
        width: 320,
        height: 250,
    },
    transparent: {
        opacity: 0.4,
    },
    textShadow: {
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10
    }
})