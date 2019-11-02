import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button, Text, Overlay } from 'react-native-elements';
import Swiper from 'react-native-deck-swiper';

export default class RoomScreen extends Component {
  constructor() {
    super();
    this.state = {
      canShowModal: false,
      questions: {
        '1': {
          questionId: '1',
          prompt: 'Test prompt 1',
          topics: ['testTopic1'],
        },
        '2': {
          questionId: '2',
          prompt: 'Test prompt 2',
          topics: ['testTopic2'],
        },
        '3': {
          questionId: '3',
          prompt: 'Test prompt 3',
          topics: ['testTopic3'],
        },
        '4': {
          questionId: '4',
          prompt: 'Test prompt 4',
          topics: ['testTopic4'],
        },
        '5': {
          questionId: '5',
          prompt: 'Test prompt 5',
          topics: ['testTopic5'],
        },
        '6': {
          questionId: '6',
          prompt: 'Test prompt 6',
          topics: ['testTopic6'],
        },
        '7': {
          questionId: '7',
          prompt: 'Test prompt 7',
          topics: ['testTopic7'],
        },
      },
      questionRankings: {},
      inProgressQuestionRankings: {},
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ canShowModal: true }), 750);
  }

  shouldShowQuestionRanker() {
    const { canShowModal, questionRankings } = this.state;
    return canShowModal && Object.keys(questionRankings).length === 0;
  }

  onSwipe = (cardIndex, ranking) => {
    const { questions, inProgressQuestionRankings } = this.state;
    const questionId = questions[cardIndex];
    console.log(`Question id ${questionId} is ${ranking}`);
    this.setState({
      inProgressQuestionRankings: {
        ...inProgressQuestionRankings,
        questionId: ranking,
      },
    });
  };

  onSwipedAll = () => {
    const { inProgressQuestionRankings } = this.state;
    console.log('Done swiping!');
    this.setState({
      questionRankings: inProgressQuestionRankings,
      inProgressQuestionRankings: {},
    });
  };

  renderCard = card => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card}</Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { questions } = this.state;

    const orderedQuestions = Object.keys(questions);
    const userId = navigation.getParam('userId', null);

    return (
      <View style={styles.container}>
        <Overlay
          animationType={'fade'}
          isVisible={this.shouldShowQuestionRanker()}
        >
          <Swiper
            cardIndex={0}
            stackSize={3}
            useViewOverflow={false}
            verticalSwipe={false}
            cards={orderedQuestions}
            renderCard={this.renderCard}
            onSwipedLeft={cardIndex => this.onSwipe(cardIndex, 'dislike')}
            onSwipedRight={cardIndex => this.onSwipe(cardIndex, 'like')}
            onSwipedAll={this.onSwipedAll}
          />
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
