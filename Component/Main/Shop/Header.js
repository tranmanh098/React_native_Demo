/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import icLogo from '../../../Image/media/icons/ic_logo.png';
import icMenu from '../../../Image/media/icons/ic_menu.png';
import global from '../../../Component/Oderhistory/global';
import search from '../../api/searchProduct';

const { height, width } = Dimensions.get('window');
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: '',
    };
  }

  onSearch() {
    const { txtSearch } = this.state;
    this.setState({ txtSearch: '' });
    search(txtSearch)
      .then(arrProduct => {
        global.setArraySearch(arrProduct),
          console.log(arrProduct);
      })
      .catch(err => console.log(err));
  }
  render() {
    const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity onPress={this.props.op}>
            <Image source={icMenu} style={iconStyle} />
          </TouchableOpacity>
          <Text style={titleStyle}>Wearing a Dress</Text>
          <TouchableOpacity onPress={() => global.gotoContac()}>
            <Image source={icLogo} style={iconStyle} />
          </TouchableOpacity>

        </View>
        <TextInput
          style={textInput} placeholder="What do you want to buy?"
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ txtSearch: text })}
          value={this.state.txtSearch}
          onFocus={() => {
            global.gotoSearch()

          }}
          onSubmitEditing={this.onSearch.bind(this)}
        />
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    height: height / 7.5,
    backgroundColor: '#34B089',
    padding: 10,
    justifyContent: 'space-around',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 20,
  },
  textInput: { height: height / 18, backgroundColor: '#FFF', marginBottom: 10 },
  titleStyle: { padding: 5, color: '#FFF', fontFamily: 'Avenir', fontSize: 22 },
  iconStyle: { width: 30, height: 30 },
});
