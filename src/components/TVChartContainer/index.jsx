import * as React from 'react';
import './index.css';
import Datafeed from './api/'
import { widget } from '../../charting_library/charting_library.min';


function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			from: props.from,
			to: props.to,
		};
	 }

	static defaultProps = {
		symbol: `Exnance:${this.from}/${this.to}`,
		interval: '60',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	// componentDidMount() {
	// 	const widgetOptions = {
	// 		debug: false,
	// 		symbol: this.props.symbol,
	// 		datafeed: Datafeed,
	// 		interval: this.props.interval,
	// 		container_id: this.props.containerId,
	// 		library_path: this.props.libraryPath,
	// 		locale: getLanguageFromURL() || 'en',
	// 		disabled_features: ['use_localstorage_for_settings'],
	// 		enabled_features: ['study_templates'],
	// 		charts_storage_url: this.props.chartsStorageUrl,
	// 		charts_storage_api_version: this.props.chartsStorageApiVersion,
	// 		client_id: this.props.clientId,
	// 		user_id: this.props.userId,
	// 		fullscreen: this.props.fullscreen,
	// 		autosize: this.props.autosize,
	// 		studies_overrides: this.props.studiesOverrides,
	// 		overrides: {
	// 			// "mainSeriesProperties.showCountdown": true,
	// 			"paneProperties.background": "#131722",
	// 			"paneProperties.vertGridProperties.color": "#363c4e",
	// 			"paneProperties.horzGridProperties.color": "#363c4e",
	// 			"symbolWatermarkProperties.transparency": 90,
	// 			"scalesProperties.textColor" : "#AAA",
	// 			"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
	// 			"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
	// 		}
	// 	};

	// 	window.TradingView.onready(() => {
	// 		const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);

	// 		widget.onChartReady(() => {
	// 			console.log('Chart has loaded!')
	// 		});
	// 	});
	// }

	// render() {
	// 	return (
	// 		<div
	// 			id={ this.props.containerId }
	// 			className={ 'TVChartContainer' }
	// 		/>
	// 	);
	// }


	tvWidget = null;

	componentDidMount() {


		TVChartContainer.defaultProps={}
		const widgetOptions = {
			debug: false,
			symbol: `Exnance:${this.props.from}/${this.props.to}`,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			theme: 'dark',
			overrides: {
				// "mainSeriesProperties.showCountdown": true,
				"Theme": "Dark",
				"paneProperties.background": "#000",
				"paneProperties.vertGridProperties.color": "#000",
				"paneProperties.horzGridProperties.color": "#000",
				"symbolWatermarkProperties.transparency": 90,
				"scalesProperties.textColor" : "#AAA",
				"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
			}
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
