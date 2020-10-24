/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SectionList,
} from 'react-native';


const url = 'http://192.168.0.103/api/images/product/';
export default class TopProduct extends Component {

  gotoDetail(product) {
    const { navigation } = this.props;
    navigation.navigate('Detail', product);
  }
  render() {
    const {
      container,
      titleContainer,
      title,
      body,
      productContainer,
      productImage,
      produceName,
      producePrice,
    } = styles;
    const { topProducts } = this.props;
    //console.log(topProducts);
    return (

      <View style={container}>
        <View style={titleContainer}>
          <Text style={title}>TOP PRODUCT</Text>
        </View>
        <View style={body}>
          {topProducts.map(e => (
            <TouchableOpacity
              onPress={() => {
                this.gotoDetail(e);
              }}
              style={productContainer} key={e.id}>
              <Image source={{ uri: `${url}${e.images[0]}` }} style={productImage} />
              <Text style={produceName}>{e.name.toUpperCase()}</Text>
              <Text style={producePrice}>{e.price}$</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const produtWidth = (width - 50) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  titleContainer: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {
    color: '#D3D3CF',
    fontSize: 20,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
  productContainer: {
    width: produtWidth,
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  productImage: {
    width: produtWidth,
    height: productImageHeight,
  },
  produceName: {
    marginVertical: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#D3D3CF',
    fontWeight: '500',
  },
  producePrice: {
    marginBottom: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#662F90',
  },
});
