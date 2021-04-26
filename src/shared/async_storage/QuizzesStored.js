import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizzesStored = {
    setItem: async (key, quiz) => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            if (key in keys) {
                return 0;
            }
            const quizString = JSON.stringify(quiz);
            AsyncStorage.setItem(key, quizString).then(() => {
                return true;
            }).catch((err) => {
                return err;
            });
        } catch (err) {
            return err;
        }
    },
    getItems: async(onFinish) => {
        let jsonValues = [];
        let keys = [];
        let stringedValues = [];
        try {
            keys = await AsyncStorage.getAllKeys();
            stringedValues = await AsyncStorage.multiGet(keys);
            jsonValues = stringedValues.map((value) => {
                return JSON.parse(value[1]);
            });
        } catch (err) {
            return err;
        }
        onFinish(jsonValues);
        return;
    },
    removeItem: (key) => {
        try {
            AsyncStorage.removeItem(key).then(() => {
                return;
            }).catch((err) => {
                return err;
            });
        } catch (err) {
            return err;
        }
    },
    getItemById: async (key, onFinish) =>{
        let jsonQuiz = '';
        try{
            const stringedQuiz = await AsyncStorage.getItem(key);
            jsonQuiz = JSON.parse(stringedQuiz);
        }catch(err){
            return err;
        }
        onFinish(jsonQuiz);
    },
    isInvalidKey: (key) => {
        try {
            AsyncStorage.getAllKeys().then((keys) => {
                return key in keys;
            }).catch((err) => {
                return err;
            });
        } catch (err) {
            return err;
        }
    }
}

export default QuizzesStored;