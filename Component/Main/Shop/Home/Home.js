/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Collection from '../Home/Collection';
import Category from '../Home/Category';
import Topproduct from '../Home/TopProduct';

class Home extends Component {
  render() {
    const { navigation, types, topProducts } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#DBDBDB' }}>
          <Collection navigation={navigation} />
          <Category types={types} navigation={navigation} />
          <Topproduct topProducts={topProducts} navigation={navigation} />
        </ScrollView>
      </View>
    );
  }
}

export default Home;
