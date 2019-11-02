import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button, Text, Overlay } from 'react-native-elements';
import Swiper from 'react-native-deck-swiper';

export default class RoomScreen extends Component {
  render() {
    const { navigation } = this.props;

    const userId = navigation.getParam('userId', null);
    const questionRankings = navigation.getParam('questionRankings', null);

    return (
      <View style={styles.container}>
        <Overlay
          isVisible={
            questionRankings == null ||
            Object.keys(questionRankings).length === 0
          }
        >
          <Swiper
            useViewOverflow={false}
            cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
            renderCard={card => {
              return (
                <View style={styles.card}>
                  <Text style={styles.text}>{card}</Text>
                </View>
              );
            }}
            onSwiped={cardIndex => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize={3}
          >
            <Button
              onPress={() => {
                console.log('oulala');
              }}
              title="Press me"
            >
              You can press me
            </Button>
          </Swiper>
        </Overlay>
        <ScrollView style={styles.container}>
          {/**
           * Go ahead and delete ExpoLinksView and replace it with your content;
           * we just wanted to provide you with some helpful links.
           */}
          <ExpoLinksView />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
