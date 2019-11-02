import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { StackActions, NavigationActions } from "react-navigation";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
    TextInput,
} from 'react-native';
import {
    Header,
    Button,
    Overlay,
    Input,
    Divider,
    Icon,
} from 'react-native-elements';
import uuidv4 from 'uuid/v4';

export default class SignUpScreen extends Component {
    constructor() {
        super();
        this.state = {
            roomCode: '',
            codeName: '',
            description: '',
            error: false,
        };
    }


    onPressEnterCardSwipe = () => {
        const { navigation } = this.props;
        const { roomCode } = this.state;
        const { userId } = navigation.state.params;

        console.log(`Joining room code: ${roomCode}`);

        // Validate Room code here
        // this.validateRoomCode()

        this.props.navigation.replace("CardSwipe", {
            roomCode,
            userId
        })
    };

    validateRoomCode = async (roomCode) => {
        // Validate room code here.
    }

    onChangeRoomCode = roomCode => {
        console.log(`Typing room code: ${roomCode}`);
        this.setState({ roomCode: roomCode.trim().toUpperCase() });
    };

    onChangeCodeName = codeName => {
        this.setState({ codeName });
    };

    onChangeDescription = description => {
        this.setState({ description })
    }

    onClearRoomCode = () => {
        console.log(`Clearing room code`);
        this.setState({ roomCode: '' });
    };

    render() {
        const { error } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.textInputContainer} >
                        <Text >Room Code</Text>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="characters"
                            maxLength={6}
                            containerStyle={{ padding: 0 }}
                            style={{ padding: 0 }}
                            placeholder="Enter 6-letter event code"
                            value={this.state.roomCode}
                            onChangeText={this.onChangeRoomCode}
                            errorMessage={error ? 'ERROR' : null}
                            rightIcon={
                                <Icon
                                    name="clear"
                                    size={24}
                                    color="black"
                                    onPress={this.onClearRoomCode}
                                />
                            }
                        />
                    </View>
                    <View style={styles.textInputContainer} >
                        <Text >Your Code Name</Text>
                        <Input
                            autoCorrect={false}
                            placeholder="Enter a code name (e.g: Superman)"
                            value={this.state.codeName}
                            onChangeText={this.onChangeCodeName}
                            errorMessage={error ? 'ERROR' : null}
                            style={{ marginLeft: 0 }}
                            rightIcon={
                                <Icon
                                    name="clear"
                                    size={24}
                                    color="black"
                                    onPress={this.onClearRoomCode}
                                />
                            }
                        />
                    </View>
                    <View style={styles.textInputContainer} >
                        <Text >What do you look like?</Text>
                        <TextInput
                            onChangeText={this.onChangeDescription}
                            value={this.state.description}
                            multiline
                            placeholder={"I'm the coolest looking person in the room"}
                            style={{ height: 200, marginTop: 10, borderRadius: 5, borderColor: "grey", borderWidth: 1 }}
                        />
                    </View>
                </ScrollView>
                <Button style={styles.joinButton} onPress={this.onPressEnterCardSwipe} title="Join Room" />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {},
    joinButton: {
        position: "absolute",
        bottom: 25,
        left: 25,
        right: 25
    },
    textInputContainer: {
        marginTop: 30
    },
    textInput: {}
});
