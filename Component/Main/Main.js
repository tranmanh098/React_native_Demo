/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**npm install --save react-native-drawer */
import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import Shop from './Shop/Shop';
import checkLogin from '../../Component/api/checkLogin';
import getToken from '../../Component/api/getToken';
import global from '../../Component/Oderhistory/global';



export default class Main extends Component {
  componentDidMount() {
    getToken()
      .then(token => checkLogin(token))
      .then(res => global.onSignIn(res.user))
      .catch(err => console.log('LOI CHECK LOGIN', err));
  }
  gotoAuthentication() {
    const { navigation } = this.props;
    navigation.push('Authentication');
  }
  gotoChangeinfo() {
    const { navigation } = this.props;
    navigation.push('Changeinfo');
  }
  gotoOderhistory() {
    const { navigation } = this.props;
    navigation.push('Oderhistory');
  }

  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
    const { navigation } = this.props;
    return (
      <Drawer
        ref={(ref) => (this._drawer = ref)}
        openDrawerOffset={0.3}
        tapToClose={true}
        content={<Menu navigation={navigation} />}>
        <Shop open={this.openControlPanel.bind(this)} navigation={navigation} />
      </Drawer>
    );
  }
}
