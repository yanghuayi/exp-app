/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, PixelRatio, TouchableOpacity, TouchableNativeFeedback, ListView, Image, ActivityIndicator, StatusBar} from 'react-native';


import theme from '../config/theme';
import px2dp from '../util/px2dp';
import IconButton from '../components/IconButton';
import FilterItem from '../components/FilterItem';
import dataAddress from '../json/address.json';
import DataList from '../json/need.json';
import Util from '../util/utils';
import NeedDetail from './need/NeedDetail';
export default class HomeFragment extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let address = ['重庆市', '重庆市'];
    let addressId = null;
    let filterAddress = [{
      name: '重庆市',
      value: ''
    }];
    for (let i in dataAddress) {
      if (dataAddress[i].name === address[1]) {
        addressId = dataAddress[i].value;
        i = dataAddress.length
      }
    }
    for (let j in dataAddress) {
      if (dataAddress[j].parent === addressId) {
        filterAddress.push(dataAddress[j])
      }
    }
    this.state = {
      filterState: {
        key: '',
        name: '全部'
      },
      stateList: DataList.stateList,
      filterType: {
        key: '',
        name: '全部'
      },
      typeList: DataList.typeList,
      showState: false,
      showType: false,
      showAddress: false,
      filterAddress: {
        name: '重庆市',
        value: ''
      },
      addressList: filterAddress,
      dataList: DataList.contentList,
      dataSource: ds.cloneWithRows(DataList.contentList)
    };
  };
  _filter (type) {
    const self = this;
    switch (type) {
      case 'state':
        if (this.state.showState) {
          self.setState({
            showState: false
          });
        } else {
          self.setState({
            showState: true,
            showType: false,
            showAddress: false
          })
        }
        break;
      case 'type':
        if (this.state.showType) {
          self.setState({
            showType: false
          });
        } else {
          self.setState({
            showType: true,
            showState: false,
            showAddress: false
          })
        }
        break;
      case 'address':
        if (this.state.showAddress) {
          self.setState({
            showAddress: false
          });
        } else {
          self.setState({
            showAddress: true,
            showType: false,
            showState: false
          })
        }
        break;
    }
  };
  _readerFilter (type, text, filter, active) {
    if(Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          style={[styles.filterItem]}
          onPress={this._filter.bind(this, type)}
          activeOpacity={theme.btnActiveOpacity}>
            <Text style={[styles.textName, active ? styles.onFtext : null]}>{filter.name === '全部' ? text : filter.name}</Text>
            <Text style={[styles.filterIcon, active ? styles.onFicon: null]}>&#xe6ca;</Text>
        </TouchableOpacity>
      )
    }else if(Platform.OS === 'android'){
      return (
        <TouchableNativeFeedback style={[styles.filterItem]} onPress={this._filter.bind(this, type)}>
          <View style={[styles.androidFilter]}>
            <Text style={[styles.textName, active ? styles.onFtext : null]}>{filter.name === '全部' ? text : filter.name}</Text>
            <Text style={[styles.filterIcon, styles.androidFilterIcon, active ? styles.onAFicon: null]}>&#xe6ca;</Text>
          </View>
        </TouchableNativeFeedback>
      )
    }
  };
  _itemClickCallback (rowData) {
    this.props.navigation.navigate('NeedDetail', {needId: rowData.id})
  };
  _renderItem (rowData, sectionID, rowID, highlightRow) {
    if(Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          onPress={this._itemClickCallback.bind(this, rowData)}
          activeOpacity={theme.btnActiveOpacity}>
          {this._renderItemContent(rowData)}
        </TouchableOpacity>
      )
    }else if(Platform.OS === 'android'){
      return (
        <TouchableNativeFeedback onPress={this._itemClickCallback.bind(this, rowData)}>
          {this._renderItemContent(rowData)}
        </TouchableNativeFeedback>
      )
    }
  };
  _renderType (type) {
    let typeStyle = StyleSheet.create({
      xc: {
        backgroundColor: '#ff634e'
      },
      sd: {
        backgroundColor: '#4ebeff'
      },
      nw: {
        backgroundColor: '#ff8c4e'
      },
      mg: {
        backgroundColor: '#34d77a'
      },
      qg: {
        backgroundColor: '#13ddc8'
      }
    });
    let typeIconColor = [typeStyle.xc, typeStyle.sd, typeStyle.nw, typeStyle.mg, typeStyle.qg];
    let icon = null;
    switch (type.id) {
      case 3:
        icon = <Text style={styles.itemTypeIcon}>&#xe75c;</Text>;
        break;
      case 4:
        icon = <Text style={[styles.itemTypeIcon, {top: px2dp(1.5)}]}>&#xe7ec;</Text>;
        break;
      case 5:
        icon = <Text style={styles.itemTypeIcon}>&#xe609;</Text>;
        break;
      case 6:
        icon = <Text style={styles.itemTypeIcon}>&#xe60a;</Text>;
        break;
      case 7:
        icon = <Text style={styles.itemTypeIcon}>&#xe60c;</Text>;
        break;
    }
    return (
      <View style={[styles.itemType, typeIconColor[type.id - 3]]}>
        {icon}
        <Text style={[styles.itemTypeText]}>{type.name}</Text>
      </View>
    )
  };
  _renderItemContent (rowData) {
    return (
      <View style={[styles.itemWrap, rowData.state === 'end' ? styles.itemDis : null]}>
        <View style={[styles.itemTop]}>
          <Image style={styles.itemImg} source={{uri: rowData.img}} />
          <View style={styles.itemCon}>
            <View style={[styles.itemLine, {}]}>
              <Text style={styles.itemName}>{rowData.name}</Text>
              {this._renderType(rowData.type)}
              <Text style={styles.itemTime}>{rowData.time}</Text>
            </View>
            <View style={[styles.itemLine, {}]}>
              <Text style={styles.itemMIcon}>&#xe6c8;</Text>
              <Text style={styles.itemMText}>装修类型：{rowData.siteType}</Text>
            </View>
            <View style={[styles.itemLine, {top: px2dp(-6)}]}>
              <Text style={styles.itemMIcon}>&#xe6c5;</Text>
              <Text style={styles.itemMText}>装修地址：{rowData.address}</Text>
            </View>
            <Image style={[rowData.state === 'end' ? styles.itemEnd : styles.none]} source={require('../images/need-state-end.png')} />
          </View>
        </View>
        <View style={styles.itemBtm}>
          <View style={styles.itemBtmItem}>
            <Text style={styles.btmIcon}>&#xe6c6;</Text>
            <Text style={styles.btmText}>户型：{rowData.layout}</Text>
          </View>
          <View style={[styles.itemBtmItem, {borderRightWidth: 0}]}>
            <Text style={styles.btmIcon}>&#xe6cc;</Text>
            <Text style={styles.btmText}>面积：{rowData.area}</Text>
          </View>
        </View>
      </View>
    )
  };
  _closeFilter () {
    if (this.state.showType) {
      this.setState({
        showType: false
      })
    } else if (this.state.showState) {
      this.setState({
        showState: false
      })
    } else if (this.state.showAddress) {
      this.setState({
        showAddress: false
      })
    }
  };
  _loadData () {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let oldData = this.state.dataList;
    oldData.push.apply(oldData, DataList.contentList);
    // alert(oldData.length);
    this.setState({
      dataList: oldData,
      dataSource: ds.cloneWithRows(oldData)
    })
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <IconButton text="&#xe6c9;" btnStyle={styles.mapBtn}/>
      ),
    };
  };
  render () {
    const {filterState, filterType, filterAddress, showState, showType, showAddress} = this.state;
    let showMask = false;
    if (showState || showType || showAddress) {
      showMask = false;
    } else {
      showMask = true;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='transparent'
          translucent={true}
          barStyle="light-content"
        />
        {/*<View style={styles.header}>
          <Text style={styles.headerTitle}>需求大厅</Text>
          <IconButton text="&#xe6c9;" btnStyle={styles.mapBtn}/>
        </View>*/}
        <View style={styles.filterWrap}>
          {this._readerFilter('state', '招标状态', filterState, showState)}
          {this._readerFilter('type', '需求类型', filterType, showType)}
          {this._readerFilter('address', '重庆市', filterAddress, showAddress)}
          <FilterItem
            activeItem={this.state.filterState}
            item={this.state.stateList}
            show={showState}
            onPress={(data) => {
              this.setState({
                showState: false,
                filterState: data
              })
            }}
          />
          <FilterItem
            activeItem={this.state.filterType}
            item={this.state.typeList}
            show={showType}
            onPress={(data) => {
              this.setState({
                showType: false,
                filterType: data
              })
            }}
          />
          <FilterItem
            activeItem={this.state.filterAddress}
            item={this.state.addressList}
            show={showAddress}
            height={250}
            onPress={(data) => {
              this.setState({
                showAddress: false,
                filterAddress: data
              })
            }}
          />
        </View>
        <View style={styles.contentWrap}>
          <Text
            style={[styles.mask, showMask ? styles.hideMask : null]}
            onPress={this._closeFilter.bind(this)}
          ></Text>
          <ListView
            dataSource={this.state.dataSource}
            onEndReached={this._loadData.bind(this)}
            renderRow={this._renderItem.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: px2dp(60),
    backgroundColor: '#ff634e',
    paddingTop: px2dp(30)
  },
  contentWrap: {
    height: Util.screen.height - px2dp(60) - px2dp(92)
  },
  mask: {
    position: 'absolute',
    width: Util.screen.width,
    height: Util.screen.height,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    zIndex: 3
  },
  hideMask: {
    height: 0,
    width: 0
  },
  mapBtn: {
    position: 'absolute',
    right: px2dp(10),
    bottom: px2dp(12),
    fontFamily: 'iconfont'
  },
  headerTitle: {
    fontSize: px2dp(16),
    textAlign: 'center',
    color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  text: {
    color: theme.text.color,
    fontSize: theme.text.fontSize
  },
  filterWrap: {
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px2dp(8),
    paddingBottom: px2dp(8),
    zIndex: 8,
  },
  filterItem: {
    paddingTop: px2dp(6),
    paddingBottom: px2dp(6),
    color: '#666666',
    fontSize: px2dp(12),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRightWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2'
  },
  androidFilter: {
    width: Util.screen.width / 3,
    borderRightWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  androidFilterIcon: {
    position: 'relative',
    top: px2dp(6)
  },
  onAFicon: {
    color: '#ff634e',
    transform: [{rotate: '180deg'}, {translateX: px2dp(-5)}, {translateY: px2dp(11)}]
  },
  textName: {
    color: '#666',
    fontSize: px2dp(12)
  },
  filterIcon: {
    fontFamily: 'iconfont',
    fontSize: px2dp(6),
    color: '#cccbca',
    paddingLeft: px2dp(5),
    top: px2dp(3.5)
  },
  onFtext: {
    color: '#ff634e'
  },
  onFicon: {
    color: '#ff634e',
    transform: [{rotate: '180deg'}, {translateX: px2dp(-5)}, {translateY: px2dp(7)}]
  },
  itemWrap: {
    backgroundColor: '#fff',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2',
    marginTop: px2dp(5)
  },
  itemTop: {
    padding: px2dp(12),
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2',
    flexDirection: 'row'
  },
  itemImg: {
    width: px2dp(70),
    height: px2dp(70),
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2'
  },
  itemCon: {
    marginLeft: px2dp(10),
    flex: 5
  },
  itemLine: {
    flex: 1,
    flexDirection: 'row'
  },
  itemName: {
    fontSize: px2dp(13),
    color: '#333333'
  },
  itemType: {
    flexDirection: 'row',
    backgroundColor: '#13ddc8',
    height: px2dp(16),
    borderRadius: px2dp(10),
    overflow: 'hidden',
    marginLeft: px2dp(5),
    paddingLeft: px2dp(6),
    paddingRight: px2dp(8),
    top: px2dp(-1)
  },
  itemTypeIcon: {
    fontFamily: 'iconfont',
    fontSize: px2dp(10),
    color: '#fff',
    lineHeight: px2dp(12),
    marginRight: px2dp(4)
  },
  itemTypeText: {
    fontSize: px2dp(10),
    color: '#fff',
    lineHeight: Platform.OS === 'ios' ? px2dp(12) : px2dp(14)
  },
  itemTime: {
    fontSize: px2dp(11),
    position: 'absolute',
    right: 0,
    color: '#999999'
  },
  itemMIcon: {
    fontFamily: 'iconfont',
    color: '#cbcbc5',
    lineHeight: px2dp(16),
    width: px2dp(18),
    top: px2dp(1.5)
  },
  itemMText: {
    color: '#999999',
    fontSize: px2dp(11),
    lineHeight: px2dp(16)
  },
  itemBtm: {
    padding: px2dp(6),
    flexDirection: 'row'
  },
  itemBtmItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    borderRightWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2'
  },
  btmIcon: {
    fontFamily: 'iconfont',
    color: '#ff8c4e',
    lineHeight: px2dp(18),
    marginRight: px2dp(5)
  },
  btmText: {
    color: '#666666',
    fontSize: px2dp(11),
    lineHeight: px2dp(18)
  },
  itemDis: {
    backgroundColor: '#e2e2e2'
  },
  itemEnd: {
    width: px2dp(68),
    height: px2dp(24),
    position: 'absolute',
    right: px2dp(0),
    bottom: px2dp(0),
    zIndex: 3
  },
  none: {
    width: 0,
    height: 0
  }
});