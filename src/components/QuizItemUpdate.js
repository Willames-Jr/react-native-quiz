import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import QuizzesStored from '../shared/async_storage/QuizzesStored';

export default function QuizItem(props) {

    const navigation = useNavigation();

    const deleteItem = () => {
        Alert.alert(
            'Confirm your choice',
            'You really want to delete this quiz ?',
            [
                { text: 'Cancel', style: 'cancel', onPress: () => { } },
                {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: () => {
                        QuizzesStored.removeItem(props.quiz.title);
                        props.updateQuizList();
                    },
                },
            ]
        );
    }

    return (
        <ListItem
            bottomDivider style={styles.container}>
            <ListItem.Content>
                <ListItem.Title>
                    <Text style={styles.itemText}>{props.quiz.title}</Text>
                </ListItem.Title>
            </ListItem.Content>
            <Icon
                name="delete"
                type="material"
                onPress={() => { deleteItem() }}
            />
            <Icon
                name="create"
                type="material"
                onPress={() => {
                    navigation.navigate('UpdateQuiz', {quizTitle: props.quiz.title});
                }}
            />

        </ListItem>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
});