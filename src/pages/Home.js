import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button} from 'react-native-elements';

export default function Home({navigation}) {


    return (
        <View style={styles.principalContainer}>
            <Text style = {styles.titleText}>Mega Quiz</Text>
            <Button 
            onPress = {() => 
                navigation.navigate("QuizSelection")} 
            buttonStyle = {styles.startButton}
            title = "Start"/>
            <Button 
            onPress = {() => 
                navigation.navigate("ManageQuestions")} 
            buttonStyle = {styles.manageQuestionsButton}
            title = "Manage Quizzes"/>
        </View>
    );
}

const styles = StyleSheet.create({
    principalContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    startButton: {
        borderRadius: 5,
        width: 100,
        marginTop: 20
    },
    manageQuestionsButton: {
        borderRadius: 5,
        width: 150,
        marginTop: 20
    }
});