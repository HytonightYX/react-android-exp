import { Collapse, Tag, message } from 'antd'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import './style.less'
import { getAddr } from '../../util/reg-helper'

const {Panel} = Collapse

@inject('main')
@observer
class History extends React.Component {

	state = {
		history: null,
		option: null
	}

	async componentDidMount() {
		const addr = getAddr(window.localStorage.getItem('city'))
		const r = await axios.get(`https://free-api.heweather.net/s6/weather/forecast?location=${addr[1]}&key=0dd213c6299e4c0ca233320dc0984ad9`)
		if (r && r.status === 200) {
			const history = r.data.HeWeather6[0].daily_forecast
			window.localStorage.setItem('history', JSON.stringify(history))

			const dateArr = history.map(item => {
				const date = item.date.split('-')
				return `${date[1]}月${date[2]}日`
			})

			const tmpMaxArr = history.map(item => item.tmp_max)
			const tmpMinArr = history.map(item => item.tmp_min)

			this.setState({
				history,
				option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					xAxis: [
						{
							type: 'category',
							boundaryGap: false,
							data: dateArr
						}
					],
					yAxis: {
						type: 'value',
						axisTick: {//坐标轴刻度相关设置。
							show: false
						},
						axisLine: { //坐标轴轴线相关设置。
							show: false
						},
						splitLine: { //坐标轴在 grid 区域中的分隔线
							show: false,
						},
						axisLabel: {//坐标轴刻度标签的相关设置
							show: false
						},
					},
					series: [
						{
							name: '最高温',
							type: 'line',
							data: tmpMaxArr,
							label: {
								normal: {
									show: true,
									position: "top",
									textStyle: {
										fontSize: '12',
										fontFamily: '微软雅黑',
										color: "#555555"
									},
									distance: 10,
									formatter: function (val) {
										return val.data + "°"
									},
									rich: {
										first: {
											fontSize: '18',
											fontFamily: '微软雅黑',
											color: "#C2C2C2"
										}
									}
								}
							}
						},
						{
							name: '最低温',
							type: 'line',
							data: tmpMinArr,
							label: {
								normal: {
									show: true,
									position: "bottom",
									textStyle: {
										fontSize: '12',
										fontFamily: '微软雅黑',
										color: "#555555"
									},
									distance: 10,
									formatter: function (val) {
										return val.data + "°"
									},
									rich: {
										first: {
											fontSize: '18',
											fontFamily: '微软雅黑',
											color: "#C2C2C2"
										}
									}
								}
							}
						},
					]
				}
			})
			message.success('读取历史天气成功')
		} else {
			message.success('读取历史天气成功')
		}
	}

	render() {

		const {history, option} = this.state

		console.log(this.city)

		return (
			<div className="g-history">
				<div className="m-title">
					过去7天的天气
				</div>

				{
					option && <ReactEcharts option={option}/>
				}

				<Collapse defaultActiveKey={['daily-0']}>
					{
						history && history.map((item, index) => (
							<Panel header={<div>{item.date + '  '}{item.cond_txt_d}</div>} key={`daily-${index}`} className="m-item">
								<div className="m-row">
									<Tag color="blue" style={{minWidth: 65, textAlign: 'center'}}>气温</Tag>
									<span>{item.tmp_min}&#176;-{item.tmp_max}&#176;</span>
								</div>

								<div className="m-row">
									<Tag color="blue" style={{minWidth: 65, textAlign: 'center'}}>相对湿度</Tag>
									<span>{item.hum}</span>
								</div>

								<div className="m-row">
									<Tag color="blue" style={{minWidth: 65, textAlign: 'center'}}>风向</Tag>
									<span>{item.wind_dir}, 风力{item.wind_sc}级</span>
								</div>

								<div className="m-row">
									<Tag color="blue" style={{minWidth: 65, textAlign: 'center'}}>日出日落</Tag>
									<span>日出{item.sr}, 日落{item.sr}</span>
								</div>

								<div className="m-row">
									<Tag color="blue" style={{minWidth: 65, textAlign: 'center'}}>降水概率</Tag>
									<span>{item.pop}%</span>
								</div>

								<div className="m-row">
									<Tag color="blue" style={{minWidth: 60, textAlign: 'center'}}>大气压强</Tag>
									<span>{item.pres}</span>
								</div>
							</Panel>
						))
					}
				</Collapse>
			</div>
		)
	}

}

export default History
