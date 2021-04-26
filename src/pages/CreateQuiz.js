import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import React from 'react';
import { useState } from 'react';
import QuizzesStored from '../shared/async_storage/QuizzesStored';

export default function CreateQuiz({ navigation }) {

    const [actualPage, setActualPage] = useState(0);
    const [questions, setQuestions] = useState([{}]);
    const [quizTitle, setQuizTitle] = useState('');

    const nextPage = () => {
        if ((actualPage > 0) && (!questions[actualPage - 1]?.title || questions[actualPage-1]?.correctAnswer === undefined 
            || !questions[actualPage - 1]?.answerA || !questions[actualPage - 1]?.answerB || !questions[actualPage - 1]?.answerC 
            || !questions[actualPage - 1]?.answerD )) {
            
            alert('All fields must be filled');
            return;
        } else if (!quizTitle) {
            alert('Tittle must be filled');
            return;
        } else if (QuizzesStored.isInvalidKey(quizTitle)) {
            alert('This title already is used. Try another');
        }

        setActualPage(actualPage + 1);
        return;
    }

    const saveQuiz = () => {
        showConfirmAlert('Do you really want to save this quiz ?', () => {
            const newQuiz = {
                title: quizTitle,
                questions: questions
            }
            const isQuizStored = QuizzesStored.setItem(quizTitle, newQuiz);
            if (isQuizStored) {
                alert('The quiz was saved successfully');
                navigation.goBack();
            }
        });

        return;
    }

    const showConfirmAlert = (message, onConfirmation) => {
        const result = Alert.alert(
            'Confirm your choice',
            message,
            [
                { text: 'Cancel', style: 'cancel', onPress: () => { } },
                {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: () => { onConfirmation() },
                },
            ]
        );
        return result;
    }

    return (
        <View style={styles.principalContainer}>
            <View style={styles.fullWidthContainer} >
                {
                    actualPage === 0 ?
                        <>
                            <Input label="Quiz title" placeholder="type the title here." value={quizTitle}
                                onChangeText={(text) => { setQuizTitle(text) }} />
                            <Text>* The minimum number of questions is 5</Text>
                            <Text>* The maximum number of questions is 20</Text>
                        </> :
                        <Input label="Question title" placeholder="type the question here."
                            value={questions[actualPage - 1]?.title ?? ''}
                            onChangeText={(text) => {
                                let newQuestions = [...questions];
                                if (newQuestions[actualPage - 1] === undefined) newQuestions[actualPage - 1] = {};

                                newQuestions[actualPage - 1].title = text;
                                setQuestions(newQuestions);
                            }} />
                }
            </View>

            {
                actualPage !== 0 &&
                <View style={styles.fullWidthContainer} >
                    <Input label="Answer A" placeholder="type the answer A here."
                        rightIconContainerStyle = {styles.rowContainer}
                        rightIcon={
                            <CheckBox 
                                checked={questions[actualPage-1]?.correctAnswer === 0}
                                onPress={() =>{
                                    let newQuestions = [...questions];
                                    if(newQuestions[actualPage-1] === undefined) newQuestions[actualPage-1] = {};

                                    newQuestions[actualPage-1].correctAnswer = 0;
                                    setQuestions(newQuestions);
                                }}
                            />
                        }
                        value={questions[actualPage - 1]?.answerA ?? ''}
                        onChangeText={(text) => {
                            let newQuestions = [...questions];
                            if (newQuestions[actualPage - 1] === undefined) newQuestions[actualPage - 1] = {};

                            newQuestions[actualPage - 1].answerA = text;
                            setQuestions(newQuestions);
                        }} />
                    <Input label="Answer B" placeholder="type the answer B here."
                        value={questions[actualPage - 1]?.answerB ?? ''}
                        rightIconContainerStyle = {styles.rowContainer}
                        rightIcon={
                            <CheckBox 
                                checked={questions[actualPage-1]?.correctAnswer === 1}
                                onPress={() =>{
                                    let newQuestions = [...questions];
                                    if(newQuestions[actualPage-1] === undefined) newQuestions[actualPage-1] = {};

                                    newQuestions[actualPage-1].correctAnswer = 1;
                                    setQuestions(newQuestions);
                                }}
                            />
                        }
                        onChangeText={(text) => {
                            let newQuestions = [...questions];
                            if (newQuestions[actualPage - 1] === undefined) newQuestions[actualPage - 1] = {};

                            newQuestions[actualPage - 1].answerB = text;
                            setQuestions(newQuestions);
                            return
                        }} />
                    <Input label="Answer C" placeholder="type the answer C here."
                        value={questions[actualPage - 1]?.answerC ?? ''}
                        rightIconContainerStyle = {styles.rowContainer}
                        rightIcon={
                            <CheckBox 
                                checked={questions[actualPage-1]?.correctAnswer === 2}
                                onPress={() =>{
                                    let newQuestions = [...questions];
                                    if(newQuestions[actualPage-1] === undefined) newQuestions[actualPage-1] = {};

                                    newQuestions[actualPage-1].correctAnswer = 2;
                                    setQuestions(newQuestions);
                                }}
                            />
                        }
                        onChangeText={(text) => {
                            let newQuestions = [...questions];
                            if (newQuestions[actualPage - 1] === undefined) newQuestions[actualPage - 1] = {};

                            newQuestions[actualPage - 1].answerC = text;
                            setQuestions(newQuestions);
                        }} />
                    <Input label="Answer D" placeholder="type the answer D here."
                        value={questions[actualPage - 1]?.answerD ?? ''}
                        rightIconContainerStyle = {styles.rowContainer}
                        rightIcon={
                            <CheckBox 
                                checked={questions[actualPage-1]?.correctAnswer === 3}
                                onPress={() =>{
                                    let newQuestions = [...questions];
                                    if(newQuestions[actualPage-1] === undefined) newQuestions[actualPage-1] = {};

                                    newQuestions[actualPage-1].correctAnswer = 3;
                                    setQuestions(newQuestions);
                                }}
                            />
                        }
                        onChangeText={(text) => {
                            let newQuestions = [...questions];
                            if (newQuestions[actualPage - 1] === undefined) newQuestions[actualPage - 1] = {};

                            newQuestions[actualPage - 1].answerD = text;
                            setQuestions(newQuestions);
                        }} />
                </View>
            }


            <View style={styles.buttonsContainer}>
                <Button buttonStyle={styles.passButton} title="Previous"
                    disabled={actualPage === 0}
                    onPress={() => {
                        if (actualPage !== 0) {
                            setActualPage(actualPage - 1)
                        };
                    }} />
                <Button buttonStyle={styles.passButton} title="Save"
                    disabled={actualPage <= 5}
                    onPress={() => { saveQuiz() }} />
                <Button buttonStyle={styles.passButton} title="Next"
                    disabled={actualPage === 20}
                    onPress={() => { nextPage() }} />
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    fullWidthContainer: {
        width: '100%'
    },
    rowContainer: {
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    principalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    passButton: {
        borderRadius: 5,
        width: 100,
        marginTop: 20
    },
});