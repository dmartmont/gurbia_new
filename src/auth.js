import { AsyncStorage } from "react-native";

export const USER_KEY = "user_id";

export const onSignIn = (key) => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY, (err, result) => {
            if (err) {
                resolve(false);
            } else if (result !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
            .catch(err => {
                reject(err);
            });
    });
};