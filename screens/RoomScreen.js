import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button, Text, ListItem, Icon } from 'react-native-elements';
import Swiper from 'react-native-deck-swiper';
import Modal from 'react-native-modal';
import _ from 'lodash';

import SAMPLE_ROOM from '../constants/room';
import SAMPLE_QUESTIONS from '../constants/questions';

export default class RoomScreen extends Component {
  constructor() {
    super();
    this.state = {
      canShowModal: false,
      questions: SAMPLE_QUESTIONS,
      questionRankings: {},
      inProgressQuestionRankings: {},
      room: SAMPLE_ROOM,
      matches: {},
    };
  }

  componentDidMount() {
    console.log(
      'Nav params is: ' + JSON.stringify(this.props.navigation.state.params)
    );
    // setTimeout(() => this.setState({ canShowModal: true }), 750);
    console.log('User id is: ' + this.props.navigation.state.params.userId);
    this.calculateMatches();
  }

  calculateMatches = () => {
    const { navigation } = this.props;
    const {
      room: { users },
      matches,
    } = this.state;
    let userId = navigation.getParam('userId', null);
    userId = 'u1'; // temporary
    const currentUser = users[userId];
    const currentUserLikedQuestions = _.filter(
      currentUser.questionRankings,
      questionRanking => questionRanking === 'like'
    );
    const updatedMatches = {};
    const questionsAnswered = Object.keys(currentUser.questionRankings).length;

    for (let otherUserId in users) {
      if (otherUserId === userId) {
        continue;
      }
      //   let generatedMatchId;
      //   if (otherUserId < userId) {
      //     generatedMatchId = `${otherUserId}||${userId}`;
      //   } else {
      //     generatedMatchId = `${userId}||${otherUserId}`;
      //   }
      const matchAccumulator = 0;
      const otherUser = users[otherUserId];
      const otherUserLikedQuestions = _.filter(
        currentUser.questionRankings,
        questionRanking => questionRanking === 'like'
      );
      const commonQuestions = _.intersection(
        otherUserLikedQuestions,
        currentUserLikedQuestions
      );

      for (let questionId in currentUser.questionRankings) {
        const currentUserAnswer = currentUser.questionRankings[questionId];
        const otherUserAnswer = otherUser.questionRankings[questionId];

        if (currentUserAnswer === 'like' && otherUserAnswer === 'like') {
          matchAccumulator += 1.0;
        }
      }

      const matchStrength = matchAccumulator / questionsAnswered;

      updatedMatches[otherUserId] = {
        commonQuestions: commonQuestions,
        matchStrength,
      };
    }

    console.log('New matches! ', updatedMatches);

    this.setState({ matches: updatedMatches });
  };

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

  onPressUser = user => {
    console.log('Press user: ', user);
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

  renderUser = ({ item }) => {
    const {
      room: { users },
    } = this.state;
    const user = users[item];
    return (
      <ListItem
        title={user.codename}
        subtitle={user.description}
        subtitleStyle={{ color: 'gray' }}
        leftElement={<Icon name="smiley" type="octicon" color="blue" />}
        bottomDivider
        chevron
        onPress={() => this.onPressUser(user)}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    const {
      room: { users },
      questions,
    } = this.state;

    const allUsers = Object.keys(users);
    const orderedQuestions = Object.keys(questions);
    let userId = navigation.getParam('userId', null);
    let roomCode = navigation.getParam('roomCode', null);

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={allUsers}
          renderItem={this.renderUser}
          keyExtractor={item => item}
        />
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
