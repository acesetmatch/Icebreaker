import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
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

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      roomCode: '',
      error: false,
      userId: null,
    };
  }

  componentDidMount() {
    this.hydrateUserId();
  }

  hydrateUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('user-id');
      if (value !== null) {
        console.log('Hydrating user id: ', value);
        this.setState({ userId: value });
      } else {
        const newId = uuidv4();
        console.log('Setting new user id: ', newId);
        await AsyncStorage.setItem('user-id', newId);
        this.setState({ userId: newId });
      }
    } catch (error) {
      console.log('AsyncStorage error: ', error);
    }
  };

  onPressCreateRoom = () => {
    console.log('Created room!');
  };

  onPressJoinRoom = () => {
    const { navigation } = this.props;
    const { roomCode, userId } = this.state;
    console.log(`Joining room code: ${this.state.roomCode}`);
    navigation.navigate('Room', { roomCode, userId });

    // setTimeout(() => {
    //   const random = Math.floor(Math.random() * 2);
    //   if (random % 2 == 0) {
    //     navigation.navigate('Room', { roomCode, userId });
    //   } else {
    //     this.setState({ error: true });
    //   }
    // }, 500);
  };

  onChangeRoomCode = roomCode => {
    console.log(`Typing room code: ${roomCode}`);
    this.setState({ roomCode: roomCode.trim().toUpperCase() });
  };

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
          <Button onPress={this.onPressCreateRoom} title="Create Room" />
          <Divider style={{ marginVertical: 30 }} />
          <Input
            autoCorrect={false}
            autoCapitalize="characters"
            maxLength={6}
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
          <View style={{ height: 10 }} />
          <Button onPress={this.onPressJoinRoom} title="Join Room" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },
});
