import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import QuizzesStored from '../shared/async_storage/QuizzesStored';

export default function Questions({ navigation, route }) {

    const a = [
        {
            title: 'Python é ...',
            answerA: 'Uma biblioteca para desenvolver inteligência artificial',
            answerB: 'Um framework muito rápido e fácil',
            answerC: 'Uma linguaguem feita exclusivamente para desenvolvimento de robôs',
            answerD: 'Uma linguaguem de programação',
            correctAnswer: 3,
        },
        {
            title: 'JavaScript é ...',
            answerA: 'Uma linguaguem de programção que pode ser usada em vários contextos',
            answerB: 'Uma linguaguem utilizada somente nos navegadores',
            answerC: 'Uma versão mais moderna da linguaguem Java',
            answerD: 'Um Framework para Java que auxilía na escrita de scripts complexos',
            correctAnswer: 0,
        },
        {
            title: 'TensorFlow é usado para ...',
            answerA: 'Auxiliar no desenvolvimento de interfaces gráficas',
            answerB: 'Escrever códigos de baixo nível',
            answerC: 'Criar algorítimos de deep learning',
            answerD: 'Automatizar a escrita de código',
            correctAnswer: 2,
        },
        {
            title: 'Qual dessas ferramentas não é usada no desenvolvimento Web',
            answerA: 'React',
            answerB: 'Objective-C',
            answerC: 'Angular',
            answerD: 'BootStrap',
            correctAnswer: 1,
        },
        {
            title: 'Flutter é ...',
            answerA: 'Uma biblioteca para desenvolver apenas aplicativos para web',
            answerB: 'Um framework para desenvolver aplicações mobile para Android e IOS',
            answerC: 'Uma linguaguem feita pelo Google',
            answerD: 'Uma linguaguem de programação produzida e mantida pelo Facebook',
            correctAnswer: 1,
        },
    ]
    const initialColors = {
        option0: {
            backgroundColor: '#24a0ed'
        },
        option1: {
            backgroundColor: '#24a0ed'
        },
        option2: {
            backgroundColor: '#24a0ed'
        },
        option3: {
            backgroundColor: '#24a0ed'
        },
    };

    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [actualQuestion, setActualQuestion] = useState(0);
    const [disableClick, setDisableClick] = useState(false);
    const [optionsColors, setOptionsColors] = useState(initialColors);

    useEffect(() => {
        QuizzesStored.getItemById(route.params.quizTitle, (result) =>{
            console.log(result)
            setQuestions(result.questions);
        });
    },[]);

    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if(questions.length === actualQuestion + 1) return;

            e.preventDefault();

            Alert.alert(
              'Deseja sair ?',
              'Se você sair agora isso irá contar como um abandono. Deseja mesmo sair ?',
              [
                { text: "Continuar", style: 'cancel', onPress: () => {} },
                {
                  text: 'Sair',
                  style: 'destructive',
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
          }),
        [navigation,actualQuestion]
    );
    const formattedTittle = () => {
        const zero = actualQuestion < 10 ? '0' : '';
        return (`${zero}${actualQuestion + 1}- ${questions[actualQuestion]?.title}`);
    }

    const confirmOption = (option) => {
        const correctAnswer = questions[actualQuestion]?.correctAnswer;

        if (option === correctAnswer) {
            let changeOption = {
                ...optionsColors
            }
            changeOption[`option${option}`] = {
                backgroundColor: '#49b675'
            }
            setOptionsColors(changeOption);
            setScore(score+1);
        } else {
            let changeOption = {
                ...optionsColors
            }
            changeOption[`option${option}`] = {
                backgroundColor: '#e71837'
            }
            changeOption[`option${correctAnswer}`] = {
                backgroundColor: '#49b675'
            }
            setOptionsColors(changeOption);
        }

        setDisableClick(true);
        return;
    }

    const nextQuestion = () => {
        if(actualQuestion + 1 === questions.length){
            alert(`Parabéns você acertou ${score} questões !!!`)
            return;
        }
        setActualQuestion(actualQuestion + 1);
        setDisableClick(false);
        setOptionsColors(initialColors);
        return;
    }

    return (
        <View style={styles.principalContainer}>
            <View style={styles.titleBox}>
                <Text style={styles.questionTitle}>
                    {formattedTittle()}
                </Text>
            </View>
            <View style={styles.optionsBox}>
                <Button buttonStyle={[styles.answerButton, optionsColors.option0]} containerStyle={styles.answerButtonContainer} title={questions[actualQuestion]?.answerA}
                    onPress={() => confirmOption(0)}
                    disabled={disableClick}
                    disabledStyle={optionsColors.option0}
                    disabledTitleStyle={{ color: 'white' }} />
                <Button buttonStyle={[styles.answerButton, optionsColors.option1]} containerStyle={styles.answerButtonContainer} title={questions[actualQuestion]?.answerB}
                    onPress={() => confirmOption(1)}
                    disabled={disableClick}
                    disabledStyle={optionsColors.option1}
                    disabledTitleStyle={{ color: 'white' }} />
                <Button buttonStyle={[styles.answerButton, optionsColors.option2]} containerStyle={styles.answerButtonContainer} title={questions[actualQuestion]?.answerC}
                    onPress={() => confirmOption(2)}
                    disabled={disableClick}
                    disabledStyle={optionsColors.option2}
                    disabledTitleStyle={{ color: 'white' }} />
                <Button buttonStyle={[styles.answerButton, optionsColors.option3]} containerStyle={styles.answerButtonContainer} title={questions[actualQuestion]?.answerD}
                    onPress={() => confirmOption(3)}
                    disabled={disableClick}
                    disabledStyle={optionsColors.option3}
                    disabledTitleStyle={{ color: 'white' }} />
            </View>
            <View style = {styles.bottomBox}>
                <Button buttonStyle={styles.nextButton} containerStyle={styles.nextButtonContainer} title="Próxima"
                    onPress={() => nextQuestion()}
                    disabled={!disableClick} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    principalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    questionTitle: {
        fontSize: 20,
        color: 'black',
        padding: 15
    },
    titleBox: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    optionsBox: {
        paddingTop: 10,
        flex: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    bottomBox: {
        flex: 1,
        marginTop: 0,
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerButtonContainer: {
        width: '100%',
        marginBottom: 10,
        flex: 1
    },
    answerButton: {
        flex: 1
    }
});