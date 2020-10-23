import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Alert,
    Image
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';

export default class AddPlantScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "nowa roślinka",
            quantity: 1,
            interval: "day",
            image: null,
        }
        this.imageOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }
    }

    clearText() {
        this.setState({ text: "" })
    }

    onChanged(text) {
        //numeric input sanitizer, source:
        //https://stackoverflow.com/a/47751269/12938809
        this.setState({
            quantity: text.replace(/[^0-9]/g, ''),
        });
    }

    handleClick(name, wateringInterval, image) {
        //TODO: validate the parameters
        this.props.route.params.handler(name, wateringInterval, image);
    }

    //two basically the same methods:
    //one lets you choose image, the other make one 
    pickImage = async () => {
        //set the 'image' state variable to whatever 
        //the user chooses, if he chooses, whenever he chooses
        let result = await ImagePicker.launchImageLibraryAsync(this.imageOptions);

        //console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    makePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync(this.imageOptions);

        //console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    //TODO: refactor him some more
    /*
        RENDER:
            'NAME' LABEL
            NAME TEXT INPUT
            'WATERING FREQUENCY' LABEL
            WATERING FREQUENCY AND INTERVAL PICKER
            PLANT'S PHOTO
            'MAKE PHOTO' BUTTON
            'ADD PLAND' BUTTON
    */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.plantList}>
                    <Text style={styles.label}>Nazwa:</Text>
                    <TextInput
                        style={[styles.textInput, { height: 50 }]}
                        onChangeText={newText => this.setState({ text: newText })}
                        onFocus={() => this.clearText()}
                        value={this.state.text} />
                    <Text style={styles.label}>Częstotliwość podlewania:</Text>
                    <View style={{ height: 50, flexDirection: "row" }}>
                        <TextInput
                            style={[styles.textInput, { flex: 1 }]}
                            keyboardType="numeric"
                            onChangeText={quantity => this.onChanged(quantity)}
                            value={this.state.quantity.toString()}
                        />
                        <Picker
                            selectedValue={this.state.interval}
                            style={{ flex: 1 }}
                            onValueChange={itemValue =>
                                this.setState({ interval: itemValue })
                            }>
                            <Picker.Item label="dnie" value="day" />
                            <Picker.Item label="tygodnie" value="week" />
                            <Picker.Item label="miesiące" value="month" />
                        </Picker>
                    </View>
                    {this.state.image && <Image source={{ uri: this.state.image }} style={[styles.imageBorder, { marginTop: 20, width: 320, height: 200 }]} />}
                    <TouchableOpacity
                        style={[styles.appButtonContainer, { marginTop: 20 }]}
                        onPress={this.makePhoto}>
                        <Text style={styles.appButtonText}>Zrób mi zdjęcie!</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                //onPress -> trigger MainScreen.makePlant method with given parameters, then go back to main window
                    style={styles.appButtonContainer}
                    onPress={() => (
                        this.handleClick(
                            this.state.text.trim(),
                            {
                                quantity: this.state.quantity,
                                interval: this.state.interval
                            },
                            this.state.image
                        ),
                        this.props.navigation.goBack()
                    )}>
                    <Text style={styles.appButtonText}>Dodaj mnie!</Text>
                </TouchableOpacity>
            </View>
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
    textInput: {
        borderColor: "grey",
        borderWidth: 2,
        textAlign: "center"
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    imageBorder: {
        borderColor: "grey",
        borderWidth: 5,
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