import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import QuizzesStored from '../shared/async_storage/QuizzesStored';
import QuizItemPlay from '../components/QuizItemPlay';

export default function QuizSelection(){

    const [quizzes, setQuizzes] = useState();

    useEffect(() => {
        QuizzesStored.getItems((result) => {
            setQuizzes(result);
        })
    },[]);

    return(
        <View style = {styles.principalContainer}>
            <Text style = {styles.titleText}>Select one Quiz:</Text>
            <View style = {styles.dividerView}></View>
            <FlatList
                style={{ width: '100%' }}
                data={quizzes}
                renderItem={({ item }) => {
                    return (
                        <QuizItemPlay
                            quiz={item}/>
                    );
                }}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    principalContainer: {
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    dividerView: {
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%'
    },
});