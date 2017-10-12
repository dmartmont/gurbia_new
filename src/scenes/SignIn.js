import React from "react";
import {
    View,
    Image,
    KeyboardAvoidingView,
    StyleSheet
} from "react-native";
import {
    Card,
    Button,
    FormLabel,
    FormInput
} from "react-native-elements";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log(this.props);

        return (
            <View style={styles.container}>
                <Card
                    image={require('../resources/fondo.jpg')}
                    containerStyle={styles.card} >

                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..." />
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..." />
                    <Button
                        title="SIGN IN"
                        raised
                        buttonStyle={{
                            backgroundColor: "#F57C00",
                            padding: 10
                        }}
                        icon={{ name: 'send' }}
                        onPress={() => navigate("SignedIn")}
                    />
                    <Button
                        title="SIGN UP"
                        buttonStyle={{
                            backgroundColor: "#F5F5F5",
                        }}
                        color="#FF7043"
                        icon={{
                            name: 'create',
                            color: "#D84315"
                        }}
                        onPress={() => navigate("SignUp")}
                    />
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    }
})