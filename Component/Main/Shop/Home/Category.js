/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/*npm i --save react-native-swiper@next */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';


const url = 'http://192.168.0.103/api/images/type/';
const { width, height } = Dimensions.get('window');

export default class Category extends Component {
  gotoListproduct(category) {
    const { navigation } = this.props;
    navigation.push('ListProduct', category);
  }
  render() {
    const { types } = this.props;
    const { wrapper, textStyle, imageStyle } = styles;
    const swiper = (
      <Swiper showsPagination width={imageWidth} height={imageHeight} >
        {types.map(e => (
          <TouchableOpacity
            onPress={() => {
              this.gotoListproduct(e);
            }} key={e.id}>

            <Image source={{ uri: `${url}${e.image}` }} style={imageStyle} >

            </Image>

          </TouchableOpacity>
        ))}
      </Swiper>
    );
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={textStyle}>LIST COLLECTION</Text>
        </View>
        <View style={{ flex: 4 }}>
          {types.length ? swiper : null}
        </View>
      </View>
    );
  }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.33,
    width: width - 20,
    backgroundColor: '#FFF',
    margin: 5,
    marginLeft: 10,
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    padding: 10,
    paddingTop: 0,
  },
  textStyle: {
    fontSize: 20,
    color: '#AFAEAF',
  },
  imageStyle: {
    height: imageHeight,
    width: imageWidth,
  },
});
