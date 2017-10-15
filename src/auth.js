import { AsyncStorage } from 'react-native';
import Database from './database/database';

export const onSignIn = (key) => AsyncStorage.setItem('user', key);

export const onSignOut = () => AsyncStorage.removeItem('user');

export const isSignedIn = () => {
    return new Promise(async (resolve, reject) => {
        user = await AsyncStorage.getItem('user');
        if (user === null) {
            resolve(false);
        } else {
            let [email, password] = user.split(':');
            await Database.loginUser(email, password);
            resolve(true);
        }
    });
};