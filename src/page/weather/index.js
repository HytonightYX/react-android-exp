import React from 'react'
import axios from 'axios'
import './style.less'
import qrcode from './qrcode.png'
import { LIFE_STYLE } from '../../constant/data'
import { message, Collapse, Tag, Icon, Modal, Form, Input, Checkbox, Button, Tabs } from 'antd'

const {Panel} = Collapse
const {TabPane} = Tabs

class Weather extends React.Component {
	state = {
		loading: false,
		loadingLifeStyle: false,
		daily_forecast: null,
		basic: null,
		update: null,
		loc: '杭州',
		now: null,
		image: 'https://source.unsplash.com/900x1600/?hangzhou',

		visible: false,
		confirmLoading: false,
	}

	async componentDidMount() {
		this.setState({loading: true})
		const r = await axios.get(`https://free-api.heweather.net/s6/weather/forecast?location=${this.state.loc}&key=0dd213c6299e4c0ca233320dc0984ad9`)
		if (r && r.status === 200 && r.data && r.data.HeWeather6[0].status === 'ok') {
			const data = r.data.HeWeather6[0]
			delete data.status
			message.success('获取天气信息成功！', 0.5)
			console.log(data)
			this.setState({...data, loading: false})
		} else {
			message.error('获取天气信息失败！', 0.5)
			// this.setState({loading: false})
		}

		const nowr = await axios.get(`https://free-api.heweather.net/s6/weather/now?location=${this.state.loc}&key=0dd213c6299e4c0ca233320dc0984ad9`)
		console.log(nowr.data)
		if (nowr && nowr.status === 200 && nowr.data && nowr.data.HeWeather6[0].status === 'ok') {
			this.setState({
				now: nowr.data.HeWeather6[0].now,
				update: nowr.data.HeWeather6[0].update
			})
		} else {
			message.error('获取实况天气失败！', 0.5)
			this.setState({loading: false})
		}

		const lifer = await axios.get(`https://free-api.heweather.net/s6/weather/lifestyle?location=${this.state.loc}&key=0dd213c6299e4c0ca233320dc0984ad9`)
		console.log('生活指数', lifer.data.HeWeather6[0].lifestyle)
		if (lifer && lifer.status === 200 && lifer.data && lifer.data.HeWeather6[0].status === 'ok') {

			this.setState({
				lifestyle: lifer.data.HeWeather6[0].lifestyle,
			})
		}
	}

	render() {
		const {basic, daily_forecast, now, update, lifestyle} = this.state
		console.log(update)
		console.log(now)
		console.log('daily_forecast', daily_forecast)

		return (
			<div className="g-weather">

				<div className="m-weather-tabs">
					<Tabs type="card" defaultActiveKey='2'>
						<TabPane tab="今日" key="1">
							<div className="m-today">

								<div className="m-main">
									<div className="loc">
										{basic && basic.location}
									</div>

									<div className="weather">
										{now && now.cond_txt}
									</div>

									<div className="temp">
										{now && now.tmp}
									</div>
								</div>

								<div className="m-detail">
									<div className="data-wrap">
										<div className="m-row">
											<div className="item">
												<div className="item-title">日出</div>
												<div className="item-data">
													上午{daily_forecast && daily_forecast[0].sr}
												</div>
											</div>

											<div className="item">
												<div className="item-title">日出</div>
												<div className="item-data">
													下午{daily_forecast && daily_forecast[0].ss}
												</div>
											</div>
										</div>

										<div className="m-row">
											<div className="item">
												<div className="item-title">降水概率</div>
												<div className="item-data">
													{daily_forecast && daily_forecast[0].pop}%
												</div>
											</div>

											<div className="item">
												<div className="item-title">湿度</div>
												<div className="item-data">
													{daily_forecast && daily_forecast[0].hum}%
												</div>
											</div>
										</div>

										<div className="m-row">
											<div className="item">
												<div className="item-title">风向</div>
												<div className="item-data">
													{daily_forecast && daily_forecast[0].wind_dir}
												</div>
											</div>

											<div className="item">
												<div className="item-title">风力</div>
												<div className="item-data">
													{daily_forecast && daily_forecast[0].wind_sc}级
												</div>
											</div>
										</div>

										<div className="m-row no-border">
											<div className="item">
												<div className="item-title">降水量</div>
												<div className="item-data">
													{daily_forecast && daily_forecast[0].pcpn}毫米
												</div>
											</div>

											<div className="item">
												<div className="item-title">气压</div>
												<div className="item-data">
													{daily_forecast && daily_forecast[0].pres}百帕
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</TabPane>
						<TabPane tab="推荐" key="2">
							<div className="m-recommend">
								<div className="qrcode-wrap">
									<img src={qrcode} alt=""/>
								</div>

								<div className="life-wrap">
									<div className="life-title">
										生活指数
									</div>

									<div className="m-life-wrap">
										{
											lifestyle && lifestyle.map(item => {
												const type = LIFE_STYLE[item.type]
												if (type) {
													return (
														<div className="m-life-row" key={item.name}>
															<div className="name">{type}<span className="brf">{item.brf}</span></div>
															<div>
																<span className="txt">{item.txt}</span>
															</div>
														</div>
													)
												}
											})
										}
									</div>
								</div>
							</div>
						</TabPane>
					</Tabs>
				</div>

			</div>
		)
	}
}

const a = () => (
	<Collapse defaultActiveKey={['daily-0']}>
		{
			daily_forecast && daily_forecast.map((item, index) => (
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
)

const b = () => (
	<Modal
		visible={visible}
		onOk={this.handleOk}
		confirmLoading={confirmLoading}
		onCancel={this.handleCancel}
	>
		<div>
			<Form layout="vertical">
				<Form.Item label="位置">
					{getFieldDecorator('loc', {
						rules: [{required: true, message: '请输入地理位置...'}],
					})(<Input/>)}
				</Form.Item>
			</Form>
		</div>
	</Modal>
)

export default Weather
