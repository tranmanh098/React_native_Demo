/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import profileIcon from '../../Image/media/temp/profile.png';
import global from '../Oderhistory/global';
import saveToken from '../../Component/api/saveToken';

export default class Oderhistory extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    global.onSignIn = this.onSignIn.bind(this);
  }
  onSignIn(user) {
    this.setState({ user });
  }
  onSignOut() {
    this.setState({ user: null });
    saveToken('');
  }
  gotoAuthentication() {
    const { navigation } = this.props;
    navigation.navigate('Authentication');
  }
  gotoChangeinfo(user) {
    //test state user gửi qua params cho Changeinfor
    //console.log(user);
    const { navigation } = this.props;
    navigation.navigate('Changeinfo', user);
  }
  gotoOderhistory() {
    const { navigation } = this.props;
    navigation.push('Oderhistory');
  }

  render() {
    const {
      container,
      profile,
      btnStyle,
      btnText,
      btnSignInStyle,
      btnTextSignIn,
      loginContainer,
      username,
    } = styles;
    const { user } = this.state;
    //console.log(user);
    const LoginJSX = (
      <View style={loginContainer}>
        <Text style={username}>{user ? user.name : ''}</Text>
        <View>
          <TouchableOpacity style={btnSignInStyle} onPress={() => this.gotoOderhistory()}>
            <Text style={btnTextSignIn}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnSignInStyle} onPress={() => this.gotoChangeinfo(this.state.user)}>
            <Text style={btnTextSignIn}>Change Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnSignInStyle} onPress={this.onSignOut.bind(this)}>
            <Text style={btnTextSignIn}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
    const LogoutJSX = (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={btnStyle} onPress={() => this.gotoAuthentication()}>
          <Text style={btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
    const mainJSX = this.state.user ? LoginJSX : LogoutJSX;
    return (
      <View style={styles.container}>
        <Image source={profileIcon} style={profile} />
        {mainJSX}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34B089',
    borderRightWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 25,
  },
  btnStyle: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 70,
  },
  btnText: {
    color: '#34B089',
    fontSize: 20,
  },
  btnSignInStyle: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 230,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  btnTextSignIn: {
    color: '#34B089',
    fontSize: 15,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  username: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 20,
    marginBottom: -50,
    marginTop: 15,
  },
});
