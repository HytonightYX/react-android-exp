import { message } from 'antd'
import React from 'react'
import './style.less'
import { getAddr } from '../../util/reg-helper'

class MapClass extends React.Component {

	state = {
		loading: true,
	}

	componentDidMount() {
		var map = new AMap.Map('container', {
			pitch: 50,
			zoom: 11
		})

		AMap.service('AMap.Geocoder', function () {
			//回调函数
			//点击获取经纬度
			map.on('click', function (e) {
				AMap.service('AMap.Geocoder', function () {
					//回调函数
					//点击获取经纬度
					var geocoder = new AMap.Geocoder({
						city: '010' //城市，默认：“全国”
					})
					var lnglatXY = e.lnglat.getLng() + ',' + e.lnglat.getLat() //地图上所标点的坐标
					//实例化Geocoder
					geocoder.getAddress(lnglatXY, function (status, result) {
						if (status === 'complete' && result.info === 'OK') {
							let addr = getAddr(result.regeocode.formattedAddress)
							addr = addr[0] + addr[1]
							alert('已更新地址为：' + addr)
							window.localStorage.setItem('city', addr)
						} else {
							//获取地址失败
							message.error('图形点击:获取地址失败', 0.7)
						}
					})
				})
			})
		})

		AMap.plugin('AMap.CitySearch', function () {
			var citySearch = new AMap.CitySearch()
			citySearch.getLocalCity(function (status, result) {
				if (status === 'complete' && result.info === 'OK') {
					console.log(result)
				}
			})
		})
	}

	render() {
		return (
			<div className="g-map">
				<div id="container" className="map" tabIndex="0"/>
			</div>
		)
	}
}

export default MapClass
