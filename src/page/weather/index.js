import React from 'react'
import axios from 'axios'
import './style.less'
import { message, Collapse, Tag, Icon, Modal, Form, Input, Checkbox, Button } from 'antd'

const {Panel} = Collapse

@Form.create()
class Weather extends React.Component {
	state = {
		loading: false,
		daily_forecast: [],
		basic: {},
		update: {},
		loc: '杭州',

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
			this.setState({loading: false})
		}
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	handleOk = () => {
		const {form} = this.props
		form.validateFields((err, values) => {
			if (err) {
				return
			}

			this.setState({confirmLoading: true})

			axios.get(`https://free-api.heweather.net/s6/weather/forecast?location=${values.loc}&key=0dd213c6299e4c0ca233320dc0984ad9`)
				.then(r => {
					if (r && r.status === 200 && r.data && r.data.HeWeather6[0].status === 'ok') {
						const data = r.data.HeWeather6[0]
						delete data.status
						message.success('获取天气信息成功！', 0.5)
						console.log(data)
						this.setState({...data})
					} else {
						message.error('获取天气信息失败！', 0.5)
					}
				})
				.finally(() => {
					this.setState({
						visible: false,
						confirmLoading: false,
						loading: false
					})
				})
			form.resetFields()
		})
	}

	handleCancel = () => {
		console.log('Clicked cancel button')
		this.setState({
			visible: false,
		})
	}


	render() {

		const {daily_forecast, confirmLoading, visible, basic} = this.state
		const {form} = this.props
		const {getFieldDecorator} = form

		return (
			<div className="g-weather">
				<div className="m-header">
					<Icon className="icon" type="menu"/>
					<div className="location">{basic.location}</div>
					<Icon className="icon" type="environment" onClick={this.showModal}/>
				</div>

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
			</div>
		)
	}
}

export default Weather
