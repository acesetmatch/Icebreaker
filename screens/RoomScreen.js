import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button, Text } from 'react-native-elements';
import Swiper from 'react-native-deck-swiper';
import Modal from 'react-native-modal';

export default class RoomScreen extends Component {
  constructor() {
    super();
    this.state = {
      canShowModal: false,
      questions: {
        '1': {
          questionId: '1',
          prompt:
            'Do you think that people should have the freedom to blah blah blah?  1',
          topics: ['testTopic1'],
        },
        '2': {
          questionId: '2',
          prompt:
            'Do you think that people should have the freedom to blah blah blah?  2',
          topics: ['testTopic2'],
        },
        '3': {
          questionId: '3',
          prompt:
            'Do you think that people should have the freedom to blah blah blah?  3',
          topics: ['testTopic3'],
        },
        '4': {
          questionId: '4',
          prompt:
            'Do you think that people should have the freedom to blah blah blah?  4',
          topics: ['testTopic4'],
        },
        '5': {
          questionId: '5',
          prompt:
            'Do you think that people should have the freedom to blah blah blah?  5',
          topics: ['testTopic5'],
        },
        '6': {
          questionId: '6',
          prompt:
            'Do you think that people should have the freedom to blah blah blah?  6',
          topics: ['testTopic6'],
        },
        '7': {
          questionId: '7',
          prompt:
            'Do you think that people should have the freedom to blah blah blah?  7',
          topics: ['testTopic7'],
        },
      },
      questionRankings: {},
      inProgressQuestionRankings: {},
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ canShowModal: true }), 750);
    console.log("User id is: " + this.props.navigation.state.params.userId)
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

  renderCard = questionId => {
    const { questions } = this.state;
    const question = questions[questionId];
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{question.prompt}</Text>
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
        <Modal
          animationInTiming={600}
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
            cardHorizontalMargin={0}
            containerStyle={{
              marginHorizontal: -20,
              paddingHorizontal: 20,
              backgroundColor: 'transparent',
            }}
          />
        </Modal>
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
    width: '90%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    textAlign: 'left',
    fontSize: 32,
    backgroundColor: 'transparent',
  },
});
