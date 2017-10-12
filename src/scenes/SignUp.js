import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import {
    Button,
    Card,
    FormLabel,
    FormInput
} from 'react-native-elements';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: "Sign Up",
        headerBackTitle: "",
        headerStyle: {
            backgroundColor: "#E64A19",
        },
        headerTitleStyle: {
            color: "#FFFFFF"
        },
        headerBackTitleStyle: {
            color: "#FFFFFF"
        }
    }

    // validateEmail = (email) => {
    //     var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return regexp.test(email);
    // };

    // validatePassword(password) {
    //     return password.length > 5 ? true : false;
    // }

    // handleFormSubmit() {
    //     try {
    //         if (this.state.email == 'cuatroBabys@malumita.com') {
    //             const cuatro = new Sound('cuatrobabys.mp3', Sound.MAIN_BUNDLE, (error) => {
    //                 if (error) {
    //                     console.log('soy el error');
    //                     return;
    //                 }
    //                 cuatro.play();
    //                 cuatro.setVolume(1);
    //             });
    //         } else {
    //             if (this.validateEmail(this.state.email)) {
    //                 Database.loginUser(this.state.email, this.state.password).then(res => {
    //                     if (res) this.navigate('Home');
    //                 });
    //             }
    //             else {
    //                 alert('Malformed email');
    //             }
    //         }
    //     }
    //     catch (error) {
    //         console.log('Error: ', error);
    //     }
    // }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Card>
                <FormLabel>FIRSTNAME</FormLabel>
                <FormInput
                    //ref={(firstname) => this.setState({ firstname })}
                    placeholder="Please enter your firstname..."
                />
                <FormLabel>LASTNAME</FormLabel>
                <FormInput
                    //ref={(lastname) => this.setState({ lastname })}
                    placeholder="Please enter your lastname..."
                />
                <FormLabel>EMAIL</FormLabel>
                <FormInput
                    //ref={(email) => this.setState({ email })}
                    placeholder="Please enter your email..."
                />
                <FormLabel>PASSWORD</FormLabel>
                <FormInput
                    //ref={(password) => this.setState({ password })}
                    placeholder="Please enter a password..."
                />
                <Button
                    title="SIGN UP"
                    raised
                    icon={{ name: 'create' }}
                    buttonStyle={{ backgroundColor: "#F57C00" }}
                    onPress={() => navigate('SignedIn')}
                />
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: 0,
        paddingRight: 15,
        paddingBottom: 0,
        paddingLeft: 15,
        backgroundColor: '#fff'
    }
})