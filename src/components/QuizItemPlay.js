import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

export default function QuizItemPlay(props) {

    const navigation = useNavigation();

    return (
        <ListItem
            bottomDivider style={styles.container}
            onPress={() => {
                navigation.navigate('Questions', { quizTitle: props.quiz.title });
            }}>
            <ListItem.Content>
                <ListItem.Title>
                    <Text style={styles.itemText}>{props.quiz.title}</Text>
                </ListItem.Title>
            </ListItem.Content>
            <Icon
                name="play"
                type = "font-awesome-5"
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