import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, Image, ScrollView, Platform, TouchableOpacity, LayoutAnimation} from 'react-native';
import {Components} from 'expo';

import InsideBar from '../../components/InsideBar';
import Data from '../../json/needDetail.json';
import Utils from '../../util/utils';
import px2dp from '../../util/px2dp';
import Button from '../../components/Button';
import NeedSilde from '../../components/NeedSilde';
import { countdown } from '../../util/tool';

export default class NeedDetail extends Component {
	constructor(props) {
    super(props);
    this._amap = null;
    this.timer = null;
    this.state = {
      position: 1,
      interval: null,
      typeIcon: ['&#xe75c;', '&#xe7ec;', '&#xe609;', '&#xe60a;', '&#xe60c;'],
      _coordinate: {
        latitude: 29.61336,
        longitude: 106.309026
      },
      headerBg: 'rgba(244,148,77, 0)',
      showBtn: false,
      btnText: '投标',
      btnDis: false,
      slideShow: false,
      slideHeight: px2dp(285),
      time: null
    };
  };
  componentWillMount () {
    this.setState({interval: setInterval(() => {
      this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
    }, 4000)});
    this._timer();
  };
  componentWillUnmount() {
    clearInterval(this.state.interval);
    clearInterval(this.timer);
  };
  _setImageCarousel = (imageCarousel) => {
    this._imageCarousel = imageCarousel;
  };
	_back () {
    if (this.state.slideShow) {
      LayoutAnimation.spring();
      this.setState({
        slideShow: false,
        slideHeight: px2dp(285)
      });
    } else {
      this.props.navigation.goBack(null);
    }
	};
  _renderMsg () {
    let Icon = [
      require('../../images/need-icon1.png'),
      require('../../images/need-icon2.png'),
      require('../../images/need-icon3.png'),
      require('../../images/need-icon4.png')
    ];
    return (
      <View style={[styles.needMsg, this.state.slideShow ? styles.needMsgHide : null]}>
        {
          Icon.map(function (icon, index) {
            return (
              <View key={index} style={[styles.needItem]}>
                <Image resizeMode="contain" style={styles.needItemIcon} source={icon} />
                <Text style={[styles.needItemTxt]}>{Data.needDetail.Msg[index]}</Text>
              </View>
            )
          })
        }
      </View>
    )
  };
  _renderType (id) {
    switch (id) {
      case '3':
        return <Text style={[styles.typeIcon]}>&#xe75c;</Text>;
        break;
      case '4':
        return <Text style={[styles.typeIcon]}>&#xe7ec;</Text>;
        break;
      case '5':
        return <Text style={[styles.typeIcon]}>&#xe609;</Text>;
        break;
      case '6':
        return <Text style={[styles.typeIcon]}>&#xe60a;</Text>;
        break;
      case '7':
        return <Text style={[styles.typeIcon]}>&#xe60c;</Text>;
        break;
    }
  };
  _onScroll (e) {
    let scrollTop = e.nativeEvent.contentOffset.y;
    this.setState({
      headerBg: 'rgba(255,99,78, ' + (scrollTop / 150) + ')'
    })
    if (scrollTop > 200) {
      if (!this.state.showBtn) {
        this.setState({
          showBtn: true
        })
      }
    } else {
      if (this.state.showBtn) {
        this.setState({
          showBtn: false
        })
      }
    }
  };
  _timer () {
    const self = this
    this.timer = setInterval(function () {
      self.setState({
        time: countdown(Data.needDetail.endTime)
      })
    }, 1000);
  };
  _showBanner () {
    LayoutAnimation.spring();
    this.setState({
      slideShow: true,
      slideHeight: Utils.screen.height
    })
  };
  render () {
    return (
      <View style={[styles.pageWrap]}>
        <InsideBar style={[styles.insideBar, {backgroundColor: this.state.headerBg}]} back={this._back.bind(this)} title="需求详情" />
        <ScrollView
          scrollEventThrottle={60} 
          contentContainerStyle={styles.contentContainer} 
          onScroll={this._onScroll.bind(this)}
          scrollEnabled={!this.state.slideShow}>
          <NeedSilde 
            height={this.state.slideHeight} 
            show={this.state.slideShow} 
            images={Data.needDetail.sildeImage} 
            textList={Data.needDetail.sildeText}
            showSide={this.state.slideShow}
            onPress={this._showBanner.bind(this)} />
          {this._renderMsg()}
          <View style={[styles.needType]}>
            <View style={[styles.typeWrap]}>
              {this._renderType(Data.needDetail.needType)}
              <Text style={[styles.typeText]}>{Data.needDetail.typeText}</Text>
            </View>
            <View style={[styles.timeWrap]}>
              <View style={[styles.timeLeft]}>
                <Text style={[styles.timeTxt]}>{this.state.time}</Text>
                <View style={[styles.timeLine]}>
                  <View style={[styles.timeEnd, {width: px2dp(Data.needDetail.progress * 1.2)}]}></View>
                  <Text style={[styles.timeEndTxt]}>60%已投标</Text>
                </View>
              </View>
              <Text style={[styles.timeIcon]}>&#xe62d;</Text>
            </View>
          </View>
          <View style={[styles.workerWrap]}>
            <View style={[styles.workerImgWrap]}>
              {
                Data.needDetail.workerHead.map(function (img, index) {
                  return (
                    <Image key={index} style={[styles.workerHead]} source={{uri: img}} />
                  )
                })
              }
              <Text style={[styles.workerMore]}>...</Text>
            </View>
            <View style={[styles.workerLink]}>
              <Text style={[styles.workerNum]}>{Data.needDetail.workerMore}</Text>
              <Text style={[styles.workerArrow]}>&#xe634;</Text>
            </View>
          </View>
          <View style={[styles.engineering]}>
            <Text style={[styles.engTitle]}>需求招标详情</Text>
            {
              Data.needDetail.engineering.map(function (item) {
                return (
                  <View style={[styles.engItem]}>
                    <Text style={[styles.engName]}>{item.name}</Text>
                    <Text style={[styles.engValue]}>{item.value}</Text>
                  </View>
                )
              })
            }
            <Text style={[styles.engMore]}>查看更多详情</Text>
          </View>
          <View style={[styles.otherMsg]}>
            <Text style={[styles.otherTitle]}>其他需求说明</Text>
            <Text style={[styles.otherTxt]}>
              {Data.needDetail.otherMsg}
            </Text>
          </View>
          <View style={[styles.MapWrap]}>
            <Text style={[styles.MapTitle]}>
              <Text style={[styles.MapIcon]}>&#xe6c9;</Text>
              <Text style={{paddingLeft: px2dp(5)}}>{Data.needDetail.needAddress}</Text>
            </Text>
          </View>
					<View style={[styles.mapWrap]}>
            <Components.MapView
              style={{ flex: 1, height: px2dp(200) }}
              initialRegion={{
                latitude: this.state._coordinate.latitude,
                longitude: this.state._coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
					</View>
        </ScrollView>
        <View style={[styles.btmCon, this.state.showBtn ? null : styles.none]}>
          <View style={[styles.btmTime]}>
            <Text style={[styles.btmTimeText]}>截止时间：<Text style={[styles.timeNum]}>12天22小时32分12秒</Text></Text>
          </View>
          <Button text={this.state.btnText} disabled={this.state.btnDis} onPress={this.tender.bind(this)} btnStyle={[styles.btmBtn]} disabledStyle={[styles.btmBtnDis]} />
        </View>
      </View>
    )
  };
  tender () {};
}
const styles = StyleSheet.create({
  image: {
    width: Utils.screen.width,
    height: 300
  },
  none: {
    opacity: 0
  },
  pageWrap: {
    backgroundColor: '#f9f5f2'
  },
  insideBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 9,
    width: Utils.screen.width
  },
  needSlide: {
    flex: 1
  },
  contentContainer: {
    // height: Utils.screen.height,
  },
  needMsg: {
    width: Utils.screen.width - 20,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    top: px2dp(235),
    zIndex: 9,
    paddingTop: px2dp(10),
    paddingBottom: px2dp(5),
    shadowColor: '#bdb5af',
    shadowOffset: {
      h: 5,
      w: 10
    },
    shadowOpacity:0.75,
    shadowRadius: 10
  },
  needMsgHide: {
    zIndex: 0,
    top: Utils.screen.height
  },
  needItem: {
  },
  needItemIcon: {
    width: (Utils.screen.width - 170) / 4,
    height: (Utils.screen.width - 170) / 4
  },
  needItemTxt: {
    fontSize: px2dp(12),
    textAlign: 'center',
    lineHeight: px2dp(24)
  },
  needType: {
    marginTop: px2dp(50),
    backgroundColor: '#ff634e',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeWrap: {
    width: px2dp(120),
    height: px2dp(30),
    backgroundColor: '#fff',
    borderRadius: px2dp(15),
    overflow: 'hidden',
    marginLeft: px2dp(10),
    marginTop: px2dp(15),
    marginBottom: px2dp(15),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  typeIcon: {
    fontFamily: 'iconfont',
    lineHeight: px2dp(28),
    marginRight: px2dp(5),
    color: '#ff634e'
  },
  typeText: {
    lineHeight: px2dp(28),
    color: '#ff634e'
  },
  timeWrap: {
    paddingRight: px2dp(40)
  },
  timeTxt: {
    fontSize: px2dp(10),
    color: '#fff',
    marginTop: px2dp(10)
  },
  timeLine: {
    backgroundColor: '#ffffff',
    marginTop: px2dp(5),
    height: px2dp(18),
    width: px2dp(120)
  },
  timeEnd: {
    backgroundColor: '#fd8979',
    height: px2dp(18)
  },
  timeEndTxt: {
    fontSize: px2dp(12),
    textAlign: 'center',
    lineHeight: px2dp(18),
    position: 'absolute',
    top: 0,
    width: px2dp(120),
    backgroundColor: 'transparent',
    color: '#814a21'
  },
  timeIcon: {
    fontFamily: 'iconfont',
    position: 'absolute',
    right: 0,
    top: 0,
    width: px2dp(40),
    textAlign: 'center',
    lineHeight: px2dp(56),
    fontSize: px2dp(30),
    color: '#fff'
  },
  workerWrap: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: px2dp(10),
    marginTop: px2dp(10),
    marginBottom: px2dp(10),
    justifyContent: 'space-between'
  },
  workerImgWrap: {
    flexDirection: 'row'
  },
  workerHead: {
    height: px2dp(40),
    width: px2dp(40),
    borderRadius: px2dp(20),
    marginRight: px2dp(5)
  },
  workerLink: {
    flexDirection: 'row',
    marginTop: px2dp(10)
  },
  workerNum: {
    color: '#666666'
  },
  workerArrow: {
    fontFamily: 'iconfont',
    fontSize: px2dp(12),
    marginLeft: px2dp(5),
    position: 'relative',
    top: px2dp(2),
    color: '#999'
  },
  workerMore: {
    fontSize: px2dp(22),
    color: '#666'
  },
  engineering: {
    backgroundColor: '#fff',
  },
  engTitle: {
    lineHeight: px2dp(40),
    textAlign: 'center',
    color: '#333333',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#f9f5f2'
  },
  engItem: {
    height: px2dp(40),
    paddingLeft: px2dp(40),
    paddingRight: px2dp(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#f9f5f2'
  },
  engName: {
    color: '#666',
    lineHeight: px2dp(40)
  },
  engValue: {
    color: '#999',
    lineHeight: px2dp(40)
  },
  engMore: {
    lineHeight: px2dp(50),
    color: '#999',
    textAlign: 'center'
  },
  otherMsg: {
    marginTop: px2dp(10),
    backgroundColor: '#fff',
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10)
  },
  otherTitle: {
    lineHeight: px2dp(40),
    textAlign: 'center',
    color: '#333',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#f9f5f2'
  },
  otherTxt: {
    color: '#666',
    fontSize: px2dp(14),
    lineHeight: px2dp(20),
    paddingBottom: px2dp(10)
  },
  MapWrap: {
    backgroundColor: '#fff',
    marginTop: px2dp(10)
  },
  mapWrap: {
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#d2d2d2',
    marginBottom: px2dp(70),
  },
  MapTitle: {
    lineHeight: px2dp(36),
    color: '#ff634e',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#d2d2d2',
    paddingLeft: px2dp(10)
  },
  MapIcon: {
    fontFamily: 'iconfont',
    paddingRight: px2dp(5)
  },
  btmCon: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: Utils.screen.width,
    height: px2dp(60),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopWidth: px2dp(1),
    borderTopColor: '#d2d2d2'
  },
  btmTime: {
    flex: 1
  },
  btmTimeText: {
    lineHeight: px2dp(60),
    fontSize: px2dp(14),
    paddingLeft: px2dp(10)
  },
  timeNum: {
    color: '#ff634e',
    fontSize: px2dp(16)
  },
  btmBtn: {
    width: px2dp(100),
    backgroundColor: '#ff634e',
    borderRadius: 0
  },
  btmBtnDis: {
    backgroundColor: '#999'
  }
});
