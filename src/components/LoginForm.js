import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };
  onButtonPress = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail);
      });
  }
  onLoginFail = () => {
    this.setState({ error: 'Authentication Failed', loading: false });
  }
  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }
  renderButton() {
    return this.state.loading ?
    <Spinner size='small' /> :
    <Button onPress={this.onButtonPress}>
      Log in
    </Button>;
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            label='Email'
            placeholder='user@example.com'
          />
        </CardSection>
        <CardSection>
          <Input
            value={this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            label='Password'
            placeholder='password'
          />
        </CardSection>
        <Text style={styles.errorTextStyles}>
          {this.state.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyles: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
