import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';

export default class AddPlantScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "nowa roślinka",
            quantity: 1,
            interval: "days",
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

    options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    //TODO: refactor him some more
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.plantList}>
                    <Text style={styles.label}>Nazwa:</Text>
                    <TextInput
                        style={[styles.textInput, { height: 50 }]}
                        onChangeText={newText => this.setState({ text: newText.trim() })}
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
                            <Picker.Item label="dnie" value="days" />
                            <Picker.Item label="tygodnie" value="weeks" />
                            <Picker.Item label="miesiące" value="months" />
                        </Picker>
                        <TouchableOpacity
                            style={styles.appButtonContainer}
                            onPress={() => ImagePicker.launchCamera(this.options, (response) => {
                                console.log('Response = ', response);

                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                } else if (response.customButton) {
                                    console.log('User tapped custom button: ', response.customButton);
                                } else {
                                    const source = { uri: response.uri };

                                    // You can also display the image using data:
                                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                                    this.setState({
                                        avatarSource: source,
                                    });
                                }
                            })}>
                            <Text style={styles.appButtonText}>Dodaj mnie!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.appButtonContainer}
                    onPress={() => this.props.navigation.goBack()}>
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