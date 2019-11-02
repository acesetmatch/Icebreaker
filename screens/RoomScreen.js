import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button, Text, ListItem, Icon } from 'react-native-elements';
import Swiper from 'react-native-deck-swiper';
import Modal from 'react-native-modal';

import SAMPLE_QUESTIONS from '../constants/questions';
import SAMPLE_MATCHES from '../constants/matches';
import SAMPLE_USERS from '../constants/users';

export default class RoomScreen extends Component {
  constructor() {
    super();
    this.state = {
      canShowModal: false,
      questions: SAMPLE_QUESTIONS,
      questionRankings: {},
      inProgressQuestionRankings: {},
      allUsers: Object.keys(SAMPLE_USERS),
      currentUsers: Object.keys(SAMPLE_USERS).splice(2),
      users: SAMPLE_USERS,
      matches: SAMPLE_MATCHES,
    };
  }

  componentDidMount() {
    // setTimeout(() => this.setState({ canShowModal: true }), 750);
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
    const { users } = this.state;
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
    const { allUsers, questions } = this.state;

    const orderedQuestions = Object.keys(questions);
    let userId = navigation.getParam('userId', null);

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
        <FlatList
          style={styles.container}
          data={allUsers}
          renderItem={this.renderUser}
          keyExtractor={item => item.id}
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
