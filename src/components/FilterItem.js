import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Platform, StyleSheet, PixelRatio, ListView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import px2dp from '../util/px2dp';
import Util from '../util/utils';
import theme from '../config/theme';
export default class FilterItem extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let item = this.props.item;
    for (let i in item) {
      item[i].selected = false;
    }
    item[0].selected = true;
    this.state = {
      dataSource: ds.cloneWithRows(this.props.item),
      lastRowID: 0
    }
  };
  static PropTypes = {
    activeItem: PropTypes.object.isRequired,
    item: PropTypes.array.isRequired,
    style: View.propTypes.style,
    height: PropTypes.number,
    show: PropTypes.bool.isRequired,
    onPress: PropTypes.func
  };
  static defaultProps = {
    activeItem: {
      key: '',
      name: '全部'
    },
    item: [{
      key: '',
      name: '全部'
    }],
    style: null,
    height: 0,
    show: false
  };
  _itemClickCallback (rowData, rowID) {
    let item = this.props.item;
    item[this.state.lastRowID].selected = false;
    item[rowID].selected = true;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // 保存上次点击序列号
    this.state.lastRowID = rowID;
    this.setState({
      dataSource: ds.cloneWithRows(item)
    });
    // 返回点击事件
    this.props.onPress(rowData);
  };
  _renderItem (rowData, sectionID, rowID, highlightRow) {
    if(Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          onPress={this._itemClickCallback.bind(this, rowData, rowID)}
          activeOpacity={theme.btnActiveOpacity}>
          {this._renderItemContent(rowData)}
        </TouchableOpacity>
      )
    }else if(Platform.OS === 'android'){
      return (
        <TouchableNativeFeedback onPress={this._itemClickCallback.bind(this, rowData, rowID)}>
          {this._renderItemContent(rowData)}
        </TouchableNativeFeedback>
      )
    }
  };
  _renderItemContent (rowData) {
    return (
      <View style={[styles.item]}>
        <Text style={[styles.itemIcon, rowData.selected ? styles.iconActive : null]}>&#xe6cb;</Text>
        <Text style={[styles.itemText,  rowData.selected ? styles.textActive : null]}>{rowData.name}</Text>
      </View>
    )
  };
  render () {
    const {show, height} = this.props;
    if (show) {
      return (
        <View style={[styles.slide, {height: height ? height : null}]}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
          />
        </View>
      )
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  slide: {
    position: 'absolute',
    width: Util.screen.width,
    backgroundColor: '#fff',
    top: px2dp(41),
    left: 0,
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2',
    height: px2dp(42),
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  itemIcon: {
    width: px2dp(40),
    textAlign: 'center',
    fontFamily: 'iconfont',
    lineHeight: px2dp(45),
    fontSize: px2dp(12),
    opacity: 0
  },
  itemText: {
    fontSize: px2dp(12),
    color: '#333',
    lineHeight: px2dp(40)
  },
  iconActive: {
    color: '#ff634e',
    fontSize: px2dp(12),
    opacity: 1
  },
  textActive: {
    color: '#ff634e'
  }
});