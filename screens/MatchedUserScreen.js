import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button, Text, ListItem, Icon } from 'react-native-elements';
import Swiper from 'react-native-deck-swiper';
import Modal from 'react-native-modal';

import SAMPLE_QUESTIONS from '../constants/questions';
import SAMPLE_MATCHES from '../constants/matches';
import SAMPLE_USERS from '../constants/users';

export default class MatchedUserScreen extends Component {
    constructor() {
        super();
        const matchedQuestions = this.props.navigation.state.params.matchedQuestions
        this.state = {
            canShowModal: false,
            matchedQuestions: matchedQuestions,
            questionRankings: {},
            inProgressQuestionRankings: {},

        };
    }

    componentDidMount() {
        // setTimeout(() => this.setState({ canShowModal: true }), 750);
        console.log("User id is: " + this.props.navigation.state.params.userId)
    }

    shouldShowQuestionRanker() {
        const { canShowModal, questionRankings } = this.state;
        return canShowModal && Object.keys(questionRankings).length === 0;
    }

    renderQuestion = ({ item }) => {
        return (
            <ListItem
                title={item.codename}
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
        const { matchedQuestions, questions } = this.state;

        const orderedQuestions = Object.keys(questions);
        let userId = navigation.getParam('userId', null);
        const { user } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <View >
                    <Text>{`You and ${user.codeName} matched questions!`}</Text>
                </View>
                <View >
                    <Text>Your matches description {user.description}</Text>
                </View>
                <FlatList
                    style={styles.container}
                    data={matchedQuestions}
                    renderItem={this.renderQuestion}
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
