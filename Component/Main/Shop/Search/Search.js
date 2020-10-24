/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, View, Image, Dimensions } from 'react-native';

import sp1 from '../../../../Image/media/temp/sp1.jpeg';
import sp4 from '../../../../Image/media/temp/sp4.jpeg';
import global from '../../../Oderhistory/global';
const url = 'http://192.168.0.103/api/images/product/';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
    global.setArraySearch = this.setSearchArray.bind(this);
  }

  setSearchArray(arrProduct) {
    this.setState({ arr: arrProduct });
  }

  gotoDetail(product) {
    const { navigation } = this.props;
    navigation.push('Detail', product);
  }
  render() {
    const {
      product, mainRight, txtMaterial, txtColor,
      txtName, txtPrice, productImage,
      txtShowDetail, showDetailContainer, wrapper,
    } = styles;

    return (
      <FlatList
        data={this.state.arr}
        renderItem={({ item }) => (
          <View style={wrapper}>
            <View style={product}>
              <Image source={{ uri: `${url}${item.images[0]}` }} style={productImage} />
              <View style={mainRight}>
                <Text style={txtName}>{toTitleCase(item.name)}</Text>
                <Text style={txtPrice}>{item.price}$</Text>
                <Text style={txtMaterial}>{item.material}</Text>
                <View style={{ flexDirection: 'row' }} >
                  <Text style={txtColor}>Color  {item.color}</Text>
                  <View style={{ flexDirection: 'row' }} >

                    <View
                      style={{
                        height: 15,
                        width: 15,
                        backgroundColor: 'white',
                        borderRadius: 15,
                        marginLeft: 10,
                      }}
                    />
                  </View>
                </View>
                <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoDetail(item)}>
                  <Text style={txtShowDetail}>SHOW DETAILS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

    );
  }
}
const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DFDFDF',
    flex: 1,
  },
  product: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center',
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between',
  },
  productController: {
    flexDirection: 'row',
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtColor: {
    paddingLeft: 20,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtMaterial: {
    paddingLeft: 20,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  showDetailContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 100,
  },
});

{/* <ScrollView style={wrapper}>
<View style={product}>
  <Image source={sp4} style={productImage} />
  <View style={mainRight}>
    <Text style={txtName}>{toTitleCase('black dress')}</Text>
    <Text style={txtPrice}>100$</Text>
    <Text style={txtMaterial}>Material Fur</Text>
    <View style={{ flexDirection: 'row' }} >
      <Text style={txtColor}>Color white</Text>
      <View style={{ flexDirection: 'row' }} >
        <Text style={txtColor}>Color white</Text>
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: 'white',
            borderRadius: 15,
            marginLeft: 10,
          }}
        />
      </View>
    </View>
    <TouchableOpacity style={showDetailContainer}>
      <Text style={txtShowDetail}>SHOW DETAILS</Text>
    </TouchableOpacity>
  </View>
</View>
</ScrollView> */}
