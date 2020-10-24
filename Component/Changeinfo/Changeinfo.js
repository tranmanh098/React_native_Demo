/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

import backList from '../../Image/media/icons/backList.png';
import getToken from '../../Component/api/getToken';
import changeinfoAPI from '../api/changeinfor';
import global from '../Oderhistory/global';

export default class Changeinfo extends Component {
  constructor(props) {
    super(props);
    //nhận state user từ Menu gửi qua bằng route.params
    const { route } = this.props;
    console.log(route.params);
    this.state = {
      txtName: route.params.name,
      txtAddress: route.params.address,
      txtPhone: route.params.phone,
    };
  }
  goBackToMain() {
    const { navigation } = this.props;
    navigation.goBack();
  }
  alSuccess() {
    Alert.alert(
      'Notice',
      'Update info successfully',
      [
        { text: 'OK', onPress: this.goBackToMain.bind(this) },
      ],
      { cancelable: false }
    );
  }
  changeinfo() {
    const { txtName, txtAddress, txtPhone } = this.state;
    getToken()
      .then(token => changeinfoAPI(token, txtName, txtPhone, txtAddress))
      .then(user => {
        this.alSuccess();
        global.onSignIn(user)
      })
      .catch(err => console.log(err));

  }
  render() {
    const {
      wrapper, header, headerTitle, backIconStyle, body,
      signInContainer, signInTextStyle, textInput,
    } = styles;
    const { txtName, txtAddress, txtPhone } = this.state;

    return (
      <View style={wrapper}>
        <View style={header}>

          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={backList} style={backIconStyle} />
          </TouchableOpacity>
          <Text style={headerTitle}>User Infomation</Text>
          <View />
        </View>
        <View style={body}>
          <TextInput
            style={textInput}
            placeholder="Enter your name"
            autoCapitalize="none"
            value={txtName}
            onChangeText={text => this.setState({ ...this.state, txtName: text })}
          />
          <TextInput
            style={textInput}
            placeholder="Enter your address"
            autoCapitalize="none"
            value={txtAddress}
            onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
          />
          <TextInput
            style={textInput}
            placeholder="Enter your phone number"
            autoCapitalize="none"
            value={txtPhone}
            onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
          />
          <TouchableOpacity style={signInContainer} onPress={() => this.changeinfo()}>
            <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 },
  headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
  backIconStyle: { width: 30, height: 30 },
  body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#2ABB9C',
    borderWidth: 1,
  },
  signInTextStyle: {
    color: '#FFF',
    fontFamily: 'Avenir',
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  signInContainer: {
    marginHorizontal: 20,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  signInStyle: {
    flex: 3,
    marginTop: 50,
  },
});
