import React from 'react'
import './style.less'

class MapClass extends React.Component {

	state = {
		loading: true
	}

	componentDidMount() {
		var map = new AMap.Map('container', {
			pitch: 50,
			zoom: 11
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
				<div id="container" className="map-wrap"/>
			</div>
		)
	}

}

export default MapClass
