'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jean.h.ma on 2/9/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function createStyle(name) {
	var cssRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	if (!name) {
		throw new Error('name is not defined');
	}
	var style = document.createElement('style');
	style.setAttribute('scope', name);
	style.setAttribute('id', name);
	style.setAttribute('type', 'text/css');
	style.innerText = cssRules;
	document.head.appendChild(style);
	return style;
}
function removeStyle(style) {
	if (!style) {
		throw new Error('style is not defined');
	}
	document.head.removeChild(style);
}
function createKeyframes(name) {
	var frames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var result = [];
	var len = frames.length;
	if (len > 0) {
		(function () {
			var unit = 100 / (len - 1);
			var rules = frames.map(function (image, index) {
				return unit * index + '% { background-image:url(\'' + image + '\') }';
			}).join('');
			result.push('@keyframes ' + name + ' { ' + rules + ' }');
			result.push('@-webkit-keyframes ' + name + ' { ' + rules + ' }');
		})();
	}
	return result.join('');
}
function createKeyframesWithSprite(name, frameCount) {
	var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'row';

	var result = [];
	var unit = 100 / (frameCount - 1);
	var rules = [];
	for (var i = 0; i < frameCount; i++) {
		if (direction === 'row') {
			rules.push(unit * i + '% { background-position-x: ' + unit * i + '% }');
		} else {
			rules.push(unit * i + '% { background-position-y: ' + unit * i + '% }');
		}
	}
	var rule = rules.join('');
	result.push('@keyframes ' + name + ' { ' + rule + ' }');
	result.push('@-webkit-keyframes ' + name + ' { ' + rule + ' }');

	return result.join('');
}

function preloadImage() {
	var images = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var callback = arguments[1];
	var progress = arguments[2];

	var len = images.length;
	var loadCount = 0;
	var errors = null;
	var increase = function increase() {
		loadCount++;
		if (progress) {
			progress(loadCount, len);
		}
		if (len === loadCount) {
			console.log('preload done');
			if (callback) {
				callback(errors);
			}
		}
	};
	var onLoad = function onLoad() {
		// console.log(`${this.src} done`)
		removeListener.apply(this);
		increase();
	};
	var onError = function onError() {
		removeListener.apply(this);
		if (!errors) {
			errors = [];
		}
		increase();
	};
	var removeListener = function removeListener() {
		this.removeEventListener('error', onError, false);
		this.removeEventListener('load', onLoad, false);
	};
	var addListener = function addListener() {
		this.addEventListener('error', onError, false);
		this.addEventListener('load', onLoad, false);
	};
	images.map(function (item, index) {
		var image = new Image();
		addListener.apply(image);
		image.src = item;
	});
}

function addEventListener(ele, type, listener) {
	var types = type.split(' ');
	types.map(function (item) {
		ele.addEventListener(item, listener, false);
	});
}
function removeEventListener(ele, type, listener) {
	var types = type.split(' ');
	types.map(function (item) {
		ele.removeEventListener(item, listener, false);
	});
}

var defaultStyle = {
	WebkitAnimationTimingFunction: 'steps(1)',
	animationTimingFunction: 'steps(1)',
	WebkitAnimationDuration: '1s',
	animationDuration: '1s',
	WebkitAnimationIterationCount: 'infinite',
	animationIterationCount: 'infinite'
};

var KeyframeAnimation = function (_Component) {
	_inherits(KeyframeAnimation, _Component);

	function KeyframeAnimation(props) {
		_classCallCheck(this, KeyframeAnimation);

		var _this = _possibleConstructorReturn(this, (KeyframeAnimation.__proto__ || Object.getPrototypeOf(KeyframeAnimation)).call(this, props));

		_this.state = {
			style: {
				WebkitAnimationName: 'unset',
				animationName: 'unset'
			}
		};
		if (props.frames) {
			// generate @frames
			_this.style = createStyle(props.name, createKeyframes(props.name, props.frames));
			_this.state.style.backgroundSize = '100% 100%';
		} else if (props.sprite) {
			_this.style = createStyle(props.name, createKeyframesWithSprite(props.name, props.sprite.frameCount, props.sprite.direction || 'row'));
			if (!props.sprite.direction || props.sprite.direction === 'row') {
				_this.state.style.backgroundSize = 'auto 100%';
			} else {
				_this.state.style.backgroundSize = '100% auto';
			}
			_this.state.style.backgroundPosition = '0% 0%';
			_this.state.style.backgroundImage = 'url(\'' + props.sprite.source + '\')';
		}
		return _this;
	}

	_createClass(KeyframeAnimation, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			if (this.props.preload) {
				var images = this.props.frames ? this.props.frames : [this.props.sprite.source];
				preloadImage(images, function (err) {
					if (_this2.props.autoStart) {
						_this2.start();
					}
				});
			}
			// add event
			addEventListener(this.refs.el, 'animationstart webkitAnimationStart', this.props.onStart);
			addEventListener(this.refs.el, 'animationiteration webkitAnimationIteration', this.props.onIteration);
			addEventListener(this.refs.el, 'animationend webkitAnimationEnd', this.props.onEnd);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// remove event
			removeEventListener(this.refs.el, 'animationstart webkitAnimationStart', this.props.onStart);
			removeEventListener(this.refs.el, 'animationiteration webkitAnimationIteration', this.props.onIteration);
			removeEventListener(this.refs.el, 'animationend webkitAnimationEnd', this.props.onEnd);
			// remove style
			if (this.style) {
				removeStyle(this.style);
			}
		}
	}, {
		key: 'start',
		value: function start() {
			this.setState(Object.assign({}, this.state, {
				style: Object.assign({}, this.state.style, {
					WebkitAnimationName: this.props.name,
					animationName: this.props.name
				})
			}));
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.setState(Object.assign({}, this.state, {
				style: Object.assign({}, this.state.style, {
					WebkitAnimationName: 'unset',
					animationName: 'unset'
				})
			}));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'keyframe-animation-' + this.props.name,
				ref: 'el',
				style: Object.assign({}, defaultStyle, this.props.style, this.state.style) });
		}
	}]);

	return KeyframeAnimation;
}(_react.Component);

KeyframeAnimation.propTypes = {
	frames: _react.PropTypes.array,
	sprite: _react.PropTypes.shape({
		source: _react.PropTypes.string.isRequired,
		startPosition: _react.PropTypes.shape({
			x: _react.PropTypes.number.isRequired,
			y: _react.PropTypes.number.isRequired
		}),
		endPosition: _react.PropTypes.shape({
			x: _react.PropTypes.number.isRequired,
			y: _react.PropTypes.number.isRequired
		}),
		direction: _react.PropTypes.oneOf(['row', 'column']),
		frameCount: _react.PropTypes.number.isRequired
	}),
	preload: _react.PropTypes.bool,
	autoStart: _react.PropTypes.bool,
	onStart: _react.PropTypes.func,
	onEnd: _react.PropTypes.func,
	onIteration: _react.PropTypes.func,
	name: _react.PropTypes.string.isRequired,
	style: _react.PropTypes.object
};
KeyframeAnimation.defaultProps = {
	preload: true,
	autoStart: true,
	onStart: function onStart() {
		return null;
	},
	onEnd: function onEnd() {
		return null;
	},
	onIteration: function onIteration() {
		return null;
	},
	style: {
		width: '100px',
		height: '100px',
		backgroundRepeat: "no-repeat"
	}
};
exports.default = KeyframeAnimation;
