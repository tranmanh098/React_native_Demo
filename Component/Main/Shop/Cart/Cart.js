/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  Dimensions, StyleSheet, Image,
} from 'react-native';
import global from '../../../../Component/Oderhistory/global';
import sendOrder from '../../../api/sendOrder';
import getToken from '../../../api/getToken';

const url = 'http://192.168.0.103/api/images/product/';
function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class Main extends Component {
  incrQuatity(id) {
    global.incrQuantity(id);
  }
  decrQuantity(id) {
    global.decrQuantity(id);
  }
  removeProduct(id) {
    global.removeProduct(id);
  }
  gotoDetail(product) {
    const { navigation } = this.props;
    navigation.navigate('Detail', product);
  }
  async onSendOrder() {
    try {
      const token = await getToken();
      const arrayDetail = this.props.cartArray.map(e => ({
        id: e.product.id,
        quantity: e.quantity
      }));
      const kq = await sendOrder(token, arrayDetail);
      if (kq === 'THEM_THANH_CONG') {
        console.log('THEM THANH CONG');
      } else {
        console.log('THEM THAT BAI', kq);
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { main, checkoutButton, checkoutTitle, wrapper,
      productst, mainRight, productController,
      txtName, txtPrice, productImage, numberOfProduct,
      txtShowDetail, showDetailContainer } = styles;
    const { cartArray } = this.props;
    const arrTotal = cartArray.map(e => e.product.price * e.quatyti);
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
    //console.log(cartArray);
    return (
      <View style={wrapper}>
        <ScrollView style={main}>
          {cartArray.map(e => (
            <View style={productst}>
              <Image source={{ uri: `${url}${e.product.images[0]}` }} style={productImage} />
              <View style={[mainRight]}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <Text style={txtName}>{toTitleCase(e.product.name)}</Text>
                  <TouchableOpacity onPress={() => this.removeProduct(e.product.id)} >
                    <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={txtPrice}>{e.product.price}$</Text>
                </View>
                <View style={productController}>
                  <View style={numberOfProduct}>
                    <TouchableOpacity >
                      <Text onPress={() => this.decrQuantity(e.product.id)}>-</Text>
                    </TouchableOpacity>
                    <Text>{e.quatyti}</Text>
                    <TouchableOpacity onPress={() => this.incrQuatity(e.product.id)}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoDetail(e.product)}>
                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder.bind(this)}>
          <Text style={checkoutTitle}>TOTAL {total}$  CHECKOUT NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF',
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2ABB9C',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width, backgroundColor: '#DFDFDF',
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  productst: {
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
    fontSize: 20,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
