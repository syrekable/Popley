import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

export default class Flower extends Component {
    render(){
        return (
            <View 
                style={
                    this.props.timeToWater > 0 ? 
                    [styles.normalBackground, styles.container] :
                    [styles.alertBackground, styles.container] }>
                <FlowerInfo
                    style={styles.infoBox}
                    name={this.props.name}
                    timeToWater={this.props.timeToWater}/>
            </View>
        );
    }
}

class FlowerInfo extends Component {
    render(){
        //display the time to water or display the button confirming watering
        const wateredComponent = 
            <>
                <Text style={styles.title}>{this.props.name}</Text>
                <Text>Podlej za: {this.props.timeToWater} sekund</Text>  
            </>
        const aridComponent = 
            <>
                <Text style={[styles.title, styles.white]}>{this.props.name}</Text>
                <Button title="podlej mnie!"/>  
            </>
        //{this.props.timeToWater > 0 ? wateredComponent : aridComponent}
        return(
        <View>
            { (this.props.timeToWater > 0) ? wateredComponent : aridComponent}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 15,
        marginHorizontal: 5,
        marginVertical: 5,
        
    },
    title: {
        fontSize: 25,
        textTransform: "uppercase",
        fontWeight: "bold",
        marginBottom: 5
    },
    white: {
        color: '#eeeae1',
    },
    normalBackground: {
        backgroundColor: '#6cb424',
    },
    alertBackground: {
        backgroundColor: '#b26159',
    },
    photo:{
        flex: 2,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'skyblue',
    },
    infoBox:{
        flex: 1,
    }
})