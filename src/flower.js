import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, ImageBackground } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class Flower extends Component {
    render(){
        return (
            /*
            TODO:
            A new, better flower.
            Go with image, put a semi-transparent View representing the highlightning,
            put a Button/TouchableOpacity at the bottom
            and some Text in a semi-transparent View at the top.
            As seen in the TILES.pdn yet.
            */
            <View style={[styles.container]}>
                <ImageBackground
                    source={require("../assets/mandragora.jpg")}
                    style={styles.flowerImg}
                >
                    <Image
                    source={require("../assets/mandragora.jpg")}
                    style={[styles.flowerImg, styles.transparent]}
                    tintColor={this.props.timeToWater > 0 ? colors.tintNormal : colors.tintAlert}
                    />
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
            `Podlej mnie za ${this.props.timeToWater / 60} minut` :
            "Podlej mnie!"}/>   
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
    flowerImg: {
        width: 750,
        height: 250,
    },
    transparent: {
        opacity: 0.4,
    }
})