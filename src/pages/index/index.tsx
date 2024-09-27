import React, { Component, ComponentClass } from 'react'
import Taro from '@tarojs/taro'
import { View, Map, Button } from '@tarojs/components'
import './index.scss'

class Index extends Component {
  componentDidMount(): void {
    this.initMapContext()
  }

  mapCtx: Taro.MapContext
  // 初始化地图组件
  initMapContext = () => {
    this.mapCtx = Taro.createMapContext('myMap') //container是地图显示模块id
  }

  // 组件marker点
  setupMarker = () => {
    const  [longitude, latitude ] = [114.33,30.51]
    const tempId = 123
    const calloutContent = `武汉理工大学南湖校区`
    const currentMarker = {
      id: tempId,
      callout: {
        content: calloutContent,
        color: '#fff',
        fontSize: 12,
        bgColor: '#07bf64',
        padding: 7,
        borderRadius: 10,
        anchorX: 0,
        anchorY: 0,
        textAlign: 'center',
        display: 'ALWAYS',
      },
      latitude,
      longitude,
      width: 24,
      height: 32,
    }
    return [currentMarker]
  }

  // 打开本地导航地图软件导航到车辆位置
  navigateToWuhanUniversity = () => {
    const  [longitude, latitude ] = [114.37,30.54]
    if(longitude === 0 || latitude === 0) {
      Taro.showToast({
        title: '车辆定位信息获取失败',
        icon: 'none'
      })
      return
    }
    this.mapCtx.openMapApp({
      longitude: Number(longitude.toFixed(2)),
      latitude: Number(latitude.toFixed(2)),
      destination: `武汉大学`,
      success: () => {
        debugger
        console.log('代码本地地图')
      },
      fail: () => {
        Taro.showToast({
          title: '抱歉，打开本地导航App失败',
          icon: 'none'
        })
      }
    })
  }

  moveToUserLocation = async () => {
    this.moveToLocation(114.30,30.54)
  }

  /**
   * 地图挪动到指定位置。在某些低版本中，只能挪动到当前位置，而不是指定的位置。
   * 见官方开放社区提问，官方未解决 
   * https://developers.weixin.qq.com/community/develop/doc/00024068824748bec92906edd51800?highLine=moveToLocation
   * 同时地图中心点做一些偏移。
   * @param longitude 经度
   * @param latitude 纬度
   */
  moveToLocation(lng, lat) {
    console.log('movetoLocation1', lng, lat)
    const longitude = Number(lng.toFixed(2));
    const latitude = Number(lat.toFixed(2));
    const param = {
      longitude,
      latitude,
      success: () => {
        this.mapCtx.setCenterOffset({
          offset: [0.5, 0.75] // 横向不偏移，纵向向下偏移1/4
        })
      },
      fail: (err) => {
        console.log('movetoLocation err', JSON.stringify(err))
        // TODO
        if (err.errMsg.includes('mapview is null')) {
          // this.initLocation()
        }
        // if(err.errMsg.includes('moveToMapLocation:fail')) {
        //   const tips = '您已拒绝授权地理位置信息，暂时无法为您定位车辆。如需要定位，请点击"确定"按钮并授权定位'
        //   this.showLocationAuthFailModal(tips)
        // }
      }
    }
    console.log('movetoLocation2', longitude, latitude)
    console.log('movetoLocation3', longitude, latitude)
    this.mapCtx.moveToLocation(param)
  }

  // 地图模块渲染
  renderMap() {
    const  [longitude, latitude ] = [114.33,30.51]
    const markers = this.setupMarker()
    return <Map
      id='myMap'
      className='index-map'
      showLocation
      longitude={longitude}
      latitude={latitude}
      markers={markers}
      scale={16}
    ></Map>
  }

  
  render() {
    return <View className='bike-map-container'>
      <View className='map-box'>
        {this.renderMap()}
      </View>
      <View className='bottom-btns-box'>
        <Button type='success' onClick={this.navigateToWuhanUniversity}>导航去武汉大学</Button>
        <Button type='info' onClick={this.moveToUserLocation}>地图定位到黄鹤楼</Button>
      </View>
    </View>
  }
}

export default Index as ComponentClass