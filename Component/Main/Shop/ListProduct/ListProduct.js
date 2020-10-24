/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
} from 'react-native';

import backList from '../../../../Image/media/icons/backList.png';
import sp1 from '../../../../Image/media/temp/sp1.jpeg';
import sp2 from '../../../../Image/media/temp/sp2.jpeg';
import sp3 from '../../../../Image/media/temp/sp3.jpeg';
import sp4 from '../../../../Image/media/temp/sp4.jpeg';

import getListProduct from '../../../api/getListProduct';

const url = 'http://192.168.0.103/api/images/product/';
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        //const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            //listProducts: ds,
            refreshing: false,
            page: 1,
            arr: [],
        };

    }
    componentDidMount() {
        const { route } = this.props;
        const idType = route.params.id;
        getListProduct(idType, this.state.page)
            .then(arrProduct => {
                console.log(arrProduct);
                this.setState({ arr: arrProduct });
                console.log('arrProduct');
                console.log(this.state.arr);
            })
            .catch(err => console.log(err));
    }

    gotoDetail(product) {
        const { navigation } = this.props;
        navigation.push('Detail', product);
    }
    gotoBack() {
        const { navigation } = this.props;
        navigation.goBack();
    }
    render() {
        const {
            container,
            header,
            wrapper,
            backStyle,
            titleStyle,
            productContainer,
            productImage,
            productInfo,
            lastRowInfo,
            txtName,
            txtPrice,
            txtMaterial,
            txtColor,
            txtShowDetail,
        } = styles;
        console.log('AAAAAAAAAAAAAAAA');
        console.log(this.state.arr);
        return (
            <View>
                <View style={header}>
                    <TouchableOpacity onPress={this.gotoBack.bind(this)}>
                        <Image source={backList} style={backStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Party Dress</Text>
                    <View style={{ width: 30 }} />
                </View>
                <FlatList
                    data={this.state.arr}
                    renderItem={({ item }) => (
                        <View style={productContainer}>
                            <Image style={productImage} source={{ uri: `${url}${item.images[0]}` }} />
                            <View style={productInfo}>
                                <Text style={txtName}>{toTitleCase(item.name)}</Text>
                                <Text style={txtPrice}>{item.price}$</Text>
                                <Text style={txtMaterial}>{item.material}</Text>
                                <View style={lastRowInfo}>
                                    <Text style={txtColor}>{item.color}</Text>
                                    <View
                                        style={{
                                            backgroundColor: 'cyan',
                                            height: 16,
                                            width: 16,
                                            borderRadius: 8,
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.gotoDetail(item);
                                        }}>
                                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    refreshing={false}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        const newPage = this.state.page + 1;
                        const { route } = this.props;
                        const idType = route.params.id;
                        getListProduct(idType, newPage)
                            .then(arrProduct => {
                                console.log(arrProduct);
                                this.setState({ arr: arrProduct });
                                console.log('arrProduct');
                                console.log(this.state.arr);
                            })
                            .catch(err => console.log(err));
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBDBD8',
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    wrapper: {
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 10,
        paddingHorizontal: 10,
    },
    backStyle: {
        width: 30,
        height: 30,
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1,
    },
    titleStyle: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 20,
    },
    productImage: {
        width: 90,
        height: (90 * 452) / 361,
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1,
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '400',
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#B10D65',
    },
    txtMaterial: {
        fontFamily: 'Avenir',
    },
    txtColor: {
        fontFamily: 'Avenir',
    },
    txtShowDetail: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 11,
    },
});
{/* <ScrollView style={wrapper}>

<View style={productContainer}>
    <Image style={productImage} source={sp1} />
    <View style={productInfo}>
        <Text style={txtName}>Lace Sleeve Si</Text>
        <Text style={txtPrice}>117$</Text>
        <Text style={txtMaterial}>Material silk</Text>
        <View style={lastRowInfo}>
            <Text style={txtColor}>Colo RoyalBlue</Text>
            <View
                style={{
                    backgroundColor: 'cyan',
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    this.gotoDetail();
                }}>
                <Text style={txtShowDetail}>SHOW DETAILS</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>
</ScrollView> */}
