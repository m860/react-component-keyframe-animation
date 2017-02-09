/**
 * Created by jean.h.ma on 2/9/17.
 */
import React, {Component, PropTypes} from 'react'

function createStyle(name: String, cssRules: String = '') {
	if (!name) {
		throw new Error('name is not defined');
	}
	let style = document.createElement('style');
	style.setAttribute('scope', name);
	style.setAttribute('id', name);
	style.setAttribute('type', 'text/css');
	style.innerText = cssRules;
	document.head.appendChild(style);
	return style;
}
function removeStyle(style: HTMLElement) {
	if (!style) {
		throw new Error('style is not defined');
	}
	document.head.removeChild(style);
}
function createKeyframes(name: String, frames: Array = []) {
	let result = [];
	let len = frames.length;
	if (len > 0) {
		let unit = 100 / (len - 1);
		let rules = frames.map((image, index)=> {
			return `${unit * index}% { background-image:url('${image}') }`
		}).join('');
		result.push(`@keyframes ${name} { ${rules} }`);
		result.push(`@-webkit-keyframes ${name} { ${rules} }`);
	}
	return result.join('');
}

function preloadImage(images: Array = [], callback: Function, progress: Function) {
	let len = images.length;
	let loadCount = 0;
	let errors = null;
	let increase = function () {
		loadCount++;
		if (progress) {
			progress(loadCount, len);
		}
		if (len === loadCount) {
			console.log('preload done')
			if (callback) {
				callback(errors);
			}
		}
	};
	let onLoad = function () {
		// console.log(`${this.src} done`)
		removeListener.apply(this);
		increase();
	};
	let onError = function () {
		removeListener.apply(this);
		if (!errors) {
			errors = [];
		}
		increase();
	};
	let removeListener = function () {
		this.removeEventListener('error', onError, false);
		this.removeEventListener('load', onLoad, false);
	};
	let addListener = function () {
		this.addEventListener('error', onError, false);
		this.addEventListener('load', onLoad, false);
	}
	images.map((item, index)=> {
		let image = new Image();
		addListener.apply(image);
		image.src = item;
	});
}

function addEventListener(ele:HTMLElement,type:String,listener:Function){
	let types=type.split(' ');
	types.map(item=>{
		ele.addEventListener(item,listener,false);
	});
}
function removeEventListener(ele:HTMLElement,type:String,listener:Function){
	let types=type.split(' ');
	types.map(item=>{
		ele.removeEventListener(item,listener,false);
	});
}

const defaultStyle = {
	WebkitAnimationTimingFunction: 'steps(1)',
	animationTimingFunction: 'steps(1)',
	WebkitAnimationDuration: '1s',
	animationDuration: '1s',
	WebkitAnimationIterationCount: 'infinite',
	animationIterationCount: 'infinite'
}


export default class KeyframeAnimation extends Component {
	static propTypes = {
		frames: PropTypes.array,
		sprite: PropTypes.shape({
			source: PropTypes.string.isRequired,
			startPosition: PropTypes.shape({
				x: PropTypes.number.isRequired,
				y: PropTypes.number.isRequired
			}),
			endPosition: PropTypes.shape({
				x: PropTypes.number.isRequired,
				y: PropTypes.number.isRequired
			}),
			direction: PropTypes.oneOf(['row', 'column']),
			frameCount: PropTypes.number.isRequired
		}),
		preload: PropTypes.bool,
		autoStart: PropTypes.bool,
		onStart: PropTypes.func,
		onEnd: PropTypes.func,
		onIteration:PropTypes.func,
		name: PropTypes.string.isRequired,
		style: PropTypes.object
	}
	static defaultProps = {
		preload: true,
		autoStart: true,
		onStart: ()=>null,
		onEnd: ()=>null,
		onIteration:()=>null,
		style: {
			width: '100px',
			height: '100px',
			backgroundRepeat: "no-repeat",
			backgroundSize: "100%"
		}
	}

	constructor(props: Object) {
		super(props);
		this.state = {
			animationName: 'unset'
		};
		if (props.frames) {
			// generate @frames
			this.style = createStyle(props.name, createKeyframes(props.name, props.frames));
		}
	}

	componentDidMount() {
		if (this.props.preload) {
			let images = this.props.frames ? this.props.frames : [this.props.sprite.source];
			preloadImage(images, err=> {
				if (this.props.autoStart) {
					this.start();
				}
			});
		}
		// add event
		addEventListener(this.refs.el,'animationstart webkitAnimationStart',this.props.onStart);
		addEventListener(this.refs.el,'animationiteration webkitAnimationIteration',this.props.onIteration);
		addEventListener(this.refs.el,'animationend webkitAnimationEnd',this.props.onEnd);
	}
	componentWillUnmount(){
		// remove event
		removeEventListener(this.refs.el,'animationstart webkitAnimationStart',this.props.onStart);
		removeEventListener(this.refs.el,'animationiteration webkitAnimationIteration',this.props.onIteration);
		removeEventListener(this.refs.el,'animationend webkitAnimationEnd',this.props.onEnd);
	}

	start() {
		this.setState(Object.assign({}, this.state, {
			animationName: this.props.name
		}));
	}

	stop() {
		this.setState(Object.assign({}, this.state, {
			animationName: 'unset'
		}));
	}

	render() {
		return (
			<div className={`keyframe-animation-${this.props.name}`}
				 ref="el"
				 style={Object.assign({},defaultStyle,this.props.style,{
				 	WebkitAnimationName:this.state.animationName,
				 	animationName:this.state.animationName
				 })}></div>
		);
	}
}