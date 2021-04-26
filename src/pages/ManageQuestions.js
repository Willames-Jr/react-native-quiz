import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import QuizzesStored from '../shared/async_storage/QuizzesStored';

export default function ManageQuestions({ navigation }) {

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        loadStoredQuizzes();
    }, [navigation]);

    const loadStoredQuizzes = () => {
        QuizzesStored.getItems((result) => {
            setQuizzes(result);
        });
    }

    return (
        <View style={styles.principalContainer}>
            <Button
                onPress={() => { navigation.navigate('CreateQuiz') }}
                buttonStyle={styles.navigateButton}
                title="Create a new quiz" />

            <Text style={styles.titleText}>Quizzes created: </Text>
            <View style={styles.dividerView}></View>

            <Button onPress={() => loadStoredQuizzes()}
                icon={{ name: 'cached', type: 'material', color: 'white' }} title="Refresh" />

            <FlatList
                style={{ width: '100%' }}
                data={quizzes}
                renderItem={({ item }) => {
                    return (
                        <QuizItemUpdate
                            quiz={item}
                            quizList={quizzes}
                            updateQuizList={loadStoredQuizzes}/>
                    );
                }}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dividerView: {
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%'
    },
    principalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    navigateButton: {
        borderRadius: 5,
        width: 200,
        marginTop: 20,
        marginBottom: 20
    },
});