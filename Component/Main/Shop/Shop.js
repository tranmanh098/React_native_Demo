/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable prettier/prettier */
/**npm install react-native-tab-navigator --save */
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Contact from './Contact/Contact';
import Home from './Home/Home';
import Search from './Search/Search';
import Cart from './Cart/Cart';
import Header from './Header';
import initData from '../../api/initData';
import saveCart from '../../api/saveCart';
import getCart from '../../api/getCart';

import global from '../../Oderhistory/global';
import homeIconS from '../../../Image/media/icons/home.png';
import homeIcon from '../../../Image/media/icons/home0.png';
import cartIconS from '../../../Image/media/icons/cart.png';
import cartIcon from '../../../Image/media/icons/cart0.png';
import searchIconS from '../../../Image/media/icons/search.png';
import searchIcon from '../../../Image/media/icons/search0.png';
import contactIconS from '../../../Image/media/icons/contact.png';
import contactIcon from '../../../Image/media/icons/contact0.png';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home',
      types: [],
      topProducts: [],
      cartArray: [],
    };

    global.addProductToCart = this.addProductToCart.bind(this);
    global.incrQuantity = this.incrQuantity.bind(this);
    global.decrQuantity = this.decrQuantity.bind(this);
    global.removeProduct = this.removeProduct.bind(this);
    global.gotoSearch = this.gotoSearch.bind(this);
    global.gotoContac = this.gotoContac.bind(this);
  }

  openMenu() {
    const { open } = this.props;
    open();
  }
  componentDidMount() {
    initData()
      .then(resJSON => {
        //console.log(resJSON);
        const { type, product } = resJSON;
        this.setState({ types: type, topProducts: product });
        //console.log('OK');
      })
      .catch((er) => {
        console.log(er);
      });

    getCart()
      .then(cartArray => this.setState({ cartArray }));
  }
  gotoSearch() {
    this.setState({ selectedTab: 'Search' });
  }
  gotoContac() {
    this.setState({ selectedTab: 'Contact' });
  }

  addProductToCart(product) {
    var quatyti = 1;
    const isExist = this.state.cartArray.some(e => e.product.id === product.id);
    if (isExist) {
      quatyti = quatyti + 1;
      return;
    }
    this.setState({ cartArray: this.state.cartArray.concat({ product, quatyti }) },
      () => saveCart(this.state.cartArray)
    );
  }
  incrQuantity(productId) {
    const newCart = this.state.cartArray.map(e => {
      if (e.product.id !== productId) { return e; }
      return { product: e.product, quatyti: e.quatyti + 1 };
    });
    this.setState({ cartArray: newCart },
      () => saveCart(this.state.cartArray));
  }
  decrQuantity(productId) {
    const newCart = this.state.cartArray.map(e => {
      if (e.product.id !== productId) { return e; }
      return { product: e.product, quatyti: e.quatyti - 1 };
    });
    this.setState({ cartArray: newCart },
      () => saveCart(this.state.cartArray)
    );
  }
  removeProduct(productId) {
    const newCart = this.state.cartArray.filter(e => e.product.id !== productId);
    this.setState({ cartArray: newCart },
      () => saveCart(this.state.cartArray)
    );
  }

  render() {
    const { types, topProducts, selectedTab, cartArray } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <Header op={this.openMenu.bind(this)} />
        </View>
        <TabNavigator>
          <TabNavigator.Item
            selected={selectedTab === 'Home'}
            title="Home"
            renderIcon={() => (
              <Image source={homeIcon} style={styles.iconStyle} />
            )}
            renderSelectedIcon={() => (
              <Image source={homeIconS} style={styles.iconStyle} />
            )}
            selectedTitleStyle={{ color: '#000' }}
            onPress={() => this.setState({ selectedTab: 'Home' })}>
            <Home types={types} topProducts={topProducts} navigation={navigation} />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={selectedTab == 'Cart'}
            title="Cart"
            renderIcon={() => (
              <Image source={cartIcon} style={styles.iconStyle} />
            )}
            renderSelectedIcon={() => (
              <Image source={cartIconS} style={styles.iconStyle} />
            )}
            badgeText={cartArray.length}
            selectedTitleStyle={{ color: '#000' }}
            onPress={() => this.setState({ selectedTab: 'Cart' })}>
            <Cart cartArray={cartArray} navigation={navigation} />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={selectedTab == 'Search'}
            title="Search"
            renderIcon={() => (
              <Image source={searchIcon} style={styles.iconStyle} />
            )}
            renderSelectedIcon={() => (
              <Image source={searchIconS} style={styles.iconStyle} />
            )}
            selectedTitleStyle={{ color: '#000' }}
            onPress={() => this.setState({ selectedTab: 'Search' })}>
            <Search navigation={navigation} />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'Contact'}
            title="Contact"
            renderIcon={() => (
              <Image source={contactIcon} style={styles.iconStyle} />
            )}
            renderSelectedIcon={() => (
              <Image source={contactIconS} style={styles.iconStyle} />
            )}
            selectedTitleStyle={{ color: '#000' }}
            onPress={() => this.setState({ selectedTab: 'Contact' })}>
            <Contact />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
  },
});
