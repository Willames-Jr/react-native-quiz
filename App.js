import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './src/pages/Home';
import Questions from './src/pages/Questions';
import ManageQuestions from './src/pages/ManageQuestions';
import CreateQuiz from './src/pages/CreateQuiz';
import UpdateQuiz from './src/pages/UpdateQuiz';
import QuizItemUpdate from './src/components/QuizItemUpdate';
import QuizSelection from './src/pages/QuizSelection';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="QuizSelection">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="QuizSelection" component={QuizSelection} options={{ title: "Quiz Selection"}} />
          <Stack.Screen name="Questions" component={Questions} options={{ headerShown: false }} />
          <Stack.Screen name="ManageQuestions" component={ManageQuestions} options={{ title: "Manage questions" }} />
          <Stack.Screen name="CreateQuiz" component={CreateQuiz} options={{ title: "Create quiz" }} />
          <Stack.Screen name="UpdateQuiz" component={UpdateQuiz} options={{ title: "Update Quiz" }} />
          <Stack.Screen name="QuizItemUpdate" component={QuizItemUpdate} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar />
    </>
  );
}
